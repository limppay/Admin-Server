import { Injectable, BadRequestException, NotFoundException  } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { AdminUserDto } from './user.dto';
import { PermissionDto } from './permission.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(newUser: AdminUserDto) {

        const existingClient = await this.findByEmail(newUser.email);

        if (existingClient) {
            throw new BadRequestException('Já existe uma conta cadastrada com este e-mail');
        }


        newUser.senha = bcryptHashSync(newUser.senha, 10);

        const cliente = await this.prisma.adminUser.create({
            data: {
                Nome: newUser.nome,
                Nascimento: newUser.nascimento,
                genero: newUser.genero,
                email: newUser.email,
                senha: newUser.senha,
                cidade: newUser.cidade,
                estado: newUser.estado,
                createdAt: new Date(),

                permissions: {
                    create: newUser.permissions?.map((permission) => ({
                      nome: permission.nome,
                      descricao: permission.descricao,
                    })),
                },
                                
            },
            
        });

        return cliente;
    }

    async findAll() {
        return this.prisma.adminUser.findMany({
            include: {
                permissions: true, // Inclui a tabela de permissões relacionadas
            },
        });
    }

   // Buscar usuário por ID e incluir permissões
    async findById(id: string) {
        const cliente = await this.prisma.adminUser.findUnique({
            where: { id },
            include: { permissions: true }, // Inclui as permissões relacionadas
        });

        if (!cliente) {
            throw new NotFoundException(`Client with ID ${id} not found`);
        }

        return cliente;
    }

    // Buscar usuário por e-mail e incluir permissões
    async findByEmail(email: string) {
        const user = await this.prisma.adminUser.findFirst({
            where: { email },
            include: { permissions: true }, // Inclui as permissões relacionadas
        });

        return user;
    }

    // Atualizar usuário e permissões relacionadas
    async update(id: string, updateUser: Partial<AdminUserDto>) {
        console.log('Verificando se o usuário existe...');

        const cliente = await this.prisma.adminUser.findUnique({
            where: { id },
            include: { permissions: true }, // Inclui as permissões atuais para verificação
        });

        console.log(`Buscando cliente com ID: ${id}`);
        console.log('Cliente encontrado:', cliente);

        if (!cliente) {
            throw new NotFoundException(`Client with ID ${id} not found`);
        }

        // Atualiza a senha se for fornecida e diferente da existente
        if (updateUser.senha && updateUser.senha !== cliente.senha) {
            updateUser.senha = bcryptHashSync(updateUser.senha, 10);
        }

        const updatedUser = await this.prisma.adminUser.update({
            where: { id },
            data: {
                Nome: updateUser.nome,
                Nascimento: updateUser.nascimento,
                genero: updateUser.genero,
                email: updateUser.email,
                senha: updateUser.senha,
                cidade: updateUser.cidade,
                estado: updateUser.estado,
                Status: updateUser.Status,
                permissions: {
                    deleteMany: {}, // Remove permissões existentes
                    create: updateUser.permissions?.map(permission => ({
                        nome: permission.nome,
                        descricao: permission.descricao,
                    })), // Adiciona permissões atualizadas
                },
            },
            include: { permissions: true }, // Inclui permissões no retorno
        });

        console.log('Usuário atualizado com sucesso:', updatedUser);

        return {
            updatedUser,
        };
    }

    // Deletar um usuário
    async delete(id: string) {
        const cliente = await this.prisma.adminUser.delete({
            where: { id },
        });
        if (!cliente) {
            throw new NotFoundException(`Cliente with ID ${id} not found`);
        }

        return cliente;
    }


}

import { Injectable, BadRequestException, NotFoundException  } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { AdminUserDto } from './user.dto';

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
                permissao: newUser.permissao
            },
            
        });

        return cliente;
    }

    async findAll() {
        return this.prisma.adminUser.findMany({

        });
    }

   // Buscar usuário por ID e incluir permissões
    async findById(id: string) {
        const cliente = await this.prisma.adminUser.findUnique({
            where: { id },
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
        });

        return user;
    }

    // Atualizar usuário e permissões relacionadas
    async update(id: string, updateUser: Partial<AdminUserDto>) {
        console.log('Iniciando atualização do usuário...');
        console.log(`ID fornecido: ${id}`);
        console.log('Dados recebidos para atualização:', updateUser);
    
        const cliente = await this.prisma.adminUser.findUnique({
            where: { id },
        });
    
        if (!cliente) {
            console.error(`Usuário com ID ${id} não encontrado.`);
            throw new NotFoundException(`Client with ID ${id} not found`);
        }
    
        // Atualiza a senha se for fornecida e diferente da existente
        if (updateUser.senha && updateUser.senha !== cliente.senha) {
            console.log('Atualizando senha...');
            updateUser.senha = bcryptHashSync(updateUser.senha, 10);
        }
    
        try {
            const updatedUser = await this.prisma.adminUser.update({
                where: { id },
                data: {
                    Nome: updateUser.nome ?? cliente.Nome,
                    Nascimento: updateUser.nascimento ?? cliente.Nascimento,
                    genero: updateUser.genero ?? cliente.genero,
                    email: updateUser.email ?? cliente.email,
                    senha: updateUser.senha ?? cliente.senha,
                    cidade: updateUser.cidade ?? cliente.cidade,
                    estado: updateUser.estado ?? cliente.estado,
                    Status: updateUser.Status ?? cliente.Status,
                    permissao: updateUser.permissao ?? cliente.permissao,
                },
            });
    
            console.log('Usuário atualizado com sucesso:', updatedUser);
    
            return updatedUser;
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw new Error('Erro ao atualizar usuário');
        }
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

    async updatePassword(userId: string, newPassword: string) {
        console.log("Dados recebidos: ", userId, newPassword)
        const hashedPassword = bcryptHashSync(newPassword, 10);

        try {
            return await this.prisma.adminUser.update({
                where: { id: userId },
                data: { senha: hashedPassword },
            });
            
        } catch (error) {
            throw new NotFoundException('Usuário não encontrado');

        }
    }


}

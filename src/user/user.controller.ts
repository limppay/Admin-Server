import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';
import { AdminUserDto } from './user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post()
    async create(
        @Body() user: AdminUserDto,
    ) { 
        await this.userService.create(user);
        return { message: 'User created successfully' };
    }

    // Listar todos os usuários
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    // Buscar um usuário por ID
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findById(@Param('id') id: string) {
        // Buscando e retornando os dados do usuário
        return this.userService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() user: Partial<AdminUserDto>,
    ) {
       
        return this.userService.update(id, user);
    }

    // Deletar um usuário
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) { // Removido o ParseIntPipe
        return this.userService.delete(id);
    }

}

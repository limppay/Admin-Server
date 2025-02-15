import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';
import { AdminUserDto } from './user.dto';
import { Request } from 'express';
import { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getUserData(@Req() req: Request) {
        const user = req.user; // Adicionado pelo JwtAuthGuard
        
        return user; // Retorna as informações do usuário
    }

    @Get('logout')
    async logout(@Req() req, @Res() res: Response) {
        const domain = process.env.DOMAIN || 'localhost';
        const sameSite = process.env.SAME_SITE_POLICY || 'lax';

        res.clearCookie('admin_token', 
        {   httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: sameSite as 'lax' | 'strict' | 'none',
            domain 
        });
        return res.send({ message: 'Logout do admin realizado com sucesso.' });
    }


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

    @UseGuards(JwtAuthGuard)
    @Put('new-password/change')
    async updatePassword(
        @Body('id') id: string,
        @Body('newPassword') newPassword: string,
    ) {
        return this.userService.updatePassword(id, newPassword);
    }
    

    // Deletar um usuário
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) { // Removido o ParseIntPipe
        return this.userService.delete(id);
    }

}

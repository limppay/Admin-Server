// admin-user.dto.ts
import { IsString, IsBoolean, IsDate, IsUUID, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class AdminUserDto {
  @IsUUID()
  id: string;

  @IsString()
  nome: string;

  @IsString()
  email: string

  @IsString()
  senha: string

  @IsDate()
  @Type(() => Date)
  nascimento: Date;

  @IsString()
  genero: string

  @IsString()
  cidade: string;

  @IsString()
  estado: string;

  @IsBoolean()
  @IsOptional()
  Status?: boolean = true;

  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @IsString()
  @IsOptional()
  permissao?: string;
}

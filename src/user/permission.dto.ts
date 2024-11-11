// permission.dto.ts
import { IsString, IsInt, IsOptional } from 'class-validator';

export class PermissionDto {
  @IsInt()
  id: number;

  @IsString()
  nome: string;

  @IsString()
  @IsOptional()
  descricao?: string;
}

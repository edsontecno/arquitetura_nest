import { IsNotEmpty } from 'class-validator';

export class CreateSegurancaDto {
  @IsNotEmpty({ message: 'O email não pode ser vazio' })
  email: string;
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  senha: string;
}

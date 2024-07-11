import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'O email não pode ser vazio' })
  email: string;
  @IsNotEmpty({ message: 'O password não pode ser vazio' })
  password: string;
}

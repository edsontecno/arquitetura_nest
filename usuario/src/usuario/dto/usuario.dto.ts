import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UsuarioDto extends PartialType(CreateUsuarioDto) {
  id: number;
  create_at: Date;
}

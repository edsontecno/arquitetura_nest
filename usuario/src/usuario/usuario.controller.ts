import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    await this.usuarioService.create(createUsuarioDto);

    return {
      messagem: 'usuário criado com sucesso',
    };
  }

  @Get()
  async findAll() {
    return {
      mensagem: 'Usuários obtidos com sucesso.',
      usuarios: await this.usuarioService.findAll(),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuarioService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    await this.usuarioService.update(+id, updateUsuarioDto);
    return {
      messagem: 'usuário atualizado com sucesso',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usuarioService.remove(+id);
    return {
      messagem: 'usuário removido com suceso',
    };
  }
}

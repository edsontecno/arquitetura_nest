import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class SegurancaService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async autenticar(email, senha) {
    const usuarioLocalizado = await this.usuarioService.findOne(email);

    if (!usuarioLocalizado) {
      throw new UnauthorizedException('usuário não localizado');
    }

    const usuarioLogado = senha === usuarioLocalizado.senha;

    if (!usuarioLogado) {
      throw new UnauthorizedException('usuário ou senha inválidos');
    }

    console.log('autenticado');
    const payload = {
      sub: usuarioLocalizado.id,
      nomeUsuario: usuarioLocalizado.nome,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

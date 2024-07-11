import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export interface RequestUsuario extends Request {
  usuario: object;
}

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestUsuario>();
    const token = this.extrairToken(request);
    if (!token) {
      throw new UnauthorizedException('Sem token');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      console.log(payload);
      request.usuario = payload;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('token inválido');
    }

    return true;
  }

  extrairToken(request: Request): string | undefined {
    const [tipo, token] = request.headers.authorization?.split(' ') ?? [];
    return tipo === 'Bearer' ? token : undefined;
  }
}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

export interface RequestUsuario extends Request {
  usuario: object;
}

// interface GuardOptions {
//   resource: string;
// }

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    // private readonly options: GuardOptions,
    private jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestUsuario>();
    const token = this.extrairToken(request);
    if (!token) {
      throw new UnauthorizedException('Sem token');
    }
    const rotaDefinida = this.reflector.get<string>(
      'path',
      context.getHandler(),
    );
    // console.log('Parâmetro 1:', this.options.resource);
    console.log(rotaDefinida);
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

// @Injectable()
// export class GuardFactory {
//   constructor(
//     private jwtService: JwtService,
//     private readonly reflector: Reflector,
//   ) {}

//   createGuard(options: GuardOptions): UserGuard {
//     return new UserGuard(options, this.jwtService, this.reflector);
//   }
// }

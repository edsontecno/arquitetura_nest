import { Role } from './roles.enum';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { BusinessRuleException } from 'src/shared/filtros/business-rule-exception';

export interface RequestUsuario extends Request {
  usuario: object;
}

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestUsuario>();
    const token = this.extractToken(request);
    if (!token) {
      throw new BusinessRuleException('Sem token', 401);
    }

    let payload;
    try {
      payload = await this.jwtService.verifyAsync(token);
    } catch (error) {
      console.log(error);
      throw new BusinessRuleException('token inválido', 401);
    }
    this.checkRoles(context, payload);
    request.usuario = payload;

    return true;
  }

  checkRoles(context, payload) {
    const requiredRole = this.reflector.get<Role>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRole) {
      return true;
    }

    const hasPermission = Object.values(requiredRole).some((item) =>
      payload.resources.includes(item),
    );

    if (!hasPermission) {
      throw new BusinessRuleException(
        'Usuário não possui permissão para acessar a funcionalidade',
        401,
      );
    }
  }

  extractToken(request: Request): string | undefined {
    const [tipo, token] = request.headers.authorization?.split(' ') ?? [];
    return tipo === 'Bearer' ? token : undefined;
  }
}

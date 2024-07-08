import { Module } from '@nestjs/common';
import { SegurancaService } from './seguranca.service';
import { SegurancaController } from './seguranca.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [
    UsuarioModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('secret_jwt'),
          signOptions: { expiresIn: '72h' },
        };
      },
      inject: [ConfigService],
      global: true,
    }),
  ],
  controllers: [SegurancaController],
  providers: [SegurancaService],
})
export class SegurancaModule {}

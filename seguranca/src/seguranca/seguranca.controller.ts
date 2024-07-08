import { Body, Controller, Post } from '@nestjs/common';
import { CreateSegurancaDto } from './dto/create-seguranca.dto';
import { SegurancaService } from './seguranca.service';

@Controller('seguranca')
export class SegurancaController {
  constructor(private readonly segurancaService: SegurancaService) {}

  @Post('login')
  login(@Body() { email, senha }: CreateSegurancaDto) {
    return this.segurancaService.autenticar(email, senha);
  }
}

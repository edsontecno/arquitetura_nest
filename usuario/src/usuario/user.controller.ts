import { Roles } from './roles.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserGuard } from './user.guard';
import { Role } from './roles.enum';

@Controller('user')
export class userController {
  constructor(
    private readonly userService: UserService,
    // private readonly guardFactory: GuardFactory,
  ) {}

  @Post()
  async create(@Body() createuserDto: CreateUserDto) {
    await this.userService.create(createuserDto);

    return {
      messagem: 'usuário criado com sucesso',
    };
  }

  @Get()
  async findAll() {
    return {
      mensagem: 'Usuários obtidos com sucesso.',
      users: await this.userService.findAll(),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateuserDto: UpdateUserDto) {
    await this.userService.update(+id, updateuserDto);
    return {
      messagem: 'usuário atualizado com sucesso',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userService.remove(+id);
    return {
      messagem: 'usuário removido com suceso',
    };
  }

  @Get(':id/resources')
  async getResourcesUser(@Param('id') id: number) {
    return await this.userService.getResourcesUser(id);
  }

  @Roles(Role.User)
  @UseGuards(UserGuard)
  @Get(':id/hasAccess/:resource')
  async hasAccessToResource(
    @Param('id') id: number,
    @Param('resource') resourceName: string,
  ) {
    return await this.userService.hasAccessToResource(id, resourceName);
  }

  @Post('login')
  login(@Body() { email, password }: LoginDto) {
    return this.userService.login(email, password);
  }
}

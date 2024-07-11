import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDTO } from './dto/list-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const userEntity = new UserEntity();

    Object.assign(userEntity, createUserDto);

    return this.userRepository.save(userEntity);
  }

  async findAll() {
    const usersSalvos = await this.userRepository.find();
    const usersLista = usersSalvos.map(
      (user) => new ListUserDTO(user.id, user.name),
    );
    return usersLista;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    const userDto = new UserDto();
    Object.assign(userDto, user);
    return userDto;
  }

  async update(id: number, updateuserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (user === null)
      throw new NotFoundException('O usuário não foi encontrado.');

    Object.assign(user, updateuserDto as UserEntity);

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('O usuário não foi encontrado');
    }

    await this.userRepository.delete(user.id);

    return user;
  }

  async getResourcesUser(id) {
    const user = await this.getUserWithProfile(id);

    // Extrair os resources do usuário
    const resources = user.profiles
      .flatMap((profile) => profile.resources)
      .map((resource) => resource.name);

    return resources;
  }

  async hasAccessToResource(id: number, resourceName: string) {
    const user = await this.getUserWithProfile(id);

    const hasAccess = user.profiles.some((profile) =>
      profile.resources.some((resource) => resource.name === resourceName),
    );

    return hasAccess;
  }

  private async getUserWithProfile(id: any) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['profiles', 'profiles.resources'],
    });

    if (!user) {
      throw new Error(`Usuário com ID ${id} não encontrado.`);
    }
    return user;
  }
}

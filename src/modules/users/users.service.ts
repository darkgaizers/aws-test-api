import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import { AddUserBodyDto } from './dto/bodies/add-user-body.dto';
import { UpdateUserBodyDto } from './dto/bodies/update-user-body.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ICOGNITO_SERVICE_PROVIDER, RECORD_NOT_FOUND, RoleTypes } from 'src/constants';
import { FindOptions } from 'sequelize/types';
import { GetUserQueryDto } from './dto/queries/get-user-query.dto';
import { IUsersService } from './interfaces/services/users-service.interface';
import { ICognitoService } from '../cognito/intefaces/cognito-service.interface';
@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectModel(User) private usersRepository: typeof User,
    @Inject(ICOGNITO_SERVICE_PROVIDER) private readonly cognitoService: ICognitoService,
  ) { }

  public async findAll(query: GetUserQueryDto): Promise<User[]> {
    const findOptions: FindOptions = {};
    if (query.email) {
      findOptions.where = { email: query.email };
    }
    const users: User[] = await this.usersRepository.findAll<User>(findOptions);

    return users;
  }

  public async findOne(id: number): Promise<User> {
    const user: User = await this.usersRepository.findOne<User>({ where: { id } });

    if (!user) {
      throw new NotFoundException(RECORD_NOT_FOUND);
    }

    return user;
  }

  public async verifyById(id: number): Promise<User> {
    const user: User = await this.usersRepository.findOne<User>({ where: { id } });

    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user: User = await this.usersRepository.findOne<User>({ where: { email } });

    return user;
  }

  public async create(addUserBodyDto: AddUserBodyDto): Promise<User> {
    try {
      await this.createCognitoUser(addUserBodyDto.email, addUserBodyDto.password);
      const newUser: User = await this.usersRepository.create<User>({ ...addUserBodyDto });

      return newUser;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async createCognitoUser(email: string, password: string): Promise<void> {
    try {
      await this.cognitoService.signUpWithVerify(email, password, email, RoleTypes.USER);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async update(id: number, updateUserBodyDto: UpdateUserBodyDto): Promise<User> {
    const [, [updatedUser]] = await this.usersRepository.update(updateUserBodyDto, { where: { id }, returning: true });

    return updatedUser;
  }

  public async destroy(id: number): Promise<void> {
    await this.usersRepository.destroy({ where: { id } });
  }

  private async hashPassword(password: string): Promise<string> {
    const hash: string = await bcrypt.hash(password, 10);

    return hash;
  }

  public async updatePassword(email: string,password: string): Promise<User> {
    const passw: string = await this.hashPassword(password);
    const [, [updatedUser]] = await this.usersRepository.update({password: passw},{ where: { email }, returning: true });

    return updatedUser;
  }
}

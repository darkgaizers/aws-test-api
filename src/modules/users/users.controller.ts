import { Body, Controller, Delete, Get, HttpStatus, Param, Put, Post, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddUserBodyDto } from './dto/bodies/add-user-body.dto';
import { UpdateUserBodyDto } from './dto/bodies/update-user-body.dto';
import { GetUserParamDto } from './dto/params/get-user-param.dto';
import { DeleteUserResDto } from './dto/responses/delete-user-res.dto';
import { GetUserResDto } from './dto/responses/get-user-res.dto';
import { User } from './user.model';
import { UsersService } from './users.service';
import { GetUserQueryDto } from './dto/queries/get-user-query.dto';
import { AddCognitoUserResDto } from './dto/responses/add-cognito-user-res.dto';
import { AddCognitoUserBodyDto } from './dto/bodies/add-cognito-user-body.dto';

@ApiTags('Users')
@Controller('/v1/users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get all users from database', type: [GetUserResDto] })
  @Get('/')
  public async getAllUsers(@Query() query: GetUserQueryDto): Promise<GetUserResDto[]> {
    const users: User[] = await this.usersService.findAll(query);
    return users.map((user: User): GetUserResDto => new GetUserResDto(user));
  }

  @ApiOperation({ summary: 'Get specific user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Search user by id and return it\'s values', type: GetUserResDto })
  @Get('/:id')
  public async getUser(@Param() param: GetUserParamDto): Promise<GetUserResDto> {
    const user: User = await this.usersService.findOne(param.id);

    return new GetUserResDto(user);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Add new user to database', type: GetUserResDto })
  @Post('/')
  public async addUser(@Body() body: AddUserBodyDto): Promise<GetUserResDto> {
    const user: User = await this.usersService.create(body);
    return new GetUserResDto(user);
  }

  @ApiOperation({ summary: 'Create cognito user' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Add new user to AWS cognito', type: AddCognitoUserResDto })
  @Post('/cognito')
  public async addCognitoUser(@Body() body: AddCognitoUserBodyDto): Promise<AddCognitoUserResDto> {
    await this.usersService.createCognitoUser(body.email, body.password);
    return new AddCognitoUserResDto();
  }

  @ApiOperation({ summary: 'Update user detail' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Search user by id and update it\'s details', type: GetUserResDto })
  @Put('/:id')
  public async updateUser(@Body() body: UpdateUserBodyDto, @Param() param: GetUserParamDto): Promise<GetUserResDto> {
    const user: User = await this.usersService.update(param.id, body);
    return new GetUserResDto(user);
  }

  @ApiOperation({ summary: 'Delete specific user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Search user by id and delete it', type: DeleteUserResDto })
  @Delete('/:id')
  public async deleteUser(@Param() param: GetUserParamDto): Promise<DeleteUserResDto> {
    await this.usersService.destroy(param.id);
    return new DeleteUserResDto();
  }

}

import { Controller, UseGuards, Post, Request, HttpStatus, Get, Body, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginUserDataReqDto } from './dto/requests/login-user-data-req.dto';
import { CheckUserAuthResDto } from './dto/responses/check-user-auth-res.dto';
import { InitiateAuthResponse } from '@aws-sdk/client-cognito-identity-provider';
import { AuthUserWithPasswordResDto } from './dto/responses/auth-user-with-password-res.dto';
import {
  ICOGNITO_SERVICE_PROVIDER,
  // , USERNAME_FIELD, USERNAME_NOT_SAME
} from '../../constants';
import { ICognitoService } from '../cognito/intefaces/cognito-service.interface';
import { User } from '../users/user.model';
import { LoginUserBodyDto } from './dto/bodies/login-user-body-dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
    @Inject(ICOGNITO_SERVICE_PROVIDER) private readonly cognitoService: ICognitoService,
  ) { }

  @ApiOperation({ summary: 'Auth user with password' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return auth token', type: AuthUserWithPasswordResDto })
  @Post('/login')
  public async authUserWithPassword(@Body() body: LoginUserBodyDto): Promise<AuthUserWithPasswordResDto> {
    const authRes: InitiateAuthResponse = await this.cognitoService.signInWithPassword(body.email, body.password);
    return new AuthUserWithPasswordResDto(authRes.AuthenticationResult);
  }

  @ApiOperation({ summary: 'Check user authentication' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Check if token is valid and return the current user' })
  @UseGuards(AuthGuard('jwt'))
  @Get('/check')
  public async checkUser(@Request() req: LoginUserDataReqDto): Promise<CheckUserAuthResDto> {
    const loggedInUser: User = await this.authService.check(req.user);

    return new CheckUserAuthResDto(loggedInUser);
  }
}


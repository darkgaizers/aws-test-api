import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { CognitoModule } from '../cognito/cognito.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    SequelizeModule.forFeature([User]),
    CognitoModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

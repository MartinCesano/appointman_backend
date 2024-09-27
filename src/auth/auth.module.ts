import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from 'src/jwt/jwt.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersModule } from 'src/resources/users/users.module';

@Module({
  providers: [AuthService, AuthGuard,JwtService],
  imports: [UsersModule],
  exports: [AuthService, AuthGuard]
})
export class AuthModule {}

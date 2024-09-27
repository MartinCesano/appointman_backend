import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from 'src/jwt/jwt.module';
import { PermissionsModule } from 'src/resources/permissions/permissions.module';
import { RolesModule } from 'src/resources/roles/roles.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [JwtModule, PermissionsModule, RolesModule],
  exports: [UsersService],
})
export class UsersModule {}

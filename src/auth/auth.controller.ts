import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';


@Controller('authorization')
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async validateToken(@Body() body: { token: string }) {
    const isValid = await this.authorizationService.validateToken(body.token);
    if (!isValid) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return { valid: true };
  }

}

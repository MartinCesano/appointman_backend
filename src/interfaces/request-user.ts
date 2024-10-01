import { Request } from 'express';
import { Usuario } from 'src/auth/modules/usuario/usuario.entity';

export interface RequestWithUser extends Request {
  user: Usuario;
}

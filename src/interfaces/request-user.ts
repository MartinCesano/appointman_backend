import { Request } from 'express';
import { Usuario
  
 } from '../auth/modules/usuario/usuario.entity';
export interface RequestWithUser extends Request {
  user: Usuario;
}

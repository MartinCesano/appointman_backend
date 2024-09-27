import { Request } from 'express';
import { UserEntity } from 'src/resources/users/user.entity';

export interface RequestWithUser extends Request {
  user: UserEntity;
}

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from './role.enum';

export class LoggedUser {
  readonly userId: string;
  readonly email: string;
  readonly roles: Role[];

  constructor(userId: string, email: string, roles: Role[]) {
    this.userId = userId;
    this.email = email;
    this.roles = roles;
  }
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): LoggedUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

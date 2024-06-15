import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserAuth } from 'src/user-auth/entities/user-auth.entity';

export const GetUser = createParamDecorator(
  (_, ctx: ExecutionContext): UserAuth => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);

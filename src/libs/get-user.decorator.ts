/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserAuth } from '../user-auth/entities/user-auth.entity';

export const GetUser = createParamDecorator(
  (_, ctx: ExecutionContext): UserAuth => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const req = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return req.user;
  },
);

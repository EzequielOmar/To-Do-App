import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
/**
 * This is a neccesary wrapper for the jwtMiddleware.
 * It get the execution context and create a gql execution context
 * wich is neccesary in order to access request data in graphql request.
 */
export class jwtGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

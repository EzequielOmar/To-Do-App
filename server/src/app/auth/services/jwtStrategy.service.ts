import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifyCallback } from 'passport-jwt';
import 'dotenv/config';
import { UserService } from 'src/app/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private us: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_PASS,
      passReqToCallback: true,
    });
  }

  /**
   * This middleware runs on each call to the server. It automatically decode the jwt and pass it.
   * @param request request made from the client
   * @param payload payload decoded internly from the request jwt
   * @param done callback
   */
  async validate(request: any, payload: any, done: VerifyCallback) {
    try {
      //check if the user from the jwt exists on the database, otherwise thwor error
      const exists = await this.us.exists(payload.thirdPartyId);
      if (!exists) throw new Error('User from request does not exist.');
      //save the user data on request to pass it to CurrentUser
      request.user = payload;
      done(null, payload);
    } catch (err) {
      throw new UnauthorizedException('unauthorized', err.message);
    }
  }
}

/**
 * This function gets the user data from the validate function middleware,
 * and pass it to the resolver as a param
 */
export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    //get user data
    const user = ctx.getContext().req.user;
    //unset the data from the request
    ctx.getContext().req.user = undefined;
    return user;
  },
);

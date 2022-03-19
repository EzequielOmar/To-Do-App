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
   * This middleware automatically decode the accessToken and throw unauthorized error if expired.
   * @param request request made from the client
   * @param payload payload decoded internly from the request jwt
   * @param done callback
   */
  async validate(request: any, payload: any, done: VerifyCallback) {
    try {
      done(null, payload);
    } catch (err) {
      throw new UnauthorizedException('unauthorized', err.message);
    }
  }
}

/**
 * This function gets the user provide ir from the http only secure cookie 'prov_id'
 * And send it to the resolvers with in the CurrentUser variable.
 */
export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.cookies['prov_id'];
  },
);

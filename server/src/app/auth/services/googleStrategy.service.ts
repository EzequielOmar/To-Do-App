import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UserService } from '../../user/user.service';
import { AuthService, Provider } from './auth.service';
import 'dotenv/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    private us: UserService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/google/redirect',
      //response_type: 'code',
      passReqToCallback: true,
      scope: ['profile'],
    });
  }

  /**
   * Middleware de authenticacion, obtiene el usuario de la bd (o lo crea si no existe)
   * crea el jwt con el id de google y nombre de usuario, y lo envia dentro del user en el req.
   * lanza error durante la creacion/obtencion y armado de jwt
   */
  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    try {
      const u = await this.us.getOrCreateUser(profile.id);
      if (!u) throw new Error('Error al crear/obtener el usuario');
      const jwt: string = await this.authService.codeJwt(
        profile.id,
        Provider.GOOGLE,
      );
      const user = {
        jwt,
      };
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}

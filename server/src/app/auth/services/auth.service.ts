import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign, decode } from 'jsonwebtoken';
import 'dotenv/config';

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY = process.env.JWT_SECRET_PASS;

  async codeJwt(
    thirdPartyId: string,
    provider: Provider,
    displayName: string,
  ): Promise<string> {
    try {
      const payload = {
        thirdPartyId,
        provider,
        displayName,
      };
      const jwt: string = sign(payload, this.JWT_SECRET_KEY, {
        expiresIn: 3600,
      });
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }

  decode(jwt: string) {
    console.log(decode(jwt));
  }
}

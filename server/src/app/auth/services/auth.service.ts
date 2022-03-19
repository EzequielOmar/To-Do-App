import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import 'dotenv/config';
import * as bcrypt from 'bcrypt';

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_KEY = process.env.JWT_SECRET_PASS;
  private readonly salts = 7;

  async createUserTokens(provId: string): Promise<{
    accessToken: string;
    reloadToken: string;
  }> {
    try {
      //create accessToken with no data, only expires date
      const accessToken: string = sign({}, this.JWT_SECRET_KEY, {
        expiresIn: 360,
      });
      const hashed_id = await bcrypt.hash(provId, this.salts);
      const reloadToken: string = sign(
        { hashed_id: hashed_id },
        this.JWT_SECRET_KEY,
      );
      return {
        accessToken: accessToken,
        reloadToken: reloadToken,
      };
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}

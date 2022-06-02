import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { decode, sign } from 'jsonwebtoken';
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
    return this.createTokens(provId);
  }

  async reloadUserTokens(
    reloadToken: string,
    prov_id: string,
  ): Promise<{
    accessToken: string;
    reloadToken: string;
  }> {
    const decodedToken = decode(reloadToken);
    //compare cookie prov_id value, with hashed prov_id on reloadToken
    let matches = false;
    if (prov_id && decodedToken['hashed_id'])
      matches = (
        await bcrypt.compare(prov_id, decodedToken['hashed_id'])
      ).valueOf();
    //if matches return new tokens, else return empty strings
    if (matches) return this.createTokens(prov_id);
    return { accessToken: '', reloadToken: '' };
  }

  private async createTokens(prov_id: string): Promise<{
    accessToken: string;
    reloadToken: string;
  }> {
    try {
      //create accessToken with no data, only expires date
      const accessToken: string = sign({}, this.JWT_SECRET_KEY, {
        expiresIn: 60 * 60 * 3, //3hs
      });
      const hashed_id = await bcrypt.hash(prov_id, this.salts);
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

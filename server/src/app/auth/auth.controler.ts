import { Controller, Res, Req, Post, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../user/user.service';
import { AuthService } from './services/auth.service';

@Controller('')
export class AuthController {
  constructor(private us: UserService, private auth: AuthService) {}

  @Post('redirect')
  async googleLoginCallback(@Req() req, @Res() res: Response) {
    //if no body id, return error
    if (!req.body.id)
      return res.status(HttpStatus.FORBIDDEN).send('No id provided');
    //get or create user
    let userExists = await this.us.exists(req.body.id);
    if (userExists) res.status(HttpStatus.ACCEPTED);
    else {
      userExists = await this.us.createUser(
        req.body.id,
        req.body.displayName ?? '',
      );
      res.status(HttpStatus.CREATED);
    }
    //set secure http only cookie with user provid
    res.cookie('prov_id', userExists.provId, {
      secure: true,
      httpOnly: true,
      sameSite: 'none',
      expires: new Date(Date.now() + 3600 * 1000 * 24 * 90 * 1), //like 3 months
    });
    //return accessToken and reloadToken in body
    return res.send(await this.auth.createUserTokens(userExists.provId));
  }

  @Post('reloadTokens')
  async reloadTokens(@Req() req, @Res() res: Response) {
    //if no body reloadToken, return error
    if (!req.body.reloadToken)
      return res.status(HttpStatus.FORBIDDEN).send('No reload token provided');
    return res
      .status(HttpStatus.ACCEPTED)
      .send(
        await this.auth.reloadUserTokens(
          req.body.reloadToken,
          req.cookies['prov_id'],
        ),
      );
  }
}

import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('')
export class AuthController {
  /**
   * Resolver to begin login process with google
   * It redirects internly to the googleLoginCallback
   */
  @Get('login')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // initiates the Google OAuth2 login flow
  }

  /**
   * Once the user is logged in (or registered and created on db), jwt created,
   * if the process went right and the jwt created, redirects to main page
   * passing the jwt by get url to the client.
   * if not, go back to client`s login page
   */
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    // handles the Google OAuth2 callback
    const jwt: string = req.user.jwt;
    if (jwt) res.redirect('https://eov-todo-client.herokuapp.com/?token=' + jwt);
    else res.redirect('https://eov-todo-client.herokuapp.com/login');
  }
}

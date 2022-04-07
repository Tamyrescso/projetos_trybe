import { Request, Response } from 'express';
import LoginService from '../services/login.service';

class LoginController {
  constructor(private loginService = new LoginService()) { }

  public login = async (req: Request, res: Response) => {
    const { code, data } = await this.loginService.login(req.body);

    return res.status(code).json(data);
  };
}

export default LoginController;
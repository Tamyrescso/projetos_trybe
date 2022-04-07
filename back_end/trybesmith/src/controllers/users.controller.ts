import { Request, Response } from 'express';
import UsersService from '../services/users.service';

class UsersController {
  constructor(private usersService = new UsersService()) { }

  public create = async (req: Request, res: Response) => {
    const { code, data } = await this.usersService.create(req.body);

    return res.status(code).json(data);
  };
}

export default UsersController;
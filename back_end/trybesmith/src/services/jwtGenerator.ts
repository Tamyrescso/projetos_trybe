import jwt from 'jsonwebtoken';
import { TokenData } from '../interfaces';

const SECRET = 'batatinhaquandonasce';

const jwtConfig = { expiresIn: '1d' };

export default (data: TokenData) => jwt.sign({ data }, SECRET, jwtConfig);
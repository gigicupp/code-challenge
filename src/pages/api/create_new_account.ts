import type { NextApiRequest, NextApiResponse } from 'next';
import checkErrors from '../../utils/checkErrors';

interface CreateNewAccountParameters {
  username: string;
  password: string;
  password1: string;
  errors: object;
}

interface BooleanResult {
  result: boolean;
  errors?: Record<string, string>;
}

export default function createNewAccount(req: NextApiRequest, res: NextApiResponse<BooleanResult>) {
  const { username, password, password1, errors }: CreateNewAccountParameters = JSON.parse(req.body);
  
  if(!username.length || !password.length || !password1.length || password !== password1) {
    res.status(200).json({ result: false });
  } else {
    res.status(200).json({ result: true });
  }
}

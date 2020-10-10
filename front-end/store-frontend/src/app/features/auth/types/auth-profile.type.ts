import { User } from './user.type';

export interface AuthenticationProfile {
  user: User;
  csrf: string;
  jwtToken: string;
}



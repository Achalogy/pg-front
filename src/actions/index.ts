import { LogInAction } from './auth/LogInAction';
import { SignUpAction } from './auth/signUpAction';
import { postTransactionAction } from './transactions/postTransactionAction';

export const server = {
  "sign-up": SignUpAction,
  "log-in": LogInAction,
  "post-transaction": postTransactionAction
}
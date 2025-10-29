import { LogInAction } from './auth/LogInAction';
import { SignUpAction } from './auth/signUpAction';
import { deleteTransactionAction } from './transactions/deleteTransactionAction';
import { postTransactionAction } from './transactions/postTransactionAction';
import { setTransactionGoalAction } from './transactions/setTransactionGoalAction';

export const server = {
  "sign-up": SignUpAction,
  "log-in": LogInAction,
  "post-transaction": postTransactionAction,
  "delete-transaction": deleteTransactionAction,
  "set-transaction-goal": setTransactionGoalAction
}
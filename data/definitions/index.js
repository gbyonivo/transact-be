import account from './account';
import { extractDefinition } from '../functions';

export default `
  type Account${extractDefinition(account)}
`;
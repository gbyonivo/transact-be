import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import secret from '../constants/secret';
import { createToken } from '../functions';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: secret
};

export default new JwtStrategy(
  jwtOptions,
  (jwtPayload, callBack) => {
    const { id, name } = jwtPayload;
    if (id && name) {
      return callBack(null, createToken(id, name));
    }
    return callBack('Sorry, We can\'t recogonize your details', false, { message: 'not abe to login' });
  }
);

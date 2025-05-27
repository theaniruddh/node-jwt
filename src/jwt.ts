import * as types from './types';
import * as utils from './utils';
import * as algorithms from './algorithms';
import * as jwtErrors from './errors';

function sign(payload: types.JwtPayload, key: string, algorithm: 'HS256' | 'RS256' = 'HS256'): string {
  const header: types.JwtHeader = { alg: algorithm };
  const iat = Math.floor(Date.now() / 1000);
  payload.iat ??= iat;
  payload.exp ??= iat + 86400;

  const headerB64 = utils.base64UrlEncode(JSON.stringify(header));
  const payloadB64 = utils.base64UrlEncode(JSON.stringify(payload));
  const data = `${headerB64}.${payloadB64}`;

  const signature = algorithm === 'HS256'
    ? algorithms.signHS256(data, key)
    : algorithms.signRS256(data, key);

  return `${data}.${signature}`;
}


function verify(
  token: string,
  key: string,
  options?: {  
  iat?: number;
  iss?: string;
  aud?: string;
  exp?: number; 
  nbf?: number;
}
): types.JwtPayload {
  const [headerB64, payloadB64, signature] = token.split('.');

  if (!headerB64 || !payloadB64 || !signature) throw new jwtErrors.InvalidSignatureError();

  const header: types.JwtHeader = JSON.parse(utils.base64UrlDecode(headerB64).toString());

  const payload: types.JwtPayload = JSON.parse(utils.base64UrlDecode(payloadB64).toString());

  const data = `${headerB64}.${payloadB64}`;

  const valid = header.alg === 'HS256'
    ? algorithms.verifyHS256(data, key, signature)
    : algorithms.verifyRS256(data, key, signature);

  if (!valid) throw new jwtErrors.InvalidSignatureError();

  const now = Math.floor(Date.now() / 1000);

  if (payload.nbf && payload.nbf > now) throw new jwtErrors.NotBeforeError();

  if (payload.exp && payload.exp < now) throw new jwtErrors.TokenExpiredError();

  if (options?.iss && payload.iss !== options.iss) throw new jwtErrors.InvalidIssuerError();
  
  if (options?.aud && payload.aud !== options.aud) throw new jwtErrors.InvalidAudienceError();
  
  return payload;
}

function decode(token: string): types.JwtPayload {
  const parts = token.split('.');
  if (parts.length < 2) throw new jwtErrors.InvalidSignatureError();
  return JSON.parse(utils.base64UrlDecode(parts[1]).toString());
}


export {
  sign,
  verify,
  decode,
}

export default {
  sign,
  verify,
  decode,
};
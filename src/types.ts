interface JwtHeader {
  alg: 'HS256' | 'RS256';
}

interface JwtPayload {
  [key: string]: any;
  iat?: number;
  iss?: string;
  aud?: string;
  exp?: number;
  nbf?: number;
}

export {
  JwtHeader,
  JwtPayload,
}
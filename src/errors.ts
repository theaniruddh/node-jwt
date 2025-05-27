class JwtError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'JwtError';
  }
}

class InvalidSignatureError extends JwtError {
  constructor() {
    super('Invalid signature');
  }
}

class NotBeforeError extends JwtError {
  constructor() {
    super('NotBeforeError');
  }
}

class TokenExpiredError extends JwtError {
  constructor() {
    super('Token expired');
  }
}

class InvalidIssuerError extends JwtError {
  constructor() {
    super('Invalid issuer');
  }
}

class InvalidAudienceError extends JwtError {
  constructor() {
    super('Invalid audience');
  }
}

export {
  JwtError,
  InvalidSignatureError,
  NotBeforeError,
  TokenExpiredError,
  InvalidIssuerError,
  InvalidAudienceError,
};

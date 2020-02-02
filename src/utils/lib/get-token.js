import jwt from 'jsonwebtoken';

class TokenMiddleware {
  static getToken(userId, isAdmin) {
    return jwt.sign({ userId, isAdmin },
      process.env.TOKEN_SECRET,
      { expiresIn: 86400 }
    )
  }

  static decodeToken(token, secret) {
    const a = jwt.verify(token, secret);
    console.log(a)
    return a
  }
}

export default TokenMiddleware;
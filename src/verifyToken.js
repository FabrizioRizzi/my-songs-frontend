import jwt from 'jsonwebtoken';

const verifyToken = (authToken) => {
  // se il token non c'è ? 
  try {
    const jwtDecoded = jwt.verify(authToken, 'GuthrieGovan');
    if (new Date(jwtDecoded.nbf * 1000) < new Date() && new Date() < new Date(jwtDecoded.exp * 1000)) {
      return true;
    } else {
      console.error('invalid token');
      return false;
    }
  } catch (err) {
    console.error('invalid token');
    return false;
  }
}

export default verifyToken;
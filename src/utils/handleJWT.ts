import jwt_decode from 'jwt-decode';
import { setAuthToken } from '../axios';

export default function handleJwt(token: any): any {
  if (token) {
    // TODO check if token is exp'ed
    // Save token to local storage
    localStorage.setItem('jwToken', token);
    // Set auth headers
    setAuthToken(token);
    // Decode jwt
    return jwt_decode(token);
  } else {
    localStorage.removeItem('jwToken');
    setAuthToken();
  }
}

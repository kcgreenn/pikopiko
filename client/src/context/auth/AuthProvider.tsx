import React, { useReducer } from 'react';
import { axiosInstance } from '../../App';
// import { authContext } from './authContext';
import authReducer from './authReducer';
import {
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  SET_LOADING,
  CLEAR_LOADING,
  SET_ALERT,
} from '../types';
import handleJwt from '../../utils/handleJWT';

import { createContext } from 'react';

export interface AuthContext {
  isAuth: boolean;
  user: {
    sub: string;
    handle: string;
    email: string;
    exp: number;
    iat: number;
  };
  loading: boolean;
  alert: any;
  login: any;
  register: any;
  logout: any;
  checkLocalToken: any;
  setAlert: any;
  clearLoading: any;
  setLoading: any;
}

export const authContext = createContext<AuthContext>({
  isAuth: false,
  user: {
    sub: '',
    handle: '',
    email: '',
    exp: Date.now(),
    iat: Date.now(),
  },
  loading: false,
  alert: null,
  login: async (username: string, password: string): Promise<void> => {},
  register: null,
  checkLocalToken: null,
  setAlert: null,
  logout: null,
  clearLoading: null,
  setLoading: null,
});

interface Props {}

const AuthProvider: React.FC<Props> = props => {
  const initialState = {
    isAuth: false,
    user: {},
    loading: false,
    alert: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Login User
  const login = async (loginData: any): Promise<string | void> => {
    try {
      setLoading();
      const res = await axiosInstance.post('/login', loginData);
      if (res.data.access_token) {
        const decoded = handleJwt(res.data.access_token);
        // Set current user
        dispatch({ type: SET_CURRENT_USER, payload: decoded });
      }
    } catch (err) {
      setAlert(err.response.data.message);
    }
  };

  // Register User
  const register = async (registerData: any): Promise<string | void> => {
    try {
      setLoading();
      const res = await axiosInstance.post('/register', registerData);
      if (res) {
        await login({
          username: registerData.handle,
          password: registerData.password,
        });
      }
    } catch (err) {
      setAlert(err.response.data.message);
    }
  };

  // Logout User
  const logout = (): void => {
    handleJwt(null);
    dispatch({ type: CLEAR_CURRENT_USER });
  };

  // Check Local Storage for Token
  const checkLocalToken = (token: any): void => {
    if (token) {
      const decoded = handleJwt(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp > currentTime) {
        dispatch({ type: SET_CURRENT_USER, payload: decoded });
      } else {
        setAlert('Your session has expired');
        dispatch({ type: CLEAR_CURRENT_USER });
      }
    }
  };

  //   Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });
  const clearLoading = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_LOADING });
    }, 500);
  };

  // Set alert
  const setAlert = (message: string): void => {
    dispatch({ type: SET_ALERT, payload: message });
  };

  return (
    <authContext.Provider
      value={{
        isAuth: state.isAuth,
        user: state.user,
        loading: state.loading,
        alert: state.alert,
        setAlert: setAlert,
        login: login,
        register: register,
        logout: logout,
        checkLocalToken: checkLocalToken,
        setLoading: setLoading,
        clearLoading: clearLoading,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthProvider;

import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authContext } from '../context/auth/AuthProvider';

interface Props {
  component: any;
  path?: any;
}

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const authCtxt = useContext(authContext);
  return (
    <Route
      {...rest}
      render={props =>
        authCtxt.isAuth ? <Component {...props} /> : <Redirect to="/landing" />
      }
    />
  );
};

export default PrivateRoute;

import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const AuthRoute = ({ authenticated, element }) => {
    return authenticated ? element : <Navigate to="/login"/>;
};

export default AuthRoute;
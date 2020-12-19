import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { DreamingContext } from '../context/DreamingContext'

const PrivateRoute = ({ component: Component, ...props }) => {

    const contextApp = useContext(DreamingContext)
    const { userOnline } = contextApp

    return ( 
        <Route { ...props } render={ props => (Object.keys(userOnline).length === 0) ? (
            <Redirect to="/login" />
        ) : (
            <Component { ...props } />
        )}
        />
     );
}

export default PrivateRoute

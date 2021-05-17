import React from 'react';
import { Redirect } from 'react-router';
import { authToken } from '../common/helpers/token.helper';


export const WithPrivateRouteRedirect = (Component) => {

    const RedirectComponent = (props) => {

            if (authToken.getToken()) {
                return <Component {...props} />
            }
            return <Redirect  to='/auth/register'/>
    }
    return RedirectComponent
}

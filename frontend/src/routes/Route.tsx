import React from 'react';
import {
    Route as ReactDOMRoute,
    RouteProps as ReactDOMRouteProps,
    Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: boolean;
    studentPage?: boolean;
    employeePage?: boolean;
    component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
    isPrivate = false,
    studentPage = false,
    employeePage = false,
    component: Component,
    ...rest
}) => {
    const { user } = useAuth();

    return (
        <ReactDOMRoute
            {...rest}
            render={({ location }) => {
                if (isPrivate && !user) {
                    return <Redirect to={{ pathname: '/', state: { from: location } }} />
                }

                if (isPrivate && !!user) {
                    if (studentPage) {
                        if (user.type === 'student') {
                            return <Component />
                        } else {
                            return <Redirect to={{ pathname: '/secretaria', state: { from: location } }} />
                        }
                    }
                    if (employeePage) {
                        if (user.type === 'employee') {
                            return <Component />
                        } else {
                            return <Redirect to={{ pathname: '/perfil-estudante', state: { from: location } }} />
                        }
                    }
                }

                if (!isPrivate && !!user) {
                    if (user.type === 'student') {
                        return <Redirect to={{ pathname: '/perfil-estudante', state: { from: location } }} />
                    } else {
                        return <Redirect to={{ pathname: '/secretaria', state: { from: location } }} />
                    }
                }

                return <Component />
            }}
        />
    );
};

export default Route;

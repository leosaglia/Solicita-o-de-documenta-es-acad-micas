import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';


interface UserData {
    name?: string;
    employee_name?: string;
    email: string;
    type: 'student' | 'employee';
}

interface AuthState {
    token: string;
    user: UserData;
}

interface SignInCredentials {
    email: string;
    password: string;
    type: 'student' | 'employee';
}


interface AuthContextData {
    user: UserData;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@SSDA:token');
        const user = localStorage.getItem('@SSDA:user');

        if (token && user) {
            return { token, user: JSON.parse(user), };
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, password, type }) => {
        const response = await api.post('sessions', {
            user: email,
            password,
            type,
        });

        const { token, user } = response.data;

        user.type = type;

        localStorage.setItem('@SSDA:token', token);
        localStorage.setItem('@SSDA:user', JSON.stringify(user));

        setData({ token, user });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@SSDA:token');
        localStorage.removeItem('@SSDA:user');

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };

import React, { createContext, useReducer, useContext } from 'react';

const AuthContext = createContext(null);

// Початковий стан
const initialState = {
    token: null,
    user: null
};

// керування станом
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                token: action.token,
                user: action.user
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
};

// // Провайдер контексту аутентифікації 1
// export const AuthProvider = ({ elem }) => {
//     const [state, dispatch] = useReducer(authReducer, initialState);

//     return (
//         <AuthContext.Provider value={{ state, dispatch }}>
//             {elem}
//         </AuthContext.Provider>
//     );
// };

// Провайдер контексту аутентифікації 2
export const AuthProvider = ({ elem }) => {

    const getStoredState  = () => {
        const sessionData  = sessionStorage.getItem('authState');
        return sessionData ? JSON.parse(sessionData) : initialState;
    };
    
    const storedState = getStoredState() || initialState;
    const [state, dispatch] = useReducer(authReducer, storedState);

    const saveState  = (data) => {
        sessionStorage.setItem('authState', JSON.stringify(data));
    };

    // dispatch, яка зберігає дані в SessionStorage
    const dispatchWithSave = (action) => {
        dispatch(action);
        saveState ({ ...state, ...action });
    };

    return (
        <AuthContext.Provider value={{ state, dispatch: dispatchWithSave }}>
            {elem}
        </AuthContext.Provider>
    );
};


// Хук для отримання значення контексту
export const useAuth = () => useContext(AuthContext);

import React, { createContext, useState } from 'react';

export const LoginSignupContext = createContext();

export function LoginSignupProvider({ children }) {
    const [hasAccount, setHasAccount] = useState(true);

    return (
        <LoginSignupContext.Provider value={{ hasAccount, setHasAccount }}>
            {children}
        </LoginSignupContext.Provider>
    )

}


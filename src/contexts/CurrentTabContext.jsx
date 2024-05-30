import React, { createContext, useState } from 'react';

export const CurrentTabContext = createContext();

export function CurrentTabProvider({ children }) {
    const [currentSelected, setCurrentSelected] = useState(0);

    return (
        <CurrentTabContext.Provider value={{ currentSelected, setCurrentSelected }}>
            {children}
        </CurrentTabContext.Provider>
    )

}


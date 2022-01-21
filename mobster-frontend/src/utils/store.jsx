import React, { useState, createContext } from "react";

export const Context = createContext();

export function StoreProvider({ children }) {
  const [context, setContext] = useState({
    family: {
        name: "family from context",
        description: "descrip from context",
        admin: "admin from context",
        memberCount: 1000
    },
    test: "testdata",
    user: {
      //hard coded user for now
      userid: "3FA85F64-5717-4562-B3FC-2C963F66AFA6",
      username: "username",
      families: [],
      isAdmin: []
    }
  });

  // setContext replaces the whole context
  // create a method that let us update it instead
  function updateContext(updates) {
    setContext({
      ...context,
      ...updates,
    });
  }

  return (
    <Context.Provider value={[context, updateContext]}>{children}</Context.Provider>
  );
}

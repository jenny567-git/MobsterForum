import React, { useState, createContext } from "react";

export const Context = createContext();

export function StoreProvider({ children }) {
  const [context, setContext] = useState({
    searchString:'',
    searchResult: [],
    searchType:'',
    currentAdmin: {userName: "context", userId:""},
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

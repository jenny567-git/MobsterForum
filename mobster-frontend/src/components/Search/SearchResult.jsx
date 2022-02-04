import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../utils/store";
import { useNavigate } from "react-router-dom";
import Thread from "../Thread/Thread";

const SearchResult = () => {
  const [context, updateContext] = useContext(Context);

  let navigate = useNavigate();

  if (context.searchType == "families") {
    return (
      <>
        <div>Family results, Found: {context.searchResult.length}</div>
        {Array.from(context.searchResult).map((family) => (
            <li
              key={family.familyId}
              onClick={() => navigate(`/family/${family.familyId}`)}
            >
              {family.name}
            </li>
          ))}
      </>
    );
  }

  if (context.searchType == "threads") {
    return (
      <>
        <div>Threads results, Found: {context.searchResult.length}</div>
        {Array.from(context.searchResult).map((thread) => (
            <Thread
            key={thread.threadId}
            thread={thread}
          />
          ))}
      </>
    );
  }

  return <div>Error...Something went wrong</div>;
};

export default SearchResult;

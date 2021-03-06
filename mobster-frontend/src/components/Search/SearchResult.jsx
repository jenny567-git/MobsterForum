import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../utils/store";
import { useNavigate } from "react-router-dom";
import Thread from "../Thread/Thread";
import FamilyOverview from "../FamilyComponents/FamilyOverview";
import NotFound from "../../pages/StaticContent/NotFound";

const SearchResult = () => {
  const [context, updateContext] = useContext(Context);

  let navigate = useNavigate();

  if (context.searchType == "families") {
    return (
      <div className="flex-space">
        <div className="search-result">
          <h2>Found: {context.searchResult.length} families</h2>
          {Array.from(context.searchResult).map((family) => (
              <FamilyOverview
              key={family.familyId}
              family={family}
            />
            ))}
        </div>
      </div>
    );
  }

  if (context.searchType == "threads") {
    return (
      <div className="flex-space">
        <div className="search-result">
          <h2>Found: {context.searchResult.length} threads</h2>
          {Array.from(context.searchResult).map((thread) => (
              <Thread
              key={thread.threadId}
              thread={thread}
            />
            ))}
        </div>
      </div>
    );
  }

  return <NotFound/>;
};

export default SearchResult;

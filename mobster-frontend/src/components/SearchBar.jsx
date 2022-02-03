import React, { useState, useContext, useEffect } from "react";

function SearchBar() {
  const [searchString, setSearchString] = useState("");
  const [searchType, setSearchType] = useState('families');

  const search = async (e) => {
    e.preventDefault();
    const radiovalue = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    
    setSearchType(radiovalue);
    switch (radiovalue) {
      case "threads":
        var response = await fetch(
          "https://yt-music-api.herokuapp.com/api/yt/albums/" + searchString
        );
        break;
      default:
        var response = await fetch(
          "https://yt-music-api.herokuapp.com/api/yt/songs/" + searchString
          ); 
        break;
    }
    var result = await response.json();
    if (result) {
      setResults(result.content);
      setLoading(false)
    }
  };

  return (
    <div className="search-bar-input">
      <form action="">
        <input
          type="text"
          placeholder="Search..."
          autoComplete="off"
          onChange={(e) => setSearchString(e.target.value)}
        />

        <button type="button" onClick={search}>
          <i className="fas fa-search"></i>
        </button>

        <p>Select type:</p>
        <div>
          <input
            type="radio"
            id="huey"
            name="drone"
            value="families"
            defaultChecked
          />
          <label htmlFor="huey">Family</label>
        </div>

        <div>
          <input type="radio" id="dewey" name="drone" value="threads" />
          <label htmlFor="dewey">Thread</label>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;

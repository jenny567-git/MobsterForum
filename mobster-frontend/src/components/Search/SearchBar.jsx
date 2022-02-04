import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../../utils/store";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchString, setSearchString] = useState("");
  const [context, updateContext] = useContext(Context);

  let navigate = useNavigate();

  const search = async (e) => {
    e.preventDefault();
    const radiovalue = document.querySelector(
      'input[type="radio"]:checked'
    ).value;

    switch (radiovalue) {
      case "threads":
        axios
          .get(
            `https://localhost:44304/api/Thread?searchstring=${searchString}`
          )
          .then((res) => {
            console.log("Success: ", res.data);
            updateContext({ searchResult: res.data, searchType: radiovalue });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        break;
      default:
        axios
          .get(
            `https://localhost:44304/api/Family?searchstring=${searchString}`
          )
          .then((res) => {
            console.log("Success: ", res.data);
            updateContext({ searchResult: res.data, searchType: radiovalue });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        break;
    }
    navigate("/searchresult");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    search(e);
  };

  return (
    <div className="search-bar-input">
      <form className="select-type" onSubmit={onSubmit}>
        <input
          id="searchText"
          type="text"
          placeholder="Search..."
          autoComplete="off"
          onChange={(e) => setSearchString(e.target.value)}
        />

        <button type="button" onClick={search}>
          <i className="fas fa-search"></i>
        </button>

       
          <p>Select:</p>
          <div className="radio-button">
            <input
              type="radio"
              id="huey"
              name="drone"
              value="families"
              defaultChecked
            />
            <label  htmlFor="huey">Family</label>
          </div>
          <div className="radio-button">
            <input type="radio" id="dewey" name="drone" value="threads" />
            <label htmlFor="dewey">Thread</label>
          </div>
        
      </form>
    </div>
  );
}

export default SearchBar;

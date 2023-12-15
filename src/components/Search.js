import React, { useState } from "react";
import { useDispatch } from "react-redux";

function Search() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  function handleSearch() {
    // console.log(search);

    fetch(`https://657708f9197926adf62d2030.mockapi.io/api/v1/students?name=${search}`)
      .then((result) => result.json())
      .then((result) => {
          dispatch({ type: "search", payload: { keyword: "", list: result } });
      })
      .catch((error) => {
        
      });
  }
  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="Tìm kiếm"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button type="button" className="btn btn-primary" onClick={(event) => handleSearch()}>
          Tìm
        </button>
      </div>
    </div>
  );
}

export default Search;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/SearchSlice";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state);
  const { text } = search;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const searchText = e.target.value;
    dispatch(setSearchQuery(searchText));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Fix the typo here
    navigate("/shop?" + text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        className="form-control"
        value={text}
        onChange={handleChange}
      />
    </form>
  );
};

export default Search;

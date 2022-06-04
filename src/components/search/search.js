import "./search.scss";
import { SearchRounded } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../ulities";
const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const debouncedValue = useDebounce(keyword, 200);
  console.log(debouncedValue);
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${debouncedValue}`);
    } else {
      navigate("/");
    }
  };
  return (
    <div className="app_Search_container">
      <form className="app_Search_Form" onSubmit={submitHandler}>
        <input
          type="search"
          className="form-control rounded app_Search_Input"
          placeholder="Search"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" className="app_Search_button">
          <SearchRounded />
        </button>
      </form>
    </div>
  );
};
export default Search;

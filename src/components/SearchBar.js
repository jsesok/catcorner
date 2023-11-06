import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from "../store";

function SearchBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.posts.searchTerm);

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    dispatch(setSearchTerm(newSearchTerm))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control form-control-lg shadow-none"
          placeholder="Search in posts"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

export default SearchBar;
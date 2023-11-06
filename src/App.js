import SearchBar from "./components/SearchBar";
import SubredditSideBar from "./components/SubredditSideBar";
import PostList from "./components/PostList";
import Header from "./components/Header";

function App() {
  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="col-md-2 p-1 me-5 first-col">
          <div className="mt-3 pb-2">
            <SearchBar />
          </div>
          <SubredditSideBar />
        </div>
        <div className="col-md-8 p-1 second-col">
          <PostList />
        </div>
      </div>
    </div>
  );
}

export default App;

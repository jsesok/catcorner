import { useDispatch } from "react-redux";
import { changeSubredditName } from "../store";

function SubredditSideBar() {
  const dispatch = useDispatch();

  const handleSubredditClick = (e) => {
    const clickedSubreddit = e.target.textContent;
    dispatch(changeSubredditName(clickedSubreddit));
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="row">
        <div className="col-6 col-md-12 col-lg-12">
          <ul className="list-unstyled subreddit-list fw-medium" style={{ marginBottom: 0 }}>
            <li className="h-background subreddit-item" onClick={handleSubredditClick}>CatAdvice</li>
            <li className="h-background subreddit-item" onClick={handleSubredditClick}>Catswithjobs</li>
            <li className="h-background subreddit-item" onClick={handleSubredditClick}>cats</li>
            <li className="h-background subreddit-item" onClick={handleSubredditClick}>catpics</li>
          </ul>
        </div>
        <div className="col-6 col-md-12 col-lg-12">
          <ul className="list-unstyled subreddit-list fw-medium">
            <li className="h-background subreddit-item" onClick={handleSubredditClick}>catsareliquid</li>
            <li className="h-background subreddit-item" onClick={handleSubredditClick}>CatTraining</li>
            <li className="h-background subreddit-item" onClick={handleSubredditClick}>CatsBeingCats</li>
            <li className="h-background subreddit-item" onClick={handleSubredditClick}>StartledCats</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SubredditSideBar;

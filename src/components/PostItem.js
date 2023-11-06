import { useDispatch, useSelector } from "react-redux";
import { changeSubredditName } from "../store";
import CommentsList from "./CommentsList";
import he from "he"; 
import { expandPost, collapsePost } from "../store";
import { BsArrowDownUp } from "react-icons/bs";

function PostItem({ post }) {
  const dispatch = useDispatch();

  const expandedOrCollapsedPost = useSelector(
    (state) => state.posts.expandedOrCollapsedPostings
  );

  const handleChangeSubreddit = (e) => {
    const clickedSubreddit = e.target.textContent;
    dispatch(changeSubredditName(clickedSubreddit));
  };

  const postId = post.id;

  const showMedia = () => {
    if (post.hasOwnProperty("post_hint")) {
      if (post.is_video) {
        // then it's a Reddit video
        return (
          <div className="container custom-max-width mx-auto">
            <video
              controls
              volume={1}
            >
              <source
                src={post.media.reddit_video.fallback_url}
                type="video/mp4"
              />
            </video>
          </div>
        );
      } else if (post.post_hint === "image") {
        return (
          <img
            className="container custom-max-width mx-auto"
            src={post.url}
            alt={post.title}
          />
        );
      } else if (post.post_hint === "link") {
        return (
          <a href={post.url} target="_blank" rel="noreferrer" className="container custom-max-width-link mx-auto">
            {post.url}
          </a>
        );
      }
    } else if (post.hasOwnProperty("secure_media_embed")) {
      if (post.secure_media_embed.hasOwnProperty("media_domain_url")) {
        return (
          // YT video
          <iframe
            width={post.secure_media_embed.width + 3}
            height={post.secure_media_embed.height + 4}
            src={post.secure_media_embed.media_domain_url}
            title={post.title}
            allowFullScreen
          ></iframe>
        );
      }
    } else {
      return (
        <a href={post.url} target="_blank" rel="noreferrer">
          {post.url}
        </a>
      );
    }
  };

  return (
    <div>
      <li className="card p-4 my-4">
        <h3 className="card-title fw-normal">{he.decode(post.title)}</h3>
        <div className="post-info d-flex flex-row flex-wrap">
          <div className="fw-semibold pe-4" onClick={handleChangeSubreddit}>
            {post.subreddit}
          </div>
          <div className="fw-semibold pe-4">{post.author}</div>
          <div className="fw-semibold pe-4">
            <BsArrowDownUp size={14}/>
            {post.score}
          </div>
        </div>
        {post.hasOwnProperty("selftext") ? (
          <div className="card-text py-2">
            {expandedOrCollapsedPost[postId] ? (
              <>
                <div>{post.selftext}</div>
                <button
                  className="rounded-pill btn btn-outline-secondary btn-sm my-2"
                  onClick={() => dispatch(collapsePost(postId))}
                >
                  Read less
                </button>
              </>
            ) : (
              <div>
                {post.selftext.slice(0, 500)}
                {post.selftext.length > 500 && (
                  <>
                    <span>...</span>
                    <button
                      className="rounded-pill btn btn-outline-secondary btn-sm mx-2"
                      onClick={() => dispatch(expandPost(postId))}
                    >
                      Read more
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          ""
        )}
        <div className="d-flex justify-content-center media-container">
          {showMedia()}
        </div>
        {<CommentsList postId={postId} />}
      </li>
    </div>
  );
}

export default PostItem;

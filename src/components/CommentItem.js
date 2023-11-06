import he from "he";

function CommentItem({ comment }) {
  const hasReplies = comment.replies && comment.replies.data && comment.replies.data.children.length > 0;

  return (
    <div>
      <div className="card my-2 comment-background no-border p-2">
        <div className="fw-semibold">{comment.author}</div>
        {comment.body && he.decode(comment.body)}
      </div>
      {hasReplies && (
        <ul>
          {comment.replies.data.children.map((reply) => (
            <CommentItem comment={reply.data} key={reply.data.id} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default CommentItem;

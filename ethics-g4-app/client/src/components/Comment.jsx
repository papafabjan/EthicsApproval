import React, { useState } from 'react';

function Comment({ fieldName, comment, onCommentSave }) {
  const [isEditing, setEditing] = useState(false);
  const [localComment, setLocalComment] = useState(comment || '');

  const handleCommentChange = (e) => {
    setLocalComment(e.target.value);
    onCommentSave(fieldName, e.target.value); // Update the comment in Formik in real-time
  };

  const handleCommentSave = () => {
    setEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            name={`comment-${fieldName}`}
            className="form-control"
            placeholder="Leave your comment here"
            value={localComment}
            onChange={handleCommentChange}
          />
          <button onClick={handleCommentSave}>Save</button>
        </div>
      ) : (
        <button onClick={() => setEditing(true)}>Comment</button>
      )}
    </div>
  );
}

export default Comment;

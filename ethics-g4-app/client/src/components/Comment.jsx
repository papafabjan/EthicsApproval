import React from 'react'

function Comment() {
  return (
    <div>
      <label>
        <input
          type="text"
          name="comment"
          className="form-control"
          placeholder="Leave your comment here"
          value={formik.values.firstName}
        />
      </label>
    </div>
  );
}

export default Comment
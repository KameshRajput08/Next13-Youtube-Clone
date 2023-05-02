import React from "react";
import getComments from "@/app/actions/getComment";
import ClientOnly from "../ClientOnly";
import Comment from "./Comment.client";
import SingleComment from "./SingleComment";

const Comments = async ({ id, currentUser }) => {
  const comments = await getComments(id);
  return (
    <div>
      <Comment currentUser={currentUser} id={id} />
      {comments.map((comment) => (
        <SingleComment key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;

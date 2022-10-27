import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { __addComment } from "../../redux/modules/commentSlice";

const AddComment = () => {
  const id = useParams();
  const dispatch = useDispatch();
  const ids = localStorage.getItem("loginId");
  const [commentInput, setCommentInput] = useState({
    postId: id.postId,
    comment: "",
  });

  const onAddCommentHandler = (commentInput) => {
    dispatch(__addComment(commentInput));
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onAddCommentHandler(commentInput);
        }}
      >
        {ids}&nbsp;&nbsp;&nbsp;
        <input
          type="text"
          onChange={(event) => {
            const { value } = event.target;
            setCommentInput({
              ...commentInput,
              comment: value,
            });
          }}
        />
        &nbsp;&nbsp;&nbsp;
        <button>작성</button>
      </form>
    </div>
  );
};

export default AddComment;

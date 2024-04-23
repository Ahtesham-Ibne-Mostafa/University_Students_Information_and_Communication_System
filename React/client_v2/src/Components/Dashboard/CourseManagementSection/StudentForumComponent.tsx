import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineSwapRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import UserInfo from "../UserInfo";

interface Forum {
  id: number;
  username: string;
  post_title: string;
  post_details: string;
}

function StudentForumComponent() {
  const userInfoString = localStorage.getItem("userInfo");
  let userInfo: UserInfo;

  if (userInfoString) {
    console.log(`USERINFOString IS ${userInfoString}`);
    userInfo = JSON.parse(userInfoString);
    console.log(`USERINFO IS ${userInfo.id}`);
  } else {
    console.log("FAILED TO RETRIEVE");
    return <h1> You are not logged in </h1>;
  }

  const [forums, setForums] = useState<Forum[]>([]);

  // Comment and Reply comment state
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [commentingPostId, setCommentingPostId] = useState<number | null>(null);
  const [replyingCommentId, setReplyingCommentId] = useState<number | null>(
    null
  );
  const userId = userInfo.id;

  const fetchData = async () => {
    try {
      const response = await axios.get<Forum[]>("http://localhost:3002/forum");
      setForums(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // handle comment
  const handleCommentSubmit = async (postId: number) => {
    try {
      await axios.post(`http://localhost:3002/forum/${postId}/comments`, {
        userId,
        commentText,
      });
      // Refresh forums after successful comment submission
      fetchData();
      // Clear comment text
      setCommentText("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  // handle reply comment
  const handleReplySubmit = async (postId: number, commentId: number) => {
    try {
      await axios.post(
        `http://localhost:3002/forum/${postId}/comments/${commentId}/replies`,
        {
          userId,
          replyText,
        }
      );
      // Refresh forums after successful reply submission
      fetchData();
      // Clear reply text
      setReplyText("");
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mainContent">
      <Link to={"/dashboard/add-forum"}>
        <button type="submit" className="btn mb-4">
          <span>Create post</span>
          <AiOutlineSwapRight className="icon" />
        </button>
      </Link>
      <div className="row">
        {forums.map((forum) => (
          <div key={forum.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{forum.post_title}</h5>
                <p className="card-text">Posted by {forum.username}</p>
                <p className="card-text">Details</p>
                <p className="card-text">{forum.post_details}</p>

                {/* Comment form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCommentSubmit(forum.id);
                  }}
                >
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add a comment"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Comment
                  </button>
                </form>

                {/* Reply form */}
                {commentingPostId === forum.id && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleReplySubmit(forum.id, replyingCommentId!);
                    }}
                  >
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Reply to comment"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Reply
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default StudentForumComponent;

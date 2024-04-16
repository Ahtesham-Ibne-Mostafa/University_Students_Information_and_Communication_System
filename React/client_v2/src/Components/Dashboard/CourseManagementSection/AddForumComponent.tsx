import { AiOutlineSwapRight } from "react-icons/ai";
import UserInfo from "../UserInfo";
import { useEffect, useState } from "react";
import axios from "axios";

enum ForumDataStatus {
  InitialStatus,
  Added,
  Empty,
  Failed
}

function AddForumComponent() {
  const userInfoString = localStorage.getItem('userInfo');

  var userInfo: UserInfo;

  if (userInfoString) {

    console.log(`USERINFOString IS ${userInfoString}`);
    userInfo = JSON.parse(userInfoString);
    console.log(`USERINFO IS ${userInfo.id}`);
  } else {
    console.log("FAILED TO RETRIEVE");

    return (
      <h1> You are not logged in </h1>
    );
  }

  const [postTitle, setPostTitle] = useState("");
  const [postDetails, setPostDetails] = useState("");
  const [forumDataStatus, setForumDataStatus] = useState(ForumDataStatus.InitialStatus);
  const userID = userInfo.id;

  const addPostSubmit = () => {
    if (postDetails === '' || postTitle === '') {
      setForumDataStatus(ForumDataStatus.Empty);
    } else {
      console.log(`INFO ${postTitle} ${postDetails}`);
      axios.post('http://localhost:3002/forum', {
        userID, postTitle, postDetails
      }).then((response) => {
        console.log(`RESPONSE %o`, response);
        if (response.status === 200) {
          console.log("Added successfully");
          setForumDataStatus(ForumDataStatus.Added);
        } else {
          console.log("Failed");

          setForumDataStatus(ForumDataStatus.Failed);
        }
        // Go back after the action is done
        history.back();
      })
    }
  }

  const showAlert = () => {
    if (forumDataStatus == ForumDataStatus.Added) {
      alert('Post created successfully');
    } else if (forumDataStatus == ForumDataStatus.Failed) {
      alert('Something went wrong');
    } else if (forumDataStatus == ForumDataStatus.Empty) {
      alert('Fillup the required fields');
    }
  };

  useEffect(() => {
    if (forumDataStatus == ForumDataStatus.Added) {
      // reset everything
      setPostTitle("")
      setPostDetails("")
    }
    showAlert();
    setForumDataStatus(ForumDataStatus.InitialStatus);
  }, [forumDataStatus])
  return (
    <div>
      <h1>
        Create post
      </h1>

      <div className="inputDiv">
        <div className="input flex">
          <input type="text" placeholder='Enter post title'
            value={postTitle}
            onChange={(event) => setPostTitle(event.target.value)} />
        </div>
      </div>
      <div className="input flex">
        <input type="text" placeholder='Enter post details'
          value={postDetails}
          onChange={(event) => setPostDetails(event.target.value)} />
      </div>
      <button type='submit' className='btn flex' onClick={addPostSubmit}>
        <span>Submit</span>
        <AiOutlineSwapRight className="icon" />
      </button>
    </div>
  )
}

export default AddForumComponent;

import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineSwapRight } from "react-icons/ai";
import { Link } from "react-router-dom";

interface Forum {
  id: number;
  username: string;
  post_title: string;
  post_details: string;
}

function StudentForumComponent() {
  const [forums, setForums] = useState<Forum[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get<Forum[]>("http://localhost:3002/forum");
      setForums(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mainContent">
      <Link to={'/dashboard/add-forum'}>
        <button type='submit' className='btn mb-4'>
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default StudentForumComponent;

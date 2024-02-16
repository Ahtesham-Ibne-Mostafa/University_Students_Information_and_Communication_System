import React from 'react'
import './listing.css'
import { BsArrowRightShort } from 'react-icons/bs'
import img from '../../../../Assets/images (1).png'
import img1 from '../../../../Assets/image2.png'
import img2 from '../../../../Assets/image3.png'
import img3 from '../../../../Assets/image4.png'
import user1 from '../../../../Assets/mrm.jpg'
import user2 from '../../../../Assets/mrm.jpg'
import user3 from '../../../../Assets/mrm.jpg'
import user4 from '../../../../Assets/mrm.jpg'

const Listing = () => {
  return (
    <div className="lisitingSection">
      <div className="heading flex">
        <h1>Courses</h1>
        <button className="btn flex">
          See All <BsArrowRightShort className="icon" />
        </button>
      </div>

      <div className="secContainer flex">
        <div className="singleItem">

          <img src={img} alt="Image Name" />
          <h3>CSE110</h3>
        </div>

        <div className="singleItem">

          <img src={img1} alt="Image Name" />
          <h3>CSE111</h3>
        </div>

        <div className="singleItem">

          <img src={img2} alt="Image Name" />
          <h3>CSE220</h3>
        </div>

        <div className="singleItem">

          <img src={img3} alt="Image Name" />
          <h3>CSE221</h3>
        </div>
      </div>

      <div className="sellers flex">
        <div className="topSellers">
          <div className="heading flex">
            <h3>Top Blood Doners</h3>
            <button className="btn flex">
              See All <BsArrowRightShort className="icon" />
            </button>
          </div>

          <div className="card flex">
            <div className="users">
              <img src={user1} alt="User Image" />
              <img src={user2} alt="User Image" />
              <img src={user3} alt="User Image" />
              <img src={user4} alt="User Image" />
            </div>
            <div className="cardText">
              <span>
                25 Bag Blood Donated <br />
                <small>
                  10 Doners <span className="date">5 Months</span>
                </small>
              </span>
            </div>
          </div>
        </div>

        <div className="featuredSellers">
          <div className="heading flex">
            <h3>Top Faculties</h3>
            <button className="btn flex">
              See All <BsArrowRightShort className="icon" />
            </button>
          </div>

          <div className="card flex">
            <div className="users">
              <img src={user3} alt="User Image" />
              <img src={user1} alt="User Image" />
              <img src={user4} alt="User Image" />
              <img src={user2} alt="User Image" />
            </div>
            <div className="cardText">
              <span>
                500 Papers Published <br />
                <small>
                  5 Faculties <span className="date">1 Year</span>
                </small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Listing
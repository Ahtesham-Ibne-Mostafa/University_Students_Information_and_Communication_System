import React from 'react'
import './top.css'
import { BsArrowRightShort, BsQuestionCircle } from 'react-icons/bs'
import img2 from '../../../../Assets/images (2).png'
import image from '../../../../Assets/vid.jpg'

const Top = () => {
  return (
    <div className="topSection">
      <div className="headerSection flex">
        <div className="title">
          <h1>Welcome to Hamas University</h1>
          <p>Hello Admin, Welcome back!</p>
        </div>

      </div>

      <div className="cardSection flex">
        <div className="rightCard flex">
          <p>Greatest University of all time !!</p>

          <div className="imageDiv">
            <img src={image} alt="Image description" />
          </div>

        </div>

        <div className="leftCard flex">
          <div className="main flex">

            <div className="textDiv">
              <h1>Current Stats</h1>

              <div className="flex">
                <span>
                  Current Students <br /> <small>100</small>
                </span>
                <span>
                  Total Courses <br /> <small>4</small>
                </span>
              </div>

              <span className="flex link">
                Add or Remove Students <BsArrowRightShort className="icon" />
              </span>
            </div>

            <div className="imgDiv">
              <img src={img2} alt="Image Name" />
            </div>
            {/* We Shall use this card later */}
            <div className="sideBarCard">
              <BsQuestionCircle className="icon" />
              <div className="cardContent">
                <div className="circle1"></div>
                <div className="circle2"></div>

                <h3>Help Center</h3>
                <p>Having trouble in Planti, please contact us from for more questions.</p>
                <button className="btn">Go to help center</button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Top
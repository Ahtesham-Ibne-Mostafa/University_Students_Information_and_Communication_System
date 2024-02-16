import React from 'react'
import './activity.css'
import { BsArrowRightShort } from 'react-icons/bs'
import user from '../../../../Assets/mrm.jpg'
import user1 from '../../../../Assets/mrm.jpg'
import user2 from '../../../../Assets/mrm.jpg'
import user3 from '../../../../Assets/mrm.jpg'
import user4 from '../../../../Assets/mrm.jpg'

const Activity = () => {
  return (
    <div className="activitySection">
      <div className="heading flex">
        <h1>Current Faculties</h1>
        <button className="btn flex">
          See All
          <BsArrowRightShort className="icon" />
        </button>
      </div>

      <div className="secContainer grid">
        <div className="singleCustomer flex">
          <img src={user} alt="Customer Image" />
          <div className="customerDetails">
            <span className="name">Mohammad Rakibul Hasan Mahin</span>
            <small>Current Faculty of CSE470</small>
          </div>

        </div>

        <div className="singleCustomer flex">
          <img src={user1} alt="Customer Image" />
          <div className="customerDetails">
            <span className="name">Mark Jokerberk</span>
            <small>Current Faculty of CSE110</small>
          </div>

        </div>

        <div className="singleCustomer flex">
          <img src={user2} alt="Customer Image" />
          <div className="customerDetails">
            <span className="name">Bill Gates</span>
            <small>Current Faculty of CSE111</small>
          </div>

        </div>

        <div className="singleCustomer flex">
          <img src={user3} alt="Customer Image" />
          <div className="customerDetails">
            <span className="name">Elon Mask</span>
            <small>Current Faculty of CSE220</small>
          </div>

        </div>
        <div className="singleCustomer flex">
          <img src={user4} alt="Customer Image" />
          <div className="customerDetails">
            <span className="name">Vincent Chang</span>
            <small>Current Faculty of CSE221</small>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Activity
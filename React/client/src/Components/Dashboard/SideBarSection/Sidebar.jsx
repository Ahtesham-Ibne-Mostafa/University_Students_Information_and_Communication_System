import React from 'react'
import './sidebar.css'
import logo from '../../../Assets/logo.png'

const Sidebar = () => {
  return (
    <div className='sideBar grid'>

      <div className="logoDiv flex">
        <img src={logo} alt="Logo" />
        <h2>USICS</h2>
      </div>

      <div className="menuDiv">
        <h3 className="divTitle">
          QUICK MENU
        </h3>
        <ul className="menuLists grid">

          <li className="listItem">
            <a href="#" className="menuLink flex">

              <span className="smallText">
                Depertment
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex">

              <span className="smallText">
                Session
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex">

              <span className="smallText">
                Semester
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex">

              <span className="smallText">
                Student Forum
              </span>
            </a>
          </li>
          <li className="listItem">
            <a href="#" className="menuLink flex">

              <span className="smallText">
                Blood Donation
              </span>
            </a>
          </li>
        </ul>
      </div>


      <div className="settingsDiv">
        <h3 className="divTitle">
          SETTINGS
        </h3>
        <ul className="menuLists grid">

          <li className="listItem">
            <a href="#" className="menuLink flex">

              <span className="smallText">
                Students
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex">

              <span className="smallText">
                Edit Profile
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex">

              <span className="smallText">
                Change Password
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex">

              <span className="smallText">
                News
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="/" className="menuLink flex">

              <span className="smallText">
                Log Out
              </span>
            </a>
          </li>
        </ul>
      </div>


    </div>
  )
}

export default Sidebar
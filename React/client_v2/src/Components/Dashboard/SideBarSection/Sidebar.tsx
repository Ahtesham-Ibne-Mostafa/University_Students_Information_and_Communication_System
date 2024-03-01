import logo from "../../../Assets/logo.png";
import DashBoardSections from "../DashBoardSections";
import SideBarListTitle from "./SideBarListTitle";
import "./sidebar.css";

interface Props {
  sideBarOnClicked: (id: DashBoardSections) => void;
  selectedSection: DashBoardSections;
}

const Sidebar = ({ sideBarOnClicked, selectedSection }: Props) => {
  return (
    <div className="sideBar grid">
      <div className="logoDiv flex">
        <img src={logo} alt="Logo" />
        <h2>USICS</h2>
      </div>

      <div className="menuDiv">
        <h3 className="divTitle">QUICK MENU</h3>
        <ul className="menuLists grid">
          <li className="listItem">
            <a
              href="#"
              className="menuLink flex"
              onClick={() => {
                sideBarOnClicked(DashBoardSections.Department);
              }}
            >
              <SideBarListTitle
                title={"Department"}
                isSelected={selectedSection === DashBoardSections.Department}
              />
            </a>
          </li>

          <li className="listItem">
            <a
              href="#"
              className="menuLink flex"
              onClick={() => {
                sideBarOnClicked(DashBoardSections.Session);
              }}
            >
              <SideBarListTitle
                title={"Session"}
                isSelected={selectedSection === DashBoardSections.Session}
              />
            </a>
          </li>

          <li className="listItem">
            <a
              href="#"
              className="menuLink flex"
              onClick={() => {
                sideBarOnClicked(DashBoardSections.Semester);
              }}
            >
              <SideBarListTitle
                title={"Semester"}
                isSelected={selectedSection === DashBoardSections.Semester}
              />
            </a>
          </li>

          <li className="listItem">
            <a
              href="#"
              className="menuLink flex"
              onClick={() => {
                sideBarOnClicked(DashBoardSections.StudentForum);
              }}
            >
              <SideBarListTitle
                title={"Student Forum"}
                isSelected={selectedSection === DashBoardSections.StudentForum}
              />
            </a>
          </li>
          <li className="listItem" id="bloodDonation">
            <a
              href="#"
              className="menuLink flex"
              onClick={() => {
                sideBarOnClicked(DashBoardSections.BloodDonation);
              }}
            >
              <SideBarListTitle
                title={"Blood Donation"}
                isSelected={selectedSection === DashBoardSections.BloodDonation}
              />
            </a>
          </li>
          <li className="listItem" id="searchDonar">
            <a
              href="#"
              className="menuLink flex"
              onClick={() => {
                sideBarOnClicked(DashBoardSections.SearchDonar);
              }}
            >
              <SideBarListTitle
                title={"Blood Donars"}
                isSelected={selectedSection === DashBoardSections.SearchDonar}
              />
            </a>
          </li>
        </ul>
      </div>

      <div className="settingsDiv">
        <h3 className="divTitle">SETTINGS</h3>
        <ul className="menuLists grid">
          <li className="listItem">
            <a href="#" className="menuLink flex">
              <span className="smallText">Students</span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex">
              <span className="smallText">Edit Profile</span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex">
              <span className="smallText">Change Password</span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex">
              <span className="smallText">News</span>
            </a>
          </li>

          <li className="listItem">
            <a href="/" className="menuLink flex">
              <span className="smallText">Log Out</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

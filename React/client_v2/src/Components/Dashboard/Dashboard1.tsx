import { useState } from "react";
import "../../App.css";
import Body from "../Dashboard/BodySection/Body";
import BloodDonation from "./BloodDonationSection/BloodDonation";
import SearchDonar from "./BloodDonationSection/SearchDonar";
import DashBoardSections from "./DashBoardSections";
import Sidebar from "./SideBarSection/Sidebar1";
import CourseManagement from "./CourseManagementSection/CourseManagement";
import UserInfo from "./UserInfo";
import StudentForumComponent from "./CourseManagementSection/StudentForumComponent";

interface Props {
  section: DashBoardSections;
  isAdmin: boolean;
  userID: number;

}


const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState(
    DashBoardSections.Department
  );
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

  return (
    <div className="dashboard flex">
      <div className="dashboardContainer flex">
        <Sidebar
          sideBarOnClicked={(section) => {
            console.log(`Section is ${section}`);
            setSelectedSection(section);
          }}
          selectedSection={selectedSection}
        />

        <RenderBody section={selectedSection} userID={userInfo.id} isAdmin={userInfo.username == 'admin'} />
      </div>
    </div>
  );
};

function RenderBody({ section, isAdmin, userID }: Props) {
  switch (section) {
    case DashBoardSections.Department:
      return <Body />;
    case DashBoardSections.BloodDonation:
      return <BloodDonation />;
    case DashBoardSections.SearchDonar:
      return <SearchDonar />;

    case DashBoardSections.CourseManagement:
      return <CourseManagement isAdmin={isAdmin} userID={userID} />;
    case DashBoardSections.StudentForum:
      return <StudentForumComponent />
    default:
      return <Body />;
  }
}

export default Dashboard;

import { useState } from "react";
import "../../App.css";
import Body from "../Dashboard/BodySection/Body";
import BloodDonation from "./BloodDonationSection/BloodDonation";
import SearchDonar from "./BloodDonationSection/SearchDonar";
import DashBoardSections from "./DashBoardSections";
import Sidebar from "./SideBarSection/Sidebar";
import CourseManagement from "./CourseManagementSection/CourseManagement";
import UserInfo from "./UserInfo";

interface Props {
    section: DashBoardSections;
    isAdmin: boolean;
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

                <RenderBody section={selectedSection} isAdmin={userInfo.username == 'admin'} />
            </div>
        </div>
    );
};

function RenderBody({ section, isAdmin }: Props) {
    switch (section) {
        case DashBoardSections.Department:
            return <Body />;
        case DashBoardSections.BloodDonation:
            return <BloodDonation />;
        case DashBoardSections.SearchDonar:
            return <SearchDonar />;

        case DashBoardSections.CourseManagement:
            return <CourseManagement isAdmin={isAdmin}/>;
        default:
            return <Body />;
    }
}

export default Dashboard;

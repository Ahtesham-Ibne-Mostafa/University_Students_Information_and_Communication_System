import '../../App.css'
import Sidebar from './SideBarSection/Sidebar'
import DashBoardSections from './DashBoardSections'
import Body from '../Dashboard/BodySection/Body'
import BloodDonation from './BloodDonationSection/BloodDonation'
import { useState } from 'react'

interface Props {
    section: DashBoardSections
}
const Dashboard = () => {
    const [selectedSection, setSelectedSection] = useState(DashBoardSections.Department);

    return (
        <div className="dashboard flex">
            <div className="dashboardContainer flex">
                <Sidebar sideBarOnClicked={(section) => {
                    console.log(`Section is ${section}`)
                    setSelectedSection(section)
                }} selectedSection={selectedSection} />

                <RenderBody section={selectedSection} />
            </div>
        </div>
    );
}

function RenderBody({ section }: Props) {
    switch (section) {
        case DashBoardSections.Department:
            return <Body />;
        case DashBoardSections.BloodDonation:
            return <BloodDonation />;
        default:
            return <Body />;
    }
}

export default Dashboard

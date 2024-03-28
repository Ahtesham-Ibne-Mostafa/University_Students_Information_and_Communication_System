import { AiOutlineSwapRight } from "react-icons/ai";
import ViewCoursesComponent from "./ViewCoursesComponent";
import { Link } from "react-router-dom";

interface Props {
    isAdmin: boolean;
}

function CourseManagement({ isAdmin }: Props) {



    // const addButtonTapped = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     console.log(e);
    // }
    //
    // const deleteButtonTapped = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     console.log(e);
    // }
    //
    // return (
    //     <div className="px-4">
    //         <h1>
    //             Course management
    //         </h1>
    //
    //         <div>
    //             <Link to={'/dashboard/delete-course'}>
    //
    //                 <button type='submit' className='btn flex'>
    //                     <span>Delete course</span>
    //                     <AiOutlineSwapRight className="icon" />
    //                 </button>
    //             </Link>
    //         </div>
    //
    //         <div>
    //             <Link to={'/dashboard/add-course'}>
    //
    //                 <button type='submit' className='btn flex'>
    //                     <span>Add course</span>
    //                     <AiOutlineSwapRight className="icon" />
    //                 </button>
    //             </Link>
    //         </div>
    //
    //     </div >
    // );
    return (
        <div className="container">

            <div className="row">

                {
                    isAdmin &&
                    <Link to={'/dashboard/add-course'}>

                        <button type='submit' className='btn mb-4'>
                            <span>Add course</span>
                            <AiOutlineSwapRight className="icon" />
                        </button>
                    </Link>
                }

                <ViewCoursesComponent isAdmin={isAdmin} />
            </div>
        </div>
    );
}

export default CourseManagement;

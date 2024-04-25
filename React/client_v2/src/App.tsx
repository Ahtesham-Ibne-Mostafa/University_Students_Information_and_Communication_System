import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Dashboard1 from './Components/Dashboard/Dashboard1';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import AddCourseComponent from './Components/Dashboard/CourseManagementSection/AddCourseComponent';
import EditCourseComponent from './Components/Dashboard/CourseManagementSection/EditCourseComponent';
import AddForumComponent from './Components/Dashboard/CourseManagementSection/AddForumComponent';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Login /></div>
  },
  {
    path: '/register',
    element: <div><Register /></div>
  },
  {
    path: '/dashboard',
    element: <div><Dashboard /></div>
  },
  {
    path: '/dashboard1',
    element: <div><Dashboard1 /></div>
  },
  {
    path: '/dashboard/add-course',
    element: <div><AddCourseComponent /></div>
  },

  {
    path: '/dashboard/edit-course',
    element: <div><EditCourseComponent /></div>
  },
  {
    path: '/dashboard/add-forum',
    element: <div><AddForumComponent /></div>
  }
])

function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

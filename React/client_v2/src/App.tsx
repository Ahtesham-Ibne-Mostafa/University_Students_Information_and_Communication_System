import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import AddCourseComponent from './Components/Dashboard/CourseManagementSection/AddCourseComponent';
import EditCourseComponent from './Components/Dashboard/CourseManagementSection/EditCourseComponent';

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
    path: '/dashboard/add-course',
    element: <div><AddCourseComponent /></div>
  },

  {
    path: '/dashboard/edit-course',
    element: <div><EditCourseComponent /></div>
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

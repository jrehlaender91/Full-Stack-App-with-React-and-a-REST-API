import { Route, Routes } from "react-router-dom";

//App components
import Header from './components/Header';

import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound'

import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut.jsx';

const App = () => {

  return (
    <div className="root">
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="signup" element={<UserSignUp />} />
        <Route path="signin" element={<UserSignIn />} />
        <Route path="signout" element={<UserSignOut />} />
        <Route path="courses/create" element={<CreateCourse />} />
        <Route path="courses/:id" element={<CourseDetail />} />
        <Route path="courses/:id/update" element={<UpdateCourse />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App

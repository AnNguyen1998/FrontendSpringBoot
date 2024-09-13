import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import HeaderPage from "./pages/home/HomePage";
import StudentPage from "./pages/students/StudentPage";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddStudentPage from './pages/addStudents/AddStudentPage';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HeaderPage/>}></Route>
          <Route path='/student' element={<StudentPage/>}></Route>
          <Route path='/addstudent' element={<AddStudentPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

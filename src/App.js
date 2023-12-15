import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
import "./Layout/Layout.scss";
import StudentHomePage from "./pages/Student/StudentHomePage";
import StudentCreatePage from "./pages/Student/StudentCreatePage";
import StudentEditPage from "./pages/Student/StudentEditPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useSelector } from "react-redux";
function App() {
  const search = useSelector(state => state.studentReducer);
  // console.log("Giá trị là: ",search);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/student" />} />
          <Route path="/student" element={<StudentHomePage />} />
          <Route path="/student/create" element={<StudentCreatePage />} />
          <Route path="/student/:id/edit" element={<StudentEditPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

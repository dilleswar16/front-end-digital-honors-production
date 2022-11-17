import "./App.css";
import AdminLogin from "./components/Admin/AdminLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import UserLogin from "./components/User/UserLogin";
import AllEmployeeDetailsForAdmin from "./components/Admin/AllEmployeeDetailsForAdmin";
import ViewIndividualEmployeeDetails from "./components/ViewIndividualEmployeeDetails";
import ForgotPassword from "./components/ForgotPassword";
import AddEmployeeDetails from "./components/Admin/AddEmployeeDetails";
import UpdateEmployeeDetails from "./components/UpdateEmployeeDetails";
import CheckLocalStorage from "./components/CheckLocalStorage";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/homepage" element={<Homepage />} />
        <Route exact path="/adminlogin" element={<AdminLogin />} />
        <Route exact path="/login" element={<UserLogin />} />
        <Route
          exact
          path="/allemployeedetails"
          element={
            <CheckLocalStorage>
              <AllEmployeeDetailsForAdmin />
            </CheckLocalStorage>
          }
        />
        <Route
          exact
          path="/employee/view/:employeeId"
          element={
            <CheckLocalStorage>
              <ViewIndividualEmployeeDetails />
            </CheckLocalStorage>
          }
        />
        <Route exact path="/addEmployee" element={<AddEmployeeDetails />} />
        <Route
          exact
          path="/employee/update/:employeeId"
          element={
            <CheckLocalStorage>
              <UpdateEmployeeDetails />
            </CheckLocalStorage>
          }
        />
        <Route exact path="/employee/add" element={<AddEmployeeDetails />} />
        <Route exact path="/forgot/password" element={<ForgotPassword />} />
        <Route exact path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

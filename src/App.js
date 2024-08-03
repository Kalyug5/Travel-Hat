import "./App.css";
import Login from "./app/Authentication/Login";
import Signup from "./app/Authentication/Signup";
import DashBoard from "./app/components/dashboard/DashBoard";
import Header from "./app/components/Home/Header";
import Home from "./app/components/Home/Home";
import ItineraryPage from "./app/components/Itinerary/ItineraryPage";
import Travel from "./app/components/Itinerary/Travel";
import Todo from "./app/components/todo/Todo";
import TodoContainer from "./app/components/todo/TodoContainer";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import ProtectedRoutes from "./app/container/ProtectedRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="todo" element={<TodoContainer />} />
            <Route path="travel" element={<Travel />} />
            <Route
              path="todo/:id"
              element={
                <ProtectedRoutes>
                  <Todo />
                </ProtectedRoutes>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route
              path="trip/:id"
              element={
                <ProtectedRoutes>
                  <ItineraryPage />
                </ProtectedRoutes>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;

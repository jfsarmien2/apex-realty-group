import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Signin />} path="/sign-in" />
        <Route element={<Signup />} path="/sign-up" />
        <Route element={<About />} path="/about" />
        <Route element={<PrivateRoute />}>
          <Route element={<Profile />} path="/profile" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/authentication/Login";
import { SignUp } from "./components/authentication/SignUp";
import { Feedback } from "./components/Feedback/Feedback";
import QuickFeedbacks from "./components/Feedback/QuickFeedbacks";

function App() {
  return (
    <>
      {/* <SignUp/> */}
      {/* <Login/> */}
      {/* <Feedback/> */}
      <Routes>
        <Route path="/" element={<Feedback />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/quickFeedbacks" element={<QuickFeedbacks />} />
        {/* <Route path="/" element={<Navigate to={<Feedback/>}/>}/> */}
      </Routes>
    </>
  );
}

export default App;

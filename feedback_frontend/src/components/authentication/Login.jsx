import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { handleError, handleSuccess } from "../../../utils";
import { ToastContainer } from "react-toastify";
import Navbar from "../Navbar";
import Footer from "../footer";
export function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  async function handleLogin(event) {
    event.preventDefault();
    const { email, password } = loginData;
    if (!email || !password) {
      return handleError("All fields are required");
    }
    try {
      const url = "http://localhost:8080/login";
      console.log("Sending data:", loginData);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      const { success, message, jwtToken, username, error } = data;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", username);
        setTimeout(() => {
          navigate("/");
        }, 600);
        setSignUpData({
          username: "",
          email: "",
          password: "",
        });
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      // console.log("Response from backend:", data);
      // console.log(data);
    } catch (error) {
      handleError(error);
    }
  }

  function handleOnChange(event) {
    const { name, value } = event.target;
    setLoginData((prevData) => {
      return { ...prevData, [name]: value };
    });
  }

  return (
    <>
      <Navbar />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="mb-3">Login</CardTitle>
          <CardDescription>
            By creating an account or logging in, you agree to Conditions of Use
            and Privacy Policy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <Input
              id="email"
              placeholder="Enter Email"
              name="email"
              value={loginData.email}
              onChange={handleOnChange}
            />
            <br></br>
            <Input
              id="password"
              placeholder="Enter password, min 8 char."
              name="password"
              value={loginData.password}
              onChange={handleOnChange}
            />
            <CardFooter className="flex justify-center flex-col py-4">
              <Button className="text-lg">Login</Button>
              <span
                style={{
                  color: "#334155",
                  marginTop: "10px",
                  fontSize: "14px",
                }}
              >
                Don't have an Account ? &nbsp;
                <Link to="/signup">signup</Link>
              </span>
            </CardFooter>
          </form>
        </CardContent>
        <ToastContainer />
      </Card>
      <Footer />
    </>
  );
}

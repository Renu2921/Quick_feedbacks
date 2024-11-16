import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../../utils";
import Navbar from "../Navbar";
import Footer from "../Footer";

export function SignUp() {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  async function handleSignup(event) {
    event.preventDefault();
    const { username, email, password } = signUpData;
    if (!username || !email || !password) {
      return handleError("All fields are required");
    }
    try {
      const url = "http://localhost:8080/signup";
      console.log("Sending data:", signUpData);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });
      const data = await response.json();
      const { success, message, error } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
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
      console.log("Response from backend:", data);
      console.log(data);
    } catch (error) {
      handleError(error);
    }
  }

  function handleOnChange(event) {
    const { name, value } = event.target;
    // console.log(name,value)
    setSignUpData((prevData) => {
      return { ...prevData, [name]: value };
    });
  }
  // console.log(signUpData)
  return (
    <>
    <Navbar/>
    <Card className="w-[370px]">
      <CardHeader>
        <CardTitle className="mb-3">SignUp</CardTitle>
        <CardDescription>
          By creating an account or logging in, you agree to Conditions of Use
          and Privacy Policy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <Input
            id="name"
            placeholder="Enter Username"
            value={signUpData.username}
            name="username"
            onChange={handleOnChange}
          />
          <br></br>

          <Input
            id="email"
            placeholder="Enter email"
            value={signUpData.email}
            name="email"
            onChange={handleOnChange}
          />
          <br></br>
          <Input
            type="password"
            id="password"
            placeholder="Enter password, min 8 char."
            value={signUpData.password}
            name="password"
            onChange={handleOnChange}
          />
          <CardFooter className="flex flex-col justify-center py-4">
            <Button type="submit">Create Account</Button>

            <span
              style={{ color: "#334155", marginTop: "10px", fontSize: "14px" }}
            >
              Already have an Account ? &nbsp;
              <Link to="/login">Login</Link>
            </span>
          </CardFooter>
        </form>
      </CardContent>
      <ToastContainer />
    </Card>
    <Footer/>
    </>
  );
}

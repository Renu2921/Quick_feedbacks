import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter, 

  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";


export function Login() {
    const [loginData, setLoginData]=useState({
       
        email:"",
        password:"",
    });

    function handleSubmit(event){
        event.preventDefault();
          setLoginData({
           
        email:"",
        password:"",
          })
    };

    function handleOnChange(event){
        const {name, value}=event.target;
      setLoginData((prevData)=>{
        return {...prevData, [name]:value}
      })
    }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="mb-3">Login</CardTitle>
        <CardDescription>
          By creating an account or logging in, you agree to Conditions of Use
          and Privacy Policy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          
         
          <Input id="email" placeholder="Enter Email"  name="email" value={loginData.email} onChange={handleOnChange} />
          <br></br>
          <Input id="password" placeholder="Enter password, min 8 char." name="password" value={loginData.password} onChange={handleOnChange}/>
          <CardFooter className="flex justify-center flex-col py-4">
        <Button className="text-lg">Login</Button>
        <span style={{color:"#334155", marginTop:"10px" , fontSize:"14px"}}>Create an Account ? &nbsp;
          <Link to="/signup">signup</Link>
        </span>
      </CardFooter>
        </form>
      </CardContent>
      
    </Card>
  );
}

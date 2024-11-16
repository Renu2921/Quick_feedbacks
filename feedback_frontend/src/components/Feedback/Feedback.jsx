import * as React from "react";
import { useState,useEffect } from "react";
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
import { Label } from "@/components/ui/label"
import Navbar from "../Navbar";
import Footer from "../footer";


export function Feedback() {
  const [loggerInUser, setLoggedInUser]=useState("");

   useEffect(()=>{
    setLoggedInUser(localStorage.getItem("loggedInUser"));
   },[]);

  const [feedback, setFeedback] = useState({
    title: "",
    description: "",
    rating: "2",
  });

  function handleSubmit(event) {
    event.preventDefault();
    setFeedback({
      title: "",
      description: "",
      rating: "",
    });
  }

  function handleOnChange(event) {
    const { name, value } = event.target;
    setFeedback((prevData) => {
      return { ...prevData, [name]: value };
    });
  }

  return (
  
    <div className=" ">
      <Navbar/>
    
    <div className="mx-2  ">
      {/* <h1>{loggedInUser}</h1> */}
    <Card className="w-[400px] bg-slate-400 " >
      <CardHeader>
        <CardTitle className="mb-3">Create Feedback</CardTitle>
        <CardDescription>Create your own thoughts!</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Input
            id="title"
            placeholder="Enter Title"
            name="title"
            value={feedback.title}
            onChange={handleOnChange}
          />
          <br></br>
          <textarea className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            id="description"
            placeholder="Enter Description "
            name="description"
            value={feedback.description}
            onChange={handleOnChange}
          ></textarea>
          <br></br>
          <br></br>
          <Label htmlFor="rating">Rating: </Label>
          <input className="w-[80%] border rounded" 
            type="range"
            id="rating"
            name="rating"
            min="1"
            max="5"
            step="1"
            value={feedback.rating}
            onChange={handleOnChange}
          />
          <CardFooter className="flex justify-center py-4">
            <Button className="text-lg">Submit Feedback</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
    <Footer/>
    </div>
    </div>
  );
}

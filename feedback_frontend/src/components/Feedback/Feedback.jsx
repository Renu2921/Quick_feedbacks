// import * as React from "react";
// import { useState,useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label"
// import Navbar from "../Navbar";
// import Footer from "../footer";
// import { ToastContainer } from "react-toastify";
// import { handleError, handleSuccess } from "../../../utils";


// export function Feedback() {
//   // const [loggerInUser, setLoggedInUser]=useState("");

//   //  useEffect(()=>{
//   //   setLoggedInUser(localStorage.getItem("loggedInUser"));
//   //  },[]);

//   const [feedback, setFeedback] = useState({
//     title: "",
//     description: "",
//     rating: "2",
//   });

//   function handleSubmit(event) {
//     event.preventDefault();
//     setFeedback({
//       title: "",
//       description: "",
//       rating: "",
//     });
//   }

//   function handleOnChange(event) {
//     const { name, value } = event.target;
//     setFeedback((prevData) => {
//       return { ...prevData, [name]: value };
//     });
//   }

//   return (
  
//     <div className=" ">
//       <Navbar/>
    
//     <div className="mx-2  ">
//       {/* <h1>{loggedInUser}</h1> */}
//     <Card className="w-[400px] bg-slate-400 " >
//       <CardHeader>
//         <CardTitle className="mb-3">Create Feedback</CardTitle>
//         <CardDescription>Create your own thoughts!</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit}>
//           <Input
//             id="title"
//             placeholder="Enter Title"
//             name="title"
//             value={feedback.title}
//             onChange={handleOnChange}
//           />
//           <br></br>
//           <textarea className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             id="description"
//             placeholder="Enter Description "
//             name="description"
//             value={feedback.description}
//             onChange={handleOnChange}
//           ></textarea>
//           <br></br>
//           <br></br>
//           <Label htmlFor="rating">Rating: </Label>
//           <input className="w-[80%] border rounded" 
//             type="range"
//             id="rating"
//             name="rating"
//             min="1"
//             max="5"
//             step="1"
//             value={feedback.rating}
//             onChange={handleOnChange}
//           />
//           <CardFooter className="flex justify-center py-4">
//             <Button className="text-lg">Submit Feedback</Button>
//           </CardFooter>
//         </form>
//       </CardContent>
//     </Card>
//     <Footer/>
//     <ToastContainer />
//     </div>
//     </div>
//   );
// }

import * as React from "react";
import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import Navbar from "../Navbar";
import Footer from "../footer";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../../utils";
import {  useNavigate } from "react-router-dom";
export function Feedback() {
  const [loggedInUser, setLoggedInUser] = useState(""); // Token will be stored here
  const [feedback, setFeedback] = useState({
    title: "",
    description: "",
    rating: "2",
  });
  const navigate = useNavigate();
  // Check if user is logged in (retrieve token from localStorage)
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("token"));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    // Ensure user is logged in and all fields are filled
    if (!loggedInUser) {
      return handleError("You need to be logged in to submit feedback.");
    }

    if (!feedback.title || !feedback.description || !feedback.rating) {
      return handleError("All fields are required.");
    }

    try {
      // Sending feedback data to the server
      const response = await fetch("http://localhost:8080/feedbacks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${loggedInUser}`, // Send token in header
        },
        body: JSON.stringify(feedback),
      });

      const data = await response.json();
      const { success, message } = data;
      if (success) {
        handleSuccess("Feedback submitted successfully!");
        setTimeout(() => {
          navigate("/quickFeedbacks");
        }, 600);
        setFeedback({
          title: "",
          description: "",
          rating: "2",
        });
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError("An error occurred while submitting your feedback. Please try again.");
    }
  }

  function handleOnChange(event) {
    const { name, value } = event.target;
    setFeedback((prevData) => {
      return { ...prevData, [name]: value };
    });
  }

  return (
    <div>
      <Navbar />
      <div className="mx-2">
        <Card className="w-[400px] bg-slate-400">
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
              <br />
              <textarea
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="description"
                placeholder="Enter Description"
                name="description"
                value={feedback.description}
                onChange={handleOnChange}
              ></textarea>
              <br />
              <br />
              <Label htmlFor="rating">Rating: </Label>
              <input
                className="w-[80%] border rounded"
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
        <Footer />
        <ToastContainer />
      </div>
    </div>
  );
}

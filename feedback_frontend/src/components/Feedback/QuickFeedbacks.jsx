// import React from 'react'
// import Navbar from '../Navbar'
// import Footer from '../footer'

// const QuickFeedbacks = () => {
//   return (
//     <div>
//      <Navbar/>
//      <h1>Hello</h1>
//   <Footer/>
//     </div>
//   )
// }

// export default QuickFeedbacks

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Navbar from "../Navbar";
import Footer from "../footer";
import { ToastContainer } from "react-toastify";
import { handleError } from "../../../utils";
export function QuickFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");

  // Fetch token from localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedInUser(token);
    if (token) {
      fetchFeedbacks(token);
    } else {
      handleError("You need to log in to view feedbacks.");
    }
  }, []);

  // Fetch feedbacks from the backend
  const fetchFeedbacks = async (token) => {
    try {
      const response = await fetch("http://localhost:8080/feedbacks", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setFeedbacks(data.feedbacks); // Set feedbacks in state
      } else {
        handleError(data.message || "Failed to fetch feedbacks.");
      }
    } catch (error) {
      handleError("An error occurred while fetching feedbacks.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mx-4 mt-4">
        <h1 className="text-xl font-bold mb-4">Feedback List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <Card key={feedback._id} className="bg-slate-100">
                <CardHeader>
                  <CardTitle>{feedback.title}</CardTitle>
                  <CardDescription>{feedback.rating} / 5</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{feedback.description}</p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(feedback.date).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No feedbacks available.</p>
          )}
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

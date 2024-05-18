import { useEffect } from "react";
import { Button } from "../ui/button";
import SignUpLogin from "./signup-login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function MainPage() {
  const navigate = useNavigate();



  function handleNavigation() {
    // get email from local storage
    var email = localStorage.getItem('email');
    var date = localStorage.getItem('date');
    var month = localStorage.getItem('month');
    var year = localStorage.getItem('year');
    var hours = localStorage.getItem('hours');

    if (email !== null && date !== null && month !== null && year !== null && hours !== null) {
      var current_date;
      var current_month;
      var current_year;
      var current_hours;

      current_date = new Date().getDate();
      current_month = new Date().getMonth() + 1;
      current_year = new Date().getFullYear();
      current_hours = new Date().getHours();

      var flag = true;

      if (current_year > year) {
        flag = false;
      } else if (current_year === year) {
        if (current_month > month) {
          flag = false;
        } else if (current_month === month) {
          if (current_date > date) {
            flag = false;
          } else if (current_date === date) {
            if (current_hours > hours + 8) {
              flag = false;
            }
          }
        }
      }

      if (flag === false) {
        // remove data from local storage
        localStorage.removeItem('email');
        localStorage.removeItem('date');
        localStorage.removeItem('month');
        localStorage.removeItem('year');
        localStorage.removeItem('hours');
      }
      else if (flag === true) {
        // navigate to user dashboard
        navigate('/user-dashboard');
      }

    }
    else {
      // remove data from local storage
      localStorage.removeItem('email');
      localStorage.removeItem('date');
      localStorage.removeItem('month');
      localStorage.removeItem('year');
      localStorage.removeItem('hours');
    }
  }
  useEffect(() => {
    handleNavigation();
  }, []);
  return (
    (<section
      className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-950 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4">
            <h1
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Discover the Easiest Way to Book Bus Tickets
            </h1>
            <p className="mx-auto max-w-[800px] text-lg md:text-xl text-gray-300">
              Our bus ticket booking system makes it simple to find and book the perfect bus ride for your next
              adventure. Explore routes, compare prices, and secure your seat in just a few clicks.
            </p>
          </div>
          <SignUpLogin></SignUpLogin>
        </div>
      </div>
    </section >)
  );
}

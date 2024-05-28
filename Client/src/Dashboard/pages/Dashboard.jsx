import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from 'react-router-dom';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';

import EditBook from "../../Components/EditBook/EditBook";
import AddNewBook from '../../Components/AddNewBook/addNewBook';
import AdminBooks from '../../Pages/AdminBooks/AdminBooks';
import userOrders from '../../Pages/userOrders/userOrders';
import AdminOrders from '../../Pages/AdminOrders/AdminOrders';
function MainContent() {
  const location = useLocation();
  const { pathname } = location;
  const { id } = useParams();
    // console.log(id);
  useEffect(() => {
    // Print the current location to the console
    console.log("Current location:", pathname);
  }, [location]);
//   const [selectedDateRange, setSelectedDateRange] = useState(null);

//   const handleDateRangeChange = (dateRange) => {
//     setSelectedDateRange(dateRange);
//   };
// console.log(selectedDateRange);
//   const dateString = selectedDateRange;
//   // Split the string by comma to separate individual date strings
// //   const dateStrings = dateString.split(',');
  
//   // Define a function to extract and format each date string
//   const extractDate = (dateString) => {
//     // Use regular expression to match date parts
//     const dateParts = dateString.match(/\b(\w{3}) (\w{3}) (\d{2}) (\d{4})/);
  
//     if (dateParts && dateParts.length === 5) {
//       // Create a new Date object with extracted parts
//       const date = new Date(`${dateParts[1]} ${dateParts[2]} ${dateParts[3]} ${dateParts[4]} 00:00:00`);
  
//       // Format the date as desired (e.g., mm/dd/yyyy)
//       const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  
//       return formattedDate;
//     }
  
//     return null; // Return null if date string format is invalid
//   };
  
//   // Map over each date string to extract and format dates
//   const extractedDates = dateString.map(extractDate);
  
//   // Convert the extracted dates to Python datetime objects
//   const pythonDatetimeObjects = extractedDates.map(dateString => {
//     const [month, day, year] = dateString.split('/');
//     return new Date(`${year}-${month}-${day}`);
//   });
  
//   console.log(pythonDatetimeObjects); // Output: [date(2024, 5, 1), date(2024, 5, 8)]
  




  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto mt-5">
      <WelcomeBanner />
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <DashboardAvatars />
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <FilterButton />
          <Datepicker />
          {/* <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
            <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">Add view</span>
          </button> */}
        </div>
      </div>

      <div>
        {pathname === '/dashboard'
         ? (
          <AdminOrders />
        ) : (
          <>
          </>
        )}
        {pathname === `/dashboard/book/${id}`
         ? (
          <EditBook />
        ) : (
          <>
          </>
        )}

        {pathname === '/dashboard/book/'
         ? (
          <AddNewBook />
        ) : (
          <>
          </>
        )}
        {pathname === '/dashboard/books/'
         ? (
          <AdminBooks />
        ) : (
          <>
          </>
        )}

      </div>
    </div>
  );
}

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            {/* <AdminOrders /> */}
            <Routes>
              <Route path="/*" element={<MainContent />} />
            </Routes>
          </main>
        </div>
      </div>
  );
}

export default Dashboard;

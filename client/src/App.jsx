import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import AllRooms from "./Pages/AllRooms";
import RoomDetail from "./Pages/RoomDetail";
import MyBookings from "./Pages/MyBooking";
import HotelReg from "./components/HotelReg";
import Layout from "./Pages/hotelOwner/Layout";
import Dashboard from "./Pages/hotelOwner/Dashboard";
import ListRoom from "./Pages/hotelOwner/ListRoom";
import AddRoom from "./Pages/hotelOwner/AddRoom";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext.jsx";
import Loader from "./components/Loader.jsx";
import LoaderHome from "./components/LoaderHome.jsx";
const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const isUserPath = useLocation().pathname.includes("user");
const isBookingsPath = useLocation().pathname.includes("mybookings");

  const { showHotelReg,rooms } = useAppContext();

  return (
    <div>
      {  rooms.length === 0?<LoaderHome />:
      <>
      <Toaster
        toastOptions={{
          style: {
            marginTop: "40px", // adjust this value as needed
          },
        }}
      />
      {!isOwnerPath && <Navbar />}
      {showHotelReg && <HotelReg />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/loader/:nextUrl" element={<Loader />} />

          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-room" element={<AddRoom />} />
            <Route path="list-room" element={<ListRoom />} />
          </Route>
        </Routes>
      </div>
      
      </>}
      {!isOwnerPath && <Footer />}
    </div>
  );
};

export default App;

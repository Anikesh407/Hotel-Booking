import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";

const Loader = () => {
  const { navigate } = useAppContext();
  const { nextUrl } = useParams();
  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 6000);
    }
  }, [nextUrl]);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-gray-600"></div>
    </div>
  );
};

export default Loader;

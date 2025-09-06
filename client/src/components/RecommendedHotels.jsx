import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import HotelCard from "./HotelCard";
import Title from "./Title";

const RecommendedHotels = () => {
  const { rooms, searchedCities, currency } = useAppContext();
  const [recommended, setRecommended] = useState([]);

  const filterHotels = () => {
    if (!Array.isArray(searchedCities) || searchedCities.length === 0) {
      setRecommended([]);
      return;
    }
    const filteredHotels = rooms
      .slice()
      .filter((room) => searchedCities.includes(room.hotel.city));
    setRecommended(filteredHotels);
  };

  useEffect(() => {
    filterHotels();
  }, [rooms, searchedCities]);

  return (
    recommended.length > 0 && (
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
        <Title
          title="Recommended Hotels"
          subTitle="Experience handpicked properties worldwide, offering unmatched comfort, timeless luxury, and unforgettable moments every time."
        />

        <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
          {recommended.slice(0, 4).map((room, index) => (
            <HotelCard
              key={room._id}
              room={room}
              index={index}
              currency={currency}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default RecommendedHotels;

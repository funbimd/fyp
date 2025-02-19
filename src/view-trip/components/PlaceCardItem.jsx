import { Button } from "@/components/ui/button";
import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place.place}
      target="_blank"
      className="text-black hover:text-pink-700"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <div>
          <h2 className="font-bold text-lg">{place.place}</h2>
          <p className="text-sm text-gray-400">{place.details}</p>
          <Button size="sm" className="mt-5">
            <IoLocationSharp />
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;

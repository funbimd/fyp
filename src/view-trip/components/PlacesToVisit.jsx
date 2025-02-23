import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ trip }) => {
  const itinerary = trip?.tripData?.itinerary;

  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      {itinerary ? (
        Object.keys(itinerary)
          // Filter out any non-day keys
          .filter((key) => key.toLowerCase().includes("day"))
          .sort((a, b) => {
            const dayA = parseInt(a.replace("day", ""), 10);
            const dayB = parseInt(b.replace("day", ""), 10);
            return dayA - dayB;
          })
          .map((dayKey) => (
            <div key={dayKey} className="mt-5">
              <h2 className="font-medium text-lg">
                {dayKey.replace("day", "Day ")}
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                {(itinerary[dayKey]?.plan ?? []).map((place, index) => (
                  <div key={index} className="my-3">
                    <h2 className="font-medium text-sm text-orange-600">
                      {place.time}
                    </h2>
                    <PlaceCardItem place={place} />
                  </div>
                ))}
              </div>
            </div>
          ))
      ) : (
        <p>No itinerary available.</p>
      )}
    </div>
  );
};

export default PlacesToVisit;

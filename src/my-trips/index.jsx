import { db, auth } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";
import { onAuthStateChanged } from "firebase/auth";

const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // ✅ Email & Password users
        setUserEmail(firebaseUser.email);
      } else {
        // ✅ Google users from localStorage
        const googleUser = JSON.parse(localStorage.getItem("user"));
        if (googleUser?.email) {
          setUserEmail(googleUser.email);
        }
      }
      setLoading(false); // ✅ Stop loading after checking authentication
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userEmail) {
      GetUserTrips(userEmail);
    }
  }, [userEmail]);

  const GetUserTrips = async (email) => {
    try {
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", email)
      );
      const querySnapshot = await getDocs(q);

      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push(doc.data());
      });

      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  // ✅ If still checking authentication, show loading
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>

      {userTrips.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 mt-10 gap-5">
          {userTrips.map((trip, index) => (
            <UserTripCardItem trip={trip} key={index} />
          ))}
        </div>
      ) : (
        <p className="mt-5 text-gray-500">No trips found.</p>
      )}
    </div>
  );
};

export default MyTrips;

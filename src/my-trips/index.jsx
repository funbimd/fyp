import { auth, db } from "@/service/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";

const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Store errors

  useEffect(() => {
    GetUserTrips();
  }, []);

  /**
   * Fetches user trips for both Google and Email/Password logins
   */
  const GetUserTrips = async () => {
    setLoading(true);
    setError(null);

    let user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage

    if (!user) {
      console.warn(
        "No user found in localStorage. Checking Firebase authentication..."
      );
      const authUser = auth.currentUser;
      if (authUser) {
        user = {
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName,
        };
        localStorage.setItem("user", JSON.stringify(user)); // Save it properly
      } else {
        console.error("User is not authenticated!");
        setLoading(false);
        return;
      }
    }

    let userEmail = user?.email;

    // If user logged in with email/password, check the "Users" collection
    if (user?.uid && !user?.emailVerified) {
      try {
        const userDoc = await getDoc(doc(db, "Users", user.uid));
        if (userDoc.exists()) {
          userEmail = userDoc.data().email;
        } else {
          console.warn("User document not found in 'Users' collection.");
        }
      } catch (error) {
        console.error("Error fetching user email:", error);
        setError("Failed to retrieve user email.");
        setLoading(false);
        return;
      }
    }

    if (!userEmail) {
      console.error("No valid email found for user.");
      setLoading(false);
      return;
    }

    // Fetch AI trips using email
    try {
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", userEmail)
      );
      const querySnapshot = await getDocs(q);

      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push({ id: doc.id, ...doc.data() });
      });

      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching user trips:", error);
      setError("Failed to retrieve trips.");
    }

    setLoading(false);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>

      {loading ? (
        <p className="mt-5 text-gray-500">Loading trips...</p>
      ) : error ? (
        <p className="mt-5 text-red-500">{error}</p>
      ) : userTrips.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 mt-10 gap-5">
          {userTrips.map((trip) => (
            <UserTripCardItem trip={trip} key={trip.id} />
          ))}
        </div>
      ) : (
        <p className="mt-5 text-gray-500">No trips found.</p>
      )}
    </div>
  );
};

export default MyTrips;

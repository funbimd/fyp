import { auth, db } from "@/service/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "sonner";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(""); // State for password error message

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!firstName || !lastName || !dob || !password || !confirmPassword) {
      alert("All required fields must be filled.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special symbol."
      );
      return;
    } else {
      setPasswordError(""); // Clear any previous error
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          firstName: firstName,
          lastName: lastName,
          middleName: middleName,
          email: user.email,
          dob: dob,
        });
      }
      console.log("User registered successfully!");
      window.location.href = "/login";
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.success(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-[800px]">
        {" "}
        {/* Wider box */}
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 mb-4">
            {" "}
            {/* First Name & Last Name side by side */}
            <div className="w-1/2">
              {" "}
              {/* Half the width for each input */}
              <label
                htmlFor="firstName"
                className="block text-gray-700 font-bold mb-2"
              >
                First Name*
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="lastName"
                className="block text-gray-700 font-bold mb-2"
              >
                Last Name*
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            {" "}
            {/* Middle Name (full width) */}
            <label
              htmlFor="middleName"
              className="block text-gray-700 font-bold mb-2"
            >
              Middle Name (Optional)
            </label>
            <input
              type="text"
              id="middleName"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            {/* Email */}
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            {" "}
            {/* Date of Birth (full width) */}
            <label htmlFor="dob" className="block text-gray-700 font-bold mb-2">
              Date of Birth*
            </label>
            <input
              type="date"
              id="dob"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-4 mb-4">
            {" "}
            {/* Password & Confirm Password */}
            <div className="w-1/2">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password*
              </label>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
            <div className="w-1/2">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-bold mb-2"
              >
                Confirm Password*
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <p className="mb-4 text-gray-700">
            <strong>Password must contain:</strong>
            <br />
            <em>8 characters at least</em>
            <br />
            <em>one uppercase</em>
            <br />
            <em>one lowercase</em>
            <br />
            <em>one number</em>
            <br />
            <em>one special symbol</em>
          </p>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Log In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { CiMail } from "react-icons/ci";
import { auth } from "@/service/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Header = () => {
  const googleUser = JSON.parse(localStorage.getItem("user"));
  const [firebaseUser, setFirebaseUser] = useState();
  const [openDialog, setopenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });
    return () => unsubscribe();
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const handleLogout = async () => {
    if (googleUser) {
      googleLogout();
      localStorage.clear();
      window.location.reload();
    } else if (firebaseUser) {
      await signOut(auth);
      setFirebaseUser(null);
      window.location.reload();
    }
    window.location.href = "/";
  };

  // Function to generate profile initials
  const getProfileInitials = (email) => {
    if (!email) return "U"; // Default to "U" if no email is found
    return email.charAt(0).toUpperCase();
  };

  // Function to generate a random color from email
  const getProfileColor = (email) => {
    if (!email) return "#888"; // Default gray if no email
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 50%, 60%)`; // HSL color generation
    return color;
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setopenDialog(false);
        window.location.reload();
      });
  };
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <a href="/">
        <img
          src="/logo.svg"
          alt="Logo"
          className="h-20 w-auto object-contain"
        />
      </a>
      <div>
        {googleUser || firebaseUser ? (
          <div className="flex items-center gap-5">
            <a href="/create-trip">
              <Button varaint="outline" className="rounded-full">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button varaint="outline" className="rounded-full">
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                {googleUser ? (
                  <img
                    src={googleUser?.picture}
                    className="h-[35px] w-[35px] rounded-full"
                  />
                ) : (
                  <div
                    className="h-[35px] w-[35px] rounded-full flex items-center justify-center text-lg font-bold text-white"
                    style={{
                      backgroundColor: getProfileColor(firebaseUser?.email),
                    }}
                  >
                    {getProfileInitials(firebaseUser?.email)}
                  </div>
                )}
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={handleLogout}>
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setopenDialog(true)}>Sign in</Button>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setopenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign into the app with Google Authentication securely</p>
              <Button
                disabled={loading}
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
              <a href="/login">
                <Button className="w-full mt-5 flex gap-4 items-center">
                  <CiMail />
                  Sign in with your email
                </Button>
              </a>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;

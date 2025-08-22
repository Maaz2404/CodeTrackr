import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL

function SignUp({ loggedIn, setloggedIn }) {
  // Login states
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);

  // Signup states
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupOpen, setSignupOpen] = useState(false);

  const [logButton, setLogButton] = useState("Log In");

  // Handle Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    const formData = new URLSearchParams();
    formData.append("username", loginUsername);
    formData.append("password", loginPassword);

    try {
      const response = await axios.post(baseURL + "auth/token", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      // FIX: backend sends access_token
      const token = response.data.access_token;
      localStorage.setItem("accessToken", token);
      setloggedIn(true);
      setLogButton("Log Out");
      setLoginOpen(false); // close dialog
    } catch (error) {
      if (error.response?.status === 401) {
        setLoginError("Invalid credentials");
      }
    } finally {
      setLoginUsername("");
      setLoginPassword("");
    }
  };

  // Handle Signup
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupError("");

    try {
      await axios.post(baseURL + "auth/signup", {
        username: signupUsername,
        password: signupPassword,
      });

      setloggedIn(true);
      setLogButton("Log Out");
      setSignupOpen(false); // close dialog
    } catch (error) {
      if (error.response?.status === 404) {
        setSignupError("You are missing a field");
      } else if (error.response?.status === 409) {
        setSignupError("Username already exists");
      }
    } finally {
      setSignupUsername("");
      setSignupPassword("");
    }
  };

  return (
    <div className="flex gap-3 justify-end items-center text-white text-md">
      {/* Login Dialog */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogTrigger asChild>
          <button className="p-2 bg-gray-700 rounded-2xl">{logButton}</button>
        </DialogTrigger>
        <DialogContent className="text-white bg-gray-700">
          <DialogHeader>
            <DialogTitle>Log In</DialogTitle>
            <DialogDescription>
              Enter your username and password to log in
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleLoginSubmit}
            className="flex flex-col gap-5 mt-5"
          >
            <div className="flex gap-2 justify-between items-center">
              <Label htmlFor="login-username">Username</Label>
              <Input
                id="login-username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="w-3/4"
              />
            </div>
            <div className="flex gap-2 justify-between items-center">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-3/4"
              />
            </div>
            {loginError && (
              <DialogDescription className="text-center text-red-600">
                {loginError}
              </DialogDescription>
            )}
            <DialogFooter className="flex justify-center gap-3 mt-5">
              <Button
                variant="outline"
                type="button"
                onClick={() => setLoginOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="outline">
                Log In
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Signup Dialog */}
      <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
        {!loggedIn && (
          <DialogTrigger asChild>
            <button className="p-2 bg-gray-700 rounded-2xl">Sign Up</button>
          </DialogTrigger>
        )}
        <DialogContent className="text-white bg-gray-700">
          <DialogHeader>
            <DialogTitle>Sign Up</DialogTitle>
            <DialogDescription>
              Enter your username and password
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSignupSubmit}
            className="flex flex-col gap-5 mt-5"
          >
            <div className="flex gap-2 justify-between items-center">
              <Label htmlFor="signup-username">Username</Label>
              <Input
                id="signup-username"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
                className="w-3/4"
              />
            </div>
            <div className="flex gap-2 justify-between items-center">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className="w-3/4"
              />
            </div>
            {signupError && (
              <DialogDescription className="text-center text-red-600">
                {signupError}
              </DialogDescription>
            )}
            <DialogFooter className="flex justify-center gap-3 mt-5">
              <Button
                variant="outline"
                type="button"
                onClick={() => setSignupOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="outline">
                Sign Up
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SignUp;

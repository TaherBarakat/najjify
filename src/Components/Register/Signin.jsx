import { Alert, Button, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";

export default function Signin() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    setOpenSnackbar(true);
  };
  const handleChange = () => {};

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  return (
    <div>
      <div className="flex h-screen items-center justify-center">
        <div className="w-[30%] bg-white p-10 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="mb-2">Email</p>

              <input
                placeholder="Enter your Email"
                onChange={handleChange}
                value={inputData.email}
                type="text"
                className="w-full rounded-md border p-2 py-2 outline outline-green-600"
              />
            </div>

            <div>
              <p className="mb-2">Password</p>

              <input
                placeholder="Enter your Password"
                onChange={handleChange}
                value={inputData.password}
                type="text"
                className="w-full rounded-md border p-2 py-2 outline outline-green-600"
              />
            </div>
            <div>
              <Button
                type="submit"
                className="w-full bg-green-600"
                variant="contained"
                sx={{ bgcolor: "#16a34a", padding: ".5rem orem" }}
              >
                Sign in
              </Button>
            </div>
          </form>

          <div className="mt-5 flex items-center space-x-3">
            <p className="">Create New Account</p>

            <Button variant="text" onClick={() => navigate("./signup")}>
              signup
            </Button>
          </div>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>
    </div>
  );
}

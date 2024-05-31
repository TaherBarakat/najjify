import { Alert, Button, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUser, register } from "../../Redux/Auth/Action";

export default function Signup() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [inputData, setInputData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //----------------------------------------------------------
  const { auth } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) dispatch(currentUser(token));
  }, [token]);
  useEffect(() => {
    if (auth.reqUser?.fullName) navigate("/");
  }, [auth.reqUser]);
  //----------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", inputData);
    dispatch(register(inputData));
    setOpenSnackbar(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputData((prev) => {
      {
        return { ...prev, [name]: value };
      }
    });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="w-[30%] bg-white p-10 shadow-md ">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="mb-2">user name</p>
              <input
                className="border-1 w-full rounded-md px-3 py-2 outline outline-green-600"
                type="text"
                placeholder="Enter username"
                name="fullName"
                onChange={(e) => handleChange(e)}
                value={inputData.fullName}
              />
            </div>

            <div>
              <p className="mb-2">Email</p>
              <input
                className="border-1 w-full rounded-md px-3 py-2 outline outline-green-600"
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={(e) => handleChange(e)}
                value={inputData.email}
              />
            </div>

            <div>
              <p className="mb-2">Password</p>
              <input
                className="border-1 w-full rounded-md px-3 py-2 outline outline-green-600"
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={(e) => handleChange(e)}
                value={inputData.password}
              />
            </div>
            <div>
              <Button
                type="submit"
                className="w-full bg-green-600"
                variant="contained"
                sx={{ bgcolor: "#16a34a", padding: ".5rem orem" }}
              >
                Sign Up
              </Button>
            </div>
          </form>
          <div className="item-center mt-5 flex space-x-3">
            <p>Already have account?</p>
            <Button
              onClick={() => navigate("/signin")}
              className="cursor-pointer text-blue-500 hover:text-blue-800"
            >
              signin
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
          //     variant="filled"
          sx={{ width: "100%" }}
        >
          Login successful!
        </Alert>
      </Snackbar>
    </div>
  );
}

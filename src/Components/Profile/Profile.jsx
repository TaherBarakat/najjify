import { useState } from "react";

import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Profile({ handleCloseOpenProfile }) {
  const [flag, setFlag] = useState(false);
  const [username, setUsername] = useState(null);
  //   const navigate = useNavigate();
  //   const handleNavigate = () => {
  //     navigate(-1);
  //   };

  const handleFlag = () => {
    setFlag((prev) => !prev);
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="h-full w-full">
      <div className="flex items-center space-x-10 bg-[#068069] px-10 pb-5 pt-16 text-white">
        <BsArrowLeft
          onClick={handleCloseOpenProfile}
          className="cursor-pointer text-2xl font-bold"
        />

        <p className="cursor-pointer font-semibold"> Profile </p>
      </div>

      {/* update profile pic section */}

      <div className="my-12 flex flex-col items-center justify-center">
        <label htmlFor="ingInput">
          <img
            className=" h-[15vw] w-[15vw] cursor-pointer rounded-full"
            src="https://plus.unsplash.com/premium_photo-1664360971620-fa24e4edb9c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGljfGVufDB8fDB8fHww"
          />
        </label>

        <input type="file" id="ingInput" className="hidden" />
      </div>

      {/* name section */}
      <div className="bg-white px-3 ">
        <p className="px-3">Your Name </p>

        {!flag && (
          <div className="flex w-full items-center justify-between">
            <p className="py-3"> {username || "username"} </p>
            <BsPencil onClick={handleFlag} className="cursor-pointer" />
          </div>
        )}

        {flag && (
          <div className=" flex w-full items-center justify-between py-2   ">
            <input
              onChange={handleChange}
              type="text"
              placeholder="Enter your name"
              className="w-[80%] border-b-2   border-blue-700  p-2 outline-none "
            />
            <BsCheck2
              onClick={handleFlag}
              className="cursor-pointer  text-2xl "
            />
          </div>
        )}
      </div>

      <div className="my-5 px-3">
        <p className="py-10"> this is not your username </p>
      </div>
    </div>
  );
}

import { useState } from "react";

import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../Redux/Auth/Action";

export default function Profile({ setSidbarNav }) {
  const [flag, setFlag] = useState(false);
  const [username, setUsername] = useState(null);
  const [tempPicture, setTempPicture] = useState(null);
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleUpdateName = () => {
    setFlag((prev) => !prev);
    const updatedData = {
      token: localStorage.getItem("token"),
      data: { fullName: username },
    };

    dispatch(updateUser(updatedData));
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  // upload the picture to a cloud service named cloudinary ,
  // then wait for the response that contain a pic url for the pic on the cloud
  // and push it to the local db
  function uploadToCloudinary(pics) {
    try {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "whatsapp");
      data.append("cloud_name", "dxq3gmkuw");

      fetch("https://api.cloudinary.com/v1_1/dxq3gmkuw/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setTempPicture(data.url);

          const updatedData = {
            token: localStorage.getItem("token"),
            data: { profilePicture: data.url },
          };
          dispatch(updateUser(updatedData));
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-full w-full">
      <div className="flex items-center space-x-10 bg-[#068069] px-10 pb-5 pt-16 text-white">
        <BsArrowLeft
          onClick={() => setSidbarNav("chats")}
          className="cursor-pointer text-2xl font-bold"
        />

        <p className=" font-semibold"> Profile </p>
      </div>

      {/* update profile pic section */}

      <div className="my-12 flex flex-col items-center justify-center">
        <label htmlFor="imgInput">
          <img
            className=" h-[15vw] w-[15vw] cursor-pointer rounded-full"
            src={
              tempPicture ||
              auth.reqUser?.profilePicture ||
              `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png`
            }
          />
        </label>

        <input
          onChange={(e) => {
            uploadToCloudinary(e.target.files[0]);
          }}
          type="file"
          id="imgInput"
          className="hidden"
        />
      </div>

      {/* name section */}
      <div className="bg-white px-3 ">
        <p className="py-3">Your Name </p>

        {!flag && (
          <div className="flex w-full items-center justify-between">
            <p className="py-3"> {username || auth.reqUser?.fullName} </p>
            <BsPencil
              onClick={() => setFlag((prev) => !prev)}
              className="cursor-pointer"
            />
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
              onClick={handleUpdateName}
              className="cursor-pointer  text-2xl "
            />
          </div>
        )}
      </div>

      <div className="my-5 px-3">
        <p className="py-10">
          {" "}
          this is not your username, tis will be visible to your whatsapp
          contacts{" "}
        </p>
      </div>
    </div>
  );
}

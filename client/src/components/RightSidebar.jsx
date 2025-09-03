import React, { useEffect, useState } from "react";
import assets from "../assets/assets";
import { useAuthContext } from "../../context/AuthContext";
import { useChatContext } from "../../context/ChatContext";

function RightSidebar() {
  const { logout, onlineUsers } = useAuthContext();
  const { selectedUser, messages } = useChatContext();
  const [msgImages, setMsgImages] = useState([]);

  //Get all images from the message and set them to state

  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  return (
    selectedUser && (
      <div
        className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${
          selectedUser ? "max-md:hidden" : ""
        }`}
      >
        {/* first div name image bio */}
        <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
          <img
            src={selectedUser?.profilPic || assets.avatar_icon}
            alt="Profile"
            className="w-20 aspect-[1/1] rounded-full"
          />
          {onlineUsers.includes(selectedUser._id) && (
            <p className="w-2 h-2 rounded-full bg-green-500"></p>
          )}

          <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
            {selectedUser?.fullName}
          </h1>
          <p className="px-10 mx-auto">{selectedUser?.bio}</p>
        </div>

        {/* media  */}
        <hr className="border-[#ffffff50]" />
        <div className="px-5 text-xs">
          <p className="mb-2">Media</p>
          <div className="max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80">
            {msgImages.map((image, idx) => (
              <div
                key={idx}
                onClick={() => window.open(image)}
                className="cursor-pointer rounded overflow-hidden"
              >
                <img
                  src={image}
                  alt={`media-${idx}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* logout button */}
        <div className="absolute bottom-5 w-full flex justify-center">
          <button
            onClick={logout}
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white text-sm font-light py-2 px-10 rounded-full cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
}

export default RightSidebar;

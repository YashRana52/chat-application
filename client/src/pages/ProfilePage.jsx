import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { useAuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const { updateProfile, authUser } = useAuthContext();
  const [selectedImage, setSelectedImage] = useState(null);
  const [bio, setBio] = useState(authUser.bio);
  const [name, setName] = useState(authUser.fullName);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      await updateProfile({ fullName: name, bio });
      navigate("/");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image, fullName: name, bio });
      navigate("/");
    };
  };

  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg p-5 gap-6">
        {/* Left Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
          <h3 className="text-lg font-semibold">Profile details</h3>

          {/* Avatar Upload */}
          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer text-sm text-gray-400"
          >
            <span className="px-3 py-1 bg-gray-700 rounded-md">
              Upload Avatar
            </span>
            <input
              onChange={(e) => setSelectedImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png,.jpeg,.jpg"
              hidden
            />
          </label>

          {/* Name Input */}
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder="Your name"
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          {/* Bio Input */}
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write profile bio"
            required
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            rows={4}
          ></textarea>

          {/* Save Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer"
          >
            Save
          </button>
        </form>

        {/* Right Side Avatar Preview */}
        <div className="flex flex-col items-center gap-3">
          <img
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : authUser?.profilePic || assets.avatar_icon
            }
            alt="avatar preview"
            className={`w-24 h-24 object-cover rounded-full border-2 border-gray-500`}
          />
          <p className="text-sm text-gray-400">{name}</p>
          <p className="text-xs text-gray-500 text-center max-w-[200px]">
            {bio}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

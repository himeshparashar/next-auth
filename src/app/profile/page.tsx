"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>TODO: Add profile page</p>
      <h2>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        className="p-2 mt-2 border border-gray-500 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={logout}
      >
        Logout
      </button>
      <hr />
      <button
        className="bg-blue-700 p-2 mt-2 border border-gray-500 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={getUserDetails}
      >
        Get user details
      </button>
    </div>
  );
}

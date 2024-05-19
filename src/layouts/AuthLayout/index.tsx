import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#f5f5f5]">
      <div className="bg-white rounded-2xl p-8">
        <div className="text-center mb-8 cursor-pointer">
          <img src="/vite.svg" width={80} onClick={() => navigate("/")} />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

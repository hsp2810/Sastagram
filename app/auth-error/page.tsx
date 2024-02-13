import React from "react";
import ErrorCard from "../_components/auth/error-card";

export default function AuthErrorPage() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <ErrorCard />
    </div>
  );
}

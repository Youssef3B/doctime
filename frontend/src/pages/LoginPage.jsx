import React from "react";
import Login from "../components/Login";

function LoginPage() {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 h-screen bg-zinc-950">
      <Login />
      <section className="hidden lg:block">
        <img
          className="object-cover h-screen w-full"
          src="/doctor.jpg"
          alt="Medical professional"
        />
      </section>
    </main>
  );
}

export default LoginPage;

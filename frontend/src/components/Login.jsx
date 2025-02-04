import React from "react";

function Login() {
  return (
    <div className="text-white px-5 flex flex-col justify-center items-center">
      <h1 className="text-primary text-5xl font-extrabold mb-8">DocTime</h1>
      <h3 className="text-3xl font-semibold mb-4">welcome Doctor</h3>
      <p className="font-semibold text-md mb-8 text-sage">
        To use DocTime, please enter your details
      </p>
      <form className="flex flex-col w-full max-w-[500px]" action="">
        <div className="flex flex-col">
          <label className="text-sage text-md mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="bg-gray-800 px-3 py-2 focus:outline-none rounded-md"
            type="email"
            placeholder="Enter your email here"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sage text-md my-2" htmlFor="email">
            Password
          </label>
          <input
            className="bg-gray-800 px-3 py-2 focus:outline-none rounded-md"
            type="password"
            placeholder="Enter your password here"
          />
        </div>
        <button
          className="bg-primary py-2 mt-8 rounded-lg text-black font-semibold hover:bg-navy transition-all"
          type="submit"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Login;

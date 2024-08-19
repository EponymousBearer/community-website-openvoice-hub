"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <section className="h-screen" >
        <div className="container w-full mx-auto h-full px-6 py-24">
          <div
            className="flex h-full flex-wrap items-center justify-center lg:justify-between">
            {/* Left column container with background */}
            <div className="md:w-8/12 lg:ms-6 lg:w-5/12">
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      required
                      className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      required
                      className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex w-1/2">
                    <p className="py-2 hover:underline text-blue-400">
                      <Link href='/forget-password' >
                        Forget Password?
                      </Link>
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="inline-block w-1/2 rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal border hover:border-black text-black shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    data-twe-ripple-init
                    data-twe-ripple-color="light">
                    Login
                  </button>
                </div>
                <p className="text-red-600 w-1/2">{error && error}</p>
                <div>

                  <div
                    className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                    <p
                      className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                      OR
                    </p>
                  </div>

                  {/* <!-- Social login buttons --> */}

                  <Link
                    className="block text-center text-blue-400 hover:underline mt-2"
                    href="/register"
                  >
                    Register Here
                  </Link>
                </div>
              </form>
            </div>

            {/* Right column container with form */}
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <Image
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </section>
      // <div className="flex min-h-screen flex-col items-center justify-between p-24">
      //   <div className="bg-blue-200 p-8 rounded shadow-md w-96">
      //     <h1 className="text-4xl text-center font-semibold mb-8">Login</h1>
      //     <form onSubmit={handleSubmit}>
      //       <input
      //         type="text"
      //         className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
      //         placeholder="Email"
      //         required
      //       />
      //       <input
      //         type="password"
      //         className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
      //         placeholder="Password"
      //         required
      //       />
      //       <button
      //         type="submit"
      //         className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      //       >
      //         {" "}
      //         Sign In
      //       </button>
      //       <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
      //     </form>
      //     <button
      //       className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      //       onClick={() => {
      //         signIn("github");
      //       }}
      //     >
      //       Sign In with Github
      //     </button>
      //     <div className="text-center text-gray-500 mt-4">- OR -</div>
      //     <Link
      //       className="block text-center text-blue-500 hover:underline mt-2"
      //       href="/register"
      //     >
      //       Register Here
      //     </Link>
      //     <div>
      //       <p className="py-2 hover:underline">
      //         <Link href='/forget-password' >
      //           Forget Password?
      //         </Link>
      //       </p>
      //     </div>
      //   </div>
      // </div>
    )
  );
};

export default Login;
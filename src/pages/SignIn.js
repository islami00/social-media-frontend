import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router"
import { IonToast } from '@ionic/react';
import { MdOutlineArrowBack } from "react-icons/md";
import "@ionic/react/css/core.css";
import { Filesystem } from "@capacitor/filesystem";
import { errorHandled } from "../utils/utils";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
export const SignInPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function submitDevData(data) {
    const { username, password } = data;
    errorHandled(
      fetch(
        `http://localhost:4000/auth?username=${username}&password=${password}`
      )
    )
      .then(async (result) => {
        if (result[1]) throw result[1];
        const data = await result[0].json();
        if (!data[0]) throw new Error("Cannot fetch");
        localStorage.setItem("user", JSON.stringify(data[0]));
        navigate("/main/home");
      })
      .catch((err) => {
        console.error(err.message);
        err.message === "No username or password provided"
          ? setErrorMessage(err.message)
          : setErrorMessage("Error while Signing In");
        setError(true);
      });
  }
  function submitData(loginData) {
    if (process.env.NODE_ENV === "development") return submitDevData(loginData);
    fetch("http://localhost:4000/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/main/home");
      })
      .catch((err) => {
        console.error(err.message);
        err.message === "No username or password provided"
          ? setErrorMessage(err.message)
          : setErrorMessage("Error while Signing In");
        setError(true);
      });
  }

  return (
    <div className="h-[896px] w-[414px] p-4">
      <nav className="w-full">
        <button aria-label="Back">
          <MdOutlineArrowBack size={24} />
        </button>
      </nav>
      <section className="w-full">
        <div className="text-center">
          <h1 className="text-6xl font-bold">Hello</h1>
          <p>Sign in to your account</p>
        </div>
        <form
          onSubmit={handleSubmit(submitData)}
          className="flex flex-col gap-6 items-center pt-12 pb-6  w-full px-2 "
        >
          <input
            className="form-control"
            {...register("username", { required: true })}
            placeholder="Enter your username"
          />
          <input
            className="form-control"
            type="password"
            {...register("password", { required: true })}
            placeholder="Your password goes here"
          />
          <Link className="text-violet-400 self-end" to="/signup">
            Forgot password?
          </Link>
        </form>
      </section>
      <section class="flex flex-col gap-2 w-full">
        <button type="submit" className="btn-primary w-full h-10 self-center">
          Login
          {/* <MdOutlineArrowBack size={24} /> */}
        </button>
        <p>
          Dont have an account?
          <Link to="/signup">Sign up</Link>
        </p>
      </section>
      <IonToast
        duration={2000}
        isOpen={error}
        message={errorMessage}
        onDidDismiss={() => setError(false)}
        buttons={[
          {
            side: "end",
            text: "OK",
            role: "cancel",
          },
        ]}
      />
    </div>
  );
};
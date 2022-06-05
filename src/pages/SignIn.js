import { useState } from "react";
import { useNavigate } from "react-router";
import { IonToast } from "@ionic/react";
import {
  MdOutlineArrowBack,
  MdAccountCircle,
  MdLock,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdOutlineArrowForward,
} from "react-icons/md";
import "@ionic/react/css/core.css";
import { Filesystem } from "@capacitor/filesystem";
import { errorHandled } from "../utils/utils";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Input } from "../components/Input";
import "./SignIn.css";

export const SignInNoPrelude = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pwdBox, setPwdBox] = useState({
    type: "password",
    "data-state": "invisible",
  });
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
        if (!data[0]) throw new Error("No data on json server");
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
  function handleIcon() {
    if (pwdBox.type === "password")
      setPwdBox({ type: "text", "data-state": "visible" });
    else setPwdBox({ type: "password", "data-state": "invisible" });
  }
  return (
    <div className="h-screen w-screen lg:w-[414px] p-4 flex flex-col justify-between sign-in">
      <nav className="w-full flex">
        <button
          aria-label="Back"
          onClick={() => {
            navigate(-1);
          }}
        >
          <MdOutlineArrowBack size={24} />
        </button>
      </nav>
      <form onSubmit={handleSubmit(submitData)}>
        <section className="w-full">
          <div className="text-center">
            <h1 className="text-6xl font-bold">Hello</h1>
            <p>Sign in to your account</p>
          </div>
          <div className="flex flex-col gap-6 items-center pt-12 pb-6  w-full px-4">
            <Input
              leftIcon={<MdAccountCircle size={24} />}
              className="form-control"
              {...register("username", { required: true })}
              placeholder="Username"
            />
            <Input
              leftIcon={<MdLock size={24} />}
              className="form-control"
              {...pwdBox}
              {...register("password", { required: true })}
              placeholder="Password"
              rightIcon={[
                <MdOutlineVisibility
                  key={crypto?.randomUUID()}
                  size={24}
                  className="password-visible"
                />,
                <MdOutlineVisibilityOff
                  key={crypto?.randomUUID()}
                  size={24}
                  className="password-invisible"
                />,
              ]}
              onRightIconClick={handleIcon}
            />
            <Link className="text-violet-400 self-end" to="/signup">
              Forgot password?
            </Link>
          </div>
        </section>
        <section className="flex flex-col gap-6 w-full pt-12 items-center px-4">
          <label className="self-end font-bold inline-flex items-center gap-2">
            Sign in
            <button
              type="submit"
              className="rounded-full px-3 py-1 self-center btn-primary"
            >
              <MdOutlineArrowForward color="white" size={24} />
            </button>
          </label>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold underline">
              Create
            </Link>
          </p>
        </section>
      </form>
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

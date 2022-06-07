import {
  MdAccountCircle,
  MdLock,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdOutlineArrowBack,
  MdEmail,
  MdPhone,
} from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "@ionic/react/css/core.css";
import { Input } from "../components/Input";
import "./SignIn.css";
import { SignInSignUpLayout } from "../modules/Auth/Layouts/SignInSignUpLayout";
function submitDevData(data, setErrorMessage, setError) {
  // Polyfill user_id gen
  data.user_id = window.crypto.randomUUID();
  fetch("http://localhost:4000/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((err) => {
      err.message === "No username or password provided"
        ? setErrorMessage(err.message)
        : setErrorMessage("Error while Signing In");
      setError(true);
    });
}
function submitSignUpData(...args) {
  const [, setErrorMessage, setError] = args;

  return function submitData(data) {
    if (process.env.NODE_ENV === "development")
      return submitDevData(data, setErrorMessage, setError);
    fetch("http://localhost:5001/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((err) => {
        err.message === "No username or password provided"
          ? setErrorMessage(err.message)
          : setErrorMessage("Error while Signing In");
        setError(true);
      });
  };
}
export const SignUpPage = () => {
  const formRets = useForm();
  const navigate = useNavigate();
  const [pwdBox, setPwdBox] = useState({
    type: "password",
    "data-state": "invisible",
  });
  function handleIcon() {
    if (pwdBox.type === "password")
      setPwdBox({ type: "text", "data-state": "visible" });
    else setPwdBox({ type: "password", "data-state": "invisible" });
  }
  return (
    <SignInSignUpLayout
      formRets={formRets}
      submitFormData={submitSignUpData}
      bgClass="sign-up"
      justify="justify-between"
      navContent={
        <button
          aria-label="Back"
          onClick={() => {
            navigate(-1);
          }}
        >
          <MdOutlineArrowBack size={24} />
        </button>
      }
      heading={<h1 className="text-3xl font-bold">Create account</h1>}
      inputs={
        <>
          <Input
            leftIcon={<MdAccountCircle size={24} />}
            className="form-control"
            type="username"
            {...formRets.register("username", { required: true })}
            placeholder="Choose your username"
          />
          <Input
            leftIcon={<MdLock size={24} />}
            className="form-control"
            {...pwdBox}
            type="password"
            {...formRets.register("password", { required: true })}
            placeholder="Create a password"
            rightIcon={
              <>
                <MdOutlineVisibility size={24} className="password-visible" />
                <MdOutlineVisibilityOff
                  size={24}
                  className="password-invisible"
                />
              </>
            }
            onRightIconClick={handleIcon}
          />
          <Input
            leftIcon={<MdEmail size={24} />}
            className="form-control"
            {...formRets.register("email", { required: true })}
            placeholder="Enter your email"
          />
          <Input
            leftIcon={<MdPhone size={24} />}
            className="form-control"
            {...formRets.register("phone_number", { required: true })}
            placeholder="Enter your phone number"
          />
        </>
      }
      submitText="Create"
    />
  );
};

import { useState } from "react";
import {
  MdAccountCircle,
  MdLock,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdOutlineArrowBack,
} from "react-icons/md";
import "@ionic/react/css/core.css";
import { Filesystem } from "@capacitor/filesystem";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import "./SignIn.css";
import { SignInSignUpLayout } from "../modules/Auth/Layouts/SignInSignUpLayout";
import { submitSignInData } from "../modules/Auth/utils";

export function SignInNoPrelude() {
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
      submitFormData={submitSignInData}
      bgClass="sign-in"
      justify="justify-between"
      navContent={
        <>
          <button
            aria-label="Back"
            onClick={() => {
              navigate(-1);
            }}
          >
            <MdOutlineArrowBack size={24} />
          </button>
        </>
      }
      heading={
        <>
          <h1 className="text-6xl font-bold">Hello</h1>
          <p>Sign in to your account</p>
        </>
      }
      inputs={
        <>
          <Input
            leftIcon={<MdAccountCircle size={24} />}
            className="form-control"
            {...formRets.register("username", { required: true })}
            placeholder="Username"
          />
          <Input
            leftIcon={<MdLock size={24} />}
            className="form-control"
            {...pwdBox}
            {...formRets.register("password", { required: true })}
            placeholder="Password"
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
          <Link className="text-violet-400 self-end" to="/signup">
            Forgot password?
          </Link>
        </>
      }
      submitText="Sign in"
    />
  );
}

import { useState, useLayoutEffect } from "react";
import { isMobile } from "../utils/utils";
import { SignInNoPrelude } from "../pages/SignIn";
import { Link } from "react-router-dom";
/**
 * A prelude that either passes the user on to signin or redirects the user to
 * a dedicated signup form
 * */
function AuthPrelude(props) {
  const { setPreludeState } = props;
  return (
    <div className="flex grow flex-col px-9 py-4 items-center prelude-image">
      <h1 className="pt-16 text-5xl">Pokalblis logo</h1>
      <section className="justify-end mt-auto pb-8 w-full flex flex-col gap-y-2.5">
        <button
          className="outline-none rounded-[1.4rem] bg-white py-3 w-full text-lg text-purple-800 font-bold"
          onClick={() => setPreludeState("signin")}
        >
          Login
        </button>
        <Link
          to="/signup"
          className="outline-none rounded-[1.4rem] bg-purple-800 py-3 w-full text-lg  text-white font-bold  text-center"
        >
          Sign-up
        </Link>
      </section>
    </div>
  );
}
/** Includes a prelude to the signin page if the app is opened in mobile. */
export function SignInWithPrelude() {
  const [preludeState, setPreludeState] = useState("");
  useLayoutEffect(() => {
    if (isMobile()) {
      setPreludeState("prelude");
    } else {
      setPreludeState("signin");
    }
  }, []);
  switch (preludeState) {
    case "prelude":
      return <AuthPrelude setPreludeState={setPreludeState} />;
    case "signin":
      return <SignInNoPrelude />;
    default:
      // Render app logo/centered loader (see instagram web)
      // -- should never happen normally due to useLayoutEffect.
      return <p>Checking your browser...</p>;
  }
}

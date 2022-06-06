import { MdFacebook } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Link, matchRoutes, useLocation } from "react-router-dom";

export function AuthSwitcher() {
  const location = useLocation();
  const routes = matchRoutes([{ path: "/" }, { path: "/signup" }], location);
  switch (routes[0].route.path) {
    case "/":
      return (
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="font-bold underline">
            Create
          </Link>
        </p>
      );
    case "/signup":
      return (
        <>
          <p>
            Already have an account?{" "}
            <Link to="/" className="font-bold underline">
              Sign in
            </Link>
          </p>
          <p>or create an account using other social media</p>
          <div className="flex flex-row justify-center">
            <Link to="/signup/withGoogle" aria-label="Sign up with google">
              <FcGoogle size={24} />
            </Link>
            <Link to="/signup/withFacebook" aria-label="Sign up with facebook">
              <MdFacebook size={24} />
            </Link>
          </div>
        </>
      );

    default:
      return <p>Rendering auth selector in unsupported page.</p>;
  }
}

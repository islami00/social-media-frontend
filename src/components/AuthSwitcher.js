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
          <p>or create account using social media</p>
          <div className="flex flex-row justify-center gap-2">
            <Link to="/signup/withGoogle" aria-label="Sign up with google">
              <FcGoogle size={36} />
            </Link>
            <Link to="/signup/withFacebook" aria-label="Sign up with facebook">
              <MdFacebook size={36} />
            </Link>
          </div>
        </>
      );

    default:
      return <p>Rendering auth selector in unsupported page.</p>;
  }
}

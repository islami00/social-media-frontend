import { errorHandled } from "../../utils/utils";

export function submitDevSignInData(data, navigate, setErrorMessage, setError) {
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

export function submitSignInData(...args) {
  const [navigate, setErrorMessage, setError] = args;
  return function submitter(loginData) {
    if (process.env.NODE_ENV === "development")
      return submitDevSignInData(
        loginData,
        navigate,
        setErrorMessage,
        setError
      );
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
  };
}

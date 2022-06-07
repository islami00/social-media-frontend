import { useState } from "react";
import { useNavigate } from "react-router";
import { IonToast } from "@ionic/react";
import { MdOutlineArrowForward } from "react-icons/md";
import { AuthSwitcher } from "../../../components/AuthSwitcher";

/**
 * @typedef {import("react-hook-form").UseFormReturn} UseFormReturn
 * @typedef {import("react-router").NavigateFunction} ReactRouterNavigateFunction
 * @typedef {React.Dispatch<React.SetStateAction<string>>} SetErrorMessage
 * @typedef {React.Dispatch<React.SetStateAction<boolean>>} SetError
 * @typedef {[ReactRouterNavigateFunction,SetErrorMessage,SetError]} SubmitDataArgs
 *
 * @typedef {Object} SignInSignUpLayoutProps
 * @property {string} bgClass -  Render a background using a class 
 * @property {React.ReactNode} navContent - The content of the upper navigation
 * @property {React.ReactNode} heading - What to render at the heading
 * @property {React.ReactNode} inputs - Input nodes to render in form body, in flexbox below the heading.
 * @property {string} submitText - What the submit button should say
 * @property {UseFormReturn} formRets -  Return value from useForm call
 * @property {(...args: SubmitDataArgs) => (loginData: any) => void} submitFormData - Function to submit form data
 * @property {string} justify - Justify-content property for overall form (can be set to center for small forms).
 * The overall form nests the nav and the section beginning with the heading.
 */
/**
 * A base layout common between the signin and signup pages, and similar forms.
 * @param {SignInSignUpLayoutProps} props {@link SignInSignUpLayoutProps}
 */
export function SignInSignUpLayout(props) {
  const {
    bgClass="",
    navContent,
    heading,
    inputs,
    submitText,
    formRets,
    submitFormData,
    justify,
  } = props;
  const navigate = useNavigate();
  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = formRets;
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const submitDataArgs = [navigate, setErrorMessage, setError];
  return (
    <div
      className={`h-screen w-screen lg:w-[414px] p-4 flex flex-col ${justify} ${bgClass}`}
    >
      <nav className="w-full flex justify-between">{navContent}</nav>
      <form onSubmit={handleSubmit(submitFormData(...submitDataArgs))}>
        <section className="w-full">
          <div className="text-center">{heading}</div>
          <div className="flex flex-col gap-6 items-center pt-12 pb-6  w-full px-4">
            {inputs}
          </div>
        </section>
        <section className="flex flex-col gap-6 w-full pt-12 items-center px-4">
          <label className="text-xl self-end font-bold inline-flex items-center gap-2">
            {submitText}
            <button
              type="submit"
              className="rounded-full px-3 py-1 self-center btn-primary"
            >
              <MdOutlineArrowForward color="white" size={24} />
            </button>
          </label>

          <div className="text-center">
            <AuthSwitcher />
          </div>
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
}

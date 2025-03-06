import clsx from "clsx";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { auth } from "../../firebase";
import { UserContext } from "../../provider/UserContext";

// Add TypeScript declaration for Reddit Pixel
declare global {
  interface Window {
    plausible: (event: string, data?: any) => void;
  }
}

const trackSignUp = () => {
  if (typeof window !== "undefined") {
    window?.plausible("Sign up");
  }
};

export const RegisterForm = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const registerForm = useForm<{
    email: string;
    password: string;
    terms: boolean;
  }>();
  const createAccount = () => {
    const { email, password } = registerForm.getValues();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        trackSignUp();
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          registerForm.setError("email", {
            type: "manual",
            message: "Email already in use",
          });
        }
        if (errorCode === "auth/weak-password") {
          registerForm.setError("password", {
            type: "manual",
            message: "Password is too weak",
          });
        }
      });
  };
  return (
    <form
      onSubmit={registerForm.handleSubmit(createAccount)}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col">
        <label className="text-sm text-gray-500" htmlFor="email">
          Email
        </label>
        <input
          autoComplete="email"
          className="rounded-md border-2 border-gray-300 px-4 py-2"
          type="email"
          id="email"
          {...registerForm.register("email", {
            required: true,
          })}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-gray-500" htmlFor="password">
          Password
        </label>
        <input
          autoComplete="new-password"
          className="rounded-md border-2 border-gray-300 px-4 py-2"
          type="password"
          id="password"
          {...registerForm.register("password", {
            required: true,
          })}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-gray-500" htmlFor="terms">
          <input
            className="mr-2"
            type="checkbox"
            id="terms"
            {...registerForm.register("terms", {
              required: true,
            })}
          />
          I accept the terms and conditions.
        </label>
      </div>
      <button
        className={clsx(
          "btn",
          !registerForm.formState.isValid && "is-disabled",
        )}
        type="submit"
        disabled={!registerForm.formState.isValid}
      >
        Register
      </button>
    </form>
  );
};

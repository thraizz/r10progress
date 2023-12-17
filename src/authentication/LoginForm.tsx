import clsx from "clsx";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../UserProvider";
import { auth } from "../firebaseConfig";

export const LoginForm = () => {
  const { setUser } = useContext(UserContext);
  const loginForm = useForm<{ email: string; password: string }>();
  const login = () => {
    const { email, password } = loginForm.getValues();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setUser(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        if (errorCode === "auth/invalid-credential") {
          loginForm.setError("email", {
            type: "manual",
            message: "Incorrect credentials.",
          });
          loginForm.setError("password", {
            type: "manual",
            message: "Incorrect credentials.",
          });
        }
        if (errorCode === "auth/user-not-found") {
          loginForm.setError("email", {
            type: "manual",
            message: "User not found",
          });
        }
      });
  };
  return (
    <form
      onSubmit={loginForm.handleSubmit(login)}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col">
        <label className="text-sm text-gray-500" htmlFor="email">
          Email
        </label>
        <input
          className={clsx(loginForm.formState.errors.email && "has-error")}
          type="email"
          id="email"
          {...loginForm.register("email", { required: true })}
        />
        {loginForm.formState.errors.email?.type === "required" && (
          <p className="text-red-500 text-sm">This field is required</p>
        )}
        {loginForm.formState.errors.email?.type === "manual" && (
          <p className="text-red-500 text-sm">
            {loginForm.formState.errors.email.message}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-gray-500" htmlFor="password">
          Password
        </label>
        <input
          className={clsx(
            "border-2 border-gray-300 px-4 py-2 rounded-md",
            loginForm.formState.errors.password && "border-red-500",
          )}
          type="password"
          id="password"
          {...loginForm.register("password", { required: true })}
        />
        {loginForm.formState.errors.password?.type === "required" && (
          <p className="text-red-500 text-sm">This field is required</p>
        )}
        {loginForm.formState.errors.password?.type === "manual" && (
          <p className="text-red-500 text-sm">
            {loginForm.formState.errors.password?.message}
          </p>
        )}
      </div>
      <button
        className={clsx(
          "btn",
          !(loginForm.formState.isValid === true) && "is-disabled",
        )}
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

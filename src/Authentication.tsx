import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "./UserProvider";
import { auth } from "./firebaseConfig";

export const Authentication = () => {
  const { setUser } = useContext(UserContext);
  const loginForm = useForm<{ email: string; password: string }>();
  const registerForm = useForm<{ email: string; password: string }>();
  const createAccount = () => {
    const { email, password } = registerForm.getValues();
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        setUser(user);
        // ...
      },
    );
  };
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
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <section className="flex flex-col flex-grow items-center justify-center bg-gray-200">
      <div className="mx-auto max-w-4xl p-4 bg-gray-100 rounded-md shadow-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Login</h2>
        <form
          onSubmit={loginForm.handleSubmit(login)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label className="text-sm text-gray-500" htmlFor="email">
              Email
            </label>
            <input
              className="border-2 border-gray-300 px-4 py-2 rounded-md"
              type="email"
              id="email"
              {...loginForm.register("email")}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-500" htmlFor="password">
              Password
            </label>
            <input
              className="border-2 border-gray-300 px-4 py-2 rounded-md"
              type="password"
              id="password"
              {...loginForm.register("password")}
            />
          </div>
          <button
            className="border-2 border-gray-300 px-4 py-2 rounded-md bg-sky-200"
            type="submit"
          >
            Login
          </button>
        </form>
        <p>Or</p>
        <h2 className="text-2xl font-bold"> Register </h2>
        <form
          onSubmit={registerForm.handleSubmit(createAccount)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <label className="text-sm text-gray-500" htmlFor="email">
              Email
            </label>
            <input
              className="border-2 border-gray-300 px-4 py-2 rounded-md"
              type="email"
              id="email"
              {...registerForm.register("email")}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-500" htmlFor="password">
              Password
            </label>
            <input
              className="border-2 border-gray-300 px-4 py-2 rounded-md"
              type="password"
              id="password"
              {...registerForm.register("password")}
            />
          </div>
          <button
            className="border-2 border-gray-300 px-4 py-2 rounded-md bg-sky-200"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

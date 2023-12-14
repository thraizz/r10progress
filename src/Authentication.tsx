import { Tab } from "@headlessui/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "./UserProvider";
import { auth } from "./firebaseConfig";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Authentication = () => {
  const { setUser } = useContext(UserContext);
  const loginForm = useForm<{ email: string; password: string }>();
  const registerForm = useForm<{
    email: string;
    password: string;
    terms: boolean;
  }>();
  const createAccount = () => {
    const { email, password } = registerForm.getValues();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        setUser(user);
        // ...
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
        if (errorCode === "auth/wrong-password") {
          loginForm.setError("password", {
            type: "manual",
            message: "Incorrect password",
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
    <section className="flex flex-col flex-grow items-center py-12 bg-gray-50">
      <div className="mx-auto max-w-4xl p-4 bg-white rounded-md shadow-md flex flex-col gap-4">
        <Tab.Group>
          <Tab.List className="-mb-px flex">
            <Tab className="focus-visible:outline-none w-full pb-4">
              {({ selected }) => (
                <span
                  className={classNames(
                    selected
                      ? "border-indigo-500 text-indigo-600"
                      : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap border-b-2 text-sm font-medium w-full text-center pb-4 block",
                  )}
                >
                  Login
                </span>
              )}
            </Tab>
            <Tab className="focus-visible:outline-none w-full pb-4">
              {({ selected }) => (
                <span
                  className={classNames(
                    selected
                      ? "border-indigo-500 text-indigo-600"
                      : "border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "whitespace-nowrap border-b-2 text-sm font-medium w-full text-center pb-4 block",
                  )}
                >
                  Register
                </span>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              {/* <h2 className="text-2xl font-bold mb-4">Login</h2> */}
              <form
                onSubmit={loginForm.handleSubmit(login)}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500" htmlFor="email">
                    Email
                  </label>
                  <input
                    className={classNames(
                      loginForm.formState.errors.email ? "has-error" : "",
                    )}
                    type="email"
                    id="email"
                    {...loginForm.register("email", { required: true })}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-red-500 text-sm">
                      This field is required
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-gray-500" htmlFor="password">
                    Password
                  </label>
                  <input
                    className={classNames(
                      "border-2 border-gray-300 px-4 py-2 rounded-md",
                      loginForm.formState.errors.password
                        ? "border-red-500"
                        : "",
                    )}
                    type="password"
                    id="password"
                    {...loginForm.register("password", { required: true })}
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-red-500 text-sm">
                      This field is required
                    </p>
                  )}
                </div>
                <button
                  className={classNames(
                    "btn",
                    loginForm.formState.isValid === false ? "is-disabled" : "",
                  )}
                  type="submit"
                >
                  Login
                </button>
              </form>
            </Tab.Panel>
            <Tab.Panel>
              {/* <h2 className="text-2xl font-bold mb-4">Register</h2> */}
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
                    className="border-2 border-gray-300 px-4 py-2 rounded-md"
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
                  className={classNames(
                    "btn",
                    !registerForm.formState.isValid ? "is-disabled" : "",
                  )}
                  type="submit"
                  disabled={!registerForm.formState.isValid}
                >
                  Register
                </button>
              </form>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </section>
  );
};

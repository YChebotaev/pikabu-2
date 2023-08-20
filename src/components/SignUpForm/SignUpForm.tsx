import { type FC } from "react";
import type { SignupErrorCodes } from "@/types";

export const SignUpForm: FC<{
  initialUsername?: string;
  initialEmail?: string;
  errorCode?: SignupErrorCodes;
}> = ({ errorCode, initialUsername, initialEmail }) => {
  return (
    <div className="bg-slate-100 rounded shadow sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 className="text-lg font-medium text-center p-4">Регистрация</h1>
      <form action="/api/auth/signup" method="POST" className="pb-4">
        <div className="px-4 mt-2">
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Имя пользователя
          </label>
          <div className="mt-2">
            <input
              required
              defaultValue={initialUsername}
              id="username"
              name="username"
              autoComplete="username"
              pattern="^[a-zA-Z0-9\-\_\$]{3,}$"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
            {errorCode === "username_empty" && (
              <div className="text-red-600 pt-2 text-sm">
                Укажите имя пользователя
              </div>
            )}
            {errorCode === "username_pattern" && (
              <div className="text-red-600 pt-2 text-sm">
                Имя пользователя должно содержать не менее трех латинских букв
                и/или цифр
              </div>
            )}
            {errorCode === "username_taken" && (
              <div className="text-red-600 pt-2 text-sm">
                Такой пользователь уже существует
              </div>
            )}
          </div>
        </div>
        <div className="px-4 mt-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Емейл
          </label>
          <div className="mt-2">
            <input
              required
              defaultValue={initialEmail}
              id="email"
              name="email"
              type="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
            {errorCode === "email_empty" && (
              <div className="text-red-600 pt-2 text-sm">Укажите емейл</div>
            )}
            {errorCode === "email_pattern" && (
              <div className="text-red-600 pt-2 text-sm">
                Некорректный емейл
              </div>
            )}
            {errorCode === "email_taken" && (
              <div className="text-red-600 pt-2 text-sm">
                Кто-то уже зарегистрировался с таким емейлом
              </div>
            )}
          </div>
        </div>
        <div className="px-4 mt-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Пароль
          </label>
          <div className="mt-2">
            <input
              required
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
            {errorCode === "password_empty" && (
              <div className="text-red-600 pt-2 text-sm">Укажите пароль</div>
            )}
          </div>
        </div>
        <div className="px-4 mt-2">
          <label
            htmlFor="password-2"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Повторите пароль
          </label>
          <div className="mt-2">
            <input
              required
              id="password-2"
              name="password_2"
              type="password"
              autoComplete="new-password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
            {errorCode === "passwords_not_match" && (
              <div className="text-red-600 pt-2 text-sm">
                Пароли не совпадают
              </div>
            )}
          </div>
        </div>
        <div className="px-4 mt-4">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-[#be3455] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#e54d71] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  );
};

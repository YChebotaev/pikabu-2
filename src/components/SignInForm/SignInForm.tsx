import { type FC } from "react";
import type { SigninErrorCodes } from "@/types";

export const SignInForm: FC<{
  initialIdentity?: string;
  errorCode?: SigninErrorCodes;
}> = ({ errorCode, initialIdentity }) => {
  return (
    <div className="bg-slate-100 rounded shadow sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 className="text-lg font-medium text-center p-4">Регистрация</h1>
      <form action="/api/auth/signin" method="POST" className="pb-4">
        <div className="px-4 mt-2">
          <label
            htmlFor="identity"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Имя пользователя или емейл
          </label>
          <div className="mt-2">
            <input
              // required
              defaultValue={initialIdentity}
              id="identity"
              name="identity"
              autoComplete="username"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
            {errorCode === "identity_empty" && (
              <div className="text-red-600 pt-2 text-sm">
                Укажите имя пользователя или емейл
              </div>
            )}
            {errorCode === "identity_pattern" && (
              <div className="text-red-600 pt-2 text-sm">
                Имя пользователя или пароль введен не верно
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
              // required
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
            {errorCode === "password_mismatch" && (
              <div className="text-red-600 pt-2 text-sm">
                Пароль не подходит
              </div>
            )}
          </div>
        </div>

        <div className="px-4 mt-4">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};

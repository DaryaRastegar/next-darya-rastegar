import { useState } from "react";
import { useLogin } from "../../services/mutation";
import { setCookie } from "../../utils/cookie";
import Link from "next/link";

import styles from "./LoginPage.module.css"
import { useRouter } from "next/router";

function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  const { mutate } = useLogin();

  const changeHandler = (event) => {
    setForm((form) => ({ ...form, [event.target.name]: event.target.value }));
  };

  const loginHandler = async(event) => {
    event.preventDefault();

    const { username, password } = form;

    if (!username || !password)
      return alert("User Name and Password is Necessary");

    mutate(form, {
      onSuccess: (data) => {
        console.log(data.data);
        setCookie("token", data.data?.token);
        router.push("/")
      },
      onError: (error) => console.log(error.response.data.message),
    });
  };

  return (
    <form onSubmit={loginHandler} className={styles.logIn}>
      <div>
        <img src="Union.svg" alt="" />
        <h3>Log-In Form</h3>
      </div>
      <input
        type="text"
        name="username"
        placeholder="username"
        autoComplete="username"
        value={form.username}
        onChange={changeHandler}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        autoComplete="current-password"
        value={form.password}
        onChange={changeHandler}
      />
      <button type="submit">log-in</button>
      <Link href="/registration">Have you been Registered?</Link>
    </form>
  );
}

export default LoginPage;

import React, { useState } from "react";
import { useHistory } from "react-router";
import { useUserContext } from "../context";
import { fetchLogin } from "../modules/fetchModule.js";
import "../css/TodoLogin.css";
import { GoogleButton } from ".";

export default function Login() {
  const [account, setAccount] = useState({
    userid: "",
    password: "",
  });

  const { setUser } = useUserContext();

  const history = useHistory();

  const onChange = (e) =>
    setAccount({ ...account, [e.target.name]: e.target.value });

  const onBtnClick = () => {
    if (account.userid === "" || account.password === "") {
      alert("아이디와 비밀번호를 입력해주세요!");
    } else {
      onLogin();
    }
  };

  const onLogin = async (e) => {
    const { userid, password } = account;
    const result = await fetchLogin(userid, password);
    await setUser(result);
    history.replace("/");
  };
  return (
    <div className="todo_login">
      <div className="login_title">Login</div>
      <div className="login_wrapper">
        <input name="userid" onChange={onChange} placeholder="ID" />
        <input
          type="password"
          name="password"
          onChange={onChange}
          placeholder="PASSWORD"
        />
        <button className="btn_login" onClick={onBtnClick}>
          LOGIN
        </button>
        <GoogleButton />
      </div>
    </div>
  );
}

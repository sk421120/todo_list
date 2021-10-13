import React from "react";
import { useHistory } from "react-router";

export default function LogoutButton({ children }) {
  const history = useHistory();
  const btn_logout = () => {
    history.push("/logout");
  };
  return (
    <div onClick={btn_logout} className="btn_logout">
      {children ? children : "hello"}
    </div>
  );
}

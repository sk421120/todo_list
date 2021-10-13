import { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LogoutButton } from "..";
import {
  AppContextProvider,
  UserContextProvider,
  useUserContext,
} from "../../context";
import "../../css/TodoMain.css";
import { fetchUser } from "../../modules/fetchModule.js";

const TodoMain = ({ header, form, children }) => {
  //   const history = useHistory();

  const { user } = useUserContext();

  //   const fetchLoginUser = useCallback(async () => {
  //     const resultUser = await fetchUser();
  //     if (resultUser?.userid) await setUser(resultUser);
  //     else history.replace("/");
  //   }, [setUser]);

  //   useEffect(fetchLoginUser, [fetchLoginUser]);

  return (
    <AppContextProvider>
      <UserContextProvider>
        <div className="todo_main">
          <main className="todo_main_layout">
            <div className="title">
              {header}
              <LogoutButton>{user.userid}</LogoutButton>
            </div>
            <section className="form_wrapper">{form}</section>
            <section className="list_wrapper">{children}</section>
          </main>
        </div>
      </UserContextProvider>
    </AppContextProvider>
  );
};

export default TodoMain;

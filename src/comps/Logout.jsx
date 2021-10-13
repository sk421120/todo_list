import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router";
import { useUserContext } from "../context";
import { fetchLogout } from "../modules/fetchModule";

function Logout() {
  const history = useHistory();
  const { user, setUser } = useUserContext();
  const fetch_logout = useCallback(async () => {
    await fetchLogout();
    await setUser([]);
    history.replace("/login");
  }, [setUser]);

  useEffect(fetch_logout, [fetch_logout]);
  return (
    <div>
      <>{!user?.userid && user.userid}</>
    </div>
  );
}

export default Logout;

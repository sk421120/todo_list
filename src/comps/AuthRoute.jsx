import { useCallback, useEffect } from "react";
import { useHistory } from "react-router";
import { useUserContext } from "../context";

function AuthRoute({ children }) {
  const { setUser } = useUserContext();
  const history = useHistory();

  //   const fetchCallBack = useCallback(async () => {
  //     const resultUser = await fetchUser();
  //     if (!resultUser?.userid) history.replace("/login");
  //     await setUser(resultUser);
  //   });
  const fetchCallBack = useCallback(async () => {
    await window.gapi.auth2.init({
      client_id:
        "143239812932-pq6856bf5pqql89i17a38vpl11ne8v5p.apps.googleusercontent.com",
      scope: "profile email",
    });
    if (!window.gapi) {
      alert("GOOGLE API NOT FOUND");
    }

    // gapi(google API)로 부터 auth2 객체를 조회하기
    const auth2 = await window?.gapi?.auth2.getAuthInstance();

    if (!auth2) {
      history.replace("/login");
    }

    // 로그인되어있는 사용자 정보 getter
    const googleUser = await auth2.currentUser.get();
    const profile = await googleUser.getBasicProfile();

    if (!profile) {
      history.replace("/login");
    }

    const user = {
      email: profile.getEmail(),
      id: profile.getId(),
      name: profile.getName(),
      image: profile.getImageUrl(),
      Token: googleUser.getAuthResponse().id_token,
    };

    await setUser(user);
  }, [history, setUser]);

  useEffect(fetchCallBack, [fetchCallBack]);

  return <>{children}</>;
}

export default AuthRoute;

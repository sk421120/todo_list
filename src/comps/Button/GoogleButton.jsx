import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../../context";
import "../../css/GoogleButton.css";

function GoogleButton() {
  const buttonRef = useRef();

  const { setUser } = useUserContext();

  const history = useHistory();

  const googleResponse = (result) => {
    const profile = result.getBasicProfile();
    const email = profile.getEmail();
    const id = profile.getId();
    const name = profile.getName();
    const image = profile.getImageUrl();

    const Token = result.getAuthResponse().id_token;
    setUser({ userid: email, login_source: "GOOGLE" });
    alert(email + " Hello~");
    history.replace("/");
  };

  /*
	public/index.html 파일에 script를 import 한다
	src="http://apis.google.com/js/api:client.js"
	*/
  const googleSDK_init = () => {
    if (!window.gapi) {
      alert("GOOGLE API NOT FOUND");
      return;
    }

    //   alert("GOOGLE API OK");
    // google API가 활성화되고 활성화된 API중에서 auth2가 loading(사용할 준비가 되면)
    // gapi : google cloud service를 JS에서 사용하기 위한 객체 도구
    // gapi의 load() 함수를 사용하여 auth2 객체를 초기화하기
    // 이때 google로 부터 부여받은 client_id를 입력한다
    window.gapi.load("auth2", async () => {
      // load() 함수에 의해서 auth2 객체가 초기화 된다
      // auth2 객체 : google cloud service를 사용한 oAuth2 인증시스템에 접근할 수 있는 객체
      // google로 로그인을 구현하기 위한 초기화 절차
      const auth2 = await window.gapi.auth2.init({
        client_id:
          "143239812932-pq6856bf5pqql89i17a38vpl11ne8v5p.apps.googleusercontent.com",
        scope: "profile email",
      });

      if (auth2?.isSignedIn.get()) {
        console.log("Already Login Now");
        // 원하는 곳으로 redirect
      }

      // 버튼을 클릭했을때
      // google 로그인 창이 뜨도록 하는 click event 핸들러 설정
      // buttonRef 가 ref로 설정된 컴포넌트(button 등)에 클릭 이벤트를 설정하고
      // 해당 컴포넌트를 클릭하면 google 로그인 창이 뜨도록 설정하기
      // 	attachClickHandler
      //   auth2.attachClickHandler(buttonRef.current, {});
      // google login 창이 popup 되고, id를 선택하여, 정상적으로 로그인이 수행되면
      // 로그인 이후 작동되는 callback 함수를 3번째 매개변수로 설정한다
      //   await auth2.attachClickHandler(buttonRef.current, {}, googleResponse);
      // google login 창이 popup 된 후 그냥 창을 닫거나 또는 정상적으로 로그인이 수행되지 않았을때
      // 실행되는 함수를 4번째 매개변수로 설정한다
      // 1번째 매개변수 : 누구를 클릭했을때
      // 2번째 매개변수 : 옵션
      // 3번째 매개변수 : 로그인이 성공했을때 실행할 함수
      // 4번째 매개변수 : 로그인이 실패했을때 실행할 함수
      await auth2.attachClickHandler(
        buttonRef.current,
        {},
        googleResponse,
        (error) => {
          alert(JSON.stringify(error));
        }
      );
    });
  };

  useEffect(googleSDK_init, []);

  const logout = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2?.disconnect();
    alert("Logout OK");
  };

  return (
    <div id="buttonWrapper">
      <div id="myGoogleBtn" ref={buttonRef}>
        <span className="icon"></span>
        <span className="buttonText">Google Login</span>
      </div>
      <span className="buttonText" onClick={logout}>
        Google Logout
      </span>
    </div>
  );
}

export default GoogleButton;

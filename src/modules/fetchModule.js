const fetchOption = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
  credentials: "include",
};

const fetchUser = async () => {
  const response = await fetch("http://localhost:8000/users", {
    fetchOption,
  });
  if (response?.ok) return await response.json();
  else return [];
};

const fetchLogin = async (userid, password) => {
  // 이미 선언된 fetchOption에 body 속성을 추가하기
  fetchOption.body = JSON.stringify({ userid, password });
  const response = await fetch(
    "http://localhost:8000/users/login",
    fetchOption
  );
  if (response?.ok) return await response.json();
  else {
    alert("Login Fail");
    return [];
  }
};

const fetchLogout = async () => {
  const response = await fetch("http://localhost:8000/users/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    credentials: "include",
  });
  return response.json();
};

export { fetchUser, fetchLogin, fetchLogout };

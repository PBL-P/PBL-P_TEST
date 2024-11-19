import http from "../http-common";

class LoginDataService {
  // 로그인
  login(data) {
    return http.post("/auth/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // 회원가입
  register(data) {
    return http.post("/auth/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default new LoginDataService();

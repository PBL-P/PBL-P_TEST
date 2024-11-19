import http from "../http-common";

class LoginDataService {
  // 설계서 - 작성 방법 및 예시
  getAll() {
    return http.get("/instruction/design");  // designs 경로로 변경
  }

  get(id) {
    return http.get(`/instruction/design/${id}`);
  }

  create(data) {
    return http.post("/instruction/design/register", data);
  }

  update(id, data) {
    return http.put(`/instruction/design/register/${id}`, data);
  }

  delete(id) {
    return http.delete(`/instruction/design/${id}`);
  }

  deleteAll() {
    return http.delete(`/instruction/design`);
  }
	findByTitle(title) {
    return http.get(`/instruction/design/submit?title=${title}`);
  }
  // 설계서 - 제출
  s_getAll() {
    return http.get("/submission/design/submit");  // designs 경로로 변경
  }

  s_get(id) {
    return http.get(`/submission/design/submit/${id}`);
  }

  s_create(data) {
    return http.post("/submission/design/submit/register", data);
  }

  s_update(id, data) {
    return http.put(`/submission/design/submit/register/${id}`, data);
  }

  s_delete(id) {
    return http.delete(`/submission/design/submit/${id}`);
  }

  s_deleteAll() {
    return http.delete(`/submission/design/submit`);
  }

  s_findByTitle(title) {
    return http.get(`/submission/design/submit?title=${title}`);
  }
}

export default new LoginDataService();
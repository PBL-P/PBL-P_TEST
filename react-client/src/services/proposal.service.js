import http from "../http-common";

class ProposalDataService {
  // 제안서 - 작성 방법 및 예시
  getAll() {
    return http.get("/instruction/proposal");  // proposals 경로로 변경
  }

  get(id) {
    return http.get(`/instruction/proposal/${id}`);
  }

  create(data) {
    return http.post("/instruction/proposal/register", data);
  }

  update(id, data) {
    return http.put(`/instruction/proposal/register/${id}`, data);
  }

  delete(id) {
    return http.delete(`/instruction/proposal/${id}`);
  }

  deleteAll() {
    return http.delete(`/instruction/proposal`);
  }
	findByTitle(title) {
    return http.get(`/instruction/proposal/submit?title=${title}`);
  }
  // 제안서 - 제출
  s_getAll() {
    return http.get("/submission/proposal/submit");  // proposals 경로로 변경
  }

  s_get(id) {
    return http.get(`/submission/proposal/submit/${id}`);
  }

  s_create(data) {
    return http.post("/submission/proposal/submit/register", data);
  }

  s_update(id, data) {
    return http.put(`/submission/proposal/submit/register/${id}`, data);
  }

  s_delete(id) {
    return http.delete(`/submission/proposal/submit/${id}`);
  }

  s_deleteAll() {
    return http.delete(`/submission/proposal/submit`);
  }

  s_findByTitle(title) {
    return http.get(`/submission/proposal/submit?title=${title}`);
  }
}

export default new ProposalDataService();
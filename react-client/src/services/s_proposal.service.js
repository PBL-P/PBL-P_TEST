import http from "../http-common";

class ProposalDataService {
  // 제안서 - 작성 방법 및 예시
  getAll() {
    return http.get("/proposal");  // proposals 경로로 변경
  }

  get(id) {
    return http.get(`/proposal/${id}`);
  }

  create(data) {
    return http.post("/proposal/register", data);
  }

  update(id, data) {
    return http.put(`/proposal/register/${id}`, data);
  }

  delete(id) {
    return http.delete(`/proposal/${id}`);
  }

  deleteAll() {
    return http.delete(`/proposal`);
  }
	findByTitle(title) {
    return http.get(`/proposal/submit?title=${title}`);
  }
  
}

export default new ProposalDataService();
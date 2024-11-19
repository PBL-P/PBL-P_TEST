import http from "../http-common";

class PlanDataService {
  // 기획서 - 작성 방법 및 예시
  getAll() {
    return http.get("/instruction/plan");  // plans 경로로 변경
  }

  get(id) {
    return http.get(`/instruction/plan/${id}`);
  }

  create(data) {
    return http.post("/instruction/plan/register", data);
  }

  update(id, data) {
    return http.put(`/instruction/plan/register/${id}`, data);
  }

  delete(id) {
    return http.delete(`/instruction/plan/${id}`);
  }

  deleteAll() {
    return http.delete(`/instruction/plan`);
  }
	findByTitle(title) {
    return http.get(`/instruction/plan/submit?title=${title}`);
  }
  // 제안서 - 예시
  e_getAll() {
    return http.get("/example/plan");  // plans 경로로 변경
  }

  e_get(id) {
    return http.get(`/example/plan/${id}`);
  }

  e_create(data) {
    return http.post("/example/plan/register", data);
  }

  e_update(id, data) {
    return http.put(`/example/plan/register/${id}`, data);
  }

  e_delete(id) {
    return http.delete(`/example/plan/${id}`);
  }

  e_deleteAll() {
    return http.delete(`/example/plan`);
  }

  e_findByTitle(title) {
    return http.get(`/example/plan?title=${title}`);
  }  
  
  // 기획서 - 제출
  s_getAll() {
    return http.get("/submission/plan/submit");  // plans 경로로 변경
  }

  s_get(id) {
    return http.get(`/submission/plan/submit/${id}`);
  }

  s_create(data) {
    return http.post("/submission/plan/submit/register", data);
  }

  s_update(id, data) {
    return http.put(`/submission/plan/submit/register/${id}`, data);
  }

  s_delete(id) {
    return http.delete(`/submission/plan/submit/${id}`);
  }

  s_deleteAll() {
    return http.delete(`/submission/plan/submit`);
  }

  s_findByTitle(title) {
    return http.get(`/submission/plan/submit?title=${title}`);
  }
}

export default new PlanDataService();
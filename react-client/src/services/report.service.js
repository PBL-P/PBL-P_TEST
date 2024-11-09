import http from "../http-common";

class ReportDataService {
  // 결과 보고서 - 작성 방법 및 예시
  getAll() {
    return http.get("/instruction/report");  // reports 경로로 변경
  }

  get(id) {
    return http.get(`/instruction/report/${id}`);
  }

  create(data) {
    return http.post("/instruction/report/register", data);
  }

  update(id, data) {
    return http.put(`/instruction/report/register/${id}`, data);
  }

  delete(id) {
    return http.delete(`/instruction/report/${id}`);
  }

  deleteAll() {
    return http.delete(`/instruction/report`);
  }
	findByTitle(title) {
    return http.get(`/instruction/report/submit?title=${title}`);
  }
  // 결과보고서 - 제출
  s_getAll() {
    return http.get("/submission/report/submit");  // reports 경로로 변경
  }

  s_get(id) {
    return http.get(`/submission/report/submit/${id}`);
  }

  s_create(data) {
    return http.post("/submission/report/submit/register", data);
  }

  s_update(id, data) {
    return http.put(`/submission/report/submit/register/${id}`, data);
  }

  s_delete(id) {
    return http.delete(`/submission/report/submit/${id}`);
  }

  s_deleteAll() {
    return http.delete(`/submission/report/submit`);
  }

  s_findByTitle(title) {
    return http.get(`/submission/report/submit?title=${title}`);
  }
}

export default new ReportDataService();
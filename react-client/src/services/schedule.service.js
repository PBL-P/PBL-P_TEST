import http from "../http-common";

class ScheduleDataService {
  // 결과 보고서 - 작성 방법 및 예시
  getAll() {
    return http.get("/instruction/schedule");  // schedules 경로로 변경
  }

  get(id) {
    return http.get(`/instruction/schedule/${id}`);
  }

  create(data) {
    return http.post("/instruction/schedule/register", data);
  }

  update(id, data) {
    return http.put(`/instruction/schedule/register/${id}`, data);
  }

  delete(id) {
    return http.delete(`/instruction/schedule/${id}`);
  }

  deleteAll() {
    return http.delete(`/instruction/schedule`);
  }
	findByTitle(title) {
    return http.get(`/instruction/schedule/submit?title=${title}`);
  }
  // 제안서 - 예시
  e_getAll() {
    return http.get("/example/schedule");  // schedules 경로로 변경
  }

  e_get(id) {
    return http.get(`/example/schedule/${id}`);
  }

  e_create(data) {
    return http.post("/example/schedule/register", data);
  }

  e_update(id, data) {
    return http.put(`/example/schedule/register/${id}`, data);
  }

  e_delete(id) {
    return http.delete(`/example/schedule/${id}`);
  }

  e_deleteAll() {
    return http.delete(`/example/schedule`);
  }

  e_findByTitle(title) {
    return http.get(`/example/schedule?title=${title}`);
  }    
  // 결과보고서 - 제출
  s_getAll() {
    return http.get("/submission/schedule/submit");  // schedules 경로로 변경
  }

  s_get(id) {
    return http.get(`/submission/schedule/submit/${id}`);
  }

  s_create(data) {
    return http.post("/submission/schedule/submit/register", data);
  }

  s_update(id, data) {
    return http.put(`/submission/schedule/submit/register/${id}`, data);
  }

  s_delete(id) {
    return http.delete(`/submission/schedule/submit/${id}`);
  }

  s_deleteAll() {
    return http.delete(`/submission/schedule/submit`);
  }

  s_findByTitle(title) {
    return http.get(`/submission/schedule/submit?title=${title}`);
  }
}

export default new ScheduleDataService();
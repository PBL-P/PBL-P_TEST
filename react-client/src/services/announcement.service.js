import http from "../http-common";

class AnnouncementDataService {
  // 공지사항
  getAll() {
    return http.get("/announcement");
  }

  get(id) {
    return http.get(`/announcement/${id}`);
  }

  create(data) {
    return http.post("/announcement/register", data);
  }

  update(id, data) {
    return http.put(`/announcement/register/${id}`, data);
  }

  delete(id) {
    return http.delete(`/announcement/${id}`);
  }

  deleteAll() {
    return http.delete(`/announcement`);
  }
	findByTitle(title) {
    return http.get(`/announcement/submit?title=${title}`);
  }
}

export default new AnnouncementDataService();
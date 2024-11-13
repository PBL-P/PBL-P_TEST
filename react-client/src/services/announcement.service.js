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

  // 댓글 등록 기능
  c_create(announcementId, data) {
    return http.post(`/announcement/${announcementId}/comment`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
  }
  c_getAll(announcementId) {
    return http.get(`/announcement/${announcementId}/comment`);
  }

  // c_update 함수 수정
  c_update(announcementId, commentId, data) {
    return http.put(`/announcement/${announcementId}/comment/${commentId}`, data, {
        headers: { 'Content-Type': 'application/json' }
    });
  }

  c_delete(announcementId, commentId) {
    return http.delete(`/announcement/${announcementId}/comment/${commentId}`);
  }
}

export default new AnnouncementDataService();
import request from "request-promise";
class TopicService {
  private baseUrl: string;
  constructor(opts) {
    this.baseUrl = opts.baseUrl;
  }
  public async getHomeTopics(qs: any) {
    return request
      .get(`${this.baseUrl}/topics`, {
        qs,
        json: true
      })
      .then(res => {
        return res.data || [];
      });
  }

  public async getById(id: string) {
    return request.get(`/topic/${id}`).then(res => res.data || {});
  }
}
export { TopicService };

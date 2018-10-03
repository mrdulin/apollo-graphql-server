class TopicService {
  public getHomeTopics(qs, ctx) {
    return ctx.conn.cnode.get("/topics", qs).then(res => res.data || []);
  }

  public getById(id, ctx) {
    return ctx.conn.cnode.get(`/topic/${id}`).then(res => res.data || {});
  }
}
export { TopicService };

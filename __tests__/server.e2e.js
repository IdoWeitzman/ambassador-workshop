import axios from 'axios';
import { AmbassadorTestkit } from '@wix/ambassador-testkit';
import { NodeWorkshopScalaApp } from '@wix/ambassador-node-workshop-scala-app/rpc';
import { aComment } from '@wix/ambassador-node-workshop-scala-app/builders';

describe('When rendering', () => {
  it('should display a title', async () => {
    const url = app.getUrl('/');
    const response = await axios.get(url);

    expect(response.data).toContain('Wix Full Stack Project Boilerplate');
  });

  describe('API integration tests', () => {
    const ambassadorTestkit = new AmbassadorTestkit(); // create new instance of the testkit
    ambassadorTestkit.beforeAndAfter(); // register its before and after handlers

    it('list comments', async () => {
      const siteId = '1234';
      const url = app.getUrl(`/my_api/comments?siteId=${siteId}`);
      const comments = [aComment().build()];

      ambassadorTestkit
        .createStub(NodeWorkshopScalaApp)
        .CommentsService()
        .fetch.when(siteId)
        .resolve(comments);

      const response = await axios.get(url);
      expect(response.data).toEqual(comments);
    });

    it('post comment', async () => {
      const siteId = '1234';
      const url = app.getUrl(`/my_api/comments?siteId=${siteId}`);
      const callCounter = jest.fn();
      const comment = { comment: 'hello' };

      ambassadorTestkit
        .createStub(NodeWorkshopScalaApp)
        .CommentsService()
        .add.when(siteId, comment)
        .call(callCounter);

      await axios.post(url, comment);
      expect(callCounter).toHaveBeenCalledTimes(1);
    });
  });
});

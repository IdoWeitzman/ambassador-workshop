const { bootstrapServer, emitConfigs } = require('./environment');
const { AmbassadorTestkit } = require('@wix/ambassador-testkit');
const {
  NodeWorkshopScalaApp,
} = require('@wix/ambassador-node-workshop-scala-app/rpc');
const {
  aComment,
} = require('@wix/ambassador-node-workshop-scala-app/builders');

(async () => {
  const app = bootstrapServer();

  /** Start RPC Mocks **/
  const ambassadorTestkit = new AmbassadorTestkit();
  const siteId = '1234';

  ambassadorTestkit
    .createStub(NodeWorkshopScalaApp)
    .CommentsService()
    .fetch.when(siteId)
    .resolve([aComment().withAuthor('Ambassador').withText('Rocks!').build()]);

  ambassadorTestkit.start();
  /** End RPC Mocks **/

  await emitConfigs();
  await app.start();
})();

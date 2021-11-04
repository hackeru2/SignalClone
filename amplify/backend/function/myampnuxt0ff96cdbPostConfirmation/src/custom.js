const aws = require("aws-sdk");
const ddb = new aws.DynamoDB();
const tableName = process.env.USERTABLE;

exports.handler = async (event, context, callback) => {
  // insert code to be executed by your lambda trigger
  // save a new user to dynamo db
  if (!event?.request?.userAttributes?.sub) {
    console.log("no sub provided");
    console.log({ event });
    return;
  }
  const ts = new Date().getTime();
  var isoString = new Date().toISOString();
  const userItem = {
    __typename: { S: "User" },
    _lastChangedAt: { N: ts.toString() },
    _version: { N: "1" },
    createdAt: { S: isoString },
    updatedAt: { S: isoString },
    id: { S: event.request.userAttributes.sub },
    name: { S: event.request.userAttributes.email },
  };
  const params = {
    Item: userItem,
    TableName: tableName,
  };
  try {
    await ddb.putItem(params).promise();
    console.log("success");
  } catch (error) {
    console.log("ERROR!!!");

    console.log({ error });
  }

  // callback(null, event);
};

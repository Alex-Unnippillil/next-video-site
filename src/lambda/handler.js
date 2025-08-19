const { AWSXRay } = require('../tracing');

const baseHandler = async (event) => {
  return {
    statusCode: 200,
    body: 'Hello from Lambda'
  };
};

exports.handler = AWSXRay.captureLambdaHandler(baseHandler);

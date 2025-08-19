import { APIGatewayProxyHandler } from 'aws-lambda';
import { z } from 'zod';
import { authenticate } from './auth';

const querySchema = z.object({ q: z.string().min(1) });

export const search: APIGatewayProxyHandler = async (event) => {
  try {
    await authenticate(event);
    const { q } = querySchema.parse(event.queryStringParameters || {});
    return {
      statusCode: 200,
      body: JSON.stringify({ results: [], query: q }),
    };
  } catch (err: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: err.message }),
    };
  }
};

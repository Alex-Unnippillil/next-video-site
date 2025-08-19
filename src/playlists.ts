import { APIGatewayProxyHandler } from 'aws-lambda';
import { z } from 'zod';
import { authenticate } from './auth';

const pathSchema = z.object({ id: z.string().min(1) });

export const getPlaylist: APIGatewayProxyHandler = async (event) => {
  try {
    await authenticate(event);
    const { id } = pathSchema.parse(event.pathParameters || {});
    return {
      statusCode: 200,
      body: JSON.stringify({ id, title: 'Example playlist' }),
    };
  } catch (err: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: err.message }),
    };
  }
};

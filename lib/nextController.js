export async function runController(controller, request, { body } = {}) {
  const url = new URL(request.url);
  let statusCode = 200;
  let responseBody;

  const response = {
    status(code) {
      statusCode = code;
      return response;
    },
    json(value) {
      responseBody = value;
      return response;
    },
  };

  const req = {
    body,
    query: Object.fromEntries(url.searchParams.entries()),
    params: {},
  };

  try {
    await controller(req, response, (error) => {
      throw error;
    });
    return Response.json(responseBody ?? { error: 'Empty API response' }, { status: statusCode });
  } catch (error) {
    console.error('API route error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}
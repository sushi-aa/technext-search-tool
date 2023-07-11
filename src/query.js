const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    const keyword = event.queryStringParameters.query;
    const resp = await fetch('https://testtechnext1-pearl118.b4a.run/search/api/query/?query=' + keyword);
    const jsonResp = await resp.json();
    console.log(jsonResp);
    return {
      statusCode: 200,
      body: JSON.stringify(jsonResp),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not fetch data' }),
    };
  }
};
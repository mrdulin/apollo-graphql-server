import requestPromise from 'request-promise';

import { config } from '../config';

function request(options: any) {
  const url = options.url || config.GRAPHQL_ENDPOINT;
  function post(api: string, body: any) {
    const uri = url + api;
    return requestPromise(uri, {
      method: 'POST',
      body,
      json: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  function get(api: string, qs: any) {
    const uri = url + api;
    return requestPromise(uri, {
      method: 'GET',
      qs,
      json: true
    });
  }

  return {
    post,
    get
  };
}

export { request };

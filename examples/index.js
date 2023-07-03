import { Client } from "dataopen-sdk-nodejs";

async function test_get() {
  let app_id = "";
  let app_secret = "";

  let client = new Client(app_id, app_secret);

  let headers = {};

  let params = {
    app: 46,
    page_size: 10,
    page: 1,
  };

  let res = await client.request(
    "/libra/openapi/v1/open/flight-list",
    "GET",
    headers,
    params,
  );

  console.log("Output: ", res);
}

async function test_post() {
  let app_id = "";
  let app_secret = "";

  let client = new Client(app_id, app_secret);

  let headers = {};

  let params = {};

  let body = {
    uid_list: ["1111111110000"],
  };

  let version_id = 6290880;

  let res = await client.request(
    `/libra/openapi/v1/open/flight/version/${version_id}/add-test-user`,
    "POST",
    headers,
    params,
    body
  );

  console.log("Output: ", res);
}

test_get();
test_post();
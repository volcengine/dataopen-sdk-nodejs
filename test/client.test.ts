import { Client, any } from "../src/index";

// Test Access Token
describe("Access Token Test", function () {
  it("should get access token", async function () {
    let app_id = "";
    let app_secret = "";

    let client = new Client(app_id, app_secret);

    await client.handle_token();

    console.log("is_authenticated", client.is_authenticated);

    expect(client.is_authenticated()).toBe(true);
  });
});

// Test Request GET
describe("Request GET Test", function () {
  it("should send a GET request", async function () {
    let app_id = "";
    let app_secret = "";

    let client = new Client(app_id, app_secret);

    let headers = {};

    let params: Record<string, any> = {
      app: 46,
      page_size: 10,
      page: 1,
    };

    let body = {};

    let res = await client.request(
      "/libra/openapi/v1/open/flight-list",
      "GET",
      headers,
      params,
      body
    );

    // Output results
    console.log("Output: ", res);
  });
});

// Test Request POST
describe("Request POST Test", function () {
  it("should send a POST request", async function () {
    let app_id = "";
    let app_secret = "";

    let client = new Client(app_id, app_secret);

    let headers = {};

    let params = {};


    let body: Record<string, any> = {
      uid_list: ["1111111110000"],
    };

    let res = await client.request(
      "/libra/openapi/v1/open/flight/version/6290880/add-test-user",
      "POST",
      headers,
      params,
      body
    );

    // Output results
    console.log("Output: ", res);
  });
});

// Test Material Request GET
describe("Request Material GET Test", function () {
  it("should send a GET request", async function () {
    let app_id = "";
    let app_secret = "";

    let client = new Client(
      app_id,
      app_secret,
      "https://analytics.volcengineapi.com",
      "dataopen_staging"
    );

    let headers = {};

    let params: Record<string, any> = {
      page: 1,
      pageSize: 5,
    };

    let body = {};

    let res = await client.request(
      "/material/openapi/v1/materials",
      "GET",
      headers,
      params,
      body
    );

    // Output results
    console.log("Output: ", res);
  });
});

// Test Material POST
describe("Request POST Test", function () {
  it("should send a POST request", async function () {
    let app_id = "";
    let app_secret = "";

    let client = new Client(
      app_id,
      app_secret,
      "https://analytics.volcengineapi.com",
      "dataopen_staging"
    );

    let headers = {};

    let params = {};

    let body: Record<string, any> = {
        name: "ccnnodetest",
        title: "测试title",
        type: "component",
        description: "测试description",
        frameworkType: "react",
    };

    let res = await client.request(
      "/material/openapi/v1/material",
      "POST",
      headers,
      params,
      body
    );

    // Output results
    console.log("Output: ", res);
  });
});

// Test Material Put
describe("Request Put Test", function () {
  it("should send a Put request", async function () {
    let app_id = "";
    let app_secret = "";

    let client = new Client(
      app_id,
      app_secret,
      "https://analytics.volcengineapi.com",
      "dataopen_staging"
    );

    let headers = {};

    let params = {};

    let body: Record<string, any> = {
        name: "ccnnodetest",
        title: "测试title",
        type: "component",
        description: "测试description1",
        frameworkType: "react",
    };

    let res = await client.request(
      "/material/openapi/v1/material",
      "PUT",
      headers,
      params,
      body
    );

    // Output results
    console.log("Output: ", res);
  });
});

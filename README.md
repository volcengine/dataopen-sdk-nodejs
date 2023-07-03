# openapi 使用说明

## Client参数说明

| 字段       | 类型            | 默认值                          | 含义                            |
|------------|-----------------|---------------------------------|---------------------------------|
| app_id     | string          | 无                              | 应用的唯一标识符                  |
| app_secret | string          | 无                              | 用于应用的安全认证的密钥          |
| url        | string or null  | "https://analytics.volcengineapi.com"    | 服务器的URL地址                  |
| env        | string or null  | "dataopen"                      | 环境设置，可选值为 "dataopen" 或 "dataopen_staging" |
| expiration | string or null  | "1800"                          | 过期时间，单位是秒            |

## client.request参数说明

| 字段         | 类型                       | 默认值    | 含义                                            |
|--------------|----------------------------|-----------|------------------------------------------------|
| service_url  | string                     | 无        | 请求的服务 URL 地址                            |
| method       | string                     | 无        | 请求的 HTTP 方法，例如 "GET", "POST" 等        |
| headers      | Record<string, string>     | {}        | 请求头，包含的信息如认证凭据，内容类型等       |
| params       | Record<string, any> | {}        | URL 参数，用于GET请求                          |
| body         | Record<string, any>        | {}        | 请求体，通常在POST或PUT请求中包含发送的数据    |


## 样例

### 1、Get 方法

```TS
import { Client } from "dataopen-sdk-nodejs";

let app_id = "";
let app_secret = "";

let client = new Client(app_id, app_secret);

let headers = {};

let params: Record<string, any> = {
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
```

### 2、Post 方法

```TS
import { Client } from "dataopen-sdk-nodejs";

let app_id = "";
let app_secret = "";

let client = new Client(app_id, app_secret);

let headers = {};

let params = {};

let body: Record<string, any> = {
  uid_list: ["1111111110000"],
};

let version_id = 6290880;

let res = await client.request(
  `/xxx/openapi/v1/open/flight/version/${version_id}/add-test-user`,
  "POST",
  headers,
  params,
  body
);

console.log("Output: ", res);
```

/*
 * Copyright 2023 DataOpen SDK Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import fetch, { RequestInit } from "node-fetch";

interface ApiResponse {
  code: number;
  message: string;
  data?: {
    access_token: string;
    ttl: number;
  };
}

export class Client {
  public app_id: string;
  public app_secret: string;
  public url: string | null;
  public env: string | null;
  public expiration: string | null;
  private _access_token: string;
  private _ttl: number;
  private _token_time: number;

  static OPEN_APIS_PATH = "/open-apis";

  constructor(
    app_id: string,
    app_secret: string,
    url: string | null = "https://analytics.volcengineapi.com",
    env: string | null = "dataopen", // "dataopen" | "dataopen_staging"
    expiration: string | null = "1800"
  ) {
    this.app_id = app_id;
    this.app_secret = app_secret;
    this.url = url;
    this.env = env;
    this.expiration = expiration;
    this._ttl = 0;
    this._access_token = "";
    this._token_time = 0;
  }

  async request(
    service_url: string,
    method: string,
    headers: Record<string, string> = {},
    params: Record<string, any> = {},
    body: Record<string, any> = {}
  ): Promise<Record<string, any>> {
    const upper_case_method = method.toUpperCase();
    if (!this._access_token || !this._valid_token()) {
      await this.handle_token();
    }

    const new_headers: Record<string, any> = {
      Authorization: this._access_token,
      "Content-Type": "application/json",
    };

    for (const key in headers) {
      new_headers[key] = headers[key];
    }

    const completed_url: string =
      this.url + "/" + this.env + Client.OPEN_APIS_PATH + service_url;

    const query_url = this._joint_query(completed_url, params);

    let resp: Record<string, any>;
    let fetchOptions: RequestInit = {
      method: upper_case_method,
      headers: new_headers,
    };

    switch (upper_case_method) {
      case "GET":
        resp = (await (await fetch(query_url, fetchOptions)).json()) as Record<
          string,
          any
        >;
        break;
      case "POST":
      case "PUT":
      case "DELETE":
      case "PATCH":
        fetchOptions = { ...fetchOptions, body: JSON.stringify(body) };
        resp = (await (await fetch(query_url, fetchOptions)).json()) as Record<
          string,
          any
        >;
        break;
      default:
        throw new Error("Dataopen: Invalid request method");
    }

    return resp;
  }

  async handle_token() {
    const authorization_url: string =
      this.env + Client.OPEN_APIS_PATH + "/v1/authorization";
    const completed_url: string = this.url + "/" + authorization_url;

    const map = {
      app_id: this.app_id,
      app_secret: this.app_secret,
    };

    const resp = (await (
      await fetch(completed_url, {
        method: "POST",
        body: JSON.stringify(map),
        headers: { "Content-Type": "application/json" },
      })
    ).json()) as ApiResponse;

    const token_time: number = Date.now();

    if (resp.code === 200 && resp.data) {
      this._ttl = resp.data.ttl;
      this._token_time = token_time;
      this._access_token = resp.data.access_token;
    }
  }

  is_authenticated(): boolean {
    return !!this._access_token;
  }

  private _joint_query(
    url: string,
    params: Record<string, any>
  ): string {
    const paramStr = Object.entries(params)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");
    return `${url}?${paramStr}`;
  }

  private _valid_token(): boolean {
    const current_time: number = Date.now();

    if (current_time - this._token_time > this._ttl * 1000) {
      return false;
    }

    return true;
  }
}

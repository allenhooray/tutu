/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type User = object;

export interface LoginPasswordDto {
  /** 用户名、邮箱或手机号 */
  username?: string;
  /** 邮箱 */
  email?: string;
  /** 手机号 */
  phone?: string;
  /** 密码 */
  password: string;
}

export interface LoginCodeSendCodeDto {
  /** 邮箱 */
  email?: string;
  /** 手机号 */
  phone?: string;
}

export interface LoginCodeSendCodeResponseDto {
  /** 验证码 */
  code: string;
}

export interface LoginCodeVerifyDto {
  /** 邮箱 */
  email?: string;
  /** 手机号 */
  phone?: string;
  /** 验证码 */
  code: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor(
    instance: AxiosInstance,
    {
      securityWorker,
      secure,
      format,
      ...axiosConfig
    }: ApiConfig<SecurityDataType> = {},
  ) {
    this.instance = instance;
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData
          ? { "Content-Type": type }
          : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title API 文档
 * @version 0.0.1
 * @contact
 *
 * 供前端调用的接口文档
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags App
   * @name GetHello
   * @request GET:/
   */
  getHello = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: "GET",
      ...params,
    });

  users = {
    /**
     * No description
     *
     * @tags Users
     * @name GetUser
     * @summary 根据ID获取用户信息
     * @request GET:/users/{id}
     */
    getUser: (id: string, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags Auth
     * @name LoginPassword
     * @request POST:/auth/login/password
     */
    loginPassword: (data: LoginPasswordDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/login/password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name SenCode
     * @request POST:/auth/login/send-code
     */
    senCode: (data: LoginCodeSendCodeDto, params: RequestParams = {}) =>
      this.request<LoginCodeSendCodeResponseDto, void>({
        path: `/auth/login/send-code`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name LoginVerification
     * @request POST:/auth/login/verify
     */
    loginVerification: (data: LoginCodeVerifyDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/auth/login/verify`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name LoginOAuth
     * @summary OAuth登录
     * @request POST:/auth/oauth/{provider}
     */
    loginOAuth: (
      provider: string,
      query: {
        code: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/auth/oauth/${provider}`,
        method: "POST",
        query: query,
        ...params,
      }),
  };
  books = {
    /**
     * No description
     *
     * @tags Books
     * @name QueryBookByIsbn
     * @summary 根据 ISBN 查询图书
     * @request GET:/books/{isbn}
     */
    queryBookByIsbn: (isbn: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/books/${isbn}`,
        method: "GET",
        ...params,
      }),
  };
}

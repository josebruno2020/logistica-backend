export interface IHttpParams {
  url: string;
  body?: any;
  queryParams?: any;
}

export interface IGetResponse<T = any> {
  body?: T;
  status: number;
}

export interface IHttp {
  httpGet<T = any>(params: IHttpParams): Promise<IGetResponse<T>>;
}

export const IHttp = Symbol('IHttp');

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  IGetResponse,
  IHttp,
  IHttpParams,
} from 'src/domain/adapters/http.adapter';

@Injectable()
export class AxiosHttpAdapter implements IHttp {
  async httpGet<T = any>({
    url,
    queryParams,
  }: IHttpParams): Promise<IGetResponse<T>> {
    const { status, data } = await axios.get<T>(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      params: queryParams,
    });
    // TODO tratar erros
    return {
      status,
      body: data,
    };
  }
}

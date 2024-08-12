import axios from 'axios';
import { IGetResponse } from 'src/domain/adapters/http.adapter';
import { AxiosHttpAdapter } from './axios-http.adapter';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosHttpAdapter', () => {
  let axiosHttpAdapter: AxiosHttpAdapter;

  beforeEach(() => {
    axiosHttpAdapter = new AxiosHttpAdapter();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should make a GET request and return the response successfully', async () => {
    const url = 'https://api.example.com/data';
    const queryParams = { param1: 'value1', param2: 'value2' };
    const responseData = { key: 'value' };

    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: responseData,
    });

    const result = await axiosHttpAdapter.httpGet({
      url,
      queryParams,
    });

    expect(result).toEqual<IGetResponse>({
      status: 200,
      body: responseData,
    });
    expect(mockedAxios.get).toHaveBeenCalledWith(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      params: queryParams,
    });
  });
  it('should throw an error if GET request fails', async () => {
    const url = 'https://api.example.com/data';
    const queryParams = { param1: 'value1', param2: 'value2' };

    mockedAxios.get.mockRejectedValueOnce(new Error('error'));

    await expect(
      axiosHttpAdapter.httpGet({
        url,
        queryParams,
      }),
    ).rejects.toThrow('error');

    expect(mockedAxios.get).toHaveBeenCalledWith(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      params: queryParams,
    });
  });
  it('should make a GET request without query params', async () => {
    const url = 'https://api.example.com/data';
    const responseData = { key: 'value' };

    mockedAxios.get.mockResolvedValueOnce({
      status: 200,
      data: responseData,
    });

    const result = await axiosHttpAdapter.httpGet({ url });

    expect(result).toEqual<IGetResponse>({
      status: 200,
      body: responseData,
    });
    expect(mockedAxios.get).toHaveBeenCalledWith(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      params: undefined,
    });
  });
});

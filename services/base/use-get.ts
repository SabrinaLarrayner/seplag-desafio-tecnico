import { useRequest, type useRequestOptions } from './use-request';

export function useGet<T>(path: string, payload: any, options?: useRequestOptions) {
    return useRequest<T>(path, payload, {
        ...options,
        method: 'get',
    });
}

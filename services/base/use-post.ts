import { useRequest, type useRequestOptions } from './use-request';

export async function usePost<T>(path: string, payload: any, options?: useRequestOptions) {
    return useRequest<T>(path, payload, {
        ...options,
        method: 'post',
    });
}

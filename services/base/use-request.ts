import axios from 'axios'

export type useRequestOptions = {
  method?: 'get' | 'post' | 'put' | 'delete'
  baseUrl?: string
  headers?: Record<string, string>
}

export async function useRequest<T>(
  path: string,
  data?: any,
  options: useRequestOptions = {}
): Promise<T> {
  const method = options.method ?? 'get'
  const isFormData = typeof FormData !== 'undefined' && data instanceof FormData

  const headers = {
    ...options.headers,
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
  }

  const baseUrl = options.baseUrl ?? 'https://abitus-api.geia.vip'
  const url = `${baseUrl}/${path}`

  try {
    const response = await axios({
      method,
      url,
      data: method !== 'get' ? data : undefined,
      params: method === 'get' ? data : undefined,
      headers,
    })

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

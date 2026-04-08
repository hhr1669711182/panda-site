/**
 * API 请求 Composable
 */
export function useApi() {
  const authToken = useCookie('panda_token')

  const headers = computed(() => ({
    Authorization: authToken.value ? `Bearer ${authToken.value}` : '',
  }))

  async function get<T = any>(url: string, query?: Record<string, any>) {
    return $fetch<T>(url, { query, headers: headers.value })
  }

  async function post<T = any>(url: string, body: any) {
    return $fetch<T>(url, { method: 'POST', body, headers: headers.value })
  }

  async function put<T = any>(url: string, body: any) {
    return $fetch<T>(url, { method: 'PUT', body, headers: headers.value })
  }

  async function patch<T = any>(url: string, body: any) {
    return $fetch<T>(url, { method: 'PATCH', body, headers: headers.value })
  }

  async function del<T = any>(url: string) {
    return $fetch<T>(url, { method: 'DELETE', headers: headers.value })
  }

  return { get, post, put, patch, del }
}

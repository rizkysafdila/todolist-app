export function useApi() {
  const config = useRuntimeConfig()
  const token = useCookie('token')

  const $fetchWithAuth = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    headers: {
      Authorization: token.value ? `Bearer ${token.value}` : '',
    },
  })

  return { $fetch: $fetchWithAuth }
}

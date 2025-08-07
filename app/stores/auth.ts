export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = useCookie('token')

  const login = async (credentials: { email: string, password: string }) => {
    const { $fetch } = useApi()
    const res: any = await $fetch('/login', {
      method: 'POST',
      body: credentials,
    })
    token.value = res.data.token
    user.value = res.data.user
  }

  const register = async (data: { name: string, email: string, password: string }) => {
    const { $fetch } = useApi()
    const res: any = await $fetch('/register', {
      method: 'POST',
      body: data,
    })
    token.value = res.data.token
    user.value = res.data.user
  }

  const logout = () => {
    token.value = null
    user.value = null
  }

  return {
    user,
    token,
    login,
    register,
    logout,
  }
})

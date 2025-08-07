export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token')

  if (!token.value && !['/login', '/register'].includes(to.path)) {
    return navigateTo('/login')
  }

  if (token.value && ['/login', '/register'].includes(to.path)) {
    return navigateTo('/checklists')
  }
})

<script lang="ts" setup>
function handleLogout() {
  const token = useCookie('token')
  token.value = null

  if (!token.value) {
    navigateTo('/login')
  }
}
</script>

<template>
  <div class="container max-w-2xl mx-auto">
    <div v-if="$route.path !== '/login' && $route.path !== '/register'" class="flex justify-end mt-5 px-6">
      <UButton
        label="Logout"
        icon="lucide:log-out"
        color="error"
        variant="soft"
        size="sm"
        @click="handleLogout"
      />
    </div>
    <slot />
  </div>
</template>

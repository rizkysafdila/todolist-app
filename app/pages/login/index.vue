<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/checklists',
  },
})

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const loading = ref<boolean>(false)
const state = reactive({
  email: '',
  password: '',
})

async function handleLogin() {
  try {
    loading.value = true
    await authStore.login(state)
    toast.add({ title: 'Login successful', color: 'success' })
    router.push('/checklists')
  }
  catch (error: any) {
    toast.add({ title: error?.data?.message || 'Login failed', color: 'error' })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <UCard class="w-full max-w-md">
      <template #header>
        <h2 class="text-xl font-semibold">
          Login to Your Account
        </h2>
      </template>

      <UForm :state="state" class="space-y-4" @submit="handleLogin">
        <UFormField label="Email" name="email">
          <UInput
            v-model="state.email"
            type="email"
            placeholder="you@example.com"
            class="w-full"
            required
          />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput
            v-model="state.password"
            type="password"
            placeholder="••••••••"
            class="w-full"
            required
          />
        </UFormField>

        <UButton type="submit" :loading="loading" class="cursor-pointer" block>
          Login
        </UButton>
      </UForm>

      <template #footer>
        <p class="text-sm text-center">
          Don’t have an account?
          <NuxtLink to="/register" class="text-primary-500 hover:underline">
            Register
          </NuxtLink>
        </p>
      </template>
    </UCard>
  </div>
</template>

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
  name: '',
  email: '',
  password: '',
})

async function handleRegister() {
  try {
    loading.value = true
    await authStore.register(state)
    toast.add({ title: 'Register successful, please login to continue', color: 'success' })
    router.push('/login')
  }
  catch (error: any) {
    toast.add({ title: error?.data?.message || 'Register failed', color: 'error' })
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
          Register Your Account
        </h2>
      </template>

      <UForm :state="state" class="space-y-4" @submit="handleRegister">
        <UFormField label="Name" name="name">
          <UInput
            v-model="state.name"
            type="text"
            placeholder="Your full name"
            class="w-full"
            required
          />
        </UFormField>

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
          Register
        </UButton>
      </UForm>

      <template #footer>
        <p class="text-sm text-center">
          Already have an account?
          <NuxtLink to="/login" class="text-primary-500 hover:underline">
            Login
          </NuxtLink>
        </p>
      </template>
    </UCard>
  </div>
</template>

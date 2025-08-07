<script lang="ts" setup>
import type { IChecklist } from '~/types/checklist'

defineProps<{
  data: IChecklist
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
}>()
</script>

<template>
  <UCard
    class="cursor-pointer hover:shadow-md transition"
  >
    <template #header>
      <div class="flex justify-between items-center">
        <NuxtLink
          :to="`/checklists/${data?.id}`"
          class="font-semibold text-lg hover:underline"
        >
          {{ data?.name }}
        </NuxtLink>
        <UButton
          color="error"
          variant="soft"
          size="xs"
          icon="i-heroicons-trash"
          @click="emit('delete', data?.id)"
        />
      </div>
    </template>
  </UCard>
</template>

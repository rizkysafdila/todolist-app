<script lang="ts" setup>
import type { IChecklistItem } from '~/types/checklist'

defineProps<{
  item: IChecklistItem
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'edit'): void
  (e: 'delete'): void
}>()

const modelValue = defineModel<boolean>()
</script>

<template>
  <UCard
    :ui="{
      body: 'flex justify-between items-center !p-4',
    }"
  >
    <UCheckbox
      v-model="modelValue"
      :label="item.name"
      :ui="{ label: item.itemCompletionStatus && 'line-through' }"
      @change="emit('toggle')"
    />
    <div class="flex items-center gap-2">
      <UButton
        icon="i-heroicons-pencil"
        size="xs"
        variant="ghost"
        @click="emit('edit')"
      />
      <UButton
        icon="i-heroicons-trash"
        size="xs"
        variant="ghost"
        color="error"
        @click="emit('delete')"
      />
    </div>
  </UCard>
</template>

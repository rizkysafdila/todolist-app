<script setup lang="ts">
const route = useRoute()
const checklistId = Number(route.params.id)
const checklistItemStore = useChecklistItemStore()
const { createItem } = checklistItemStore
const toast = useToast()

const state = reactive({
  itemName: '',
})
const loading = ref(false)

async function addItem() {
  if (!state.itemName)
    return

  loading.value = true
  await createItem(checklistId, state.itemName)
  loading.value = false
  toast.add({ title: 'Item added', color: 'success' })
  navigateTo(`/checklists/${checklistId}`)
}
</script>

<template>
  <div class="max-w-xl mx-auto p-6">
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UButton icon="lucide:chevron-left" variant="ghost" @click="$router.back()" />
          <h2 class="text-xl font-semibold">
            Add New Item
          </h2>
        </div>
      </template>

      <UForm :state="state" class="space-y-4" @submit="addItem">
        <UFormField label="Item Name" name="itemName">
          <UInput v-model="state.itemName" placeholder="e.g., Buy milk" class="w-full" required />
        </UFormField>

        <UButton type="submit" :loading="loading" block>
          Add Item
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>

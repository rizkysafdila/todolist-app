<!-- eslint-disable no-alert -->
<script setup lang="ts">
const route = useRoute()
const checklistId = computed(() => Number(route.params.id))
const checklistStore = useChecklistStore()
const checklistItemStore = useChecklistItemStore()
const { fetchAll } = checklistStore
const { fetchItems, toggleStatusItem, updateItem, removeItem } = checklistItemStore
const { items } = storeToRefs(checklistItemStore)
const toast = useToast()

const checklist = computed(() =>
  checklistStore.checklists.find(c => c.id === checklistId.value),
)

await useAsyncData(
  'checklists',
  () => fetchAll(),
)

const { refresh: refreshChecklistItem } = await useAsyncData(
  'checklist-items',
  () => fetchItems(checklistId.value),
)

function goToAddItem() {
  navigateTo(`/checklists/${checklistId.value}/add-item`)
}

async function toggleItem(itemId: number) {
  await toggleStatusItem(checklistId.value, itemId)
  toast.add({ title: 'Item updated', color: 'success' })
  refreshChecklistItem()
}

async function editItem(itemId: number, text: string) {
  const newText = prompt('Edit item:', text)
  if (newText)
    await updateItem(checklistId.value, itemId, newText)
  toast.add({ title: 'Item updated', color: 'success' })
  refreshChecklistItem()
}

async function deleteItem(itemId: number) {
  await removeItem(checklistId.value, itemId)
  toast.add({ title: 'Item deleted', color: 'error' })
  refreshChecklistItem()
}
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center gap-2">
        <UButton icon="lucide:chevron-left" variant="ghost" @click="$router.back()" />
        <h2 class="text-2xl font-bold">
          {{ checklist?.name }}
        </h2>
      </div>
      <UButton icon="i-heroicons-plus" @click="goToAddItem">
        Add Item
      </UButton>
    </div>

    <div v-if="items.length === 0" class="text-gray-500">
      No items in this checklist yet.
    </div>

    <div class="space-y-2">
      <ChecklistItem
        v-for="item in items"
        :key="item.id"
        v-model="item.itemCompletionStatus"
        :item="item"
        @toggle="toggleItem(item.id)"
        @edit="editItem(item.id, item.name)"
        @delete="deleteItem(item.id)"
      />
    </div>
  </div>
</template>

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
      <h2 class="text-2xl font-bold">
        {{ checklist?.name }}
      </h2>
      <UButton icon="i-heroicons-plus" @click="goToAddItem">
        Add Item
      </UButton>
    </div>

    <div v-if="items.length === 0" class="text-gray-500">
      No items in this checklist yet.
    </div>

    <div class="space-y-2">
      <UCard v-for="item in items" :key="item.id" :ui="{ body: 'flex justify-between items-center' }">
        <div class="flex items-center gap-2">
          <UCheckbox v-model="item.itemCompletionStatus" :label="item.name" :ui="{ label: item.itemCompletionStatus && 'line-through' }" @change="toggleItem(item.id)" />
        </div>
        <div class="flex items-center gap-2">
          <UButton
            icon="i-heroicons-pencil"
            size="xs"
            variant="ghost"
            @click="editItem(item.id, item.name)"
          />
          <UButton
            icon="i-heroicons-trash"
            size="xs"
            variant="ghost"
            color="error"
            @click="deleteItem(item.id)"
          />
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const toast = useToast()
const checklistStore = useChecklistStore()
const { fetchAll, create, remove } = checklistStore
const { checklists } = storeToRefs(checklistStore)

await useAsyncData(
  'all-checklists',
  () => fetchAll(),
)

function addChecklist() {
  const name = prompt('Nama checklist:')
  if (name) {
    create(name)
    toast.add({ title: 'Checklist added', color: 'success' })
  }
}

async function deleteChecklist(id: number) {
  if (confirm('Delete this checklist?')) {
    await remove(id)
    toast.add({ title: 'Checklist deleted', color: 'error' })
  }
}
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">
        My Checklists
      </h1>
      <UButton icon="i-heroicons-plus" @click="addChecklist">
        New Checklist
      </UButton>
    </div>

    <div v-if="checklists.length === 0" class="text-gray-500">
      No checklists found.
    </div>

    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <UCard
        v-for="checklist in checklists"
        :key="checklist.id" 
        class="cursor-pointer hover:shadow-md transition"
      >
        <template #header>
          <div class="flex justify-between items-center">
            <NuxtLink
              :to="`/checklists/${checklist.id}`" 
              class="font-semibold text-lg hover:underline"
            >
              {{ checklist.name }}
            </NuxtLink>
            <UButton
              color="error"
              variant="soft"
              size="xs"
              icon="i-heroicons-trash"
              @click="deleteChecklist(checklist.id)"
            />
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>

import type { IChecklistItem } from '~/types/checklist'

export const useChecklistItemStore = defineStore('checklist-item', () => {
  const items = ref<IChecklistItem[]>([])
  const { $fetch } = useApi()

  const fetchItems = async (checklistId: number) => {
    const res: any = await $fetch(`/checklist/${checklistId}/item`, { method: 'GET' })
    items.value = res.data
  }

  const createItem = async (checklistId: number, text: string) => {
    const res: any = await $fetch(`/checklist/${checklistId}/item`, {
      method: 'POST',
      body: { itemName: text },
    })
    items.value.push(res.data)
  }

  const updateItem = async (checklistId: number, itemId: number, newText: string) => {
    await $fetch(`/checklist/${checklistId}/item/rename/${itemId}`, {
      method: 'PUT',
      body: { itemName: newText },
    })

    const item = items.value.find(i => i.id === itemId)
    if (item)
      item.name = newText
  }

  const toggleStatusItem = async (checklistId: number, itemId: number) => {
    await $fetch(`/checklist/${checklistId}/item/${itemId}`, {
      method: 'PUT',
    })

    const item = items.value.find(i => i.id === itemId)
    if (item)
      item.itemCompletionStatus = !item.itemCompletionStatus
  }

  const removeItem = async (checklistId: number, itemId: number) => {
    await $fetch(`/checklist/${checklistId}/item/${itemId}`, {
      method: 'DELETE',
    })

    items.value = items.value.filter(i => i.id !== itemId)
  }

  return { items, fetchItems, createItem, updateItem, toggleStatusItem, removeItem }
})

import type { IChecklistItem } from '~/types/checklist'

export const useChecklistItemStore = defineStore('checklist-item', () => {
  const items = ref<IChecklistItem[]>([])
  const { $fetch } = useApi()

  const fetchItems = async (checklistId: number): Promise<IChecklistItem[] | null> => {
    try {
      const res: any = await $fetch(`/checklist/${checklistId}/item`, { method: 'GET' })
      items.value = res.data
      return res.data
    }
    catch (error) {
      console.error('Failed to fetch checklist items:', error)
      return null
    }
  }

  const createItem = async (checklistId: number, text: string): Promise<IChecklistItem | null> => {
    try {
      const res: any = await $fetch(`/checklist/${checklistId}/item`, {
        method: 'POST',
        body: { itemName: text },
      })
      items.value.push(res.data)
      return res.data
    }
    catch (error) {
      console.error('Failed to create checklist item:', error)
      return null
    }
  }

  const updateItem = async (
    checklistId: number,
    itemId: number,
    newText: string,
  ): Promise<boolean> => {
    try {
      await $fetch(`/checklist/${checklistId}/item/rename/${itemId}`, {
        method: 'PUT',
        body: { itemName: newText },
      })

      const item = items.value.find(i => i.id === itemId)
      if (item)
        item.name = newText

      return true
    }
    catch (error) {
      console.error('Failed to update checklist item:', error)
      return false
    }
  }

  const toggleStatusItem = async (checklistId: number, itemId: number): Promise<boolean> => {
    try {
      await $fetch(`/checklist/${checklistId}/item/${itemId}`, {
        method: 'PUT',
      })

      const item = items.value.find(i => i.id === itemId)
      if (item)
        item.itemCompletionStatus = !item.itemCompletionStatus

      return true
    }
    catch (error) {
      console.error('Failed to toggle checklist item status:', error)
      return false
    }
  }

  const removeItem = async (checklistId: number, itemId: number): Promise<boolean> => {
    try {
      await $fetch(`/checklist/${checklistId}/item/${itemId}`, {
        method: 'DELETE',
      })

      items.value = items.value.filter(i => i.id !== itemId)
      return true
    }
    catch (error) {
      console.error('Failed to delete checklist item:', error)
      return false
    }
  }

  return {
    items,
    fetchItems,
    createItem,
    updateItem,
    toggleStatusItem,
    removeItem,
  }
})

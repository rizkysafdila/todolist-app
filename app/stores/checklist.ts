import type { IChecklist } from '~/types/checklist'

export const useChecklistStore = defineStore('checklist', () => {
  const checklists = ref<IChecklist[]>([])
  const { $fetch } = useApi()

  const fetchAll = async (): Promise<IChecklist[] | null> => {
    try {
      const res: any = await $fetch('/checklist', { method: 'GET' })
      checklists.value = res.data
      return res.data
    }
    catch (error) {
      console.error('Failed to fetch checklists:', error)
      return null
    }
  }

  const create = async (name: string): Promise<IChecklist | null> => {
    try {
      const res: any = await $fetch('/checklist', {
        method: 'POST',
        body: { name },
      })
      checklists.value.push(res.data)
      return res.data
    }
    catch (error) {
      console.error('Failed to create checklist:', error)
      return null
    }
  }

  const remove = async (id: number): Promise<boolean> => {
    try {
      await $fetch(`/checklist/${id}`, { method: 'DELETE' })
      checklists.value = checklists.value.filter(checklist => checklist.id !== id)
      return true
    }
    catch (error) {
      console.error('Failed to delete checklist:', error)
      return false
    }
  }

  return {
    checklists,
    fetchAll,
    create,
    remove,
  }
})

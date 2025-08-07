import type { IChecklist } from '~/types/checklist'

export const useChecklistStore = defineStore('checklist', () => {
  const checklists = ref<IChecklist[]>([])
  const { $fetch } = useApi()

  const fetchAll = async () => {
    const res: any = await $fetch('/checklist', { method: 'GET' })
    checklists.value = res.data
  }

  const create = async (name: string) => {
    const res: any = await $fetch('/checklist', {
      method: 'POST',
      body: { name },
    })
    checklists.value.push(res.data)
  }

  const remove = async (id: number) => {
    await $fetch(`/checklist/${id}`, { method: 'DELETE' })
    checklists.value = checklists.value.filter(checklist => checklist.id !== id)
  }

  return { checklists, fetchAll, create, remove }
})

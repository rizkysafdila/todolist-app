export interface IChecklist {
  id: number
  name: string
  items: IChecklistItem[]
  checklistCompletionStatus: boolean
}

export interface IChecklistItem {
  id: number
  name: string
  itemCompletionStatus: boolean
}

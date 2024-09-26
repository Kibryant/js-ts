export interface PendingGoals {
  id: string
  title: string
  desiredWeeklyFrequency: number
  completionCount: number
}

export interface PendingGoalsResponse {
  pendingGoals: PendingGoals[]
}

export async function getPendingGoals() {
  const response = await fetch('http://localhost:3333/pending-goals')

  const data: PendingGoalsResponse = await response.json()

  return data.pendingGoals
}

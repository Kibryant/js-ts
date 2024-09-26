export interface WeekSummary {
  completed: number
  total: number
  goalsPerDay: Record<
    string,
    {
      id: string
      title: string
      completedAt: string
    }[]
  >
}

interface WeekSummaryResponse {
  summary: WeekSummary
}

export async function getWeekSummary() {
  const response = await fetch('http://localhost:3333/week-summary')

  const data: WeekSummaryResponse = await response.json()

  return data.summary
}

import { Dialog } from '../components/ui/dialog'
import { CreateGoal } from '../components/create-goal'
import { Summary } from '../components/summary'
import { useQuery } from '@tanstack/react-query'
import { EmptyGoals } from '../components/empty-goals'
import { getWeekSummary, type WeekSummary } from '../functions/get-week-summary'
import { FIVE_MINUTES_IN_MS } from '../constants'

export function Home() {
  const { data: summary } = useQuery<WeekSummary>({
    queryKey: ['week-summary'],
    queryFn: getWeekSummary,
    staleTime: FIVE_MINUTES_IN_MS,
  })

  return (
    <Dialog>
      {summary && summary.total > 0 ? <Summary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  )
}

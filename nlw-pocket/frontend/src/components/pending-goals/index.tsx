import { Plus } from 'lucide-react'
import { OutlineButton } from '../ui/outline-button'
import {
  getPendingGoals,
  type PendingGoals as PendingGoalsType,
} from '../../functions/get-pending-goals'
import { FIVE_MINUTES_IN_MS } from '../../constants'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createGoalCompletion } from '../../functions/create-goal-completion'

export function PendingGoals() {
  const queryClient = useQueryClient()

  const { data: pendingGoals } = useQuery<PendingGoalsType[]>({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
    staleTime: FIVE_MINUTES_IN_MS,
  })

  if (!pendingGoals) {
    return null
  }

  const handleCreateGoalCompletion = async (goalId: string) => {
    await createGoalCompletion(goalId)

    queryClient.invalidateQueries({
      queryKey: ['week-summary'],
    })

    queryClient.invalidateQueries({
      queryKey: ['pending-goals'],
    })
  }

  return (
    <div className="flex flex-wrap gap-3">
      {pendingGoals.map(goal => (
        <OutlineButton
          key={goal.id}
          disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
          onClick={() => handleCreateGoalCompletion(goal.id)}
        >
          <Plus className="size-4 text-zinc-600" />
          {goal.title}
        </OutlineButton>
      ))}
    </div>
  )
}

import { CheckCircle2, RocketIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { DialogTrigger } from '../ui/dialog'
import { InOrbitIcon } from '../icons/in-orbit-icon'
import { Progress, ProgressIndicator } from '../ui/progress-bar'
import { Separator } from '../ui/separator'
import { useQuery } from '@tanstack/react-query'
import { FIVE_MINUTES_IN_MS } from '../../constants'
import {
  type WeekSummary,
  getWeekSummary,
} from '../../functions/get-week-summary'
import dayjs from 'dayjs'
import { PendingGoals } from '../pending-goals'

export function Summary() {
  const { data: summary } = useQuery<WeekSummary>({
    queryKey: ['week-summary'],
    queryFn: getWeekSummary,
    staleTime: FIVE_MINUTES_IN_MS,
  })

  if (!summary) {
    return null
  }

  const firstDayOfTheWeek = dayjs().startOf('week').format('D MMMM')
  const lastDayOfTheWeek = dayjs().endOf('week').format('D MMMM')

  const completedPercentage = (summary.completed * 100) / summary.total

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-bold capitalize">
            {firstDayOfTheWeek} - {lastDayOfTheWeek}
          </span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <RocketIcon className="size-4" />
            Create goal
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={5} max={10}>
          <ProgressIndicator
            style={{
              width: `${completedPercentage}%`,
            }}
          />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            You have completed{' '}
            <span className="text-zinc-100">{summary.completed}</span> of{' '}
            <span className="text-zinc-100">{summary.total}</span> goals
          </span>
          <span className="mx-1">|</span>
          <span>{completedPercentage}% completed</span>
        </div>

        <Separator />

        <PendingGoals />

        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-medium">Your Week</h2>

          {Object.entries(summary.goalsPerDay).map(([date, goals]) => {
            const weekDay = dayjs(date).format('dddd')
            const formatedDate = dayjs(date).format('MMMM D, YYYY')

            return (
              <div className="flex flex-col gap-4" key={date}>
                <h3 className="text-lg font-medium">
                  <span className="capitalize">{weekDay}</span>
                  <span className="text-zinc-400 text-xs"> {formatedDate}</span>
                </h3>

                <ul className="space-y-3">
                  {goals.map(goal => {
                    const parsedTime = dayjs(goal.completedAt).format('h:mm A')

                    return (
                      <li className="flex items-center gap-2" key={goal.id}>
                        <CheckCircle2 className="size-4 text-pink-500" />
                        <span className="text-sm text-zinc-400">
                          You completed "
                          <span className="text-zinc-100">{goal.title}</span>"
                          at <span className="text-zinc-100">{parsedTime}</span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

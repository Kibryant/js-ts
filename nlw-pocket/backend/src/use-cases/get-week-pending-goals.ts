import { db } from '../db/connection'
import { goal, goalCompletions } from '../db/schema'
import dayjs from 'dayjs'
import { and, count, eq, gte, lte, sql } from 'drizzle-orm'

export async function getWeekPendingGoals() {
  const firstDayOfTheWeek = dayjs().startOf('week').toDate()
  const lastDayOfTheWeek = dayjs().endOf('week').toDate()

  const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
    db
      .select({
        id: goal.id,
        title: goal.title,
        desiredWeeklyFrequency: goal.desiredWeeklyFrequency,
        createdAt: goal.createdAt,
      })
      .from(goal)
      .where(lte(goal.createdAt, lastDayOfTheWeek))
  )

  const goalCompletionsCounts = db.$with('goal_completions').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as('completionCount'),
      })
      .from(goalCompletions)
      .where(
        and(
          gte(goalCompletions.completedAt, firstDayOfTheWeek),
          lte(goalCompletions.completedAt, lastDayOfTheWeek)
        )
      )
      .groupBy(goalCompletions.id)
  )

  const pendingGoals = await db
    .with(goalsCreatedUpToWeek, goalCompletionsCounts)
    .select({
      id: goalsCreatedUpToWeek.id,
      title: goalsCreatedUpToWeek.title,
      desiredWeeklyFrequency: goalsCreatedUpToWeek.desiredWeeklyFrequency,
      completionCount: sql /*sql*/`
        COALESCE(${goalCompletionsCounts.completionCount}, 0)
      `.mapWith(Number),
    })
    .from(goalsCreatedUpToWeek)
    .leftJoin(
      goalCompletionsCounts,
      eq(goalCompletionsCounts.goalId, goalsCreatedUpToWeek.id)
    )

  return {
    pendingGoals,
  }
}

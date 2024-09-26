import { db } from '../db/connection'
import { goal } from '../db/schema'

interface CreateGoalDto {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalDto) {
  const result = await db
    .insert(goal)
    .values({
      title,
      desiredWeeklyFrequency,
    })
    .returning()

  const insertedGoal = result[0]

  return {
    goal: insertedGoal,
  }
}

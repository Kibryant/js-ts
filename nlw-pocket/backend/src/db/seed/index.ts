import { client, db } from '../connection'
import { goalCompletions, goal } from '../schema'
import dayjs from 'dayjs'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goal)

  const goals = await db
    .insert(goal)
    .values([
      { title: 'Exercise', desiredWeeklyFrequency: 3 },
      { title: 'Read', desiredWeeklyFrequency: 2 },
      { title: 'Meditate', desiredWeeklyFrequency: 1 },
      { title: 'Journal', desiredWeeklyFrequency: 1 },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week').toDate()
  const afterStartOfWeek = dayjs(startOfWeek).add(1, 'day').toDate()

  await db.insert(goalCompletions).values([
    { goalId: goals[0].id, completedAt: startOfWeek },
    { goalId: goals[1].id, completedAt: afterStartOfWeek },
  ])
}

seed()
  .then(() => {
    console.log('Seeding complete')
  })
  .catch(err => {
    console.error('Error seeding', err)
  })
  .finally(() => {
    client.end()
  })

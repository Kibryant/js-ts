import { X } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from '../ui/radio-group'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  createGoalSchema,
  type CreateGoalSchema,
} from '../../schemas/create-goal-schema'
import { createGoal } from '../../functions/create-goal'
import { useQueryClient } from '@tanstack/react-query'

export function CreateGoal() {
  const queryClient = useQueryClient()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateGoalSchema>({
    resolver: zodResolver(createGoalSchema),
  })

  const handleCreateGoal = async ({
    title,
    desiredWeeklyFrequency,
  }: CreateGoalSchema) => {
    await createGoal({
      title,
      desiredWeeklyFrequency: Number(desiredWeeklyFrequency),
    })

    queryClient.invalidateQueries({
      queryKey: ['week-summary'],
    })

    queryClient.invalidateQueries({
      queryKey: ['pending-goals'],
    })

    reset()
  }

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Register Goal</DialogTitle>

            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>

          <DialogDescription>
            Register your goal to start your journey
          </DialogDescription>
        </div>

        <form
          onSubmit={handleSubmit(handleCreateGoal)}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="goal">What is your goal?</Label>
              <Input
                autoFocus
                id="goal"
                type="text"
                placeholder="Your Goal"
                {...register('title')}
              />

              {errors.title && (
                <p className="text-red-400 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">how many times a week</Label>
              <Controller
                control={control}
                defaultValue={2}
                name="desiredWeeklyFrequency"
                render={({ field }) => {
                  return (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <RadioGroupItem value="1">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 leading-none text-sm font-medium">
                          1 time a week
                        </span>
                        <span className="text-lg leading-none">🥱</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="2">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 leading-none text-sm font-medium">
                          2 time a week
                        </span>
                        <span className="text-lg leading-none">🙂</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="3">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 leading-none text-sm font-medium">
                          3 time a week
                        </span>
                        <span className="text-lg leading-none">😎</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="4">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 leading-none text-sm font-medium">
                          4 time a week
                        </span>
                        <span className="text-lg leading-none">😜</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="5">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 leading-none text-sm font-medium">
                          5 time a week
                        </span>
                        <span className="text-lg leading-none">🤨</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="6">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 leading-none text-sm font-medium">
                          6 time a week
                        </span>
                        <span className="text-lg leading-none">🤯</span>
                      </RadioGroupItem>

                      <RadioGroupItem value="7">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 leading-none text-sm font-medium">
                          Everyday a week
                        </span>
                        <span className="text-lg leading-none">🔥</span>
                      </RadioGroupItem>
                    </RadioGroup>
                  )
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button className="flex-1" variant="secondary" type="button">
                Close
              </Button>
            </DialogClose>

            <Button className="flex-1" type="submit" variant="primary">
              Save
            </Button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}

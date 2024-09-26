import { RocketIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { DialogTrigger } from '../ui/dialog'

import logoInOrbit from '../../assets/logo-in-orbit.svg'
import letsStartIllustration from '../../assets/lets-start-illustration.svg'

export function EmptyGoals() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logoInOrbit} alt="InOrbit" />
      <img src={letsStartIllustration} alt="Let's start" />
      <h1 className="text-3xl font-bold text-center">Welcome to the InOrbit</h1>
      <p className="text-lg text-center text-zinc-300 leading-relaxed max-w-80">
        This is a simple React application with Tailwind CSS and TypeScript
      </p>

      <DialogTrigger asChild>
        <Button>
          <RocketIcon className="size-4" />
          Create your first goal
        </Button>
      </DialogTrigger>
    </div>
  )
}

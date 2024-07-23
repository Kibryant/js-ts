import { addTask, completedTask, removeTask } from "@/actions/actions";
import prisma from "@/lib/prisma";

export default async function Home() {
  const tasks = await prisma.task.findMany();
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Hello World</h1>
      <p className="text-2xl text-center">
        Welcome to your new app. Get started by editing{' '}
        <code>src/app/page.tsx</code>
      </p>
      <form action={addTask} className="flex flex-col items-center justify-center space-y-4">
        <input
          type="text"
          placeholder="Task"
          name="title"
          className="p-2 border border-gray-300 rounded"
        />
        <button className="p-2 bg-blue-500 text-white rounded">Add Task</button>
      </form>
      {tasks.map((task) => (
        <div className="flex items-center justify-between w-full p-4 border border-gray-300 rounded" key={task.id}>
          <p>{task.title}</p>
          <div className="flex gap-x-2">
            <form action={completedTask} className="flex items-center justify-between w-full">
              <input type="hidden" name="id" value={task.id} />
              <button className="p-2 bg-green-500 text-white rounded">Completed</button>
            </form>
            <form action={removeTask} className="flex items-center justify-between w-full">
              <input type="hidden" name="id" value={task.id} />
              <button className="p-2 bg-red-500 text-white rounded">Delete</button>
            </form>
          </div>
        </div>
      ))}
      <footer className="text-center text-gray-400 text-sm">
        <p>
          Created with{' '}
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Blitz.js
          </a>
        </p>
      </footer>
    </main>
  );
}

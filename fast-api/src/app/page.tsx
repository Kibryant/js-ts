'use client'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {
  const [input, setInput] = useState<string>('')
  const [searchResults, setSearchResults] = useState<{
    results: string[]
    duration: number
  }>()

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResults(undefined)
      // once deployed, prefix this with your cloudflare worker url
      // i.e.: https://<name>.<account-name>.workers.dev/api/search?q=${input}

      const res = await fetch(`/api/search?q=${input}`)
      const data = (await res.json()) as { results: string[]; duration: number }
      console.log(data)
      setSearchResults(data)
    }

    fetchData()
  }, [input])

  return (
    <main className='h-screen w-screen grainy'>
      <div className='flex flex-col gap-6 items-center pt-32 duration-500 animate-in animate fade-in-5 slide-in-from-bottom-2.5'>
        <h1 className='text-5xl tracking-tight font-bold'>SpeedSearch ⚡</h1>
        <p className='text-zinc-600 text-lg max-w-prose text-center'>
          A high-performance API built with Hono, Next.js and Cloudflare. <br />{' '}
          Type a query below and get your results in miliseconds.
        </p>

        <div className='max-w-md w-full'>
          <Command>
            <CommandInput
              value={input}
              onValueChange={setInput}
              placeholder='Search countries...'
              className='placeholder:text-zinc-500'
            />
            <CommandList>
              {searchResults?.results.length === 0 ? (
                <CommandEmpty>No results found.</CommandEmpty>
              ) : null}

              {searchResults?.results ? (
                <CommandGroup heading='Results'>
                  {searchResults?.results.map((result) => (
                    <CommandItem
                      key={result}
                      value={result}
                      onSelect={setInput}>
                      {result}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}

              {searchResults?.results ? (
                <>
                  <div className='h-px w-full bg-zinc-200' />

                  <p className='p-2 text-xs text-zinc-500'>
                    Found {searchResults.results.length} results in{' '}
                    {searchResults?.duration.toFixed(0)}ms
                  </p>
                </>
              ) : null}
            </CommandList>
          </Command>
        </div>

        <div className='max-w-md w-full flex flex-col justify-between items-center gap-y-4'>
          <div className='flex gap-x-2'>
            <div className='shadow-md rounded-md flex justify-center items-center p-1'>
              <Image src="https://www.logo.wine/a/logo/PostgreSQL/PostgreSQL-Logo.wine.svg" alt="PostgreSQL" width={100} height={100} />
            </div>
            <div className='shadow-md rounded-md flex justify-center items-center p-1'>
              <Image src="https://www.svgrepo.com/show/303460/redis-logo.svg" alt="PostgreSQL" width={50} height={50} />
            </div>
          </div>

          <p className='text-xs text-zinc-400'>
              Powered by{' '}
          </p>
        </div>
      </div>
    </main>
  )
}

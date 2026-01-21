import React from 'react'
import SearchBar from '../../others/SearchBar'
import { Button } from '../../ui/button'
import { StarIcon, BoldIcon, ItalicIcon, ImageIcon, PaperclipIcon, ChevronDown, MessageSquare, Share2 } from 'lucide-react'

const mockDiscussions = [
  {
    id: 1,
    votes: 124,
    author: 'AlexCode',
    time: '2 hours ago',
    status: 'SOLVED',
    title: 'Hint for O(n) solution',
    body:
      'Remember that you only need to visit each node once. Think about using a queue for tracking levels. You can get the level size at each iteration of the while loop.',
    replies: 3,
  },
  {
    id: 2,
    votes: 42,
    author: 'SophiaDev',
    time: '5 hours ago',
    status: null,
    title:
      'Can someone explain why we need to use a queue here? Would a stack work for DFS approach?',
    body: '"Level order traversal usually implies BFS..."',
    replies: 3,
  },
  {
    id: 3,
    votes: 18,
    author: 'Marco_Polo',
    time: '1 day ago',
    status: null,
    title:
      'The time complexity is O(n) because each node is pushed and popped from the queue exactly once. Space complexity is O(w) where w is max width.',
    body: '',
    replies: 0,
  },
]

const Composer = () => {

  //might add some usestate in future (chats)
  return (
    <div className="w-full bg-white/60 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
      <div className="flex items-start gap-4">
        <img
          src={`https://i.pravatar.cc`}
          alt="avatar"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <textarea
            rows={3}
            placeholder="Share your thoughts or hints..."
            className="w-full resize-none rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-500">
              <Button variant="ghost" className="h-8 px-2 text-zinc-600 dark:text-zinc-300">
                <BoldIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="h-8 px-2 text-zinc-600 dark:text-zinc-300">
                <ItalicIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="h-8 px-2 text-zinc-600 dark:text-zinc-300">
                <PaperclipIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="h-8 px-2 text-zinc-600 dark:text-zinc-300">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Post Comment</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const DiscussionCard = ({key, item }) => {
  return (
    <div className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 p-4 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center text-zinc-500 min-w-8">
          <ChevronDown className="h-4 w-4 rotate-180" />
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{item.votes}</span>
          <ChevronDown className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <img
              src={`https://i.pravatar.cc/64?u=${item.author}`}
              alt={item.author}
              className="h-6 w-6 rounded-full"
            />
            <span className="text-zinc-700 dark:text-zinc-300 font-medium">{item.author}</span>
            <span>•</span>
            <span>{item.time}</span>
            {item.status && (
              <span className="ml-2 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 px-2 py-0.5 text-[10px] font-semibold">
                {item.status}
              </span>
            )}
          </div>
          <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {item.title}
          </h3>
          {item.body && (
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{item.body}</p>
          )}

          <div className="mt-3 flex items-center gap-4 text-sm text-zinc-500">
            <button className="inline-flex items-center gap-1 hover:text-zinc-700 dark:hover:text-zinc-300">
              <MessageSquare className="h-4 w-4" /> Reply
            </button>
            <button className="inline-flex items-center gap-1 hover:text-zinc-700 dark:hover:text-zinc-300">
              <Share2 className="h-4 w-4" /> Share
            </button>
            {item.replies > 0 && (
              <span className="ml-auto text-xs">{item.replies} Replies</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const Discussion = () => {
  return (
    <div>
      <div className='flex items-center gap-6 my-6'>
        <SearchBar placeholder='Search Discussions ...'/>
        <Button className='border-2 py-4'>
          <StarIcon />
          <p>Newest</p>
        </Button>
      </div>

      <Composer />

      <div className="mt-6 flex flex-col gap-4">
        {mockDiscussions.map((d) => (
          <DiscussionCard key={d.id} item={d} />
        ))}
      </div>
    </div>
  )
}

export default Discussion
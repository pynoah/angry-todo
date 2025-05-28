import { useState, useEffect } from 'react'
import './App.css'

const angryMessages = [
  'ちゃんとやれ！',
  'まだ終わってないぞ！',
  '何回言わせるんだ！',
  'サボるな！',
  'はやく終わらせろ！',
  'また追加かよ！'
]

const soundFiles = [
  '/sounds/「残念」.mp3',
  '/sounds/男衆「喝！」.mp3',
  '/sounds/爆発1.mp3'
]

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function App() {
  const [todos, setTodos] = useState<{ text: string; done: boolean }[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [message, setMessage] = useState('')
  const [angerLevel, setAngerLevel] = useState(0)

  const playSound = () => {
    const audio = new Audio(getRandomItem(soundFiles))
    audio.play()
  }

  const showAngryMessage = () => {
    setMessage(getRandomItem(angryMessages))
    playSound()
  }

  const addTodo = () => {
    if (newTodo.trim() === '') return
    const updatedTodos = [...todos, { text: newTodo, done: false }]
    setTodos(updatedTodos)
    setNewTodo('')
    setAngerLevel((prev) => Math.min(100, prev + 10))
    showAngryMessage()
  }

  const deleteTodo = (index: number) => {
    const updated = [...todos]
    updated.splice(index, 1)
    setTodos(updated)
    setAngerLevel((prev) => Math.max(0, prev - 5))
    showAngryMessage()
  }

  const toggleComplete = (index: number) => {
    const updated = [...todos]
    updated[index].done = !updated[index].done
    setTodos(updated)
    setAngerLevel((prev) => Math.min(100, prev + 5))
    showAngryMessage()
  }

  return (
    <div className="min-h-screen bg-red-50 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-red-700 mb-6">怒られるToDoリスト</h1>

      <div className="bg-white shadow-md rounded p-6 w-full max-w-4xl">
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e)=>{
              if (e.key === 'Enter')addTodo()
            }}
            className="flex-1 border border-gray-300 p-2 rounded"
            placeholder="やることを入力"
          />
          <button
            onClick={addTodo}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            追加
          </button>
        </div>

        {message && (
          <div className="mb-4 text-red-600 font-bold text-lg animate-pulse">
            {message}
          </div>
        )}

        <div className="mb-4 bg-red-200 rounded h-6 w-full overflow-hidden">
          <div
            className="bg-red-600 h-full transition-all duration-300"
            style={{ width: `${angerLevel}%` }}
          ></div>
        </div>

        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-red-100 px-4 py-2 rounded"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleComplete(index)}
                />
                <span className={todo.done ? 'line-through text-gray-500' : ''}>{todo.text}</span>
              </div>
              <button
                onClick={() => deleteTodo(index)}
                className="text-red-500 hover:text-red-700"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      </div>

      <img
        src="/character/angry-face.png"
        alt="怒ってるキャラ"
        className="mt-6 w-32 h-32 object-contain animate-wiggle"
      />
    </div>
  )
}

export default App

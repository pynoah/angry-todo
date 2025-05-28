import { useState } from 'react'
import './App.css'

const angryMessages = [
  "は？今さらやる気出すなよ！",
  "なんで今までやってなかったの？",
  "もっと早くやれって言ったよな！？",
  "また後回しかよ、ふざけんな！",
  "おせぇんだよ！",
]

// 🎵 使用する怒りボイスのファイル名一覧
const angrySounds = [
  '/sounds/「おめでとう」.mp3',
  '/sounds/「すごいすごい」.mp3',
  '/sounds/爆発1.mp3',
]

function App() {
  const [todos, setTodos] = useState<string[]>([])
  const [newTodo, setNewTodo] = useState<string>('')
  const [angryMessage, setAngryMessage] = useState<string>('')

  const playRandomAngrySound = () => {
    const randomSound = angrySounds[Math.floor(Math.random() * angrySounds.length)]
    const audio = new Audio(randomSound)
    audio.play()
  }

  const addTodo = () => {
    if (newTodo.trim() === '') return
    setTodos([...todos, newTodo])
    setNewTodo('')
    const message =
      angryMessages[Math.floor(Math.random() * angryMessages.length)]
    setAngryMessage(message)
    playRandomAngrySound()
  }

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index))
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center text-red-600 mb-6">
        怒られるToDoリスト
      </h1>

      {angryMessage && (
        <div className="bg-red-200 text-red-900 font-bold p-4 rounded mb-4 text-center animate-pulse">
          {angryMessage}
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
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

      <ul className="space-y-2">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="bg-red-100 text-red-800 px-4 py-2 rounded flex justify-between items-center"
          >
            <span>{todo}</span>
            <button
              onClick={() => deleteTodo(index)}
              className="text-xs bg-red-400 hover:bg-red-600 text-white px-2 py-1 rounded"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

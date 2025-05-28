import { useState, useEffect } from 'react'

const soundFiles = [
  '/sounds/sound1.mp3',
  '/sounds/sound2.mp3',
  '/sounds/sound3.mp3',
]

function App() {
  const [todos, setTodos] = useState<string[]>([])
  const [newTodo, setNewTodo] = useState<string>('')
  const [angerLevel, setAngerLevel] = useState<number>(0)
  const [angryMessage, setAngryMessage] = useState<string>('')

  // メッセージ表示のヘルパー
  const showAngryMessage = (message: string) => {
    setAngryMessage(message)
    // 3秒で消える
    setTimeout(() => setAngryMessage(''), 3000)
  }

  // 効果音再生のヘルパー
  const playRandomSound = () => {
    const src = soundFiles[Math.floor(Math.random() * soundFiles.length)]
    const audio = new Audio(src)
    audio.play()
  }

  const addTodo = () => {
    if (newTodo.trim() === '') return
    setTodos([...todos, newTodo])
    setNewTodo('')
    setAngerLevel((prev) => Math.min(prev + 10, 100))
    showAngryMessage('何やってるの！もっと頑張りなさい！')
    playRandomSound()
  }

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index))
    setAngerLevel((prev) => Math.max(prev - 5, 0))
    showAngryMessage('まだ終わってないのに消さないでよ！')
    playRandomSound()
  }

  const toggleComplete = (index: number) => {
    // 今回は簡単に完了扱いで削除する動作にしています
    const todo = todos[index]
    setTodos(todos.filter((_, i) => i !== index))
    setAngerLevel((prev) => Math.min(prev + 15, 100))
    showAngryMessage(`「${todo}」は完了？まあ、頑張ったわね！`)
    playRandomSound()
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-6 text-red-700">怒られるToDoリスト</h1>

      <img
        src="/character/angry-face.png"
        alt="怒ってるキャラ"
        className="w-32 h-32 mb-4"
      />

      <div className="w-full max-w-3xl flex gap-3 mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="やることを入力"
          className="flex-grow border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          onClick={addTodo}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
        >
          追加
        </button>
      </div>

      <div className="w-full max-w-3xl mb-4">
        <div className="w-full h-6 bg-red-100 rounded overflow-hidden">
          <div
            className="h-full bg-red-600 transition-all duration-500"
            style={{ width: `${angerLevel}%` }}
          />
        </div>
      </div>

      {angryMessage && (
        <div className="mb-4 text-center text-red-700 font-semibold">
          {angryMessage}
        </div>
      )}

      <ul className="w-full max-w-3xl space-y-3">
        {todos.map((todo, i) => (
          <li
            key={i}
            className="flex justify-between items-center bg-red-100 text-red-900 px-5 py-3 rounded shadow"
          >
            <span>{todo}</span>
            <div className="flex gap-2">
              <button
                onClick={() => toggleComplete(i)}
                className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded"
              >
                完了
              </button>
              <button
                onClick={() => deleteTodo(i)}
                className="bg-red-300 hover:bg-red-400 text-white px-3 py-1 rounded"
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

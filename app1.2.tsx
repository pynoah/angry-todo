import { useState, useEffect } from 'react'

const soundFiles = [
  '/sounds/sound1.mp3',
  '/sounds/sound2.mp3',
  '/sounds/sound3.mp3',
]

function App() {
  // States
  const [todos, setTodos] = useState<string[]>([])
  const [newTodo, setNewTodo] = useState<string>('')
  const [angerLevel, setAngerLevel] = useState<number>(0)
  const [angryMessage, setAngryMessage] = useState<string>('')
  const [savedLists, setSavedLists] = useState<{ name: string; todos: string[] }[]>([])

  // Load saved lists from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('savedLists')
    if (stored) setSavedLists(JSON.parse(stored))
  }, [])

  // Persist savedLists
  useEffect(() => {
    localStorage.setItem('savedLists', JSON.stringify(savedLists))
  }, [savedLists])

  // Helper: message
  const showAngryMessage = (message: string) => {
    setAngryMessage(message)
    setTimeout(() => setAngryMessage(''), 3000)
  }

  // Helper: sound
  const playRandomSound = () => {
    const src = soundFiles[Math.floor(Math.random() * soundFiles.length)]
    const audio = new Audio(src)
    audio.play()
  }

  // Add todo
  const addTodo = () => {
    if (newTodo.trim() === '') return
    setTodos(prev => [...prev, newTodo])
    setNewTodo('')
    setAngerLevel(prev => Math.min(prev + 10, 100))
    showAngryMessage('何やってるの！もっと頑張りなさい！')
    playRandomSound()
  }

  // Delete todo
  const deleteTodo = (index: number) => {
    setTodos(prev => prev.filter((_, i) => i !== index))
    setAngerLevel(prev => Math.max(prev - 5, 0))
    showAngryMessage('まだ終わってないのに消さないでよ！')
    playRandomSound()
  }

  // Complete todo
  const toggleComplete = (index: number) => {
    const todo = todos[index]
    setTodos(prev => prev.filter((_, i) => i !== index))
    setAngerLevel(prev => Math.min(prev + 15, 100))
    showAngryMessage(`「${todo}」は完了？まあ、頑張ったわね！`)
    playRandomSound()
  }

  // Save current list
  const saveCurrentList = () => {
    const name = prompt('このToDoリストの名前を入力してください：')
    if (name) {
      setSavedLists(prev => [...prev, { name, todos }])
      showAngryMessage(`リスト「${name}」を保存したわよ！`)
    }
  }

  // Load a saved list
  const loadList = (listIndex: number) => {
    setTodos(savedLists[listIndex].todos)
    setAngerLevel(0)
    showAngryMessage(`リスト「${savedLists[listIndex].name}」を読み込んだわ！`)
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Saved Lists</h2>
        <ul className="flex-grow overflow-auto space-y-2">
          {savedLists.map((list, idx) => (
            <li
              key={idx}
              onClick={() => loadList(idx)}
              className="cursor-pointer px-3 py-1 rounded hover:bg-gray-100"
            >
              {list.name}
            </li>
          ))}
        </ul>
        <button
          onClick={saveCurrentList}
          className="mt-4 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
        >
          Save List
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6 text-red-700">怒られる ToDo リスト</h1>
        <img
          src="/character/angry-face.png"
          alt="怒ってるキャラ"
          className="w-24 h-24 mb-6"
        />

        <div className="w-full max-w-2xl flex gap-3 mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTodo()}
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

        <div className="w-full max-w-2xl mb-4">
          <div className="w-full h-4 bg-red-100 rounded overflow-hidden">
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

        <ul className="w-full max-w-2xl space-y-3">
          {todos.map((todo, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-white text-gray-900 px-5 py-3 rounded shadow"
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
      </main>
    </div>
  )
}

export default App;

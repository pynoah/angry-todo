import { useState, useEffect } from 'react'

const soundFiles = [
  '/sounds/sound1.mp3',
  '/sounds/sound2.mp3',
  '/sounds/sound3.mp3',
]

function App() {
  const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>([])
  const [newTodo, setNewTodo] = useState<string>('')
  const [angerLevel, setAngerLevel] = useState<number>(0)
  const [angryMessage, setAngryMessage] = useState<string>('')
  const [lists, setLists] = useState<{ name: string; todos: { text: string; completed: boolean }[] }[]>([])
  const [currentListIndex, setCurrentListIndex] = useState<number>(0)

  // Initialize lists
  useEffect(() => {
    const stored = localStorage.getItem('angryTodoLists')
    if (stored) {
      const parsed = JSON.parse(stored)
      setLists(parsed)
      setTodos(parsed[0]?.todos || [])
    } else {
      const defaultList = { name: 'Default List', todos: [] }
      setLists([defaultList])
      setTodos([])
      localStorage.setItem('angryTodoLists', JSON.stringify([defaultList]))
    }
  }, [])

  // Persist lists
  useEffect(() => {
    const updated = lists.map((list, idx) =>
      idx === currentListIndex ? { ...list, todos } : list
    )
    setLists(updated)
  }, [todos, currentListIndex])

  useEffect(() => {
    localStorage.setItem('angryTodoLists', JSON.stringify(lists))
  }, [lists])

  const showAngryMessage = (message: string) => {
    setAngryMessage(message)
    setTimeout(() => setAngryMessage(''), 3000)
  }

  const playRandomSound = () => {
    const src = soundFiles[Math.floor(Math.random() * soundFiles.length)]
    new Audio(src).play()
  }

  const addTodo = () => {
    if (!newTodo.trim()) return
    setTodos(prev => [...prev, { text: newTodo, completed: false }])
    setNewTodo('')
    setAngerLevel(prev => Math.min(prev + 10, 100))
    showAngryMessage('何やってるの！もっと頑張りなさい！')
    playRandomSound()
  }

  const deleteTodo = (idx: number) => {
    const item = todos[idx]
    setTodos(prev => prev.filter((_, i) => i !== idx))
    setAngerLevel(prev => Math.max(prev - 5, 0))
    showAngryMessage(
      item.completed
        ? '終わったもの消すのはいいけど…次はちゃんと確認してよ！'
        : 'まだ終わってないのに消さないでよ！'
    )
    playRandomSound()
  }

  const toggleComplete = (idx: number) => {
    const item = todos[idx]
    setTodos(prev =>
      prev.map((t, i) => (i === idx ? { ...t, completed: !t.completed } : t))
    )
    setAngerLevel(prev => Math.min(prev + 15, 100))
    showAngryMessage(
      !item.completed
        ? `「${item.text}」完了？まあ、頑張ったわね！`
        : `「${item.text}」を未完了に戻すの？困るわね…`
    )
    playRandomSound()
  }

  const createNewList = () => {
    const name = prompt('新しいリスト名を入力してください：')
    if (name) {
      const updated = [...lists, { name, todos: [] }]
      setLists(updated)
      setCurrentListIndex(updated.length - 1)
      setTodos([])
      showAngryMessage(`リスト「${name}」を作成したわよ！`)
    }
  }

  const loadList = (idx: number) => {
    setCurrentListIndex(idx)
    setTodos(lists[idx].todos)
    setAngerLevel(0)
    showAngryMessage(`リスト「${lists[idx].name}」を読み込んだわ！`)
  }

  return (
    <div className="h-screen flex bg-gray-50 overflow-x-hidden">
      {/* Sidebar: fixed left */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r p-4 flex flex-col overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Lists</h2>
        <ul className="flex-grow space-y-2">
          {lists.map((list, idx) => (
            <li
              key={idx}
              onClick={() => loadList(idx)}
              className={`cursor-pointer px-3 py-1 rounded hover:bg-gray-100 ${
                idx === currentListIndex ? 'bg-gray-200' : ''
              }`}
            >
              {list.name}
            </li>
          ))}
        </ul>
        <button
          onClick={createNewList}
          className="mt-4 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
        >
          新しいリストを作成
        </button>
      </aside>

      {/* Main: page scroll right edge */}
      <main className="ml-64 flex-grow p-8 flex justify-center overflow-y-auto h-screen">
        <div className="w-full max-w-2xl flex flex-col items-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            怒られる ToDo リスト
          </h1>

          {/* Reserved message space */}
          <div className="h-6 mb-4 flex items-center justify-center">
            {angryMessage && (
              <div className="text-indigo-600 font-medium">
                {angryMessage}
              </div>
            )}
          </div>

          <img
            src="/character/angry-face.png"
            alt="怒ってるキャラ"
            className="w-24 h-24 mb-6"
          />

          <div className="w-full flex justify-center mb-6">
            <input
              type="text"
              value={newTodo}
              onChange={e => setNewTodo(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTodo()}
              placeholder="やることを入力"
              className="w-full max-w-md border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={addTodo}
              className="ml-2 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
            >
              追加
            </button>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded overflow-hidden mb-6">
            <div
              className="h-full bg-indigo-600 transition-all duration-500"
              style={{ width: `${angerLevel}%` }}
            />
          </div>

          <ul className="w-full space-y-4">
            {todos.map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-white text-gray-900 px-5 py-3 rounded-lg shadow"
              >
                <span
                  className={item.completed ? 'line-through text-gray-500' : ''}
                >
                  {item.text}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleComplete(i)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded"
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
      </main>
    </div>
  )
}

export default App;

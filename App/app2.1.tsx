import { useState } from "react";

const mockTodos = [
  { text: "なんでやねん", done: false },
  { text: "宿題をする", done: true },
  { text: "買い物に行く", done: false },
];

export default function App() {
  const [todos, setTodos] = useState(mockTodos);

  const handleComplete = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const handleDelete = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const completedCount = todos.filter((todo) => todo.done).length;
  const progress = (completedCount / todos.length) * 100;

  return (
    <div className="w-screen h-screen flex">
      {/* Sidebar: 固定位置のリスト選択メニュー */}
      <aside className="fixed z-20 left-0 top-0 bottom-0 w-60 bg-white border-r p-6 flex flex-col overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Lists</h2>
        <ul className="flex-grow space-y-2"></ul>
        <button className="mt-4 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition">
          新しいリストを作成
        </button>
      </aside>

      {/* Main Content Area: 左のサイドバーの分だけマージンを取る */}
      <div className="ml-60 flex-1 flex flex-col">
        <main className="min-h-screen flex-1 flex flex-col">
          {/* スクロール可能領域 */}
          <div className="flex-1 overflow-y-auto px-12 py-8 flex flex-col items-center">
            <div className="w-full max-w-2xl flex flex-col items-center">
              {/* タイトル */}
              <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
                怒られる ToDo リスト
              </h1>

              {/* 怒りゲージのスペース */}
              <div className="h-6 mb-4 flex items-center justify-center"></div>

              {/* 怒ったキャラの画像 */}
              <img
                alt="怒ってるキャラ"
                className="w-24 h-24 mb-6"
                src="/character/angry-face.png"
              />

              {/* ToDo 入力エリア */}
              <div className="flex justify-center mb-6">
                <input
                  placeholder="やることを入力"
                  className="w-72 sm:w-80 md:w-96 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  type="text"
                />
                <button className="ml-2 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">
                  追加
                </button>
              </div>

              {/* 進捗バー */}
              <div className="w-full h-2 bg-gray-200 rounded overflow-hidden mb-6">
                <div
                  className="h-full bg-indigo-600 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* ToDo リスト表示 */}
              <div className="w-full flex-1 overflow-y-auto">
                <ul className="w-full space-y-4 mb-8">
                  {todos.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-white text-gray-900 px-5 py-3 rounded-lg shadow"
                    >
                      <span className={item.done ? "line-through" : ""}>{item.text}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleComplete(index)}
                          className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded"
                        >
                          完了
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="bg-red-300 hover:bg-red-400 text-white px-3 py-1 rounded"
                        >
                          削除
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

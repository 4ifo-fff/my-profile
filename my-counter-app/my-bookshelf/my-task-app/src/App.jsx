import { useEffect, useState } from 'react'

const initialTasks = [
  { id: 1, text: 'React の学習をする', done: false },
  { id: 2, text: 'タスクアプリを完成させる', done: true },
  { id: 3, text: 'コードを見直す', done: false },
]

const createTaskId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('tasks')

      if (!savedTasks) {
        return initialTasks
      }

      const parsedTasks = JSON.parse(savedTasks)
      return Array.isArray(parsedTasks) && parsedTasks.length > 0
        ? parsedTasks
        : initialTasks
    } catch {
      return initialTasks
    }
  })

  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const handleAddTask = (event) => {
    event.preventDefault()

    const trimmedText = newTask.trim()
    if (!trimmedText) {
      return
    }

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: createTaskId(),
        text: trimmedText,
        done: false,
      },
    ])

    setNewTask('')
  }

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    )
  }

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-800">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
        <h1 className="mb-6 text-3xl font-bold text-slate-800">My Tasks</h1>

        <form onSubmit={handleAddTask} className="mb-6 flex gap-3">
          <input
            type="text"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="新しいタスクを入力"
            className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            追加
          </button>
        </form>

        <ul className="space-y-3">
          {tasks.length === 0 ? (
            <li className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center text-slate-500">
              登録されたタスクはありません
            </li>
          ) : (
            tasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 ${
                  task.done
                    ? 'border-emerald-200 bg-emerald-50'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  className="flex flex-1 items-center gap-3 text-left"
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border text-xs font-bold ${
                      task.done
                        ? 'border-emerald-500 bg-emerald-500 text-white'
                        : 'border-slate-300 text-transparent'
                    }`}
                  >
                    ✓
                  </span>

                  <span
                    className={`flex-1 ${
                      task.done ? 'text-slate-400 line-through' : 'text-slate-700'
                    }`}
                  >
                    {task.text}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                >
                  削除
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  )
}

export default App
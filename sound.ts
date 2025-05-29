const files = {
  add: ['「はい」.mp3', '「はいは～い♪」.mp3', '「はいはいは～い！」.mp3'],
  delete: ['「こら！」.mp3', '「なんだザコかあ」.mp3'],
  complete: ['「頑張ったね」.mp3', '「すごいすごい」.mp3'],
}

/**
 * 指定したタイプの音声をランダム再生する
 */
export function playRandomSound(type: 'add' | 'delete' | 'complete'): void {
  const list = files[type]
  const chosen = list[Math.floor(Math.random() * list.length)]
  const audio = new Audio(`/sounds/${type}/${chosen}`)
  audio.play().catch(() => console.warn(`Failed to play sound: ${chosen}`))
}

/**
 * 全タイプ混合でランダム再生する場合用の配列（例）
 */
export const allSoundFiles = [
  '/sounds/add/「はい」.mp3',
  '/sounds/add/「はいは～い♪」.mp3',
  '/sounds/add/「はいはいは～い！」.mp3',
  '/sounds/delete/「こら！」.mp3',
  '/sounds/delete/「なんだザコかあ」.mp3',
  '/sounds/complete/「頑張ったね」.mp3',
  '/sounds/complete/「すごいすごい」.mp3',
]

/**
 * 全タイプの音声からランダム再生する関数
 */
export function playSound(): void {
  const src = allSoundFiles[Math.floor(Math.random() * allSoundFiles.length)]
  const audio = new Audio(src)
  audio.play().catch(() => console.warn(`Failed to play sound: ${src}`))
}

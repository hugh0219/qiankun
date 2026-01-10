import { createContext } from 'react'

// 定义 actions 类型（qiankun 实际 API）
export interface QiankunActions {
  activeRule?: string
  onGlobalStateChange?: (
    callback: (
      state: Record<string, unknown>,
      prev: Record<string, unknown>
    ) => void
  ) => void
  setGlobalState: (state: Record<string, unknown>) => boolean
}

export const QiankunContext = createContext<QiankunActions | undefined>(
  undefined
)

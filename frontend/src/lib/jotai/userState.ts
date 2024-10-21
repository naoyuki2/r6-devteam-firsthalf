import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'

export type User = {
  id: number
  name: string
  email: string
  iconImageUrl: string | null
}

const currentUserState = atom<User | null>(null)

// 値と更新関数を取得
export const useCurrentUserState = () => {
  const [currentUser, setCurrentUser] = useAtom(currentUserState)
  return { currentUser, setCurrentUser }
}

// 値のみ取得
export const useCurrentUser = () => {
  return useAtomValue(currentUserState)
}

// 更新関数のみ取得
export const useSetCurrentUser = () => {
  return useSetAtom(currentUserState)
}

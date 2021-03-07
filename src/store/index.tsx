import React, { PropsWithChildren, createContext, FC } from 'react'
import { createStore, IStore } from './createStore'

const StoreContext = createContext<IStore | null>(null)

export const store = createStore()

export const StoreProvider: FC<{}> = ({ children }: PropsWithChildren<{}>) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export const useStore = (): IStore => {
  const store = React.useContext(StoreContext)
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('You have forgot to use StoreProvider, shame on you.')
  }
  return store
}

import AppStore from './appStore'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createStore() {
  return {
    appStore: new AppStore(),
  }
}

export type IStore = ReturnType<typeof createStore>

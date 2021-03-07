import { createBrowserHistory } from 'history'
import MobxReactRouter, {
  RouterStore,
  syncHistoryWithStore
} from 'mobx-react-router'
import { store } from '@/store'
// import { getQueryParam, addSearchParam } from './util'

export interface CustomHistory extends MobxReactRouter.SynchronizedHistory {
  refresh?: () => void
}

const browserHistory = createBrowserHistory({ basename: '/xhloan' })
const routingStore = new RouterStore()
const history: CustomHistory = syncHistoryWithStore(
  browserHistory,
  routingStore
)

history.listen((location, action) => {
  // const { appStore: historyStore } = store
  console.log(location, action);
  
  // if (location !== historyStore.current) {
  //   switch (action) {
  //     case 'PUSH':
  //       historyStore.push(location)
  //       break
  //     case 'POP':
  //       if (
  //         historyStore.previous &&
  //         location.key === historyStore.previous.key
  //       ) {
  //         historyStore.pop()
  //       } else if (
  //         !historyStore.current ||
  //         location.key !== historyStore.current.key
  //       ) {
  //         historyStore.push(location)
  //       }
  //       break
  //     case 'REPLACE':
  //       historyStore.replace(location)
  //       break
  //   }
  // }
})

history.refresh = () => {
  history.replace('/refresh' + history.location.pathname)
}

const originHistoryPush = history.push
const originHistoryReplace = history.replace

history.push = (path: any, state?: any) => {

}

history.replace = (path: any, state?: any) => {
  
}

export default history

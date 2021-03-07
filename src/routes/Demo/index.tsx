import React, { FC, useState } from 'react'
import { useAsyncEffect } from '@/hooks/useAsyncEffect'
// import Page from '@/components/Page'
// import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
// import history from '@/utils/history'

const App: FC<{}> = () => {
  const [count, setCount] = useState(0)

  useAsyncEffect(async () => {
    // await demoStore.fetchData()
  })

  return (
    <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
        Click me
        </button>
    </div>
  )
}

export default observer(App)

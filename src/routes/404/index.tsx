import React, { FC } from 'react'

import './index.scss'

const NoFoundPage: FC<{}> = () => (
  <div styleName="notfound">
    404
    <div styleName="tips">找不到了</div>
  </div>
)

export default NoFoundPage

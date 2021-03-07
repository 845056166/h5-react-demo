// countUP.ts
/**
 * 数字累加滚动
 * 通过interval控制，即控制帧与帧的间隔
 * @param {Object}   option              配置
 * @param {Number}   option.start        起始数字
 * @param {Number}   option.end          结束数字
 * @param {Number}   option.interval     帧与帧之间的间隔(ms)
 * @param {Function} option.callback     回调函数，参数为每次累加后的数字
 */
export interface CountProps {
  start?: number
  end?: number
  interval?: number
  callback?: (value: any) => void
}

export default function countUp(CountProps: any): void {
  let { start = 0, end, interval = 0, callback } = CountProps
  // 计数器
  // 当指定interval时，计数器才起作用
  // 作用：用于与interval比较，等于interval时，执行回调，然后清零重新计数，达到控制速度的效果
  let counter = 0

  // 帧的回调函数
  function step(): void {
    let req: any

    function commonLogic(): void {
      let frameStep: number = start
      frameStep = frameStep + (end - frameStep) / interval
      if (end % 1 === 0) {
        frameStep = Math.ceil(frameStep)
      } else {
        frameStep = Number(frameStep.toFixed(2))
      }

      if (end - frameStep >= 1) {
        start = frameStep
        callback(start)
        window.cancelAnimationFrame(req)
        req = window.requestAnimationFrame(step)
      } else {
        callback(end)
      }
    }

    if (interval !== 0) {
      counter++

      if (counter === interval) {
        commonLogic()
        counter = 0
      } else {
        window.cancelAnimationFrame(req)
        req = window.requestAnimationFrame(step)
      }
    }
  }

  window.requestAnimationFrame(step)
}

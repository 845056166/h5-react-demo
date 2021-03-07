import { observable, action } from 'mobx'

class ErrorStore {
  @observable
  public status = false

  @observable
  public message = '网络异常，请稍后重试'

  @action
  public show(message: string): void {
    this.status = true
    this.message = message || '网络异常，请稍后重试'
  }

  @action
  public hide(): void {
    this.status = false
    this.message = '网络异常，请稍后重试'
  }
}

class LoadingStore {
  @observable
  public loading = false

  @action
  public show(): void {
    this.loading = true
  }

  @action
  public hide(): void {
    this.loading = false
  }
}

export default class AppStore {
  public error: ErrorStore

  public loading: LoadingStore

  public constructor() {
    this.error = new ErrorStore()
    this.loading = new LoadingStore()
  }
}

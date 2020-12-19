import { makeAutoObservable } from 'mobx'

class ApplicationStore {
  userId: ?Number = null // Persist
  refreshToken: ?String = null // Persist

  constructor () {
    makeAutoObservable(this)
  }

  signIn = ({ userId, refreshToken }) => {
    this.userId = userId
    this.refreshToken = refreshToken
  }
}

const store = new ApplicationStore()

export default store

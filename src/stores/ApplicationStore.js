import { makeAutoObservable } from 'mobx'

class ApplicationStore {
  userId: ?Number = null // Persist
  refreshToken: ?String = null // Persist
  accessToken: ?String = null

  constructor () {
    makeAutoObservable(this)
  }

  signIn = ({ userId, refreshToken }) => {
    this.userId = userId
    this.refreshToken = refreshToken
  }
}

export default new ApplicationStore()

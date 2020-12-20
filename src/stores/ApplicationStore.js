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

  /**
   * REVIEW: Replacing with a new instance would be much cleaner
   */
  signOut = () => {
    this.userId = ApplicationStore.prototype.userId
    this.refreshToken = ApplicationStore.prototype.refreshToken
  }
}

const store = new ApplicationStore()

export default store

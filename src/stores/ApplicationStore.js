import { makeAutoObservable, runInAction } from 'mobx'
import ApiConnection from '../api/ApiConnection'
import * as SecureStore from 'expo-secure-store'

class ApplicationStore {
  userId: ?Number = null // Persist
  // refreshToken: ?String = null // Persist

  constructor () {
    makeAutoObservable(this)
  }

  signIn = async (token) => {
    ApiConnection.addHeaders({ 'Authorization': 'Bearer ' + token.access_token })

    let signin
    try {
      signin = await ApiConnection.post('signin', { /* TODO: Notifications token */ })
    } catch (error) {
      console.log('Error signing in', JSON.stringify(error.data.response.status), ';', ApplicationStore.accessToken)
      return
    }

    if (token.refresh_token) {
      SecureStore.setItemAsync('refreshToken', token.refresh_token)
    }

    runInAction(() => { this.userId = signin.user?.id })
  }

  signOut = () => {
    // REVIEW: Replacing with a new instance would be much cleaner
    this.userId = ApplicationStore.prototype.userId

    SecureStore.deleteItemAsync('refreshToken')
    ApiConnection.addHeaders({ 'Authorization': '' })
  }
}

export default new ApplicationStore()

import { makeAutoObservable, runInAction } from 'mobx'
import ApiConnection from '../api/ApiConnection'
import * as SecureStore from 'expo-secure-store'
import { reloadAsync } from 'expo-updates'

export default class ApplicationStore {
  userId: ?Number = null

  constructor () {
    makeAutoObservable(this)
  }

  signIn = async (token) => {
    ApiConnection.addHeaders({ 'Authorization': 'Bearer ' + token.access_token })

    let signin
    try {
      signin = await ApiConnection.post('signin', { /* TODO: Notifications token */ })
    } catch (error) {
      console.log('Error signing in', JSON.stringify(error.data.response.status))
      return
    }

    if (token.refresh_token) {
      SecureStore.setItemAsync('refreshToken', token.refresh_token)
    }

    runInAction(() => { this.userId = signin.user?.id })

    return signin
  }

  signOut = () => {
    SecureStore.deleteItemAsync('refreshToken')
    reloadAsync()
  }
}

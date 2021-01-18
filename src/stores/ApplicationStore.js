import { makeAutoObservable, runInAction } from 'mobx'
import ApiConnection from '../api/ApiConnection'
import * as SecureStore from 'expo-secure-store'
import { reloadAsync } from 'expo-updates'

export default class ApplicationStore {
  stores: Object = {}

  constructor (stores: Object) {
    makeAutoObservable(this, { stores: false })

    this.stores = stores
  }

  signInAsync = async (token) => {
    ApiConnection.addHeaders({ 'Authorization': 'Bearer ' + token.access_token })

    let result
    try {
      result = await ApiConnection.post('signin', { /* TODO: Notifications token */ })
    } catch (error) {
      console.log('Error signing in', JSON.stringify(error.data.response.status))
      return
    }

    return result.success
      ? this._handleUserSignedIn(token, result.user)
      : result
  }

  signUpAsync = async (token, userInfo) => {
    // REVIEW: Auth header already set in SignIn when checking for user's existence

    let result = await ApiConnection.post('signup', {
      userInfo: userInfo
    })

    return this._handleUserSignedIn(token, result)
  }

  _handleUserSignedIn = (token, userData) => {
    if (token.refresh_token) {
      SecureStore.setItemAsync('refreshToken', token.refresh_token)
    }

    let user
    runInAction(() => {
      user = this.stores.user.upsert(userData)
      this.stores.user.setCurrentUserId(user.id)
    })

    return user
  }

  signOut = () => {
    SecureStore.deleteItemAsync('refreshToken')
    reloadAsync()
  }
}

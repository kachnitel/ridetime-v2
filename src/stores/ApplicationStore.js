import { makeAutoObservable, runInAction } from 'mobx'
import ApiConnection from '../api/ApiConnection'
import * as SecureStore from 'expo-secure-store'
import { reloadAsync } from 'expo-updates'

export default class ApplicationStore {
  userId: ?Number = null

  constructor () {
    makeAutoObservable(this)
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

    runInAction(() => { this.userId = userData.id })

    return userData
    // TODO: Add to userStore and return user
  }

  signOut = () => {
    SecureStore.deleteItemAsync('refreshToken')
    reloadAsync()
  }
}

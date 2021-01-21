import { makeAutoObservable } from 'mobx'
// eslint-disable-next-line react-native/split-platform-components
import { ToastAndroid } from 'react-native'
import ApiConnection from '../api/ApiConnection'

export default class UserStore {
  users: User[] = []
  currentUserId: Number = null

  constructor () {
    makeAutoObservable(this)
  }

  upsert = (data: Object) => {
    let user = this.users.find((entity) => entity.id === data.id) || new User(this)

    Object.entries(data).forEach(([key, val]) => {
      if (Object.keys(user).includes(key)) {
        user[key] = val
      }
    })

    !this.users.find((entity) => entity.id === user.id) && this.users.push(user)

    return user
  }

  setCurrentUserId = (id: Number) => this.currentUserId = id

  get currentUser () {
    return this.users.find((entity) => entity.id === this.currentUserId)
  }

  uploadPictureAsync = async (image: Object) => {
    let result = await ApiConnection.postFile(`api/users/${this.currentUserId}/picture`, 'picture', image)
    return this.upsert(result)
  }

  updateUserAsync = async (user: User) => {
    let result = await ApiConnection.put('api/users/' + user.id, user)

    ToastAndroid.show(`User ${user.name}'s profile updated.`, ToastAndroid.SHORT)
    return this.upsert(result)
  }
}

export class User {
  store: UserStore = null
  id = null
  name = null
  picture = null
  email = null
  hometown = null
  level = null
  bike = null
  // IDs lists
  locations = []
  events = []
  friends = []

  constructor (store: UserStore) {
    makeAutoObservable(this, {
      store: false,
      id: false
    })
    this.store = store
  }
}

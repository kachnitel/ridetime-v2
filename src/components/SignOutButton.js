import React, { Component } from 'react'
import { Button } from 'react-native'
import Authentication from '../Authentication'
import Colors from '../Colors'
import { StoreContext } from '../StoreContext'

export default class SignOutButton extends Component {
  render() {
    let AppStore = this.context.application
    return (
      <Button title='Sign out' color={ Colors.cancelAction } onPress={async () => {
        let auth = new Authentication()
        let result = await auth.logout()
        if (!result) {
          console.log('Error logging out', result)
          return
        }

        AppStore.signOut()
      }} />
    )
  }
}

SignOutButton.contextType = StoreContext

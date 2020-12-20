import React, { Component } from 'react'
import { Button } from 'react-native'
import Authentication from '../Authentication'
import ApplicationStore from '../stores/ApplicationStore'

export default class SignOutButton extends Component {
  render() {
    return (
      <Button title='Sign out' onPress={async () => {
        let auth = new Authentication()
        let result = await auth.logout()
        if (!result) {
          console.log('Error logging out', result)
          return
        }

        ApplicationStore.signOut()
      }} />
    )
  }
}

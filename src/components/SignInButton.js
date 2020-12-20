import React, { Component } from 'react'
import { Button } from 'react-native'
import Authentication from '../Authentication'
import ApplicationStore from '../stores/ApplicationStore'

export default class SignInButton extends Component {
  render() {
    return (
      <Button title='Sign in' onPress={async () => {
        let auth = new Authentication()
        let tokenResult = await auth.login()
        if (!tokenResult?.access_token) {
          console.log('Error fetching authentication token', tokenResult)
          return
        }

        ApplicationStore.signIn(tokenResult)
      }} />
    )
  }
}

import React, { Component } from 'react'
import { Button } from 'react-native'
import ApiConnection from '../api/ApiConnection'
import Authentication from '../Authentication'
import ApplicationStore from '../stores/ApplicationStore'

export default class SignInButton extends Component {
  render() {
    return (
      <Button title='Sign in' onPress={async () => {
        let auth = new Authentication()
        let result = await auth.login()
        if (!result?.access_token) {
          console.log('ET', result)
          return
        }
        ApiConnection.addHeaders({ 'Authorization': 'Bearer ' + result.access_token })

        let signin
        try {
          signin = await ApiConnection.post('signin', { /* TODO: Notifications token */ })
        } catch (error) {
          console.log('E', JSON.stringify(error.data.response.status), ';', ApplicationStore.accessToken)
          return
        }
        ApplicationStore.signIn({
          userId: signin.user?.id,
          refreshToken: result.refresh_token
        })
      }} />
    )
  }
}

import { StatusBar } from 'expo-status-bar'
import { Observer } from 'mobx-react'
import React from 'react'
import ApplicationStore from './src/stores/ApplicationStore'
import * as SecureStore from 'expo-secure-store'
import Authentication from './src/Authentication'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './src/navigation/AuthStack'
import AuthLoadingScreen from './src/navigation/screens/AuthLoadingScreen'
import AppStack from './src/navigation/AppStack'

export default class App extends React.Component {
  state = {
    loading: true,
    status: 'Initializing'
  }

  componentDidMount () {
    this.loadAuthAsync()
  }

  loadAuthAsync = async () => {
    let refreshToken = await SecureStore.getItemAsync('refreshToken')
    if (!refreshToken) {
      console.log('No token')
      this.setState({ loading: false })
      return
    }

    this.setState({ status: 'Refreshing token' })
    let auth = new Authentication()
    let token = await auth.refreshToken(refreshToken)
    if (!token?.access_token) {
      console.log('Error refreshing token')
      this.setState({ loading: false })
      return
    }

    this.setState({ status: 'Loading user' })
    await ApplicationStore.signIn(token)
    this.setState({ loading: false })
  }

  render () {
    return this.state.loading
      ? (<AuthLoadingScreen status={this.state.status} />)
      : (<Observer>{() => <>
        <NavigationContainer>
          { ApplicationStore.userId ? <AppStack /> : <AuthStack /> }
        </NavigationContainer>
        <StatusBar style='auto' />
      </>}</Observer>)
  }
}

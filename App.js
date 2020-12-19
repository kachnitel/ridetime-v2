import { StatusBar } from 'expo-status-bar'
import { Observer } from 'mobx-react'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import ApiConnection from './src/api/ApiConnection'
import Authentication from './src/Authentication'
import ApplicationStore from './src/stores/ApplicationStore'

export default function App() {
  let auth = new Authentication()

  return (
    <View style={styles.container}>
      <Text>Hi!</Text>
      <Observer>{() => <>
        <Text>User: { ApplicationStore.userId }</Text>
        <Text>Token: { ApplicationStore.refreshToken }</Text>
      </>}</Observer>
      <Button title='Sign in' onPress={async () => {
        let result = await auth.login()
        if (!result?.access_token) {
          console.log('ET', result)
          return
        }
        ApiConnection.addHeaders({ 'Authorization': 'Bearer ' + result.access_token })

        let signin
        try {
          signin = await ApiConnection.post('signin', {})
        } catch (error) {
          console.log('E', JSON.stringify(error.data.response.status), ';', ApplicationStore.accessToken)
          return
        }
        ApplicationStore.signIn({
          userId: signin.user?.id,
          refreshToken: result.refresh_token
        })
      }} />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

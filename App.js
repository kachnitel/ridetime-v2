import { StatusBar } from 'expo-status-bar'
import { Observer } from 'mobx-react'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import Authentication from './src/Authentication'
import ApplicationStore from './src/stores/ApplicationStore'

export default function App() {
  let auth = new Authentication()

  return (
    <View style={styles.container}>
      <Text>Hi!</Text>
      <Observer>
        {() => <Text>{ ApplicationStore.userId }</Text>}
      </Observer>
      <Button title='Sign in' onPress={auth.login} />
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

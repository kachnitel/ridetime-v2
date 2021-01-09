import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { StoreContext } from '../../StoreContext'

export default class HomeScreen extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text> Home </Text>
        <Text>{ this.context.application.userId }</Text>
      </View>
    )
  }
}

HomeScreen.contextType = StoreContext


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

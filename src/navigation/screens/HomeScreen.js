import { Observer } from 'mobx-react'
import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { StoreContext } from '../../StoreContext'

export default class HomeScreen extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text> Home </Text>
        <Observer>
          {() => <Text>{ this.context.user.currentUser.name }</Text>}
        </Observer>
        <Button title='Log user store' onPress={ () => {
          console.log(this.context.user.users)
        }} />
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

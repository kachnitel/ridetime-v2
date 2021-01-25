import { Observer } from 'mobx-react'
import React from 'react'
import { useContext } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { UserItem } from '../../components/UserList'
import { StoreContext } from '../../StoreContext'

const HomeScreen = () => {
  let { user: UserStore } = useContext(StoreContext)
  return <View style={styles.container}>
    <Text> Home </Text>
    <Observer>
      {() => <UserItem user={UserStore.currentUser} />}
    </Observer>
    <Button title='Log user store' onPress={ () => {
      console.log(UserStore.users)
    }} />
  </View>
}


export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

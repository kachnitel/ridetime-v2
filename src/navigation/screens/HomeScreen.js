import React from 'react'
import { useContext } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { MemoUserItem } from '../../components/UserList'
import { StoreContext } from '../../StoreContext'

const HomeScreen = () => {
  let { user: UserStore } = useContext(StoreContext)
  return <View style={styles.container}>
    <MemoUserItem user={UserStore.currentUser} />
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

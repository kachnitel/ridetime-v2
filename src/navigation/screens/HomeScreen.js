import React, { useContext } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import UserList, { MemoUserItem } from '../../components/UserList'
import { StoreContext } from '../../StoreContext'

const HomeScreen = () => {
  let { user: UserStore } = useContext(StoreContext)
  return <View style={styles.container}>
    <MemoUserItem user={UserStore.currentUser} />
    <UserList ids={UserStore.currentUser.friends} itemProps={{ levelIconSize: 3 }} />
    <Button title='Log user store' onPress={ () => {
      console.log(UserStore.currentUser.friends)
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

import { createDrawerNavigator } from '@react-navigation/drawer'
import * as React from 'react'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'

const Drawer = createDrawerNavigator()

function AppStack () {
  return (
    <Drawer.Navigator initialRouteName='Home'>
      <Drawer.Screen
        name='Home'
        component={HomeScreen}
      />
      <Drawer.Screen
        name='Profile'
        component={ProfileScreen}
      />
    </Drawer.Navigator>
  )
}

export default AppStack

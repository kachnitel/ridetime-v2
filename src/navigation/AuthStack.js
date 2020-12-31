import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'

const Stack = createStackNavigator()

function AuthStack () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SignIn'
        component={SignInScreen}
      />
      <Stack.Screen
        name='SignUp'
        component={SignUpScreen}
      />
    </Stack.Navigator>
  )
}

export default AuthStack

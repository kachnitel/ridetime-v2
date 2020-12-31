import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Authentication from '../../Authentication'

function SignUpScreen ({ route }) {
  const [state, setState] = useState([])
  let token = route.params.token

  let getInfo = async () => {
    let auth = new Authentication()
    let userInfo = await auth.getUserInfo(token.access_token)
    setState(userInfo)
  }
  useEffect(() => { getInfo() })
  return (
    <View style={styles.container}>
      <Text> SignUpScreen </Text>
      <Text>{ state.name ?? 'Loading user information' }</Text>
    </View>
  )
}

SignUpScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.shape({
        access_token: PropTypes.any
      })
    })
  })
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

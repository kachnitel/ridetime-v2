import PropTypes from 'prop-types'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import SignInButton from '../../components/SignInButton'

function SignInScreen ({ navigation }) {
  return (
    <View style={styles.container}>
      <Text> SignInScreen </Text>
      <SignInButton navigation={navigation} />
    </View>
  )
}

SignInScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

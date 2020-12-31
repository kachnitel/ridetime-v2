import PropTypes from 'prop-types'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const AuthLoadingScreen = ({
  status
}) => (
  <View style={styles.container}>
    <Text>{ status }</Text>
  </View>
)

AuthLoadingScreen.propTypes = {
  status: PropTypes.string
}

export default AuthLoadingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import isEqual from 'react-fast-compare'
import { StyleSheet, Text, View } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { User } from '../stores/UserStore'
import ProfilePicture from './ProfilePicture'
import TrailDifficultyIcon from './TrailDifficultyIcon'

export const UserItem = observer(({ user }) => <View style={ styles.container }>
  <View>
    <ProfilePicture uri={ user.picture } style={ styles.picture } />
    { user.level && <TrailDifficultyIcon
      level={ user.level }
      style={ styles.levelIcon }
      size={ heightPercentageToDP(5) }
    /> }
  </View>
  <View style={ styles.detailsContainer }>
    <Text style={ styles.name }>{ user.name }</Text>
    <Text style={ styles.hometown }>{ user.hometown }</Text>
  </View>
</View>)

UserItem.propTypes = {
  user: PropTypes.instanceOf(User)
}

export const MemoUserItem = React.memo(UserItem, isEqual)

// export default UserList

const styles = StyleSheet.create({
  container: {
    height: heightPercentageToDP(15),
    flexDirection: 'row',
    alignItems: 'center'
  },
  picture: {
    height: '80%'
  },
  name: {
    fontSize: heightPercentageToDP(4)
  },
  hometown: {

  },
  levelIcon: {
    position: 'absolute',
    bottom: '2.5%',
    right: '2.5%'
  },
  detailsContainer: {
    padding: widthPercentageToDP(2)
  }
})

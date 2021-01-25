import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import isEqual from 'react-fast-compare'
import { ActivityIndicator, FlatList, StyleSheet, Text, View, ViewPropTypes } from 'react-native'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { StoreContext } from '../StoreContext'
import { User } from '../stores/UserStore'
import ProfilePicture from './ProfilePicture'
import TrailDifficultyIcon from './TrailDifficultyIcon'

export const UserItem = observer(({ user, containerStyle, levelIconSize }) => (
  <View style={{ ...styles.itemContainer, ...containerStyle }}>
    <View>
      <ProfilePicture uri={ user.picture } style={ styles.picture } />
      { user.level && <TrailDifficultyIcon
        level={ user.level }
        style={ styles.levelIcon }
        size={ heightPercentageToDP(levelIconSize) }
      /> }
    </View>
    <View style={ styles.detailsContainer }>
      <Text style={ styles.name }>{ user.name }</Text>
      <Text style={ styles.hometown }>{ user.hometown }</Text>
    </View>
  </View>
))

UserItem.propTypes = {
  user: PropTypes.instanceOf(User),
  containerStyle: ViewPropTypes.style,
  levelIconSize: PropTypes.number // heightPercentageToDP
}

UserItem.defaultProps = {
  levelIconSize: 5
}

export const MemoUserItem = React.memo(UserItem, isEqual)

const AsyncUserItem = ({ id, ...props }) => {
  let { user: UserStore } = useContext(StoreContext)
  let [user, setUser] = useState(UserStore.findInCollection(id))

  useEffect(() => {
    let loadUser = async () => {
      let u = await UserStore.getAsync(id)
      setUser(u)
    }

    loadUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return user ? <MemoUserItem user={ user } { ...props } /> : <ActivityIndicator />
}

AsyncUserItem.propTypes = {
  id: PropTypes.number,
  ...UserItem.propTypes
}

const UserList = ({ ids, itemProps, ...props }) => <FlatList
  data={ ids }
  renderItem={({ item }) => <AsyncUserItem id={item} { ...itemProps } /> }
  keyExtractor={(item) => 'id_' + item}
  { ...props }
/>

UserList.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number),
  itemProps: PropTypes.shape({ ...AsyncUserItem.propTypes })
}

export default UserList

const styles = StyleSheet.create({
  itemContainer: {
    height: heightPercentageToDP(10),
    flexDirection: 'row',
    alignItems: 'center'
  },
  picture: {
    height: '80%'
  },
  name: {
    fontSize: heightPercentageToDP(4)
  },
  hometown: {},
  levelIcon: {
    position: 'absolute',
    bottom: '2.5%',
    right: '2.5%'
  },
  detailsContainer: {
    padding: widthPercentageToDP(2)
  }
})

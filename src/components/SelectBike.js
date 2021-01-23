import React from 'react'
import { Text } from 'react-native'
import OutlinedSelectWithIcon from './OutlinedSelectWithIcon'
import TrailTypeIcon, { icons } from './TrailTypeIcon'

const SelectBike = (props) => {
  let options = Object.keys(icons)
    .map((type) => {
      let Icon = (props) => <TrailTypeIcon type={type} {...props} />
      return {
        ...icons[type],
        icon: Icon
      }
    })

  let Footer = () => <Text>Select your primary bike type</Text>

  return <OutlinedSelectWithIcon
    { ...props }
    options={options}
    flatListProps={{
      ListFooterComponent: Footer
    }}
  />
}

export default SelectBike

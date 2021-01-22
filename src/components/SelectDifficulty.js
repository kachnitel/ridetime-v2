import React from 'react'
import { Text } from 'react-native'
import OutlinedSelectWithIcon from './OutlinedSelectWithIcon'
import TrailDifficultyIcon, { icons } from './TrailDifficultyIcon'

const SelectDifficulty = (props) => {
  let options = Object.keys(icons)
    .map(Number)
    .filter((level) => level > 0) // Hide "Other"
    .map((level) => {
      let Icon = (props) => <TrailDifficultyIcon level={Number(level)} {...props} />
      return {
        ...icons[level],
        icon: Icon
      }
    })

  let Footer = () => <Text>Select what trail difficulty you&apos;re comfortable riding</Text>

  return <OutlinedSelectWithIcon
    { ...props }
    options={options}
    flatListProps={{
      ListFooterComponent: Footer
    }}
  />
}

export default SelectDifficulty

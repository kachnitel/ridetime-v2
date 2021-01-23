import PropTypes from 'prop-types'
import React from 'react'
import Svg, { Circle, Path, Rect } from 'react-native-svg'
import Colors from '../Colors'

const GreenCircle = (props) => <Svg width='1em' height='1em' {...props}>
  <Circle fill='currentColor' cx={300} cy={300} r={250} />
</Svg>

const BlueSquare = (props) => <Svg width='1em' height='1em' {...props}>
  <Rect fill='currentColor' x="66" y="66" width="472" height="472" />
</Svg>

const BlackDiamond = (props) => <Svg width='1em' height='1em' {...props}>
  <Path fill='currentColor' d='M300 575l275-275L300 25 25 300l275 275z' />
</Svg>

const DoubleBlackDiamond = (props) => <Svg width='1em' height='1em' {...props}>
  <Path fill='currentColor' d='M195 560l175-260L195 40 20 300z' />
  <Path fill='currentColor' d='M405 40l175 260-175 260-175-260z' />
</Svg>

const TerrainPark = (props) => <Svg width='1em' height='1em' {...props}>
  <Path
    fill='currentColor'
    stroke='currentColor'
    strokeWidth={100}
    strokeLinecap='round'
    strokeLinejoin='round'
    d='M100 225h400v150H100z'
  />
</Svg>

export const icons = {
  3: {
    icon: GreenCircle,
    label: 'Beginner',
    color: Colors.difficultyLevels.green,
    value: 3
  },
  4: {
    icon: BlueSquare,
    label: 'Intermediate',
    color: Colors.difficultyLevels.blue,
    value: 4
  },
  5: {
    icon: BlackDiamond,
    label: 'Advanced',
    color: Colors.difficultyLevels.black,
    value: 5
  },
  6: {
    icon: DoubleBlackDiamond,
    label: 'Expert',
    color: Colors.difficultyLevels.black,
    value: 6
  },
  8: {
    icon: DoubleBlackDiamond,
    label: 'Pro',
    color: Colors.difficultyLevels.orange,
    value: 8
  },
  0: {
    icon: TerrainPark,
    label: 'Other',
    color: Colors.difficultyLevels.unknown,
    value: 0
  }
}

const TrailDifficultyIcon = (props) => {
  let { level, size, style, ...svgProps } = props
  let { icon: SvgIcon, color } = icons[level] ?? icons[0]

  return <SvgIcon
    viewBox='0 0 600 600' // All Trail icons have 600px viewBox
    width={ size }
    height={ size }
    { ...svgProps }
    style={{ color: color, ...style }}
  />
}

TrailDifficultyIcon.propTypes = {
  level: PropTypes.oneOf(Object.keys(icons).map(Number)).isRequired,
  size: PropTypes.number,
  style: PropTypes.any,
  ...Svg.propTypes
}

export default TrailDifficultyIcon

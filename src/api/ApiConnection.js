import { Connection } from '@kachnitel/efetch'
import Constants from 'expo-constants'
import { Platform } from 'react-native'
import { getEnvVars } from '../Env'

const ApiConnection = new Connection(getEnvVars().apiUrl)

ApiConnection.addHeaders({
  'User-Agent': `${Constants.manifest.name}/${getEnvVars().version};` +
    `${Constants.nativeAppVersion};${Constants.nativeBuildVersion} ` +
    `(${Platform.OS} ${Constants.systemVersion}/${Platform.Version}) ` +
    `${Constants.deviceName}`
})

export default ApiConnection

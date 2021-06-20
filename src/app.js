import React, { Component } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Config from 'react-native-config'

import Router from './router'

global.Config = Config

console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed', 'Expected style']

export default class App extends Component {
  render() {
    return (
      <PaperProvider>
        <Router />
      </PaperProvider>
    )
  }
}

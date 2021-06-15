import React, { Component, useRef, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import WebView from 'react-native-webview'
import Config from 'react-native-config'
import styled from 'styled-components'
import { Button } from 'react-native-paper'

import ReloadIcon from '../assets/icons/reload.png'
import BackIcon from '../assets/icons/back.png'

const INJECTED_JAVASCRIPT = `
setTimeout(function() {
  var footer = document.getElementsByClassName('u-sm-up-hide')[0];

  if (footer) {
    footer.remove();
  }
}, 1000);

true;
`;

const onMessage = (event) => {
  console.log(event)
}

const renderWebPage = (uri) => {
  const webRef = useRef(null)
  const pageUrl = Config.MAIN_URL + uri

  const RELOAD_SCRIPT = `
    window.location = '${pageUrl}';
    true;
  `

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        ref={webRef}
        source={{ uri: pageUrl }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onMessage={(event) => { onMessage(event) }}
      />

      <BottomView>
        <IconButton
          icon={BackIcon}
          onPress={() => webRef.current.goBack() }
          direction='rtl'
        />
        <IconButton
          icon={ReloadIcon}
          onPress={() => {
            webRef.current.injectJavaScript(RELOAD_SCRIPT)
          }}
        />
      </BottomView>
    </SafeAreaView>
  )
}

const BottomView = styled.View`
  position: absolute
  bottom: 20
  width: 100%
  flex-direction: row
  align-items: center
  justify-content: space-between
  background-color: transparent
`

const IconButton = styled(Button)`
`

export function Home() {
  return renderWebPage('/')
}

export function Follow() {
  return renderWebPage('/follow')
}

export function Tags() {
  return renderWebPage('/tags')
}

export function Search() {
  return renderWebPage('/search')
}

export function Login() {
  return renderWebPage('/login')
}

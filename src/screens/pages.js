import React, { Component, useRef, useState, useEffect, useCallback } from 'react'
import { SafeAreaView, View } from 'react-native'
import WebView from 'react-native-webview'
import Config from 'react-native-config'
import styled from 'styled-components'
import { FAB, Portal, Provider, Button } from 'react-native-paper'
import { openComposer } from 'react-native-email-link'
import Share from 'react-native-share'

import Icons from 'react-native-vector-icons/Ionicons'

const renderWebPage = (uri) => {
  const [currUrl, setUrl] = useState(null)
  const [currTitle, setTitle] = useState(null)
  const [fabOpen, setFabOpen] = useState(false)
  const onStateChange = () => setFabOpen(!fabOpen)
  const webRef = useRef(null)
  const pageUrl = Config.MAIN_URL + uri
  const THEME_COLOR = global.Config.THEME_COLOR

  const SET_URL_SCRIPT = `
    window.ReactNativeWebView.postMessage(window.location.href);
    true;
  `

  const RELOAD_SCRIPT = `
    if (window.location.href !== '${pageUrl}') {
      window.location = '${pageUrl}';
    }

    ${SET_URL_SCRIPT}

    true;
  `

  const INJECTED_JAVASCRIPT = `
    setTimeout(function() {
      ${SET_URL_SCRIPT}
      var footer = document.getElementsByClassName('u-sm-up-hide')[0];

      if (footer) {
        footer.remove();
      }

    }, 100);

    true;
  `

  const GET_CURR_URL_SCRIPT = `
    ${SET_URL_SCRIPT}
    true;
  `

  const onMessage = (event) => {
    setUrl(event.nativeEvent.data)
  }

  const handleRequest = (request) => {
    setTitle(request.title)
    webRef.current.injectJavaScript(GET_CURR_URL_SCRIPT)
    return true
  }

  const reportMail = () => {
    const data = {
      to: global.Config.REPORT_MAIL,
      subject: '[不當內容回報] ' + currTitle,
      body: '以下網址含有不當的內容：\n' + currUrl
    }

    openComposer(data)
  }

  const handleShare = async () => {
    const options = {
      message: currTitle,
      title: currTitle,
      url: currUrl,
    }

    const shareResponse = await Share.open(options)
  }

  const reloadPage = () => {
    webRef.current.injectJavaScript(RELOAD_SCRIPT)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider
        settings={{
          icon: props => <Icons {...props} />,
        }}
      >
        <WebView
          ref={webRef}
          source={{ uri: pageUrl }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          onShouldStartLoadWithRequest={(request) => handleRequest(request)}
          onMessage={(event) => { onMessage(event) }}
        />

        <Portal>
          <FAB.Group
            fabStyle={{backgroundColor: THEME_COLOR, marginBottom: 65 }}
            open={fabOpen}
            icon={fabOpen ? 'close-outline' : 'add-outline'}
            actions={[
              {
                icon: 'ios-share-outline',
                  label: '文章分享',
                  color: '#4D5BCD',
                  onPress: () => handleShare(),
              },
              {
                icon: 'reload-outline',
                  label: '回分頁',
                  color: '#4D5BCD',
                  onPress: () => reloadPage(),
              },
              {
                icon: 'mail-outline',
                label: '回報問題',
                color: 'red',
                onPress: () => reportMail(),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (fabOpen) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
    </SafeAreaView>
  )
}

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

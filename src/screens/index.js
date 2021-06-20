import React, { Component, useState } from 'react'
import { BottomNavigation } from 'react-native-paper'

import { Home, Tags, Follow, Search, Login } from './pages'

import HomeIcon from '../assets/icons/safari.png'
import SearchIcon from '../assets/icons/search.png'
import TagsIcon from '../assets/icons/tags.png'
import FollowIcon from '../assets/icons/follow.png'
import LoginIcon from '../assets/icons/login.png'

export default function Index (navigation) {
  const [navIndex, setNavIndex] = useState(0)

  const THEME_COLOR = global.Config.THEME_COLOR

  const routes = [
    { key: 'home', title: '發現', icon: HomeIcon, color: THEME_COLOR },
    { key: 'search', title: '搜尋', icon: SearchIcon, color: THEME_COLOR },
    { key: 'tags', title: '標籤', icon: TagsIcon, color: THEME_COLOR },
    { key: 'follow', title: '追蹤', icon: FollowIcon, color: THEME_COLOR },
    { key: 'login', title: '我的', icon: LoginIcon, color: THEME_COLOR },
  ]

  const navigationState = {
    index: navIndex,
    routes
  }

  const handleIndexChange = (index) => setNavIndex(index)

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    search: Search,
    tags: Tags,
    follow: Follow,
    login: Login,
  })

  return (
    <BottomNavigation
      navigationState={navigationState}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
    />
  )
}

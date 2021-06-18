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

  const routes = [
    { key: 'home', title: '發現', icon: HomeIcon, color: '#4D5BCD' },
    { key: 'search', title: '搜尋', icon: SearchIcon, color: '#4D5BCD'  },
    { key: 'tags', title: '標籤', icon: TagsIcon, color: '#4D5BCD'  },
    { key: 'follow', title: '追蹤', icon: FollowIcon, color: '#4D5BCD' },
    { key: 'login', title: '登入', icon: LoginIcon, color: '#4D5BCD' },
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


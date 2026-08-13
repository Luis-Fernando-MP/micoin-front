import { type FC } from 'react'

import { Tabs } from 'expo-router'

const PublicLayout: FC = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
        lazy: true,
        freezeOnBlur: true,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="about" />
      <Tabs.Screen
        name="login"
        options={{ href: null, headerShown: true, title: 'Login' }}
      />
      <Tabs.Screen
        name="register"
        options={{ href: null, headerShown: true, title: 'Register' }}
      />
    </Tabs>
  )
}

export default PublicLayout

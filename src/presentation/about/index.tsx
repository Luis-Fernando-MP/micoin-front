import { type FC } from 'react'
import { ScrollView, View } from 'react-native'

import Header from '@components/header'
import AppNav from '@components/nav'
import Text from '@components/text'
import ThemeToggle from '@components/theme-toggle'

import { metadata } from '@/common/metadata'

const About: FC = () => {
  return (
    <View className="flex-1 bg-background">
      <Header title="About" rightComponents={[<ThemeToggle key="theme" />]} />
      <ScrollView className="flex-1" contentContainerClassName="gap-4 p-5 pb-8">
        <Text.Title size="lg">{metadata.name}</Text.Title>
        <Text.Subtitle>{metadata.tagline}</Text.Subtitle>
        <Text.Paragraph>{metadata.description}</Text.Paragraph>
        <Text.Caption>{metadata.copyright}</Text.Caption>
      </ScrollView>
      <AppNav />
    </View>
  )
}

export { About }

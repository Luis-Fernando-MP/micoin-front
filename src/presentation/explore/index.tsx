import { type FC } from 'react'
import { View } from 'react-native'

import { Link } from 'expo-router'

import BrandLogo from '@components/brand-logo'
import Button from '@components/button'
import Card from '@components/card'
import AppNav from '@components/nav'
import Text from '@components/text'

import { signOut } from '@/auth/client'

const Explore: FC = () => {
  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 gap-4 p-5">
        <BrandLogo size="sm" />
        <Text.Title size="xl">Explore</Text.Title>
        <Text.Subtitle>
          This screen is private. You only see it with a session.
        </Text.Subtitle>
        <Card className="gap-3">
          <Link href="/modal" asChild>
            <Button label="Open modal" />
          </Link>
          <Button
            variant="outline"
            label="Sign out"
            onPress={() => signOut()}
          />
        </Card>
      </View>
      <AppNav />
    </View>
  )
}

export { Explore }

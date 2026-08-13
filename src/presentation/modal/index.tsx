import { type FC } from 'react'
import { View } from 'react-native'

import { Link } from 'expo-router'

import Button from '@/common/components/button'
import Text from '@/common/components/text'

const Modal: FC = () => {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background p-5">
      <Text.Title size="lg">Private modal</Text.Title>
      <Link href="/" dismissTo asChild>
        <Button variant="outline" label="Back home" />
      </Link>
    </View>
  )
}

export { Modal }

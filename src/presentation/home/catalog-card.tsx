import { type FC, type ReactNode } from 'react'
import { View } from 'react-native'

import Card from '@components/card'
import Separator from '@components/separator'
import Text from '@components/text'

interface CatalogCardProps {
  n: number
  title: string
  does: string
  doesNot: string
  solves: string
  children: ReactNode
}

interface CatalogVariantProps {
  n: number
  sub: number
  title: string
  description: string
  children: ReactNode
}

const CatalogCard: FC<CatalogCardProps> = ({
  n,
  title,
  does,
  doesNot,
  solves,
  children,
}) => {
  return (
    <Card className="gap-3">
      <Text.Title size="sm">
        {n}. {title}
      </Text.Title>
      <View className="gap-2">
        <View className="gap-0.5">
          <Text.Label>Qué hace</Text.Label>
          <Text.Caption>{does}</Text.Caption>
        </View>
        <View className="gap-0.5">
          <Text.Label>Qué no hace</Text.Label>
          <Text.Caption>{doesNot}</Text.Caption>
        </View>
        <View className="gap-0.5">
          <Text.Label>Utilidad</Text.Label>
          <Text.Caption>{solves}</Text.Caption>
        </View>
      </View>
      <Separator />
      <View className="gap-4">{children}</View>
    </Card>
  )
}

const CatalogVariant: FC<CatalogVariantProps> = ({
  n,
  sub,
  title,
  description,
  children,
}) => {
  return (
    <View className="gap-2">
      <View className="gap-0.5">
        <Text.Subtitle>
          {n}.{sub} {title}
        </Text.Subtitle>
        <Text.Caption>{description}</Text.Caption>
      </View>
      {children}
    </View>
  )
}

export { CatalogCard, CatalogVariant }

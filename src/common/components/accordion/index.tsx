import { type FC, type ReactNode, useState } from 'react'
import { Pressable, View } from 'react-native'

import { ChevronDown } from 'lucide-react-native'

import BRAND from '@components/shared/brand'
import Text from '@components/text'
import { useMcVar } from '@theme'

import { cn } from '@/lib/utils'

type AccordionSlot = string | ReactNode

type Item = {
  id: string
  title: AccordionSlot
  content: AccordionSlot
}

interface Props {
  items: Item[]
  type?: 'single' | 'multiple'
  className?: string
}

/**
 * Accordion — lista colapsable; title y content aceptan string o ReactNode.
 *
 * @param items - Filas con id, title y content
 * @param type - single abre uno; multiple abre varios. @default 'single'
 * @param className - Clases NativeWind extra
 *
 * @example
 * import Accordion from '@components/accordion'
 * <Accordion items={[{ id: '1', title: 'FAQ', content: 'Respuesta' }]} />
 */
const Accordion: FC<Props> = ({ items, type = 'single', className }) => {
  const [open, setOpen] = useState<string[]>([])
  const iconColor = useMcVar(BRAND.native.textSecondary)

  const toggle = (id: string) => {
    const isOpen = open.includes(id)
    if (type === 'single') {
      if (isOpen) {
        setOpen([])
        return
      }
      setOpen([id])
      return
    }
    if (isOpen) {
      setOpen(open.filter((value) => value !== id))
      return
    }
    setOpen([...open, id])
  }

  return (
    <View className={cn('gap-2', className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id)

        return (
          <View
            key={item.id}
            className={cn(
              'overflow-hidden border border-border bg-card',
              BRAND.radius.variants.control,
            )}
          >
            <Pressable
              onPress={() => toggle(item.id)}
              className="flex-row items-center justify-between px-4 py-3"
            >
              {typeof item.title === 'string' ? (
                <Text.Title size="sm">{item.title}</Text.Title>
              ) : (
                item.title
              )}
              <ChevronDown size={18} color={iconColor} />
            </Pressable>
            {isOpen && (
              <View className="gap-2 border-t border-border px-4 py-3">
                {typeof item.content === 'string' ? (
                  <Text.Subtitle>{item.content}</Text.Subtitle>
                ) : (
                  item.content
                )}
              </View>
            )}
          </View>
        )
      })}
    </View>
  )
}

export type { AccordionSlot, Item as AccordionItem, Props as AccordionProps }
export default Accordion

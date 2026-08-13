import {
  type FC,
  type ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

import { Check, ChevronDown } from 'lucide-react-native'

import Icon from '@components/icon'
import BRAND from '@components/shared/brand'
import Text from '@components/text'

import { cn } from '@/lib/utils'

type ComboboxSlot = string | ReactNode

type ComboboxOption = {
  value: string
  label: string
  content?: ComboboxSlot
}

type ItemState = {
  selected: boolean
  isLast: boolean
}

type Anchor = {
  x: number
  y: number
  width: number
  height: number
}

interface Props {
  options: ComboboxOption[]
  allOptions?: ComboboxOption[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  listHeader?: ReactNode
  renderItem?: (option: ComboboxOption, state: ItemState) => ReactNode
  onOpenChange?: (open: boolean) => void
}

const LIST_MAX_HEIGHT = 240
const LIST_GAP = 4

const defaultItemText = (selected: boolean) =>
  cn(
    'text-sm',
    selected && 'font-semibold text-foreground',
    !selected && 'text-secondary',
  )

const renderOptionBody = (
  option: ComboboxOption,
  selected: boolean,
  renderItem?: Props['renderItem'],
  isLast = false,
) => {
  if (renderItem) {
    return renderItem(option, { selected, isLast })
  }

  const slot = option.content ?? option.label

  if (typeof slot === 'string') {
    return <Text className={defaultItemText(selected)}>{slot}</Text>
  }

  return slot
}

/**
 * Combobox — select in-place con opciones y slots personalizables por ítem.
 *
 * La lista abre en overlay Modal para quedar sobre siblings, ScrollView y Dialog.
 * `Combobox.Searchable` filtra la lista mientras escribes.
 *
 * @param options - Opciones visibles en la lista (p. ej. filtradas)
 * @param allOptions - Catálogo completo para resolver el trigger; @default options
 * @param value - Valor seleccionado
 * @param onChange - Callback al elegir opción
 * @param placeholder - Texto cuando no hay selección. @default 'Seleccionar…'
 * @param listHeader - Contenido arriba de la lista (p. ej. buscador)
 * @param renderItem - Render custom por ítem; pisa content
 * @param className - Clases NativeWind extra
 *
 * @example
 * import Combobox from '@components/combobox'
 * <Combobox options={[{ value: 'pen', label: 'Pens' }]} value="pen" onChange={() => {}} />
 * <Combobox.Searchable options={options} value={v} onChange={setV} />
 */
const ComboboxRoot: FC<Props> = ({
  options,
  allOptions,
  value,
  onChange,
  placeholder = 'Seleccionar…',
  className,
  listHeader,
  renderItem,
  onOpenChange,
}) => {
  const triggerRef = useRef<View>(null)
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState<Anchor | null>(null)
  const catalog = allOptions ?? options
  const selected = catalog.find((option) => option.value === value)

  const triggerContent = useMemo(() => {
    if (!selected) {
      return <Text className="text-sm text-secondary">{placeholder}</Text>
    }

    if (selected.content && typeof selected.content !== 'string') {
      return selected.content
    }

    const text =
      typeof selected.content === 'string' ? selected.content : selected.label

    return <Text className="text-sm text-foreground">{text}</Text>
  }, [placeholder, selected])

  const close = useCallback(() => {
    setOpen(false)
    setAnchor(null)
    onOpenChange?.(false)
  }, [onOpenChange])

  const openList = useCallback(() => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setAnchor({ x, y, width, height })
      setOpen(true)
      onOpenChange?.(true)
    })
  }, [onOpenChange])

  const toggleOpen = useCallback(() => {
    if (open) {
      close()
      return
    }

    openList()
  }, [close, open, openList])

  const selectOption = useCallback(
    (nextValue: string) => {
      onChange(nextValue)
      close()
    },
    [close, onChange],
  )

  return (
    <View ref={triggerRef} collapsable={false} className={className}>
      <Pressable
        onPress={toggleOpen}
        className={cn(
          'min-h-11 flex-row items-center justify-between gap-3 border border-border bg-background px-4 py-2',
          BRAND.radius.variants.control,
          open && 'border-primary',
        )}
      >
        <View className="flex-1">{triggerContent}</View>
        <Icon icon={ChevronDown} tone="secondary" size={16} />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="none"
        onRequestClose={close}
      >
        <Pressable
          style={StyleSheet.absoluteFillObject}
          onPress={close}
          accessibilityRole="button"
          accessibilityLabel="Cerrar opciones"
        />
        {anchor && (
          <View
            style={{
              position: 'absolute',
              top: anchor.y + anchor.height + LIST_GAP,
              left: anchor.x,
              width: anchor.width,
              maxHeight: LIST_MAX_HEIGHT,
            }}
            className={cn(
              'overflow-hidden border border-border bg-background shadow-lg',
              BRAND.radius.variants.surface,
            )}
          >
            {listHeader}
            <ScrollView
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled
              bounces={false}
            >
              {options.map((item, index) => {
                const isSelected = item.value === value
                const isLast = index === options.length - 1

                return (
                  <Pressable
                    key={item.value}
                    onPress={() => selectOption(item.value)}
                    className={cn(
                      'min-h-12 flex-row items-center justify-between gap-2 px-4 py-2 active:bg-card-hover',
                      !isLast && 'border-b border-border',
                      isSelected && 'bg-card',
                    )}
                  >
                    <View className="flex-1">
                      {renderOptionBody(item, isSelected, renderItem, isLast)}
                    </View>
                    {isSelected && (
                      <Icon icon={Check} tone="brand" size={16} />
                    )}
                  </Pressable>
                )
              })}
            </ScrollView>
          </View>
        )}
      </Modal>
    </View>
  )
}

export type {
  ComboboxOption,
  ComboboxSlot,
  ItemState as ComboboxItemState,
  Props as ComboboxProps,
}
export default ComboboxRoot

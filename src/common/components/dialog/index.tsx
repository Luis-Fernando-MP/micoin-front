import {
  createContext,
  type FC,
  type ReactNode,
  useContext,
  useEffect,
} from 'react'
import { Modal as RNModal, Pressable, StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import BRAND from '@components/shared/brand'
import Text from '@components/text'

import { cn } from '@/lib/utils'

type DialogContextValue = {
  onOpenChange: (open: boolean) => void
}

const DialogContext = createContext<DialogContextValue | null>(null)

const useDialog = () => {
  const ctx = useContext(DialogContext)
  if (!ctx) {
    throw new Error('Dialog compound used outside Dialog')
  }
  return ctx
}

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  overlay?: boolean
  closeOnOutside?: boolean
  children: ReactNode
  className?: string
}

/**
 * Dialog — modal compuesto (Header, Title, Content, Footer).
 *
 * @param open - Visible
 * @param open.open
 * @param onOpenChange - Callback de apertura
 * @param open.onOpenChange
 * @param overlay - Fondo oscuro. @default true
 * @param open.overlay
 * @param closeOnOutside - Cierra al tap fuera. @default false
 *
 * @param open.closeOnOutside
 * @param open.children
 * @param open.className
 * @example
 * import Dialog from '@components/dialog';
 * <Dialog open={open} onOpenChange={setOpen}><Dialog.Title>Hola</Dialog.Title></Dialog>
 */
const DialogRoot: FC<DialogProps> = ({
  open,
  onOpenChange,
  overlay = true,
  closeOnOutside = false,
  children,
  className,
}) => {
  const opacity = useSharedValue(0)
  const scale = useSharedValue(0.96)

  useEffect(() => {
    if (!open) {
      opacity.value = 0
      scale.value = 0.96
      return
    }
    opacity.value = withTiming(1, { duration: 160 })
    scale.value = withTiming(1, { duration: 160 })
  }, [open, opacity, scale])

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  const panelStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }))

  const onBackdropPress = () => {
    if (!closeOnOutside) {
      return
    }
    onOpenChange(false)
  }

  return (
    <DialogContext.Provider value={{ onOpenChange }}>
      <RNModal
        animationType="none"
        transparent
        visible={open}
        statusBarTranslucent
        onRequestClose={() => onOpenChange(false)}
      >
        <View className="flex-1 items-center justify-center px-6">
          <Animated.View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFillObject,
              overlay && styles.overlay,
              backdropStyle,
            ]}
          />
          <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={onBackdropPress}
          />
          <Animated.View
            className={cn(
              'w-full overflow-visible border border-border bg-card p-5',
              BRAND.radius.variants.surface,
              className,
            )}
            style={panelStyle}
          >
            <Pressable className="overflow-visible" onPress={(event) => event.stopPropagation()}>
              {children}
            </Pressable>
          </Animated.View>
        </View>
      </RNModal>
    </DialogContext.Provider>
  )
}

const Header: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <View className={cn('mb-3 gap-1', className)}>{children}</View>
}

const Title: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <Text className={cn('text-lg font-semibold', className)}>{children}</Text>
  )
}

const Content: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return <View className={cn('gap-3 overflow-visible', className)}>{children}</View>
}

const Footer: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <View className={cn('mt-4 flex-row justify-end gap-2', className)}>
      {children}
    </View>
  )
}

const Dialog = Object.assign(DialogRoot, {
  Header,
  Title,
  Content,
  Footer,
})

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
})

export { useDialog }
/**
 *
 */
export default Dialog

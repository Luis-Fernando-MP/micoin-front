import {
  createContext,
  type FC,
  type ReactNode,
  useContext,
  useEffect,
} from 'react'
import { Pressable, Modal as RNModal, StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import ComboboxHostContext from '@components/combobox/host-context'
import BRAND from '@components/shared/brand'

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
 * Dialog — modal compuesto (Header, Content, Footer).
 *
 * Acciones del footer son Button del kit. Título es Text.Title.
 *
 * @param open - Visible
 * @param onOpenChange - Callback de apertura
 * @param overlay - Fondo oscuro. @default true
 * @param closeOnOutside - Cierra al tap fuera. @default false
 * @param className - Clases NativeWind extra en el panel
 *
 * @example
 * import Dialog from '@components/dialog'
 * import Button from '@components/button'
 * import Text from '@components/text'
 * <Dialog open={open} onOpenChange={setOpen}>
 *   <Dialog.Header>
 *     <Text.Title size="sm">Hola</Text.Title>
 *   </Dialog.Header>
 *   <Dialog.Footer>
 *     <Button variant="outline" label="Cancel" onPress={() => setOpen(false)} />
 *     <Button label="OK" onPress={() => setOpen(false)} />
 *   </Dialog.Footer>
 * </Dialog>
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
      <ComboboxHostContext.Provider value={true}>
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
              <Pressable
                className="overflow-visible"
                onPress={(event) => event.stopPropagation()}
              >
                {children}
              </Pressable>
            </Animated.View>
          </View>
        </RNModal>
      </ComboboxHostContext.Provider>
    </DialogContext.Provider>
  )
}

const Header: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => <View className={cn('mb-3 gap-1', className)}>{children}</View>

const Content: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <View className={cn('gap-3 overflow-visible', className)}>{children}</View>
)

const Footer: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <View className={cn('mt-4 flex-row justify-end gap-2', className)}>
    {children}
  </View>
)

const Dialog = Object.assign(DialogRoot, {
  Header,
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

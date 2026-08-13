import { type FC, useState } from 'react'
import { View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'

import Button from '@/common/components/button'
import Input from '@/common/components/input'
import Text from '@/common/components/text'

interface Props {
  onSend?: (text: string) => void
}

/**
 * KeyboardAwareComposer — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver KeyboardAwareComposerProps / Props del archivo
 *
 * @param props.onSend
 * @example
 * import KeyboardAwareComposer from '@/common/components/keyboard-aware-composer';
 * <KeyboardAwareComposer />
 */
const KeyboardAwareComposer: FC<Props> = ({ onSend }) => {
  const [text, setText] = useState('')

  return (
    <KeyboardAwareScrollView
      bottomOffset={24}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ gap: 8 }}
    >
      <Text className="text-sm text-secondary">
        El teclado no tapa el composer (keyboard-controller).
      </Text>
      <Input
        label="Mensaje"
        placeholder="Escribe un note de cobro…"
        value={text}
        onChangeText={setText}
      />
      <Button
        size="sm"
        label="Enviar"
        onPress={() => {
          onSend?.(text)
          setText('')
        }}
      />
      <View className="h-8" />
    </KeyboardAwareScrollView>
  )
}

/**
 *
 */
export default KeyboardAwareComposer

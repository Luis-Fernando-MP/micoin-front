import { type FC, useState } from 'react'
import { View } from 'react-native'

import { useRouter } from 'expo-router'

import BrandLogo from '@components/brand-logo'
import Button from '@components/button'
import Card from '@components/card'
import Input from '@components/input'
import Text from '@components/text'

import { signIn } from '@/auth/client'

const Login: FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  let submitLabel = 'Sign in'
  if (pending) {
    submitLabel = 'Signing in…'
  }

  const onSubmit = async () => {
    setPending(true)
    setError(null)
    const result = await signIn.email({ email, password })
    setPending(false)

    if (result.error) {
      setError(result.error.message ?? 'Unable to sign in')
      return
    }

    router.replace('/explore')
  }

  return (
    <View className="flex-1 justify-center bg-background p-5">
      <View className="mb-6 items-center">
        <BrandLogo size="md" />
      </View>
      <Card className="gap-4">
        <Text.Title size="lg">Login</Text.Title>
        <Input
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {error && <Text status="error">{error}</Text>}
        <Button disabled={pending} label={submitLabel} onPress={onSubmit} />
      </Card>
    </View>
  )
}

export { Login }

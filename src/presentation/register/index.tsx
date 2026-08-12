import { useRouter } from 'expo-router';
import { type FC, useState } from 'react';
import { View } from 'react-native';

import { signUp } from '@/auth/client';
import { BrandLogo } from '@/common/brand-logo';
import { Button } from '@/common/button';
import { Card } from '@/common/card';
import { Input } from '@/common/input';
import { Text } from '@/common/text';

const Register: FC = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  let submitLabel = 'Register';
  if (pending) {
    submitLabel = 'Creating…';
  }

  const onSubmit = async () => {
    setPending(true);
    setError(null);
    const result = await signUp.email({ name, email, password });
    setPending(false);

    if (result.error) {
      setError(result.error.message ?? 'Unable to create account');
      return;
    }

    router.replace('/explore');
  };

  return (
    <View className="flex-1 justify-center bg-background p-5">
      <View className="mb-6 items-center">
        <BrandLogo size="md" />
      </View>
      <Card className="gap-4">
        <Text className="text-2xl font-bold">Create account</Text>
        <Input label="Name" value={name} onChangeText={setName} />
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
        {error && <Text className="text-semantic-error-text">{error}</Text>}
        <Button disabled={pending} label={submitLabel} onPress={onSubmit} />
      </Card>
    </View>
  );
};

export { Register };

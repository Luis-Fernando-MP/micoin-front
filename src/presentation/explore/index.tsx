import { Link } from 'expo-router';
import { type FC } from 'react';
import { View } from 'react-native';

import { signOut } from '@/auth/client';
import { BrandLogo } from '@/common/brand-logo';
import { Button } from '@/common/button';
import { Card } from '@/common/card';
import { AppNav } from '@/common/nav';
import { Text } from '@/common/text';

const Explore: FC = () => {
  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 gap-4 p-5">
        <BrandLogo size="sm" />
        <Text className="text-3xl font-bold">Explore</Text>
        <Text className="text-secondary">
          This screen is private. You only see it with a session.
        </Text>
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
  );
};

export { Explore };

import { Link, type Href } from 'expo-router';
import { Home, Send } from 'lucide-react-native';
import { type FC } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useSession } from '@/auth/use-session';
import { Text } from '@/common/text';
import { cn } from '@/lib/utils';
import { getNavRoutes } from '@/navigation/routes';
import { useMcVar } from '@/theme/hooks/use-theme-var';

const ICONS = {
  'house.fill': Home,
  'paperplane.fill': Send,
} as const;

const AppNav: FC = () => {
  const insets = useSafeAreaInsets();
  const { isAuthenticated } = useSession();
  const tabIconSelected = useMcVar('textPrimary', '#000000');
  const items = getNavRoutes(isAuthenticated);

  return (
    <View
      className="flex-row border-t border-card-hover bg-card"
      style={{ paddingBottom: Math.max(insets.bottom, 8) }}
    >
      {items.map((route) => {
        const Icon = ICONS[route.icon as keyof typeof ICONS] ?? Home;

        return (
          <Link key={route.href} href={route.href as Href} asChild>
            <View className={cn('flex-1 items-center gap-1 py-3')}>
              <Icon color={tabIconSelected} size={22} />
              <Text className="text-xs text-foreground">{route.title}</Text>
            </View>
          </Link>
        );
      })}
    </View>
  );
};

export { AppNav };

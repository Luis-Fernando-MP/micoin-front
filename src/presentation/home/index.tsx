import { Link, type Href } from 'expo-router';
import { type FC, type ReactNode, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { useSession } from '@/auth/use-session';
import { Badge } from '@/common/badge';
import { BrandLogo } from '@/common/brand-logo';
import { Button } from '@/common/button';
import { Card } from '@/common/card';
import { Input } from '@/common/input';
import { AppModal } from '@/common/modal';
import { AppNav } from '@/common/nav';
import { Separator } from '@/common/separator';
import { Text } from '@/common/text';
import { ThemeToggle } from '@/theme/components/theme-toggle';

interface SectionProps {
  title: string;
  children: ReactNode;
}

const Section: FC<SectionProps> = ({ title, children }) => {
  return (
    <Card className="gap-3">
      <Text className="text-lg font-semibold">{title}</Text>
      <Separator />
      {children}
    </Card>
  );
};

const Home: FC = () => {
  const { isAuthenticated, data } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  let statusLabel = 'Guest';
  if (isAuthenticated) {
    statusLabel = 'Signed in';
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 p-5 pb-8"
      >
        <View className="items-start gap-2">
          <BrandLogo size="lg" />
          <Text className="text-3xl font-bold">MiCoin</Text>
          <Text className="text-secondary">
            Component lab — review standards before shipping.
          </Text>
          <Badge label={statusLabel} />
        </View>

        <Section title="ThemeToggle">
          <Text className="text-sm text-secondary">
            Variants: light · dark · system (selected = primary fill)
          </Text>
          <ThemeToggle />
        </Section>

        <Section title="BrandLogo">
          <Text className="text-sm text-secondary">
            Sizes: sm (40) · md (96) · lg (160) — SVG
          </Text>
          <View className="flex-row items-end gap-4">
            <View className="items-center gap-1">
              <BrandLogo size="sm" />
              <Text className="text-xs text-secondary">sm</Text>
            </View>
            <View className="items-center gap-1">
              <BrandLogo size="md" />
              <Text className="text-xs text-secondary">md</Text>
            </View>
            <View className="items-center gap-1">
              <BrandLogo size="lg" />
              <Text className="text-xs text-secondary">lg</Text>
            </View>
          </View>
        </Section>

        <Section title="Text">
          <Text className="text-sm text-secondary">
            Default uses text-foreground; compose with tokens
          </Text>
          <Text className="text-3xl font-bold">Heading 3xl bold</Text>
          <Text className="text-2xl font-semibold">Heading 2xl</Text>
          <Text className="text-lg font-semibold">Title lg</Text>
          <Text>Body default</Text>
          <Text className="text-sm text-secondary">Caption secondary</Text>
          <Text className="text-brand">Brand accent (special only)</Text>
          <Text className="text-semantic-error-text">Semantic error</Text>
          <Text className="text-semantic-warning-text">Semantic warning</Text>
          <Text className="text-semantic-info-text">Semantic info</Text>
          <Text className="text-semantic-success-text">Semantic success</Text>
        </Section>

        <Section title="Button">
          <Text className="text-sm text-secondary">
            Variants: default · outline · ghost · disabled
          </Text>
          <Button label="Default" />
          <Button variant="outline" label="Outline" />
          <Button variant="ghost" label="Ghost" />
          <Button disabled label="Disabled" />
        </Section>

        <Section title="Input">
          <Text className="text-sm text-secondary">
            Optional label · placeholder uses text-secondary
          </Text>
          <Input
            label="With label"
            placeholder="Type something…"
            value={inputValue}
            onChangeText={setInputValue}
          />
          <Input placeholder="Without label" />
        </Section>

        <Section title="Badge">
          <Text className="text-sm text-secondary">Single variant for now</Text>
          <View className="flex-row flex-wrap gap-2">
            <Badge label="Default" />
            <Badge label={statusLabel} />
            <Badge label="Guest" />
          </View>
        </Section>

        <Section title="Card">
          <Text className="text-sm text-secondary">
            Surface: bg-card + border-card-hover
          </Text>
          <Card className="gap-1">
            <Text className="font-semibold">Nested card</Text>
            <Text className="text-secondary">Content inside another Card</Text>
          </Card>
        </Section>

        <Section title="Separator">
          <Text>Above</Text>
          <Separator />
          <Text>Below</Text>
        </Section>

        <Section title="AppModal">
          <Text className="text-sm text-secondary">
            Props: visible · onClose · title? · children
          </Text>
          <Button label="Open modal" onPress={() => setModalOpen(true)} />
        </Section>

        <Section title="Colors (tokens)">
          <Text className="text-sm text-secondary">
            Primary = Vercel UI · Brand = gold special
          </Text>
          <View className="flex-row flex-wrap gap-2">
            <View className="h-10 w-10 rounded-lg bg-background border border-card-hover" />
            <View className="h-10 w-10 rounded-lg bg-card border border-card-hover" />
            <View className="h-10 w-10 rounded-lg bg-card-hover" />
            <View className="h-10 w-10 rounded-lg bg-primary-background" />
            <View className="h-10 w-10 rounded-lg bg-brand-background" />
            <View className="h-10 w-10 rounded-lg bg-semantic-error-bg border border-card-hover" />
            <View className="h-10 w-10 rounded-lg bg-semantic-warning-bg border border-card-hover" />
            <View className="h-10 w-10 rounded-lg bg-semantic-info-bg border border-card-hover" />
            <View className="h-10 w-10 rounded-lg bg-semantic-success-bg border border-card-hover" />
          </View>
          <Text className="text-xs text-secondary">
            bg · card · card-hover · primary · brand · semantics
          </Text>
        </Section>

        <Section title="Auth actions">
          {data?.user && <Text>Welcome {data.user.email}</Text>}
          {!data?.user && (
            <View className="gap-3">
              <Link href={'/login' as Href} asChild>
                <Button label="Login" />
              </Link>
              <Link href={'/register' as Href} asChild>
                <Button variant="outline" label="Create account" />
              </Link>
            </View>
          )}
        </Section>

        <Text className="text-center text-xs text-secondary">
          AppNav is fixed below
        </Text>
      </ScrollView>

      <AppNav />

      <AppModal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        title="AppModal"
      >
        <Text className="mb-4 text-secondary">
          Standard modal shell. Tap outside or Cancel to close.
        </Text>
        <Button
          variant="outline"
          label="Cancel"
          onPress={() => setModalOpen(false)}
        />
      </AppModal>
    </View>
  );
};

export { Home };

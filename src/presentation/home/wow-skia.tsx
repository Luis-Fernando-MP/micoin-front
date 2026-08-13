import {
  Canvas,
  Circle,
  Group,
  Line,
  Path,
  Rect,
  Skia,
  vec,
} from '@shopify/react-native-skia';
import { type FC, useMemo, useState } from 'react';
import { View } from 'react-native';

import { Button } from '@/common/components/button';
import { Text } from '@/common/components/text';
import { useMcVar } from '@/theme/hooks/use-theme-var';

const SPARK = [12, 18, 14, 22, 19, 28, 24, 31, 27, 35];
const BARS = [40, 65, 35, 80, 55, 90, 48];
const WEEK = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const DemoLabel: FC<{ label: string }> = ({ label }) => (
  <Text className="mb-1 text-xs font-medium text-secondary">{label}</Text>
);

const SparklineDemo: FC = () => {
  const brand = useMcVar('brand', '#ca9138');
  const muted = useMcVar('border', '#eaeaea');
  const path = useMemo(() => {
    const p = Skia.Path.Make();
    const w = 280;
    const h = 64;
    const max = Math.max(...SPARK);
    const min = Math.min(...SPARK);
    const range = max - min || 1;
    SPARK.forEach((value, index) => {
      const x = (index / (SPARK.length - 1)) * w;
      const y = h - ((value - min) / range) * (h - 8) - 4;
      if (index === 0) {
        p.moveTo(x, y);
        return;
      }
      p.lineTo(x, y);
    });
    return p;
  }, []);

  return (
    <View>
      <DemoLabel label="A · Sparkline + anillo" />
      <Canvas style={{ width: 280, height: 80 }}>
        <Path
          path={path}
          color={brand}
          style="stroke"
          strokeWidth={3}
          strokeCap="round"
        />
        <Circle cx={250} cy={18} r={16} color={muted} />
        <Circle cx={250} cy={18} r={10} color={brand} />
      </Canvas>
    </View>
  );
};

const BarsDemo: FC = () => {
  const brand = useMcVar('brand', '#ca9138');
  const muted = useMcVar('border', '#eaeaea');
  return (
    <View>
      <DemoLabel label="B · Barras semanales (gastos)" />
      <Canvas style={{ width: 280, height: 100 }}>
        {BARS.map((value, index) => {
          const barW = 28;
          const gap = 10;
          const x = index * (barW + gap) + 8;
          const h = (value / 100) * 70;
          return (
            <Group key={WEEK[index]}>
              <Rect
                x={x}
                y={78 - h}
                width={barW}
                height={h}
                color={index === 5 ? brand : muted}
              />
            </Group>
          );
        })}
      </Canvas>
    </View>
  );
};

const DonutDemo: FC = () => {
  const brand = useMcVar('brand', '#ca9138');
  const muted = useMcVar('border', '#eaeaea');
  const [pct, setPct] = useState(0.72);
  const path = useMemo(() => {
    const p = Skia.Path.Make();
    p.addCircle(70, 70, 48);
    return p;
  }, []);

  return (
    <View className="gap-2">
      <DemoLabel label="C · Donut de meta de ahorro (toca ±)" />
      <View className="flex-row items-center gap-3">
        <Canvas style={{ width: 140, height: 140 }}>
          <Path
            path={path}
            color={muted}
            style="stroke"
            strokeWidth={14}
            strokeCap="round"
          />
          <Path
            path={path}
            color={brand}
            style="stroke"
            strokeWidth={14}
            strokeCap="round"
            start={0}
            end={pct}
          />
        </Canvas>
        <View className="gap-2">
          <Text className="text-2xl font-bold">{Math.round(pct * 100)}%</Text>
          <View className="flex-row gap-2">
            <Button
              size="sm"
              variant="outline"
              label="−"
              onPress={() => setPct((v) => Math.max(0.05, v - 0.08))}
            />
            <Button
              size="sm"
              label="+"
              onPress={() => setPct((v) => Math.min(1, v + 0.08))}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const AreaDemo: FC = () => {
  const brand = useMcVar('brand', '#ca9138');
  const path = useMemo(() => {
    const p = Skia.Path.Make();
    const w = 280;
    const h = 72;
    const max = Math.max(...SPARK);
    const min = Math.min(...SPARK);
    const range = max - min || 1;
    const ys = SPARK.map((value, index) => {
      const x = (index / (SPARK.length - 1)) * w;
      const y = h - ((value - min) / range) * (h - 10) - 6;
      return { x, y };
    });
    p.moveTo(0, h);
    p.lineTo(ys[0].x, ys[0].y);
    ys.forEach((point) => p.lineTo(point.x, point.y));
    p.lineTo(w, h);
    p.close();
    return p;
  }, []);

  return (
    <View>
      <DemoLabel label="D · Área rellena (balance acumulado)" />
      <Canvas style={{ width: 280, height: 80 }}>
        <Path path={path} color={brand} opacity={0.35} />
      </Canvas>
    </View>
  );
};

const GaugeDemo: FC = () => {
  const brand = useMcVar('brand', '#ca9138');
  const muted = useMcVar('border', '#eaeaea');
  const [score, setScore] = useState(780);
  const angle = ((score - 300) / (850 - 300)) * Math.PI;
  const cx = 90;
  const cy = 90;
  const r = 70;
  const needleX = cx + Math.cos(Math.PI - angle) * (r - 12);
  const needleY = cy - Math.sin(Math.PI - angle) * (r - 12);
  const track = useMemo(() => {
    const p = Skia.Path.Make();
    p.addArc(
      { x: cx - r, y: cy - r, width: r * 2, height: r * 2 },
      180,
      180
    );
    return p;
  }, []);
  const fill = useMemo(() => {
    const p = Skia.Path.Make();
    p.addArc(
      { x: cx - r, y: cy - r, width: r * 2, height: r * 2 },
      180,
      ((score - 300) / (850 - 300)) * 180
    );
    return p;
  }, [score]);

  return (
    <View className="gap-2">
      <DemoLabel label="E · Gauge score crediticio" />
      <View className="flex-row items-center gap-3">
        <Canvas style={{ width: 180, height: 110 }}>
          <Path
            path={track}
            color={muted}
            style="stroke"
            strokeWidth={12}
          />
          <Path
            path={fill}
            color={brand}
            style="stroke"
            strokeWidth={12}
            strokeCap="round"
          />
          <Line
            p1={vec(cx, cy)}
            p2={vec(needleX, needleY)}
            color={brand}
            strokeWidth={3}
          />
          <Circle cx={cx} cy={cy} r={5} color={brand} />
        </Canvas>
        <View className="gap-2">
          <Text className="text-2xl font-bold">{score}</Text>
          <Button
            size="sm"
            variant="outline"
            label="Simular score"
            onPress={() => setScore(300 + Math.floor(Math.random() * 550))}
          />
        </View>
      </View>
    </View>
  );
};

const HeatDemo: FC = () => {
  const brand = useMcVar('brand', '#ca9138');
  const cells = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        id: index,
        v: ((index * 37) % 100) / 100,
      })),
    []
  );

  return (
    <View>
      <DemoLabel label="F · Heatmap actividad (últimas 4 semanas)" />
      <Canvas style={{ width: 280, height: 72 }}>
        {cells.map((cell, index) => {
          const col = index % 7;
          const row = Math.floor(index / 7);
          const opacity = 0.15 + cell.v * 0.85;
          return (
            <Rect
              key={cell.id}
              x={col * 38 + 4}
              y={row * 16 + 4}
              width={32}
              height={12}
              color={brand}
              opacity={opacity}
            />
          );
        })}
      </Canvas>
    </View>
  );
};

const SkiaGallery: FC = () => {
  return (
    <View className="gap-5">
      <SparklineDemo />
      <BarsDemo />
      <DonutDemo />
      <AreaDemo />
      <GaugeDemo />
      <HeatDemo />
    </View>
  );
};

export { SkiaGallery };

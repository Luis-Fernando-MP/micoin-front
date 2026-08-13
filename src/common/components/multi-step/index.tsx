import {
  Children,
  type FC,
  type ReactElement,
  type ReactNode,
  isValidElement,
  useState,
} from 'react';
import { View } from 'react-native';

import Button from '@/common/components/button';
import Text from '@/common/components/text';
import { cn } from '@/lib/utils';

type StepProps = {
  title: string;
  children: ReactNode;
};

const Step: FC<StepProps> = ({ children }) => {
  return <View className="min-h-16 gap-3">{children}</View>;
};
Step.displayName = 'Step';

interface MultiStepProps {
  children: ReactNode;
  headerTitle?: string;
  onComplete?: () => void;
  onClose?: () => void;
  className?: string;
}

const isStepElement = (
  child: ReactNode
): child is ReactElement<StepProps> => {
  if (!isValidElement(child)) {
    return false;
  }
  if (child.type === Step) {
    return true;
  }
  const type = child.type as { displayName?: string };
  return type.displayName === 'Step';
};

/**
 * MultiStep — wizard de pasos con Next/Back.
 *
 * @param children - Elementos Step
 * @param headerTitle - Título del flujo
 * @param onComplete - Al terminar
 * @param onClose - Al cerrar en el primer paso
 *
 * @example
 * import MultiStep from '@/common/components/multi-step';
 * <MultiStep><MultiStep.Step title="One">…</MultiStep.Step></MultiStep>
 */
const MultiStep: FC<MultiStepProps> = ({
  children,
  headerTitle,
  onComplete,
  onClose,
  className,
}) => {
  const steps = Children.toArray(children).filter(isStepElement);
  const [index, setIndex] = useState(0);
  const step = steps[index];
  const isLast = index >= steps.length - 1;
  const isFirst = index === 0;

  let actionLabel = 'Next';
  if (isLast) {
    actionLabel = 'Finish';
  }

  const onNext = () => {
    if (isLast) {
      onComplete?.();
      return;
    }
    setIndex((value) => value + 1);
  };

  const onBack = () => {
    if (isFirst) {
      onClose?.();
      return;
    }
    setIndex((value) => value - 1);
  };

  if (steps.length === 0) {
    return null;
  }

  return (
    <View className={cn('w-full gap-4', className)}>
      {headerTitle && (
        <Text.Title size="lg">{headerTitle}</Text.Title>
      )}
      {step?.props.title && (
        <Text.Subtitle>
          {index + 1}/{steps.length} · {step.props.title}
        </Text.Subtitle>
      )}
      <View className="min-h-20 rounded-control border border-border bg-card p-4">
        {step}
      </View>
      <View className="flex-row gap-3">
        <Button
          variant="outline"
          label={isFirst ? 'Close' : 'Back'}
          onPress={onBack}
          className="flex-1"
        />
        <Button label={actionLabel} onPress={onNext} className="flex-1" />
      </View>
    </View>
  );
};

const MultiStepWithStep = Object.assign(MultiStep, { Step });
export default MultiStepWithStep;

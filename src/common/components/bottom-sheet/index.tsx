import BRAND from '@/common/components/shared/brand';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetBackdropProps,
  type BottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import {
  forwardRef,
  type ReactNode,
  useCallback,
  useMemo,
} from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useMcVar } from '@/theme/hooks/use-theme-var';

type Props = {
  children: ReactNode;
  snapPoints?: (string | number)[];
} & Omit<BottomSheetModalProps, 'children' | 'snapPoints'>;

/**
 * AppBottomSheetModal — pieza reutilizable del kit MiCoin.
 *
 * Caja negra lista para conectar en cualquier pantalla.
 *
 * @param props - Ver AppBottomSheetModalProps / Props del archivo
 *
 * @example
 * import AppBottomSheetModal from '@/common/components/bottom-sheet';
 * <AppBottomSheetModal />
 */
const AppBottomSheetModal = forwardRef<BottomSheetModal, Props>(
  (
    {
      children,
      snapPoints: snapPointsProp,
      backgroundStyle,
      handleIndicatorStyle,
      ...props
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    const card = useMcVar(BRAND.native.card);
    const border = useMcVar(BRAND.native.border);
    const snapPoints = useMemo(
      () => snapPointsProp ?? ['40%', '70%'],
      [snapPointsProp]
    );

    const renderBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={[{ backgroundColor: card }, backgroundStyle]}
        handleIndicatorStyle={[
          { backgroundColor: border },
          handleIndicatorStyle,
        ]}
        {...props}
      >
        <BottomSheetView
          style={{
            paddingBottom: insets.bottom + 16,
            paddingHorizontal: 16,
          }}
        >
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

AppBottomSheetModal.displayName = 'AppBottomSheetModal';

export default AppBottomSheetModal;

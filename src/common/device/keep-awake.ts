import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';

const setKeepAwake = async (enabled: boolean) => {
  if (enabled) {
    await activateKeepAwakeAsync('micoin');
    return true;
  }
  deactivateKeepAwake('micoin');
  return false;
};

export { setKeepAwake };

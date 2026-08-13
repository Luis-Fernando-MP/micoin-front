import * as WebBrowser from 'expo-web-browser';

const openSecureBrowser = async (url: string, controlsColor?: string) => {
  const result = await WebBrowser.openBrowserAsync(url, {
    presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
    ...(controlsColor ? { controlsColor } : {}),
  });
  return { ok: true as const, type: result.type };
};

export { openSecureBrowser };

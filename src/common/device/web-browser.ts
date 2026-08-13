import * as WebBrowser from 'expo-web-browser';

const openSecureBrowser = async (url: string) => {
  const result = await WebBrowser.openBrowserAsync(url, {
    presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
    controlsColor: '#ca9138',
  });
  return { ok: true as const, type: result.type };
};

export { openSecureBrowser };

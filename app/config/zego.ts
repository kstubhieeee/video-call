export const ZEGO_CONFIG = {
  appID: Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID),
  serverSecret: process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET || '',
  serverUrl: process.env.NEXT_PUBLIC_ZEGO_SERVER_URL || '',
  appSign: process.env.NEXT_PUBLIC_ZEGO_APP_SIGN || '',
  callbackSecret: process.env.NEXT_PUBLIC_ZEGO_CALLBACK_SECRET || ''
}; 
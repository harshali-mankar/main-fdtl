declare global {
  interface Window {
    __APP_CONFIG__?: any;
  }
}

export const loadConfig = async () => {
  try {
    const res = await fetch("/config.json");
    const config = await res.json();
    window.__APP_CONFIG__ = config;
  } catch (err) {
    console.error("Failed to load config.json", err);
  }
};

export const getAppConfig = () => {
  if (!window.__APP_CONFIG__) {
    throw new Error("App config not loaded yet");
  }
  return window.__APP_CONFIG__;
};

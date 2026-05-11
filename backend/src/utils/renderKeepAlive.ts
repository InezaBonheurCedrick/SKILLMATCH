const DEFAULT_INTERVAL_MS = 14 * 60 * 1000;

const toBool = (value: string | undefined, fallback: boolean): boolean => {
  if (value === undefined) return fallback;
  return value.toLowerCase() === 'true';
};

export const startRenderKeepAlive = (): NodeJS.Timeout | null => {
  const isEnabled = toBool(process.env.RENDER_KEEP_ALIVE, true);
  if (!isEnabled) {
    return null;
  }

  const baseUrl = process.env.RENDER_EXTERNAL_URL || process.env.APP_URL;
  if (!baseUrl) {
    console.log('Render keep-alive disabled: set RENDER_EXTERNAL_URL or APP_URL to enable.');
    return null;
  }

  const intervalMs = Number(process.env.RENDER_KEEP_ALIVE_INTERVAL_MS) || DEFAULT_INTERVAL_MS;
  const healthUrl = `${baseUrl.replace(/\/+$/, '')}/health`;

  const ping = async (): Promise<void> => {
    try {
      const response = await fetch(healthUrl, { method: 'GET' });
      if (!response.ok) {
        console.warn(`Render keep-alive ping failed with status ${response.status}: ${healthUrl}`);
      }
    } catch (error) {
      console.warn('Render keep-alive ping error:', error);
    }
  };

  void ping();
  const timer = setInterval(() => {
    void ping();
  }, intervalMs);

  timer.unref();
  console.log(`Render keep-alive started. Pinging ${healthUrl} every ${Math.round(intervalMs / 60000)} minutes.`);
  return timer;
};


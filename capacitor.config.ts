import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.akhileswar.bcamcastudysprint',
  appName: 'BCA MCA Study Sprint',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  android: {
    backgroundColor: '#0f0a09',
    allowMixedContent: true,
  },
  plugins: {
    // Optional plugin configurations
  },
};

export default config;

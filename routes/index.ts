import { createSwrCache } from '../utils/swrRevalidate';
const swrConf = createSwrCache({ name: 'index' });
console.log(swrConf);
export default cachedEventHandler(
  async () => {
    new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('index');
    return `Response generated at ${new Date().toISOString()}`;
  },
  {
    swr: true,
    maxAge: 5000000000000000,
    ...swrConf,
  }
);

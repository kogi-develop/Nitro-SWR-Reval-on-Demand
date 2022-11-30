# Nitro-SWR-Reval-on-Demand

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/github-xc6cjm-tjfbvf)

```typescript
// /utils/swrRevalidate.ts

export type swrCacheDestination = {
  name: string;
  group?: string;
};
export interface cachedRoute extends swrCacheDestination {
  route: string;
}

const createSwrCache = ({ name, group = 'swr' }: swrCacheDestination) => {
  return {
    getKey: () => name,
    group,
    name,
  };
};

const revalidateSwrCache = async ({
  name,
  group = 'swr',
  route,
}: cachedRoute) => {
  const storageString = `cache:${group}:${name}:.il7asoJjJE.json`;
  const storage = await useStorage();
  storage.removeItem(storageString);

  const revalidatedResponse = await $fetch(
    ['', 'index'].includes(route) ? '/' : route
  );
  return revalidatedResponse;
};
export { createSwrCache, revalidateSwrCache };
```


Usage createSwrCache:
```typescript
// routes/index.ts

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
```

Usage revalidateSwrCache:
```typescript
// routes/revalidation.ts

import { revalidateSwrCache } from '../utils/swrRevalidate';

export default defineEventHandler(async (event) => {
  console.log('reval');
  const reval = await revalidateSwrCache({ name: 'index', route: '/' });

  return { reval };
});
```

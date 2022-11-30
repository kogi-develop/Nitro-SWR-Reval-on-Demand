# Nitro-SWR-Reval-on-Demand

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/github-xc6cjm-tjfbvf)

```
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

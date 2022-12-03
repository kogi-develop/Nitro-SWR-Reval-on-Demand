export type swrCacheDestination = {
  name: string;
  group?: string;
};
export interface cachedRoute extends swrCacheDestination {
  route: string;
}

const createSwrCache = ({ name, group = 'swr' }: swrCacheDestination) => {
  return {
    getKey: (...args) => {
      console.log('args', args);
      return name;
    },
    group,
    name,
  };
};

const revalidateSwrCache = async ({
  name,
  group = 'swr',
  route,
}: cachedRoute) => {
  const storageString = `cache:${group}:${name}`;
  const storage = await useStorage();
  const keys = await storage.getKeys(storageString);
  console.log(keys);
  try {
    keys.forEach((key) => {
      storage.removeItem(key);
    });
  } catch (e) {
    console.log(e);
  }

  const revalidatedResponse = await $fetch(
    ['', 'index'].includes(route) ? '/' : route
  );
  return revalidatedResponse;
};
export { createSwrCache, revalidateSwrCache };

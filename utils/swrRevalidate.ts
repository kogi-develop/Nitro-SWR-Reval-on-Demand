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
  console.log(storageString);
  const storage = await useStorage();
  storage.removeItem(storageString);

  const revalidatedResponse = await $fetch(
    ['', 'index'].includes(route) ? '/' : route
  );
  return revalidatedResponse;
};
export { createSwrCache, revalidateSwrCache };

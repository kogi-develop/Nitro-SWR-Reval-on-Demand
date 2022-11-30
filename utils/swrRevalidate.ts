export type swrCache = {
  name: string;
  group?: string;
};
export interface cachedRoute extends swrCache {
  route: string;
}

const createSwrCache = ({ name, group = 'swr' }: swrCache) => {
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

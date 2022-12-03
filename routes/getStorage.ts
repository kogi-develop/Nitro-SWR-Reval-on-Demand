export default defineEventHandler(async () => {
  const storage = await useStorage().getKeys('cache:swr:index');
  console.log(storage);

  return storage || { nothing: 'nothing' };
});

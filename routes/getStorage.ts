export default defineEventHandler(async () => {
  const storage = await useStorage().getKeys();
  console.log(storage);

  return storage || { nothing: 'nothing' };
});

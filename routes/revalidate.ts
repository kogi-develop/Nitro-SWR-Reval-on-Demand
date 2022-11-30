import { revalidateSwrCache } from '../utils/swrRevalidate';

export default defineEventHandler(async (event) => {
  console.log('reval');
  const router = await useStorage();
  const reval = await revalidateSwrCache({ name: 'index', route: '/' });

  return { reval };
});

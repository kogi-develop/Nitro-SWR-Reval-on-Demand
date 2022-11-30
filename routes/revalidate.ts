import { revalidateSwrCache } from '../utils/swrRevalidate';

export default defineEventHandler(async (event) => {
  const router = await useStorage();
  revalidateSwrCache({ name: 'index', route: '/' });

  return { nothing: 'nothing' };
});

import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@apps/iam/src/infrastructure/http/router.ts';

export const iamClient = createTRPCClient<AppRouter>({
  links: [httpBatchLink({ url: process.env.IAM_URL ?? 'http://localhost:3003' })],
});

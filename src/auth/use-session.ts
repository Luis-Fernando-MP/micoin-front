import { authClient } from '@/auth/client';

type SessionPayload = {
  session?: unknown;
  user?: {
    email?: string | null;
    name?: string | null;
  } | null;
} | null;

const useSession = () => {
  const session = authClient.useSession();
  const data = session.data as SessionPayload;

  return {
    ...session,
    data,
    isAuthenticated: Boolean(data?.session || data?.user),
  };
};

export { useSession };

import Main from '@/components/main';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  console.log(":::session:::", session);
  return (
    <div>
      <Main session={session} />
    </div>
  );
}

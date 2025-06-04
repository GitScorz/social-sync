import { auth } from '@/auth';
import DashboardOverview from '@/components/ui/dashboard/overview';
import { findUserById, getUserAccounts } from '@/lib/crud';
import { Viewport } from 'next';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.userId) {
    const user = await findUserById(session.userId);
    const accounts = await getUserAccounts(session.userId);

    return (
      <div className='flex h-screen flex-row md:overflow-hidden bg-[#1C1C1C]'>
        <DashboardOverview accounts={accounts} user={user}>
          {children}
        </DashboardOverview>
      </div>
    );
  }

  return (
    <div className='flex h-screen flex-row md:overflow-hidden bg-[#1C1C1C]'>
      <DashboardOverview accounts={[]} user={null}>
        {children}
      </DashboardOverview>
    </div>
  );
}

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: 'device-width',
  userScalable: false,
};

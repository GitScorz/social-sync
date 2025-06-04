import AccountsPage from './accounts-page';
import { auth } from '@/auth';
import { findUserById, getUserAccounts } from '@/lib/crud';

export default async function AccountsCenter() {
  const session = await auth();

  if (session?.userId) {
    const user = await findUserById(session.userId);
    const accounts = await getUserAccounts(session.userId);

    return <AccountsPage accounts={accounts} user={user} />;
  }

  return <AccountsPage accounts={[]} user={null} />;
}

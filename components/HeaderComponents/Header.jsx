import { checkUser } from '@/lib/checkUser';
import { HeaderClient } from './HeaderClient';

/**
 * Server component that fetches user data and passes it to HeaderClient
 * @returns {JSX.Element} HeaderClient component with user data
 */
export async function Header() {
  const user = await checkUser();
  return <HeaderClient user={user} />;
}
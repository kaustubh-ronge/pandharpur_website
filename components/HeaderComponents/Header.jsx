import { checkUser } from '@/lib/checkUser';
import { HeaderClient } from './HeaderClient';

export async function Header() {
  // 1. This runs on the SERVER. We fetch the user data here.
  const user = await checkUser();
  console.log(user)

  // 2. We render the CLIENT component and pass the server data as a prop.
  return <HeaderClient user={user} />;
}
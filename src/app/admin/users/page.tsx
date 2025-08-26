
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAllUsers } from '@/services/userService';
import type { UserInfo } from 'firebase/auth';
import { unstable_noStore as noStore } from 'next/cache';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

async function getUsers(): Promise<UserInfo[]> {
    noStore();
    try {
        const userList = await getAllUsers();
        return userList;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return [];
    }
}

function ServiceAccountNotice({ userCount }: { userCount: number }) {
    if (process.env.NODE_ENV === 'production' || userCount > 0) return null;

    return (
        <Alert className="mb-6">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Developer Notice</AlertTitle>
            <AlertDescription>
                User data is not being fetched. To view users in your local development environment, please add your Firebase `serviceAccountKey.json` to the project root.
            </AlertDescription>
        </Alert>
    )
}

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <ServiceAccountNotice userCount={users.length} />
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">User ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 && (
                <TableRow>
                    <TableCell colSpan={3} className="text-center h-24">No users found.</TableCell>
                </TableRow>
              )}
              {users.map((user) => (
                <TableRow key={user.uid}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={user.photoURL || ''} />
                            <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.displayName || 'N/A'}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="hidden md:table-cell font-mono text-xs">{user.uid}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

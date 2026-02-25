import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { Separator } from '../ui/separator';
import { getAllAdmins } from '@/services/api/apiAdmin';
import useAuth from '@/store/useAuth';
import Loading from '@/pages/Loading';

function UserListComponent() {
  const [users, setUsers] = useState([]);
  const { userAuthToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      const data = await getAllAdmins({
        headers: {
          Authorization: `Bearer ${userAuthToken}`,
        },
      });
      setUsers(data);
      setLoading(false);
    };
    fetchAdmins();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <p className="font-semibold text-xl">User Role</p>
        <p className="font-semibold text-xl">Username</p>
        <p className="font-semibold text-xl">Remove User</p>
      </div>
      {loading ? (
        <Loading />
      ) : (
        users.map((user) => {
          return (
            <div key={user.username}>
              <div className="flex justify-between items-center">
                <p>{user.role}</p>
                <p>{user.username}</p>
                <Button>
                  <Trash2 />
                  Delete
                </Button>
              </div>
              <Separator className="my-4" />
            </div>
          );
        })
      )}
      {/* {users.map((user) => {
        return (
          <div key={user.username}>
            <div className="flex justify-between items-center">
              <p>{user.role}</p>
              <p>{user.username}</p>
              <Button>
                <Trash2 />
                Delete
              </Button>
            </div>
            <Separator className="my-4" />
          </div>
        );
      })} */}
    </>
  );
}

export default UserListComponent;

import AppDialog from '@/components/custom/AppDialog';
import UserList from '@/components/custom/UserList';
import React from 'react';

function Users() {
  return (
    <>
      <div className="p-7">
        <h2 className="mb-7 text-2xl">Create User</h2>
        <AppDialog />
        <div className="mt-7">
          <UserList />
        </div>
      </div>
    </>
  );
}

export default Users;

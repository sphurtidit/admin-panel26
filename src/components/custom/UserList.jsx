import React from 'react';
import UserListComponent from './UserListComponent';

function UserList() {
  return (
    <>
      <h3 className="text-xl">All Existing Users</h3>
      <p className="text-md mt-2">The master admins will not be in the list.</p>
      <div className="flex justify-center mt-16">
        <div className="w-2/3">
          <UserListComponent />
        </div>
      </div>
    </>
  );
}

export default UserList;

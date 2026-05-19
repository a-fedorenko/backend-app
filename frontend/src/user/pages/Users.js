import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Oleksandra Fedorenko',
      image:
        'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_1.png',
      places: 3
    }
  ];

  return <UsersList items={USERS} />;
};

export default Users;

import React, {useEffect, useState} from 'react';
import {User} from './User.jsx';
import {getAllUsers} from '../../../services/user.js';

export const UserList = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getAllUsers();
      console.log(res);
      setUsers(res);
    })();
  }, []);

  return <ul style={{listStyle: 'none', padding: 0}}>
    {users.map((user) => <li>
      <User user={user} />
    </li>)}
  </ul>;
};

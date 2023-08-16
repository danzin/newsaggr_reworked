import React, { useEffect, useState } from 'react';
import { getUsers } from '../../services/users';
import { useRefreshToken } from '../../hooks/useRefreshToken';
const UsersList = () => {
  const [users, setUsers] = useState();
  const refresh = useRefreshToken();

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    async function fetcher() {
      const data = await getUsers(controller);

      isMounted && setUsers(data);
    }

    fetcher();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users</p>
      )}
      <button onClick={() => refresh}>Refresh</button>
      <br />
    </div>
  );
};

export default UsersList;

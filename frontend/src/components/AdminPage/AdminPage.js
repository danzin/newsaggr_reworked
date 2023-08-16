import React from 'react';
import { Link } from 'react-router-dom';
import UsersList from '../UsersList/UsersList';

const AdminPage = () => {
  return (
    <section>
      <h1>Admin Panel</h1>
      <br />
      <UsersList />
      <div>
        <Link to="/"> Home</Link>
      </div>
    </section>
  );
};

export default AdminPage;

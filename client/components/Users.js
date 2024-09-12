import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { fetchUsers } from '../store/allUsersStore';
import { Link } from 'react-router-dom';

function UserPage() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers);
  const { id: currentUserId } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((user) => user.id !== currentUserId);

  return (
    <div className="page-container">
      <h1 className="page-heading"><u><b>Users</b></u></h1>
      <div className="card-container">
        {filteredUsers.map((user) => (
          <div key={user.id} className="card">
            <Link to={`/users/${user.id}`} className="card-link">
              <h2 className="card-heading">{user.username}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPage;



import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from '../store/allGroupsStore';
import { fetchUsers } from '../store/allUsersStore';

function CreateGroup() {
  const dispatch = useDispatch();
  const { id: userId } = useSelector((state) => state.auth); // Get the user ID from the auth state
  const users = useSelector((state) => state.allUsers);

  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!text ) {
      setError('All fields are required');
      return;
    }

    // Create a new group object
    const newGroup = {
      name: text,
      leaderId: userId,
    };

    // Dispatch the action to create a group
    dispatch(createGroup(newGroup));

    // Reset form fields after submission
    setText('');
    setError('');
  };

  return (
    <div>
      <h2>Create a New Group</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>Group Name:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Group</button>
      </form>
    </div>
  );
}

export default CreateGroup;

// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createGroup } from '../store/allGroupsStore';
// import { createGroupMember } from '../store/allGroupMembersStore';

// function CreateGroup() {
//   const dispatch = useDispatch();
//   const { id: userId } = useSelector((state) => state.auth); // Get the user ID from the auth state

//   const [text, setText] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!text) {
//       setError('Group name is required');
//       return;
//     }

//     const newGroup = {
//       name: text,
//       leaderId: userId,
//     };

//     try {
//       // Dispatch the action to create a group
//       const createdGroup = await dispatch(createGroup(newGroup));

//       // Ensure createdGroup has the ID before dispatching createGroupMember
//       if (createdGroup && createdGroup.id) {
//         dispatch(createGroupMember({ groupId: createdGroup.id, userId }));
//         setText('');
//         setError('');
//       } else {
//         console.error('Failed to get created group ID');
//         setError('Failed to create group. Already a group with that name!');
//       }
//     } catch (error) {
//       console.error('Failed to create group or add member:', error);

//       // Check if the error is due to a duplicate group name
//       if (error.response && error.response.status === 400 && error.response.data === 'There is already a group with that name!') {
//         alert('There is already a group with that name!'); // Display an alert
//       } else {
//         setError('Failed to create group.');
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Create a New Group</h2>
//       <form onSubmit={handleSubmit}>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <div>
//           <label>Group Name:</label>
//           <input
//             type="text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Create Group</button>
//       </form>
//     </div>
//   );
// }

// export default CreateGroup;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from '../store/allGroupsStore';
import { createGroupMember } from '../store/allGroupMembersStore';

function CreateGroup() {
  const dispatch = useDispatch();
  const { id: userId } = useSelector((state) => state.auth);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) {
      setError('Group name is required');
      return;
    }

    const newGroup = {
      name: text,
      leaderId: userId,
    };

    try {
      const createdGroup = await dispatch(createGroup(newGroup));

      if (createdGroup && createdGroup.id) {
        dispatch(createGroupMember({ groupId: createdGroup.id, userId }));
        setText('');
        setError('');
      } else {
        console.error('Failed to get created group ID');
        setError('Failed to create group. Already a group with that name!');
      }
    } catch (error) {
      console.error('Failed to create group or add member:', error);

      if (error.response && error.response.status === 400 && error.response.data === 'There is already a group with that name!') {
        alert('There is already a group with that name!');
      } else {
        setError('Failed to create group.');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Create a New Group</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
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

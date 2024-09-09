
// // import React, { useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { createGroup } from '../store/allGroupsStore';
// // import { createGroupMember } from '../store/allGroupMembersStore'; // Action to create a group member

// // function CreateGroup() {
// //   const dispatch = useDispatch();
// //   const { id: userId } = useSelector((state) => state.auth); // Get the user ID from the auth state

// //   const [text, setText] = useState('');
// //   const [error, setError] = useState('');

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     // Validation
// //     if (!text) {
// //       setError('Group name is required');
// //       return;
// //     }

// //     // Create a new group object
// //     const newGroup = {
// //       name: text,
// //       leaderId: userId,
// //     };

// //     try {
// //       // Dispatch the action to create a group
// //       const createdGroup = await dispatch(createGroup(newGroup));

// //       // Dispatch action to add the user as a group member
// //       if (createdGroup) {
// //         dispatch(createGroupMember({ groupId: createdGroup.id, userId }));
// //       }

// //       // Reset form fields after submission
// //       setText('');
// //       setError('');
// //     } catch (error) {
// //       setError('Failed to create group.');
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Create a New Group</h2>
// //       <form onSubmit={handleSubmit}>
// //         {error && <p style={{ color: 'red' }}>{error}</p>}
// //         <div>
// //           <label>Group Name:</label>
// //           <input
// //             type="text"
// //             value={text}
// //             onChange={(e) => setText(e.target.value)}
// //             required
// //           />
// //         </div>
// //         <button type="submit">Create Group</button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default CreateGroup;

// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createGroup } from '../store/allGroupsStore';
// import { createGroupMember } from '../store/allGroupMembersStore'; // Action to create a group member

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

//     // Create a new group object
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
//       } else {
//         console.error('Failed to get created group ID');
//       }

//       // Reset form fields after submission
//       setText('');
//       setError('');
//     } catch (error) {
//       console.error('Failed to create group or add member:', error);
//       setError('Failed to create group.');
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
  const { id: userId } = useSelector((state) => state.auth); // Get the user ID from the auth state

  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!text) {
      setError('Group name is required');
      return;
    }

    const newGroup = {
      name: text,
      leaderId: userId,
    };

    try {
      // Dispatch the action to create a group
      const createdGroup = await dispatch(createGroup(newGroup));

      // Ensure createdGroup has the ID before dispatching createGroupMember
      if (createdGroup && createdGroup.id) {
        dispatch(createGroupMember({ groupId: createdGroup.id, userId }));
      } else {
        console.error('Failed to get created group ID');
      }

      // Reset form fields after submission
      setText('');
      setError('');
    } catch (error) {
      console.error('Failed to create group or add member:', error);
      setError('Failed to create group.');
    }
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

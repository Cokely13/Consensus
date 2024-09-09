// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { fetchGroups } from '../store/allGroupsStore';
// import { fetchUsers } from '../store/allUsersStore'; // Action to fetch all users
// import { createInvite } from '../store/allInvitesStore'; // Correct action to invite user to group

// function GroupDetailPage() {
//   const dispatch = useDispatch();
//   const { groupId } = useParams();
//   const groups = useSelector((state) => state.allGroups);
//   const users = useSelector((state) => state.allUsers); // Fetch all users
//   const [selectedGroup, setSelectedGroup] = useState(null);
//   const [selectedUserId, setSelectedUserId] = useState('');
//   const { id: currentUserId } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(fetchGroups());
//     dispatch(fetchUsers()); // Fetch all users
//   }, [dispatch, groupId]);

//   useEffect(() => {
//     if (groups.length > 0) {
//       const foundGroup = groups.find((group) => group.id === Number(groupId));
//       setSelectedGroup(foundGroup);
//     }
//   }, [groups, groupId]);

//   const handleInvite = () => {
//     if (selectedUserId) {
//       dispatch(createInvite({ groupId, inviteeId: selectedUserId, inviterId: currentUserId })); // Send invite
//       setSelectedUserId(''); // Clear the selection after inviting
//     }
//   };

//   console.log("selected", selectedGroup)

//   return (
//     <div>
//       {selectedGroup ? (
//         <>
//           <h2>{selectedGroup.name}'s Profile</h2>
//           <h3>Group Members:</h3>
//           <ul>
//             {selectedGroup.group_members.map((member) => (
//               // Assuming group_members contain user details including the username
//               <li key={`${member.userId}-${member.groupId}`}>
//                 {member.user ? member.user.username : member.userId}
//               </li>
//             ))}
//           </ul>

//           <h3>Invite Users to Group:</h3>
//           <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
//             <option value="">Select a user to invite</option>
//             {users.map((user) => (
//               <option key={user.id} value={user.id}>
//                 {user.username}
//               </option>
//             ))}
//           </select>
//           <button onClick={handleInvite}>Invite</button>
//         </>
//       ) : (
//         <p>Loading group data...</p>
//       )}
//     </div>
//   );
// }

// export default GroupDetailPage;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGroups } from '../store/allGroupsStore';
import { fetchUsers } from '../store/allUsersStore'; // Action to fetch all users
import { createInvite } from '../store/allInvitesStore'; // Correct action to invite user to group

function GroupDetailPage() {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const groups = useSelector((state) => state.allGroups);
  const users = useSelector((state) => state.allUsers); // Fetch all users
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');
  const { id: currentUserId } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchUsers()); // Fetch all users
  }, [dispatch, groupId]);

  useEffect(() => {
    if (groups.length > 0) {
      const foundGroup = groups.find((group) => group.id === Number(groupId));
      setSelectedGroup(foundGroup);
    }
  }, [groups, groupId]);

  const handleInvite = () => {
    if (selectedUserId) {
      dispatch(createInvite({ groupId, inviteeId: selectedUserId, inviterId: currentUserId })); // Send invite
      setSelectedUserId(''); // Clear the selection after inviting
    }
  };

  // Find group leader's name
  const leader = selectedGroup ? users.find(user => user.id === selectedGroup.leaderId) : null;

  // Get IDs of users already in the group
  const membersIds = selectedGroup ? selectedGroup.group_members.map(member => member.userId) : [];

  console.log("selected", selectedGroup);

  return (
    <div>
      {selectedGroup ? (
        <>
          <h2>{selectedGroup.name}'s Profile</h2>
          {leader && <h3>Leader: {leader.username}</h3>}
          <h3>Group Members:</h3>
          <ul>
            {selectedGroup.group_members.map((member) => (
              <li key={`${member.userId}-${member.groupId}`}>
                {member.user ? member.user.username : member.userId}
              </li>
            ))}
          </ul>

          {currentUserId === selectedGroup.leaderId && (
            <>
              <h3>Invite Users to Group:</h3>
              <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
                <option value="">Select a user to invite</option>
                {users
                  .filter(user => !membersIds.includes(user.id)) // Filter out users already in the group
                  .map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
              </select>
              <button onClick={handleInvite}>Invite</button>
            </>
          )}
        </>
      ) : (
        <p>Loading group data...</p>
      )}
    </div>
  );
}

export default GroupDetailPage;

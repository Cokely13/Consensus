// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { fetchGroups } from '../store/allGroupsStore';

// function GroupDetailPage() {
//   const dispatch = useDispatch();
//   const { groupId } = useParams();
//   const { id: mainGroupId } = useSelector((state) => state.auth);
//   const groups = useSelector((state) => state.allGroups);
//   const [selectedGroup, setSelectedGroup] = useState(null);

//   useEffect(() => {
//     dispatch(fetchGroups());
//   }, [dispatch, groupId]);

//   useEffect(() => {
//     if (groups.length > 0) {
//       const foundGroup = groups.find((group) => group.id === Number(groupId));
//       setSelectedGroup(foundGroup);
//     }
//   }, [groups, groupId]);


//   return (
//     <div>
//       {selectedGroup ? (
//         <>
//           <h2>{selectedGroup.name}'s Profile</h2>
//         </>
//       ) : (
//         <p>Loading group data...</p>
//       )}

//       {selectedGroup ? (
//         <>
//         <h2>Group Members:</h2>
//           <h2>{selectedGroup.group_members}</h2>
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
import { inviteUserToGroup } from '../store/groupActions'; // Action to invite user to group

function GroupDetailPage() {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const { id: mainGroupId } = useSelector((state) => state.auth);
  const groups = useSelector((state) => state.allGroups);
  const users = useSelector((state) => state.allUsers); // Fetch all users
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');

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

  const handleInvite = (userId) => {
    dispatch(inviteUserToGroup(groupId, userId));
  };

  return (
    <div>
      {selectedGroup ? (
        <>
          <h2>{selectedGroup.name}'s Profile</h2>
          <h3>Group Members:</h3>
          <ul>
            {selectedGroup.group_members.map((member) => (
              <li key={member.id}>{member.username}</li>
            ))}
          </ul>

          <h3>Invite Users to Group:</h3>
          <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
            <option value="">Select a user to invite</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
          <button onClick={() => handleInvite(selectedUserId)}>Invite</button>
        </>
      ) : (
        <p>Loading group data...</p>
      )}
    </div>
  );
}

export default GroupDetailPage;

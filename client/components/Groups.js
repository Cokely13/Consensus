// import { useDispatch, useSelector } from 'react-redux';
// import React, { useEffect } from 'react';
// import { fetchGroups } from '../store/allGroupsStore';
// import { fetchInvites } from '../store/allInvitesStore'; // Import to fetch invites
// import { Link } from 'react-router-dom';

// function Groups() {
//   const dispatch = useDispatch();
//   const groups = useSelector((state) => state.allGroups);
//   const invites = useSelector((state) => state.allInvites); // Fetch invites from the store
//   const { id: currentUserId } = useSelector((state) => state.auth); // Get current user's ID from auth state

//   useEffect(() => {
//     dispatch(fetchGroups());
//     dispatch(fetchInvites()); // Fetch invites when the component mounts
//   }, [dispatch]);

//   console.log("groups", groups);

//   const filteredGroups = groups.filter((group) => group.id !== currentUserId);

//   return (
//     <div className="group-page-container">
//       <h1 className="group-page-heading"><u><b>Groups</b></u></h1>
//       <div className="group-card-container">
//         {groups.map((group) => {
//           // Check if the user is a member of the group
//           const isMember = group.group_members && group.group_members.some(member => member.userId == currentUserId);

//           // Check if there is a pending invite for the user to this group
//           const hasPendingInvite = invites.some(invite => invite.groupId === group.id && invite.inviteeId == currentUserId && invite.status === 'pending');

//           return (
//             <div key={group.id} className="group-card">
//               <Link to={`/groups/${group.id}`} className="group-link">
//                 <h2 className="group-card-heading">
//                   {group.name} - # of Members {group.group_members ? group.group_members.length : 0}
//                   {isMember && <span> (Member)</span>}
//                   {hasPendingInvite && <span> (Invite)</span>}
//                 </h2>
//               </Link>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Groups;

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { fetchGroups } from '../store/allGroupsStore';
import { fetchInvites } from '../store/allInvitesStore';
import { Link } from 'react-router-dom';

function Groups() {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.allGroups);
  const invites = useSelector((state) => state.allInvites);
  const { id: currentUserId } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchInvites());
  }, [dispatch]);

  const filteredGroups = groups.filter((group) => group.id !== currentUserId);

  return (
    <div className="page-container">
      <h1 className="page-heading"><u><b>Groups</b></u></h1>
      <div className="card-container">
        {filteredGroups.map((group) => {
          const isMember = group.group_members && group.group_members.some(member => member.userId == currentUserId);
          const hasPendingInvite = invites.some(invite => invite.groupId === group.id && invite.inviteeId == currentUserId && invite.status === 'pending');

          return (
            <div key={group.id} className="card">
              <Link to={`/groups/${group.id}`} className="card-link">
                <h2 className="card-heading">
                  {group.name} - # of Members {group.group_members ? group.group_members.length : 0}
                  {isMember && <span> (Member)</span>}
                  {hasPendingInvite && <span> (Invite)</span>}
                </h2>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Groups;

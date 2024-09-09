// import { useDispatch, useSelector } from 'react-redux';
// import React, { useEffect } from 'react';
// import { fetchGroups } from '../store/allGroupsStore';
// import { Link } from 'react-router-dom';

// function Groups() {
//   const dispatch = useDispatch();
//   const groups = useSelector((state) => state.allGroups);
//   const { id: currentGroupId } = useSelector((state) => state.auth); // Get current group's ID from auth state

//   useEffect(() => {
//     dispatch(fetchGroups());
//   }, [dispatch]);

//   console.log("groups", groups)

//   // Filter out the current group from the list
//   const filteredGroups = groups.filter((group) => group.id !== currentGroupId);

//   return (
//     <div className="group-page-container">
//       <h1 className="group-page-heading"><u><b>Groups</b></u></h1>
//       <div className="group-card-container">
//         {groups.map((group) => (
//           <div key={group.id} className="group-card">
//             {/* Uncomment if group image is needed */}
//             {/* {group.image && (
//               <div>
//                 <div className="group-image-container" style={{
//                   width: '200px',
//                   height: '200px',
//                   borderRadius: '50%',
//                   margin: 'auto',
//                   backgroundImage: `url('${group.image}')`,
//                   backgroundSize: 'cover',
//                   backgroundPosition: 'center',
//                   backgroundRepeat: 'no-repeat',
//                   border: '3px solid black'
//                 }}> </div>
//               </div>
//             )} */}
//             <Link to={`/groups/${group.id}`} className="group-link">
//               <h2 className="group-card-heading">{group.name} - # of Members {group.group_members ? group.group_members.length : 0}</h2>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Groups;

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { fetchGroups } from '../store/allGroupsStore';
import { fetchInvites } from '../store/allInvitesStore'; // Import to fetch invites
import { Link } from 'react-router-dom';

function Groups() {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.allGroups);
  const invites = useSelector((state) => state.allInvites); // Fetch invites from the store
  const { id: currentUserId } = useSelector((state) => state.auth); // Get current user's ID from auth state

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchInvites()); // Fetch invites when the component mounts
  }, [dispatch]);

  console.log("groups", groups);

  const filteredGroups = groups.filter((group) => group.id !== currentUserId);

  return (
    <div className="group-page-container">
      <h1 className="group-page-heading"><u><b>Groups</b></u></h1>
      <div className="group-card-container">
        {groups.map((group) => {
          // Check if the user is a member of the group
          const isMember = group.group_members && group.group_members.some(member => member.userId == currentUserId);

          // Check if there is a pending invite for the user to this group
          const hasPendingInvite = invites.some(invite => invite.groupId === group.id && invite.inviteeId == currentUserId && invite.status === 'pending');

          return (
            <div key={group.id} className="group-card">
              <Link to={`/groups/${group.id}`} className="group-link">
                <h2 className="group-card-heading">
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

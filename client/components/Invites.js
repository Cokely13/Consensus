// import { useDispatch, useSelector } from 'react-redux';
// import React, { useEffect } from 'react';
// import { fetchInvites } from '../store/allInvitesStore';
// import { updateSingleInvite } from '../store/singleInviteStore';
// import { Link, useHistory } from 'react-router-dom';

// function Invites() {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const invites = useSelector((state) => state.allInvites);
//   const { id: currentUserId } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(fetchInvites());
//   }, [dispatch]);

//   const userInvites = invites.filter((invite) => invite.inviteeId === currentUserId);

//   // Handle invite status update
//   const handleInviteStatusChange = (invite, status) => {
//     const updatedInvite = { ...invite, status };
//     dispatch(updateSingleInvite(updatedInvite, history)); // Use updateSingleInvite with history
//   };

//   return (
//     <div className="invite-page-container">
//       <h1 className="invite-page-heading"><u><b>Invites</b></u></h1>
//       <div className="invite-card-container">
//         {userInvites.length > 0 ? (
//           userInvites.map((invite) => (
//             <div key={invite.id} className="invite-card">
//               <h2 className="invite-card-heading">Group Name: {invite.group.name}</h2>
//               <h2 className="invite-card-heading">Invitee: {invite.invitee.username}</h2>
//               <h2 className="invite-card-heading">Inviter: {invite.inviter.username}</h2>
//               <h2 className="invite-card-heading">Status: {invite.status}</h2>

//               {invite.status === 'pending' && (
//                 <div>
//                   <button onClick={() => handleInviteStatusChange(invite, 'accepted')}>
//                     Accept
//                   </button>
//                   <button onClick={() => handleInviteStatusChange(invite, 'rejected')}>
//                     Reject
//                   </button>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No invites found for you.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Invites;

import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { fetchInvites } from '../store/allInvitesStore';
import { updateSingleInvite } from '../store/singleInviteStore';

function Invites() {
  const dispatch = useDispatch();
  const invites = useSelector((state) => state.allInvites);
  const { id: currentUserId } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchInvites());
  }, [dispatch]);

  const userInvites = invites.filter((invite) => invite.inviteeId === currentUserId);

  // Handle invite status update
  const handleInviteStatusChange = async (invite, status) => {
    const updatedInvite = { ...invite, status };
    await dispatch(updateSingleInvite(updatedInvite));
    dispatch(fetchInvites()); // Refetch invites after the status update
  };

  return (
    <div className="invite-page-container">
      <h1 className="invite-page-heading"><u><b>Invites</b></u></h1>
      <div className="invite-card-container">
        {userInvites.length > 0 ? (
          userInvites.map((invite) => (
            <div key={invite.id} className="invite-card">
              <h2 className="invite-card-heading">Group Name: {invite.group.name}</h2>
              <h2 className="invite-card-heading">Invitee: {invite.invitee.username}</h2>
              <h2 className="invite-card-heading">Inviter: {invite.inviter.username}</h2>
              <h2 className="invite-card-heading">Status: {invite.status}</h2>

              {invite.status === 'pending' && (
                <div>
                  <button onClick={() => handleInviteStatusChange(invite, 'accepted')}>
                    Accept
                  </button>
                  <button onClick={() => handleInviteStatusChange(invite, 'rejected')}>
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No invites found for you.</p>
        )}
      </div>
    </div>
  );
}

export default Invites;


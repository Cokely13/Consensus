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

  // Filter only pending invites for the current user
  const pendingUserInvites = invites.filter(
    (invite) => invite.inviteeId === currentUserId && invite.status === 'pending'
  );

  // Handle invite status update
  const handleInviteStatusChange = async (invite, status) => {
    const updatedInvite = { ...invite, status };
    await dispatch(updateSingleInvite(updatedInvite));
    dispatch(fetchInvites()); // Refetch invites after the status update
  };

  // return (
  //   <div className="page-container">
  //     <h1 className="page-heading"><u><b>Invites</b></u></h1>
  //     <div className="card-container">
  //       {pendingUserInvites.length > 0 ? (
  //         pendingUserInvites.map((invite) => (
  //           <div key={invite.id} className="card">
  //             <h2 className="card-heading">Group Name: {invite.group.name}</h2>
  //             {/* <h2 className="card-heading">Invitee: {invite.invitee.username}</h2> */}
  //             <h2 className="card-heading">Inviter: {invite.inviter.username}</h2>
  //             <h2 className="card-heading">Status: {invite.status}</h2>

  //             <div>
  //               <button onClick={() => handleInviteStatusChange(invite, 'accepted')}>
  //                 Accept
  //               </button>
  //               <button onClick={() => handleInviteStatusChange(invite, 'rejected')}>
  //                 Reject
  //               </button>
  //             </div>
  //           </div>
  //         ))
  //       ) : (
  //         <p>No pending invites found for you.</p>
  //       )}
  //     </div>
  //   </div>
  // );

  return (
    <div className="page-container">
      <h1 className="page-heading">
        <u><b>Invites</b></u>
      </h1>
      <div className="invitesGrid">
        {/* Header Row */}
        <div className="invitesGrid-header">Group Name</div>
        <div className="invitesGrid-header">Inviter</div>
        <div className="invitesGrid-header">Status</div>
        <div className="invitesGrid-header">Accept</div>
        <div className="invitesGrid-header">Decline</div>

        {/* Data Rows */}
        {pendingUserInvites.length > 0 ? (
          pendingUserInvites.map((invite) => (
            <React.Fragment key={invite.id}>
              <div className="invitesGrid-cell">{invite.group.name}</div>
              <div className="invitesGrid-cell">{invite.inviter.username}</div>
              <div className="invitesGrid-cell">{invite.status}</div>
              <div className="invitesGrid-cell">
                <button onClick={() => handleInviteStatusChange(invite, 'accepted')}>
                  Accept
                </button>
              </div>
              <div className="invitesGrid-cell">
                <button onClick={() => handleInviteStatusChange(invite, 'rejected')}>
                  Decline
                </button>
              </div>
            </React.Fragment>
          ))
        ) : (
          <div className="invitesGrid-cell no-invites" colSpan="5">
            No pending invites found for you.
          </div>
        )}
      </div>
    </div>
  );
}

export default Invites;

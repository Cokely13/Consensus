import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { fetchInvites } from '../store/allInvitesStore';
import { Link } from 'react-router-dom';

function Invites() {
  const dispatch = useDispatch();
  const invites = useSelector((state) => state.allInvites);
  const { id: currentUserId } = useSelector((state) => state.auth); // Get current user's ID from auth state

  useEffect(() => {
    dispatch(fetchInvites());
  }, [dispatch]);

  console.log("invites", invites)

  const userInvites = invites.filter((invite) => invite.inviteeId === currentUserId);

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

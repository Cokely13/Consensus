import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { fetchGroups } from '../store/allGroupsStore';
import { fetchInvites } from '../store/allInvitesStore';
import { Link } from 'react-router-dom';

function MyGroups() {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.allGroups);
  const invites = useSelector((state) => state.allInvites);
  const { id: currentUserId } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchInvites());
  }, [dispatch]);

  // Filter groups to show only those where the current user is a member
  const filteredGroups = groups.filter(
    (group) =>
      group.group_members && group.group_members.some((member) => member.userId === currentUserId)
  );

  return (
    <div className="page-container">
      <h1 className="page-heading">
        <u>
          <b>My Groups</b>
        </u>
      </h1>
      <div className="card-container">
        {filteredGroups.map((group) => {
          // Check if there is a pending invite for the user to this group
          const hasPendingInvite = invites.some(
            (invite) =>
              invite.groupId === group.id &&
              invite.inviteeId === currentUserId &&
              invite.status === 'pending'
          );

          return (
            <div key={group.id} className="card">
              <Link to={`/groups/${group.id}`} className="card-link">
                <h2 className="card-heading">
                  {group.name} - # of Members {group.group_members ? group.group_members.length : 0}
                  <span> (Member)</span>
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

export default MyGroups;

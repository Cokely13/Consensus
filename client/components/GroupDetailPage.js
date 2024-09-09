import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGroups } from '../store/allGroupsStore';
import { fetchUsers } from '../store/allUsersStore';
import { fetchInvites, createInvite } from '../store/allInvitesStore'; // Fetch and create invites
import { updateSingleInvite } from '../store/singleInviteStore';

function GroupDetailPage() {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const groups = useSelector((state) => state.allGroups);
  const users = useSelector((state) => state.allUsers);
  const invites = useSelector((state) => state.allInvites);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [showMembers, setShowMembers] = useState(false);
  const { id: currentUserId } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchUsers());
    dispatch(fetchInvites()); // Fetch invites on component mount
  }, [dispatch, groupId]);

  useEffect(() => {
    if (groups.length > 0) {
      const foundGroup = groups.find((group) => group.id === Number(groupId));
      setSelectedGroup(foundGroup);
    }
  }, [groups, groupId]);

  const handleInvite = () => {
    if (selectedUserId) {
      dispatch(createInvite({ groupId, inviteeId: selectedUserId, inviterId: currentUserId }));
      setSelectedUserId('');
    }
  };

  const handleToggleMembers = () => {
    setShowMembers(!showMembers);
  };

  const handleAcceptInvite = (invite) => {
    dispatch(updateSingleInvite({ ...invite, status: 'accepted' }));
  };

  const handleRejectInvite = (invite) => {
    dispatch(updateSingleInvite({ ...invite, status: 'rejected' }));
  };

  // Find group leader's name
  const leader = selectedGroup ? users.find(user => user.id === selectedGroup.leaderId) : null;

  // Get IDs of users already in the group
  const membersIds = selectedGroup ? selectedGroup.group_members.map(member => member.userId) : [];

  // Check if the user has a pending invite for this group
  const pendingInvite = invites.find(
    (invite) =>
      invite.groupId === Number(groupId) &&
      invite.inviteeId === currentUserId &&
      invite.status === 'pending'
  );

  // Filter pending invites sent by the current user (leader) for this group
  const pendingInvitesFromLeader = invites.filter(
    (invite) =>
      invite.groupId === Number(groupId) &&
      invite.inviterId === currentUserId &&
      invite.status === 'pending'
  );

  return (
    <div>
      {selectedGroup ? (
        <>
          <h2>{selectedGroup.name}'s Profile</h2>
          {leader && <h3>Leader: {leader.username}</h3>}
          <h3>
            Group Members: <span onClick={handleToggleMembers} style={{ cursor: 'pointer', color: 'blue' }}>
              {selectedGroup.group_members.length}
            </span>
          </h3>
          {showMembers && (
            <ul>
              {selectedGroup.group_members.map((member) => (
                <li key={`${member.userId}-${member.groupId}`}>
                  {member.user ? member.user.username : member.userId}
                </li>
              ))}
            </ul>
          )}

          {currentUserId === selectedGroup.leaderId && (
            <>
              <h3>Invite Users to Group:</h3>
              <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
                <option value="">Select a user to invite</option>
                {users
                  .filter(
                    (user) =>
                      !membersIds.includes(user.id) &&
                      !pendingInvitesFromLeader.some((invite) => invite.inviteeId === user.id)
                  )
                  .map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
              </select>
              <button onClick={handleInvite}>Invite</button>

              {/* Pending invites section for the leader */}
              {pendingInvitesFromLeader.length > 0 && (
                <div className="pending-invites">
                  <h3>Pending Invites:</h3>
                  <ul>
                    {pendingInvitesFromLeader.map((invite) => (
                      <li key={invite.id}>
                        {invite.invitee ? invite.invitee.username : "Invite"} - Pending
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {pendingInvite && (
            <div className="invite-actions">
              <h3>Pending Invite:</h3>
              <p>You have a pending invite to this group.</p>
              <button onClick={() => handleAcceptInvite(pendingInvite)}>Accept</button>
              <button onClick={() => handleRejectInvite(pendingInvite)}>Reject</button>
            </div>
          )}
        </>
      ) : (
        <p>Loading group data...</p>
      )}
    </div>
  );
}

export default GroupDetailPage;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchGroups } from '../store/allGroupsStore';
import { fetchUsers } from '../store/allUsersStore';
import { fetchInvites, createInvite } from '../store/allInvitesStore';
import { fetchQuestions } from '../store/allQuestionsStore';
import { fetchMessages, createMessage, deleteMessage } from '../store/allMessagesStore';
import { updateSingleInvite } from '../store/singleInviteStore';
import PieChart from './PieChart'; // Import PieChart component

function GroupDetailPage() {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const groups = useSelector((state) => state.allGroups);
  const users = useSelector((state) => state.allUsers);
  const invites = useSelector((state) => state.allInvites);
  const questions = useSelector((state) => state.allQuestions);
  const messages = useSelector((state) => state.allMessages);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [showMembers, setShowMembers] = useState(false);
  const [showMessageBoard, setShowMessageBoard] = useState(false);
  const [selectedQuestionDate, setSelectedQuestionDate] = useState('');
  const [consensusData, setConsensusData] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const { id: currentUserId } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchUsers());
    dispatch(fetchInvites());
    dispatch(fetchQuestions());
    dispatch(fetchMessages(groupId));
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

  const handleToggleMessageBoard = () => {
    setShowMessageBoard(!showMessageBoard);
  };

  const handleAcceptInvite = async (invite) => {
    await dispatch(updateSingleInvite({ ...invite, status: 'accepted' }));
    refreshData(); // Refresh data after accepting the invite
  };

  const handleRejectInvite = async (invite) => {
    await dispatch(updateSingleInvite({ ...invite, status: 'rejected' }));
    refreshData(); // Refresh data after rejecting the invite
  };

  const refreshData = () => {
    dispatch(fetchInvites());
    dispatch(fetchGroups());
  };

  const handleQuestionDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedQuestionDate(selectedDate);

    if (selectedGroup) {
      const selectedConsensus = questions.find(
        (question) => question.dateAsked === selectedDate && question.consensus.length > 0
      );

      if (selectedConsensus) {
        const groupMembersIds = selectedGroup.group_members.map((member) => member.userId);
        const text = selectedConsensus.text;
        const optionA = selectedConsensus.optionA;
        const optionB = selectedConsensus.optionB;

        const votesA = selectedConsensus.user_responses.filter(
          (response) =>
            groupMembersIds.includes(response.userId) && response.response === 'option_a'
        ).length;

        const votesB = selectedConsensus.user_responses.filter(
          (response) =>
            groupMembersIds.includes(response.userId) && response.response === 'option_b'
        ).length;

        const totalMembers = selectedGroup.group_members.length;
        const noVotes = totalMembers - votesA - votesB;

        const percentageA = ((votesA / totalMembers) * 100).toFixed(2);
        const percentageB = ((votesB / totalMembers) * 100).toFixed(2);
        const percentageNoVote = ((noVotes / totalMembers) * 100).toFixed(2);

        setConsensusData({ percentageA, percentageB, percentageNoVote, text, optionA, optionB });
      } else {
        setConsensusData(null);
      }
    }
  };

  const handlePostMessage = () => {
    if (newMessage.trim()) {
      dispatch(createMessage({ content: newMessage, userId: currentUserId, groupId }));
      setNewMessage('');
    }
  };

  const handleDeleteMessage = (id) => {
    dispatch(deleteMessage(id));
  };

  const leader = selectedGroup ? users.find((user) => user.id === selectedGroup.leaderId) : null;
  const membersIds = selectedGroup ? selectedGroup.group_members.map((member) => member.userId) : [];
  const pendingInvite = invites.find(
    (invite) =>
      invite.groupId === Number(groupId) &&
      invite.inviteeId === currentUserId &&
      invite.status === 'pending'
  );

  const pendingInvitesFromLeader = invites.filter(
    (invite) =>
      invite.groupId === Number(groupId) &&
      invite.inviterId === currentUserId &&
      invite.status === 'pending'
  );

  const questionsWithConsensuses = questions.filter(
    (question) => question.consensus && question.consensus.length > 0
  );
  const isMember =
    selectedGroup &&
    selectedGroup.group_members.some((member) => member.userId === currentUserId);

  return (
    <div className="group-detail-page-container">
      {selectedGroup ? (
        <>
          <h2 className="group-detail-heading">{selectedGroup.name}'s Group</h2>
          {selectedGroup.image && (
            <div className="group-image-container">
              <img
                src={selectedGroup.image}
                alt={`${selectedGroup.name} Group`}
                className="group-image"
              />
            </div>
          )}
          {leader && (
            <h3>
              Leader: <Link to={`/users/${leader.id}`}> {leader.username}</Link>
            </h3>
          )}
          {currentUserId === selectedGroup.leaderId && (
                <td>

<Link to={`/edit-group/${selectedGroup.id}`}>
        <button className="edit-button">Edit Group</button>
        </Link>

                </td>
              )}
          <h3 className="group-detail-members-title">
            Group Members:{' '}
            <span onClick={handleToggleMembers} className="toggle-members-link">
              {selectedGroup.group_members.length}
            </span>
          </h3>
          {showMembers && (
            <ul className="group-members-list">
              {selectedGroup.group_members.map((member) => (
                <li key={`${member.userId}-${member.groupId}`}>
                  {member.user ? (
                    <Link to={`/users/${member.userId}`}>
                      <h2 className="group-member-name">{member.user.username}</h2>
                    </Link>
                  ) : (
                    member.userId
                  )}
                </li>
              ))}
            </ul>
          )}

          {currentUserId === selectedGroup.leaderId && (
            <>
              <h3 className="group-invite-title">Invite Users to Group:</h3>
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="group-invite-select"
              >
                <option value="">Select a user to invite</option>
                {users
                  .filter(
                    (user) =>
                      !membersIds.includes(user.id) &&
                      !pendingInvitesFromLeader.some((invite) => invite.inviteeId === user.id)
                  )
                  .map((user) => (
                    <option  key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
              </select>
              <button onClick={handleInvite} className="group-invite-button">
                Invite
              </button>

              {pendingInvitesFromLeader.length > 0 && (
                <div className="pending-invites-container">
                  <h3>Pending Invites:</h3>
                  <ul className="pending-invites-list">
                    {pendingInvitesFromLeader.map((invite) => (
                      <li key={invite.id}>
                        {invite.invitee ? invite.invitee.username : 'Invite'} - Pending
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {pendingInvite && (
            <div className="invite-actions-container">
              <h3 className="invite-actions-title">Pending Invite:</h3>
              <p>You have a pending invite to this group.</p>
              <button onClick={() => handleAcceptInvite(pendingInvite)} className="invite-button">
                Accept
              </button>
              <button onClick={() => handleRejectInvite(pendingInvite)} className="invite-button">
                Reject
              </button>
            </div>
          )}

          {isMember && (
            <>
              <h3 className="group-detail-question-title">Question of the Day:</h3>
              <select
                value={selectedQuestionDate}
                onChange={handleQuestionDateChange}
                className="question-date-select"
              >
                <option value="">Select a date</option>
                {questionsWithConsensuses.map((question) => (
                  <option key={question.dateAsked} value={question.dateAsked}>
                    {question.dateAsked}
                  </option>
                ))}
              </select>
              {consensusData && (
                <div className="consensus-data-container">
                  <p>Asked Question: {consensusData.text}</p>
                  <p>Option A: {consensusData.optionA}: {consensusData.percentageA}%</p>
                  <p>Option B: {consensusData.optionB}: {consensusData.percentageB}%</p>
                  <p>No Vote: {consensusData.percentageNoVote}%</p>
                  {/* Render PieChart */}
                  <div style={{ width: '300px', margin: '0 auto' }}>
                    <PieChart
                      data={{
                        percentageA: parseFloat(consensusData.percentageA),
                        percentageB: parseFloat(consensusData.percentageB),
                        percentageNoVote: parseFloat(consensusData.percentageNoVote),
                      }}
                      questionText={`Question of the Day: ${consensusData.text}`}
                      optionALabel={consensusData.optionA}
                      optionBLabel={consensusData.optionB}
                    />
                  </div>
                </div>
              )}
              <div>
                {/* Message Board Toggle Button */}
                <button onClick={handleToggleMessageBoard} className="message-board-toggle-button">
                  {showMessageBoard ? 'Hide Message Board' : 'Show Message Board'}
                </button>
              </div>
              {/* Conditional Rendering of Message Board */}
              {showMessageBoard && (
                <div className="message-board-container">
                  <h3>Message Board</h3>
                  {messages.map((message) => (
                    <div key={message.id} className="message-item">
                      <p>
                        <strong>{message.user ? message.user.username : 'New Post'}:</strong>{' '}
                        {message.content}
                      </p>
                      {message.userId === currentUserId && (
                        <button
                          onClick={() => handleDeleteMessage(message.id)}
                          className="message-delete-button"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  ))}
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                    className="message-textarea"
                  />
                  <button onClick={handlePostMessage} className="message-post-button">
                    Post Message
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <p className="loading-message">Loading group data...</p>
      )}
    </div>
  );
}

export default GroupDetailPage;

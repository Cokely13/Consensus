// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { fetchGroups } from '../store/allGroupsStore';
// import { fetchUsers } from '../store/allUsersStore';
// import { fetchInvites, createInvite } from '../store/allInvitesStore';
// import { fetchQuestions } from '../store/allQuestionsStore'; // Import to fetch questions
// import { updateSingleInvite } from '../store/singleInviteStore';

// function GroupDetailPage() {
//   const dispatch = useDispatch();
//   const { groupId } = useParams();
//   const groups = useSelector((state) => state.allGroups);
//   const users = useSelector((state) => state.allUsers);
//   const invites = useSelector((state) => state.allInvites);
//   const questions = useSelector((state) => state.allQuestions); // Fetch all questions from the store
//   const [selectedGroup, setSelectedGroup] = useState(null);
//   const [selectedUserId, setSelectedUserId] = useState('');
//   const [showMembers, setShowMembers] = useState(false);
//   const [selectedQuestionDate, setSelectedQuestionDate] = useState('');
//   const [consensusData, setConsensusData] = useState(null);
//   const { id: currentUserId } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(fetchGroups());
//     dispatch(fetchUsers());
//     dispatch(fetchInvites());
//     dispatch(fetchQuestions()); // Fetch all questions on component mount
//   }, [dispatch, groupId]);

//   useEffect(() => {
//     if (groups.length > 0) {
//       const foundGroup = groups.find((group) => group.id === Number(groupId));
//       setSelectedGroup(foundGroup);
//     }
//   }, [groups, groupId]);

//   const handleInvite = () => {
//     if (selectedUserId) {
//       dispatch(createInvite({ groupId, inviteeId: selectedUserId, inviterId: currentUserId }));
//       setSelectedUserId('');
//     }
//   };

//   const handleToggleMembers = () => {
//     setShowMembers(!showMembers);
//   };

//   const handleAcceptInvite = (invite) => {
//     dispatch(updateSingleInvite({ ...invite, status: 'accepted' }));
//   };

//   const handleRejectInvite = (invite) => {
//     dispatch(updateSingleInvite({ ...invite, status: 'rejected' }));
//   };

//   // const handleQuestionDateChange = (event) => {
//   //   const selectedDate = event.target.value;
//   //   setSelectedQuestionDate(selectedDate);

//   //   // Fetch consensus data for the selected date
//   //   if (selectedGroup) {
//   //     const selectedConsensus = questions.find(
//   //       (question) => question.dateAsked === selectedDate && question.consensus.length > 0
//   //     );

//   //     if (selectedConsensus) {
//   //       const totalMembers = selectedGroup.group_members.length;
//   //       const votesA = selectedGroup.group_members.filter(
//   //         (member) =>
//   //           member.user_responses.some(
//   //             (response) =>
//   //               response.questionId === selectedConsensus.id && response.response === 'option_a'
//   //           )
//   //       ).length;
//   //       const votesB = selectedGroup.group_members.filter(
//   //         (member) =>
//   //           member.user_responses.some(
//   //             (response) =>
//   //               response.questionId === selectedConsensus.id && response.response === 'option_b'
//   //           )
//   //       ).length;
//   //       const noVotes = totalMembers - votesA - votesB;

//   //       const percentageA = ((votesA / totalMembers) * 100).toFixed(2);
//   //       const percentageB = ((votesB / totalMembers) * 100).toFixed(2);
//   //       const percentageNoVote = ((noVotes / totalMembers) * 100).toFixed(2);

//   //       setConsensusData({ percentageA, percentageB, percentageNoVote });
//   //     } else {
//   //       setConsensusData(null);
//   //     }
//   //   }
//   // };

//   const handleQuestionDateChange = (event) => {
//     const selectedDate = event.target.value;
//     setSelectedQuestionDate(selectedDate);

//     // Fetch consensus data for the selected date
//     if (selectedGroup) {
//       const selectedConsensus = questions.find(
//         (question) => question.dateAsked === selectedDate && question.consensus.length > 0
//       );

//       if (selectedConsensus) {
//         const totalMembers = selectedGroup.group_members.length;

//         const votesA = selectedGroup.group_members.filter(
//           (member) =>
//             member.user_responses?.some(
//               (response) =>
//                 response.questionId === selectedConsensus.id && response.response === 'option_a'
//             )
//         ).length;

//         const votesB = selectedGroup.group_members.filter(
//           (member) =>
//             member.user_responses?.some(
//               (response) =>
//                 response.questionId === selectedConsensus.id && response.response === 'option_b'
//             )
//         ).length;

//         const noVotes = totalMembers - votesA - votesB;

//         const percentageA = ((votesA / totalMembers) * 100).toFixed(2);
//         const percentageB = ((votesB / totalMembers) * 100).toFixed(2);
//         const percentageNoVote = ((noVotes / totalMembers) * 100).toFixed(2);

//         setConsensusData({ percentageA, percentageB, percentageNoVote });
//       } else {
//         setConsensusData(null);
//       }
//     }
//   };

//   const leader = selectedGroup ? users.find(user => user.id === selectedGroup.leaderId) : null;
//   const membersIds = selectedGroup ? selectedGroup.group_members.map(member => member.userId) : [];
//   const pendingInvite = invites.find(
//     (invite) =>
//       invite.groupId === Number(groupId) &&
//       invite.inviteeId === currentUserId &&
//       invite.status === 'pending'
//   );

//   const pendingInvitesFromLeader = invites.filter(
//     (invite) =>
//       invite.groupId === Number(groupId) &&
//       invite.inviterId === currentUserId &&
//       invite.status === 'pending'
//   );

//   // Filter questions that have consensuses
//   const questionsWithConsensuses = questions.filter(question => question.consensus && question.consensus.length > 0);

//   // Check if the current user is a member of the group
//   const isMember = selectedGroup && selectedGroup.group_members.some((member) => member.userId === currentUserId);

//   console.log("questions", questionsWithConsensuses)

//   return (
//     <div>
//       {selectedGroup ? (
//         <>
//           <h2>{selectedGroup.name}'s Profile</h2>
//           {leader && <h3>Leader: {leader.username}</h3>}
//           <h3>
//             Group Members: <span onClick={handleToggleMembers} style={{ cursor: 'pointer', color: 'blue' }}>
//               {selectedGroup.group_members.length}
//             </span>
//           </h3>
//           {showMembers && (
//             <ul>
//               {selectedGroup.group_members.map((member) => (
//                 <li key={`${member.userId}-${member.groupId}`}>
//                   {member.user ? member.user.username : member.userId}
//                 </li>
//               ))}
//             </ul>
//           )}

//           {currentUserId === selectedGroup.leaderId && (
//             <>
//               <h3>Invite Users to Group:</h3>
//               <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
//                 <option value="">Select a user to invite</option>
//                 {users
//                   .filter(
//                     (user) =>
//                       !membersIds.includes(user.id) &&
//                       !pendingInvitesFromLeader.some((invite) => invite.inviteeId === user.id)
//                   )
//                   .map((user) => (
//                     <option key={user.id} value={user.id}>
//                       {user.username}
//                     </option>
//                   ))}
//               </select>
//               <button onClick={handleInvite}>Invite</button>

//               {pendingInvitesFromLeader.length > 0 && (
//                 <div className="pending-invites">
//                   <h3>Pending Invites:</h3>
//                   <ul>
//                     {pendingInvitesFromLeader.map((invite) => (
//                       <li key={invite.id}>
//                         {invite.invitee ? invite.invitee.username : "Invite"} - Pending
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </>
//           )}

//           {pendingInvite && (
//             <div className="invite-actions">
//               <h3>Pending Invite:</h3>
//               <p>You have a pending invite to this group.</p>
//               <button onClick={() => handleAcceptInvite(pendingInvite)}>Accept</button>
//               <button onClick={() => handleRejectInvite(pendingInvite)}>Reject</button>
//             </div>
//           )}

//           {/* Show "Question of the Day Consensuses" only if the user is a member */}
//           {isMember && (
//             <>
//               <h3>Question of the Day Consensuses:</h3>
//               <select value={selectedQuestionDate} onChange={handleQuestionDateChange}>
//                 <option value="">Select a date</option>
//                 {questionsWithConsensuses.map((question) => (
//                   <option key={question.dateAsked} value={question.dateAsked}>
//                     {question.dateAsked}
//                   </option>
//                 ))}
//               </select>
//               {consensusData && (
//                 <div>
//                   <p>Option A: {consensusData.percentageA}%</p>
//                   <p>Option B: {consensusData.percentageB}%</p>
//                   <p>No Vote: {consensusData.percentageNoVote}%</p>
//                 </div>
//               )}
//             </>
//           )}
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
import { fetchUsers } from '../store/allUsersStore';
import { fetchInvites, createInvite } from '../store/allInvitesStore';
import { fetchQuestions } from '../store/allQuestionsStore';
import { updateSingleInvite } from '../store/singleInviteStore';

function GroupDetailPage() {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const groups = useSelector((state) => state.allGroups);
  const users = useSelector((state) => state.allUsers);
  const invites = useSelector((state) => state.allInvites);
  const questions = useSelector((state) => state.allQuestions);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [showMembers, setShowMembers] = useState(false);
  const [selectedQuestionDate, setSelectedQuestionDate] = useState('');
  const [consensusData, setConsensusData] = useState(null);
  const { id: currentUserId } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchUsers());
    dispatch(fetchInvites());
    dispatch(fetchQuestions());
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

  const handleQuestionDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedQuestionDate(selectedDate);

    if (selectedGroup) {
      const selectedConsensus = questions.find(
        (question) => question.dateAsked === selectedDate && question.consensus.length > 0
      );

      if (selectedConsensus) {
        const groupMembersIds = selectedGroup.group_members.map(member => member.userId);

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

        setConsensusData({ percentageA, percentageB, percentageNoVote });
      } else {
        setConsensusData(null);
      }
    }
  };

  const leader = selectedGroup ? users.find(user => user.id === selectedGroup.leaderId) : null;
  const membersIds = selectedGroup ? selectedGroup.group_members.map(member => member.userId) : [];
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

  const questionsWithConsensuses = questions.filter(question => question.consensus && question.consensus.length > 0);
  const isMember = selectedGroup && selectedGroup.group_members.some((member) => member.userId === currentUserId);

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

          {isMember && (
            <>
              <h3>Question of the Day Consensuses:</h3>
              <select value={selectedQuestionDate} onChange={handleQuestionDateChange}>
                <option value="">Select a date</option>
                {questionsWithConsensuses.map((question) => (
                  <option key={question.dateAsked} value={question.dateAsked}>
                    {question.dateAsked}
                  </option>
                ))}
              </select>
              {consensusData && (
                <div>
                  <p>Option A: {consensusData.percentageA}%</p>
                  <p>Option B: {consensusData.percentageB}%</p>
                  <p>No Vote: {consensusData.percentageNoVote}%</p>
                </div>
              )}
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

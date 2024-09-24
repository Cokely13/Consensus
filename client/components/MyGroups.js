// import { useDispatch, useSelector } from 'react-redux';
// import React, { useEffect } from 'react';
// import { fetchGroups } from '../store/allGroupsStore';
// import { Link } from 'react-router-dom';

// function MyGroups() {
//   const dispatch = useDispatch();
//   const groups = useSelector((state) => state.allGroups);
//   const { id: currentUserId } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(fetchGroups());
//   }, [dispatch]);

//   // Filter groups to show only those where the current user is a member
//   const filteredGroups = groups.filter(
//     (group) =>
//       group.group_members && group.group_members.some((member) => member.userId === currentUserId)
//   );

//   return (
//     <div className="mygroup-container">
//       <h1 className="mygroup-heading">
//         <u><b>My Groups</b></u>
//       </h1>
//       <div className="mygroup-list-container">
//         {filteredGroups.map((group) => {

//           return (
//             <div key={group.id} className="mygroup-item">
//               <Link to={`/groups/${group.id}`} className="mygroup-link">
//                 {/* Group Image */}
//                 {group.image && (
//                   <img
//                     src={group.image}
//                     alt={`${group.name} Group`}
//                     className="mygroup-image-thumbnail"
//                   />
//                 )}
//                 {/* Group Name and Number of Members */}
//                 <div className="mygroup-info">
//                   <h2 className="mygroup-name">{group.name} ({group.group_members ? group.group_members.length : 0}) </h2>
//                 </div>
//               </Link>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default MyGroups;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups } from '../store/allGroupsStore';
import { Link } from 'react-router-dom';

function MyGroups() {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.allGroups);
  const { id: currentUserId } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  // Filter groups to show only those where the current user is a member
  const filteredGroups = groups.filter(
    (group) =>
      group.group_members && group.group_members.some((member) => member.userId === currentUserId)
  );

  return (
    <div className="my-groups-page-container">
      <h1 className="my-groups-page-heading">
        <u>
          <b>My Groups</b>
        </u>
      </h1>
      <div className="my-groups-card-container">
        {filteredGroups.map((group) => (
          <div key={group.id} className="my-groups-card">
            <Link to={`/groups/${group.id}`} className="my-groups-card-link">
              <div className="my-groups-card-image-container">
                {group.image ? (
                  <img
                    src={group.image}
                    alt={`${group.name} Group`}
                    className="my-groups-card-image"
                  />
                ) : (
                  <div className="my-groups-card-placeholder">
                    <i className="fas fa-users"></i>
                  </div>
                )}
              </div>
              <h2 className="my-groups-card-heading">{group.name}</h2>
              <p className="my-groups-card-members">
                Members: {group.group_members ? group.group_members.length : 0}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyGroups;

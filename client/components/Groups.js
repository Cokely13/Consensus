import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { fetchGroups } from '../store/allGroupsStore';
import { Link } from 'react-router-dom';

function Groups() {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.allGroups);
  const { id: currentGroupId } = useSelector((state) => state.auth); // Get current group's ID from auth state

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  // Filter out the current group from the list
  const filteredGroups = groups.filter((group) => group.id !== currentGroupId);

  return (
    <div className="group-page-container">
      <h1 className="group-page-heading"><u><b>Groups</b></u></h1>
      <div className="group-card-container">
        {filteredGroups.map((group) => (
          <div key={group.id} className="group-card">
            {/* Uncomment if group image is needed */}
            {/* {group.image && (
              <div>
                <div className="group-image-container" style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  margin: 'auto',
                  backgroundImage: `url('${group.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  border: '3px solid black'
                }}> </div>
              </div>
            )} */}
            <Link to={`/groups/${group.id}`} className="group-link">
              <h2 className="group-card-heading">{group.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Groups;

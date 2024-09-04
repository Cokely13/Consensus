import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUser } from '../store/singleUserStore';
import { Link } from 'react-router-dom';

function UserDetailPage() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector(state => state.singleUser);


  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, [dispatch, userId]);



  return (
    <div>
      Hey
      </div>
  );
}

export default UserDetailPage;

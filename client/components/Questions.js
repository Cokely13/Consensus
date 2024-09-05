import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '../store/allQuestionsStore';
import { Link } from 'react-router-dom';



function Questions() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.allQuestions);


  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);


  return (
    <div>
    <div>Questions</div>
    <div>
        {questions.map((question) => (
          <div key={question.id}>
            <div>{question.text}</div>
            <div>{question.optionA}</div>
            <div>{question.optionB}</div>
            <div>{question.dateAsked}</div>
            <div>{question.status}</div>
            </div>))}
    </div>
    </div>
  )
}

export default Questions


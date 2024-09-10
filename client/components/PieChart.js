import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, questionText, optionALabel, optionBLabel }) => {
  const chartData = {
    labels: [optionALabel, optionBLabel, 'No Vote'],
    datasets: [
      {
        data: [data.percentageA, data.percentageB, data.percentageNoVote],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };

  return (
    <div>
      <h3>{questionText}</h3> {/* Dynamic title using the question text */}
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;

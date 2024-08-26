// src/components/CloudAccountRiskAssessmentWidget.js
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Label } from 'recharts';
import { Row, Col } from 'react-bootstrap';

const CloudAccountRiskAssessmentWidget = ({ data }) => {
  const pieData = [
    { name: 'Failed', value: data.failed },
    { name: 'Warning', value: data.warning },
    { name: 'Not Available', value: data.notAvailable },
    { name: 'Passed', value: data.passed },
  ];

  const COLORS = ['#AF0505', '#FFBB28', '#808080', '#2F9426']; // Red, Yellow, Gray, Green

  // Calculate the total
  const total = pieData.reduce((acc, entry) => acc + entry.value, 0);

  return (
    <div className="widget-container">
      <h6>Cloud Account Risk Assessment</h6>
      <Row>
        <Col md={6}>
          <PieChart width={200} height={200}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              startAngle={90}
              endAngle={450}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
              {/* Label for displaying the total inside the pie */}
              <Label
                value={`Total: ${total}`}
                position="center"
                fill="#000"
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              />
            </Pie>
            <Tooltip />
          </PieChart>
        </Col>
        <Col md={6} className="d-flex align-items-center " >
          <ul className="list-unstyled" >
            {pieData.map((entry, index) => (
              <li key={index} className="mb-2">
                <span
                  className="d-inline-block"
                  style={{
                    width: '15px',
                    height: '15px',
                    backgroundColor: COLORS[index],
                    marginRight: '10px',
                  }}
                ></span>
                {entry.name} ({entry.value})
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default CloudAccountRiskAssessmentWidget;

import React from 'react'
import { Card, Table, Tag, Progress } from 'antd'

const CandidateDetail = ({ candidate }) => {
  const scoreColumns = [
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
      width: '40%',
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
      key: 'answer',
      width: '30%',
      render: (answer) => (
        <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
          {answer}
        </div>
      ),
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      render: (score, record) => (
        <Tag color={score >= record.maxScore * 0.8 ? 'green' : score >= record.maxScore * 0.6 ? 'orange' : 'red'}>
          {score}/{record.maxScore}
        </Tag>
      ),
    },
    {
      title: 'Feedback',
      dataIndex: 'feedback',
      key: 'feedback',
    },
  ]

  return (
    <div>
      <Card title="Candidate Information" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div><strong>Name:</strong> {candidate.name}</div>
          <div><strong>Email:</strong> {candidate.email}</div>
          <div><strong>Phone:</strong> {candidate.phone}</div>
          <div><strong>Final Score:</strong> {candidate.finalScore}/100</div>
        </div>
        <Progress percent={candidate.finalScore} strokeColor="#667eea" style={{ marginTop: '10px' }} />
      </Card>

      <Card title="AI Summary" style={{ marginBottom: '20px' }}>
        <p>{candidate.aiSummary}</p>
      </Card>

      <Card title="Interview Questions & Scores">
        <Table
          columns={scoreColumns}
          dataSource={candidate.scores.map((score, index) => ({ ...score, key: index }))}
          pagination={false}
          scroll={{ y: 300 }}
        />
      </Card>

      <Card title="Chat History" style={{ marginTop: '20px' }}>
        <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '10px' }}>
          {candidate.chatHistory?.map((message, index) => (
            <div
              key={index}
              style={{
                margin: '10px 0',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: message.type === 'bot' ? '#f0f2f5' : '#667eea',
                color: message.type === 'bot' ? '#333' : 'white',
                marginLeft: message.type === 'user' ? '50px' : '0',
                marginRight: message.type === 'bot' ? '50px' : '0',
              }}
            >
              {message.content}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default CandidateDetail
import React from "react";
import { useSelector } from "react-redux";
import { Card, List } from "antd";

const Dashboard = () => {
  const candidates = useSelector((state) => state.candidates.list);

  return (
    <Card title="Candidates Dashboard" style={{ maxWidth: 600, width: "100%", margin: "20px 0" }}>
      {candidates.length === 0 ? (
        <p>No candidates uploaded yet.</p>
      ) : (
        <List
          dataSource={candidates}
          renderItem={(c) => (
            <List.Item>
              <strong>{c.name}</strong> — {c.email} — {c.phone}
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default Dashboard;

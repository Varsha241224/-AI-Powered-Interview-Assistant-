import React, { useState, useEffect } from "react";
import { Layout, Typography, Card, Input, Button, message } from "antd";
import ResumeUploader from "./components/ResumeUploader";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const QUESTIONS = [
  "Explain one feature of your uploaded project.",
  "Which technology stack did you use?",
  "What challenges did you face and how did you solve them?",
  "What is the difference between HTTP and HTTPS?",
  "Explain a database you worked with and its advantage.",
  "What is a REST API?",
  "Explain the concept of state in React."
];

function App() {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(15);

  // Countdown timer
  useEffect(() => {
    if (!resumeUploaded) return;
    if (currentIndex >= QUESTIONS.length) return;

    if (timeLeft === 0) {
      handleNextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, resumeUploaded, currentIndex]);

  const handleAnswerChange = (value) => {
    setAnswers({ ...answers, [currentIndex]: value });
  };

  const handleNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
    setTimeLeft(15);
  };

  const handleSubmitAnswers = () => {
    console.log("User Answers:", answers);
    message.success("Thanks! Your answers have been submitted ✅");
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Header style={{ backgroundColor: "#1890ff", textAlign: "center" }}>
        <Title level={2} style={{ color: "white", margin: 0 }}>
          Swipe Interview 🚀
        </Title>
      </Header>

      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 20px"
        }}
      >
        {!resumeUploaded && (
          <ResumeUploader onUploadSuccess={() => setResumeUploaded(true)} />
        )}

        {resumeUploaded && currentIndex < QUESTIONS.length && (
          <Card
            title={`Question ${currentIndex + 1}/${QUESTIONS.length}`}
            style={{ maxWidth: 600, width: "100%", marginTop: 30 }}
          >
            <Text strong>{QUESTIONS[currentIndex]}</Text>
            <Input
              placeholder="Type your answer here..."
              value={answers[currentIndex] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              style={{ marginTop: 10 }}
            />
            <Text style={{ display: "block", marginTop: 10 }}>
              Time left: {timeLeft} sec
            </Text>
            <Button
              type="primary"
              style={{ marginTop: 15 }}
              onClick={handleNextQuestion}
            >
              Next
            </Button>
          </Card>
        )}

        {resumeUploaded && currentIndex >= QUESTIONS.length && (
          <Card
            title="All Questions Completed"
            style={{ maxWidth: 600, width: "100%", marginTop: 30 }}
          >
            <Text>Thank you for answering all the questions!</Text>
            <Button
              type="primary"
              style={{ display: "block", marginTop: 20 }}
              onClick={handleSubmitAnswers}
            >
              Submit Answers
            </Button>
          </Card>
        )}
      </Content>

      <Footer style={{ textAlign: "center", backgroundColor: "#f0f2f5" }}>
        © 2025 Swipe Interview. All rights reserved.
      </Footer>
    </Layout>
  );
}

export default App;

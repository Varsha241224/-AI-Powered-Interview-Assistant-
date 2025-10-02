import React from "react";
import { Upload, Button, Card, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { parseResume } from "../utils/resumeParser";

const ResumeUploader = ({ onUploadSuccess }) => {
  const handleUpload = async (file) => {
    const data = await parseResume(file);

    if (!data) {
      message.error("Failed to parse PDF. Try a different file.");
      return false;
    }

    // ✅ Only show a simple message
    message.success("Resume uploaded successfully!");

    if (onUploadSuccess) onUploadSuccess();
    return false; // prevent auto upload
  };

  return (
    <Card
      title="Upload Your Resume"
      style={{
        maxWidth: 400,
        width: "100%",
        margin: "0 auto",
        textAlign: "center",
        padding: "40px 20px",
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}
    >
      <Upload beforeUpload={handleUpload} showUploadList={false}>
        <Button
          type="primary"
          icon={<UploadOutlined />}
          size="large"
          style={{ width: "100%" }}
        >
          Click to Upload Resume (PDF)
        </Button>
      </Upload>
    </Card>
  );
};

export default ResumeUploader;

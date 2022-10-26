import { useState } from "react";
import AWS from "aws-sdk";
import { Button, Input, Alert } from "reactstrap";
import styled from "styled-components";
import { v1 } from "uuid";

const AddPhoto = (props) => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
  const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;

  const REGION = "us-east-1";
  const S3_BUCKET = "team1-catdog-bucket";

  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setProgress(0);
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      ContentType: file.type,
      Bucket: S3_BUCKET,
      Key: `image/${v1().toString().replace("-", "")}.${
        file.type.split("/")[1]
      }`,
    };

    const response = myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
        setShowAlert(true);
      })
      .send((err) => {
        if (err) console.log(err);
      });

    props.setUrl(response.request.httpRequest.path);
  };

  return (
    <div>
      <PhotoInput>
        <Input type="file" onChange={handleFileInput} />
        {selectedFile ? (
          <Button
            color="primary"
            onClick={(e) => {
              // e.preventDefault();
              uploadFile(selectedFile);
            }}
          >
            업로드
          </Button>
        ) : null}
      </PhotoInput>
      <div>
        {showAlert ? (
          <Alert color="primary">업로드 완료</Alert>
        ) : (
          <Alert color="primary">파일을 선택해주세요</Alert>
        )}
      </div>
    </div>
  );
};

export default AddPhoto;

const PhotoInput = styled.div`
  margin-top: 20px;
  width: 370px;
  /* height: 40px; */
  background-color: #e3e0e1;
  border-radius: 10px;
  justify-content: center;
  padding: 5px;
`;

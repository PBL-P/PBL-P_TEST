import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Title from './Title';

const FormContainer = styled.div`
  padding: 20px;
  max-width: 600px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  width: 150px;
  text-align: right;
  margin-right: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 100px;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.div`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  cursor: default;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const UploadButton = styled.button`
  padding: 8px 15px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #ff6b35;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-end;
`;

const SubmitForm = ({ onSubmit, onCancel, formTitle, fields }) => {
  const [fileNames, setFileNames] = useState({});
  const fileInputRefs = useRef({});

  const handleFileChange = (e, name) => {
    if (e.target.files.length > 0) {
      setFileNames(prev => ({ ...prev, [name]: e.target.files[0].name }));
    }
  };

  const handleUploadClick = (name) => {
    fileInputRefs.current[name].click();
  };

  return (
    <>
      <Title title={formTitle} />
      <FormContainer>
        <StyledForm onSubmit={onSubmit}>
          {fields.map((field, index) => (
            <FormGroup key={index}>
              <Label>{field.label}</Label>
              {field.type === "textarea" ? (
                <TextArea
                  placeholder={field.placeholder}
                  name={field.name}
                  required={field.required}
                />
              ) : field.type === "file" ? (
                <>
                  <FileInput
                    type="file"
                    ref={el => fileInputRefs.current[field.name] = el}
                    onChange={(e) => handleFileChange(e, field.name)}
                    name={field.name}
                    required={field.required}
                  />
                  <FileInputLabel>
                    {fileNames[field.name] || field.placeholder}
                  </FileInputLabel>
                  <UploadButton type="button" onClick={() => handleUploadClick(field.name)}>
                    첨부하기
                  </UploadButton>
                </>
              ) : (
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  name={field.name}
                  required={field.required}
                />
              )}
            </FormGroup>
          ))}
          <SubmitButton type="submit">제출하기</SubmitButton>
            <SubmitButton type="button" onClick={onCancel} style={{  color: "#000000", backgroundColor: "#e0e0e0" }}>
                취소
            </SubmitButton>
        </StyledForm>
      </FormContainer>
    </>
  );
};

export default SubmitForm;
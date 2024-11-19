import styled from "styled-components";
import profileIcon from './data/profileIcon.png';

const TotalBox = styled.div`
  height: 120px;
  width: calc(100% - 270px);
  top: 0; /* Aligns the element to the top of the viewport */
  background-color: #ffffff; /* Background to ensure visibility */
  position: ${({ isFixed }) => (isFixed ? 'fixed' : 'static')}; /* 조건에 따라 position 설정 */
`;

const TitleBox = styled.div`
  width: calc(100% + 270px);
  padding: 24px;
  height: 120px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
`;

const IconImage = styled.img`
  top: 42px;
  position: fixed;
  right: 16px;
  width: 44px;
  height: 34px;
  z-index: 100;
`;

const IconBox = styled.div``;

const Title = ({ kind }) => {
  const isFixed = kind !== "form"; // kind가 "form"이 아니면 fixed 적용

  return (
    <TotalBox isFixed={isFixed}>
      <TitleBox>
        <IconBox>
          <IconImage src={profileIcon} alt="Profile" />
        </IconBox>
      </TitleBox>
    </TotalBox>
  );
};

export default Title;

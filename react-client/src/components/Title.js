import styled from "styled-components";
import profileIcon from './data/profileIcon.png';

const TitleBox = styled.div`
    /* border-bottom: 1px solid rgba(0,0,0,0.1); */
    width: 100%;
    padding: 24px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0px 24px;
`
const IconImage = styled.img`
    margin-right: 16px;
    width: 44px;
    height: 34px;
`;
const Title = ({title}) => {
    return (
        <>
        <TitleBox>
            {/* <h1>{title}</h1> */}
            <IconImage src={profileIcon} alt="Profile" />
        
        </TitleBox>
        
        </>
    );
  };
  
  export default Title;
  
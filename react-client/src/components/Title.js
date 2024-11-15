import styled from "styled-components";
import profileIcon from './data/profileIcon.png';

const TotalBox = styled.div`
  height: 120px;
  position: fixed;
  width: calc(100% - 270px);
  top: 0; /* Aligns the element to the top of the viewport */  
  background-color: #ffffff; /* Background to ensure visibility */
`;

const TitleBox = styled.div`
    /* border-bottom: 1px solid rgba(0,0,0,0.1); */
    width: calc(100% + 270px);
    padding: 24px;
    height: 120px;
    display: flex;
    align-items: center;    
    background-color: #ffffff;    
`
const IconImage = styled.img`
    top: 42px;
    position: fixed;
    right: 16px;
    width: 44px;
    height: 34px;    

`;
const IconBox = styled.div`
    
`

const Title = ({title}) => {
    return (
        <>
        <TotalBox>
            <TitleBox>
                {/* <h1>{title}</h1> */}
                <IconBox>
                <IconImage src={profileIcon} alt="Profile" />
                </IconBox>
            </TitleBox>
        </TotalBox>
        </>
    );
  };
  
  export default Title;
  
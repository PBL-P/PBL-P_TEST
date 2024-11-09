import styled from "styled-components";

const TitleBox = styled.div`
    width: 100%;
    padding : 24px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    height: 120px;
    display: flex;
    align-items: center;
`
const Title = ({title}) => {
    return (
        <>
        <TitleBox><h1>{title}</h1></TitleBox>
        
        </>
    );
  };
  
  export default Title;
  
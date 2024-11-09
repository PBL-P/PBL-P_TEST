import styled from 'styled-components';

const ContentBox = styled.div`
  flex-grow: 1;  /* Make content take the remaining space */
  background-color: white;  /* Background color for content */
  height: 100vh;  /* Full viewport height */
  overflow-y: auto;  /* Enable scrolling */
  //padding : 24px;
  /* Hide scrollbar */
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* Optional: Transparent scrollbar */
  }
  
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;

const ContentWrapper = styled.div`
  display: flex;  /* Flexbox for side-by-side layout */
  width: 100%;
`;

const Content = ({ children }) => {
  return (
    <ContentWrapper>
      <ContentBox>
        {children}
      </ContentBox>
    </ContentWrapper>
  );
};

export default Content;

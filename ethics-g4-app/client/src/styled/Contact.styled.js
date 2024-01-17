// Contact.styled.js
import styled from 'styled-components';

const StyledContact = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    color: #333;
    font-size: 3px;
    margin-bottom: 20px;
  }

  .email-boxes {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .email-box {
      width: calc(33.333% - 20px);
      margin-bottom: 20px;
      background-color: #f5f5f5;
      border-radius: 8px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      padding: 20px;
      box-sizing: border-box; /* Include padding in the box dimensions */
      overflow: hidden;

      strong {
        display: block;
        margin-bottom: 8px;
        font-size: 18px;
        color: #333;
      }

      span {
        font-size: 16px;
        color: #555;
      }

      p {
        margin-top: 10px;
        font-size: 14px;
        color: #777;
        max-height: none; 
        overflow: auto;
        text-align: justify;
      }
    }
  }
`;

export default StyledContact;


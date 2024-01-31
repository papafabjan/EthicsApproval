import styled from "styled-components";

const Sidebar = styled.div`
  background: #ffaa33;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
  gap: 2rem;
  height: 100%;
  width: 19vw;
  overflow: hidden;

  @media (max-width: 768px) {
    /* Adjust styles for smaller screens */
    width: 100%;
  }

  .icon-title {
    display: flex;
    align-items: center;
    font-weight: bold;
    flex-direction: row;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    margin-left: 10px;

    /* Targeting specific icon classes for left margin */
    .fa-solid,
    .fa,
    .fa-table-columns,
    .fa-pen-to-square {
      margin-right: 1.5rem; /* Use relative units for margin */
    }
  }

  .icon-title > a {
    color: #333;
    text-decoration: none;
    position: relative;
    display: inline-block;
    width: 100%;
    max-width: 90%;
    text-overflow: ellipsis;
    text-align: justify;
    white-space: normal;
  }

  .icon-title > a:before {
    content: "";
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: darkorange;
    height: 0.2rem; /* Use relative units for height */
    width: 0;
    transition: transform 0.3s ease-out;
  }

  .icon-title > a:hover:before,
  .icon-title > a:focus:before,
  .icon-title > a:active:before {
    width: 100%;
  }

  .icon-title:hover > a {
    transform: scale(1.05);
  }
`;

export default Sidebar;

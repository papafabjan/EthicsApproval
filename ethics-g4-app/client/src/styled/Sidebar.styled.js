import styled from "styled-components";

const Sidebar = styled.div`
  background: linear-gradient(
    5deg,
    rgb(245, 200, 27) 0%,
    rgb(255, 169, 27) 100%
  );
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
  gap: 2rem;
  height: 100%;
  max-width: 13%;
  min-width: 13%;
  float: left;
  overflow: hidden;

  i {
    margin-right: 8px;
    vertical-align: middle;
    align-items: left;
  }
  .icon-title {
    display: flex;
    align-items: right;
    font-weight: bold;
    flex-direction: row;
  }

  .icon-title > a {
    color: #333; /* Dark gray for link color */
    text-decoration: none;
    position: relative;
    display: inline-block;
  }

  .icon-title > a:before {
    content: "";
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: darkorange;
    height: 4px;
    width: 0;
    transition: width 0.3s ease-out;
  }

  .icon-title > a:hover:before,
  .icon-title > a:focus:before,
  .icon-title > a:active:before {
    width: 100%;
  }

  .icon-title:hover > a {
    transform: scale(0.95);
  }
`;

export default Sidebar;

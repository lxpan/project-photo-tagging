import styled, { css } from 'styled-components';

const ContextMenu = styled.div`
    position: absolute;
    width: 150px;
    background-color: rgba(128, 172, 170, 0.5);
    border-radius: 5px;
    box-sizing: border-box;
    z-index: 3;
    ${({ top, left }) => css`
        top: ${top}px;
        left: ${left}px;
    `}
    ul {
        box-sizing: border-box;
        padding: 10px;
        margin: 0;
        list-style: none;
    }
    ul li {
        padding: 9px 6px;
        font-size: 1.5rem;
    }
    /* hover */
    ul li:hover {
        cursor: pointer;
        background-color: rgba(253, 217, 120, 0.8);
    }
`;

export default ContextMenu;

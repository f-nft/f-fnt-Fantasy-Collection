import styled, { keyframes } from "styled-components";

import {
  AccordionItemHeading,
  AccordionItemButton,
  Accordion,
  AccordionItem,
  AccordionItemPanel,
} from "react-accessible-accordion";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const AccordionWrapper = styled(Accordion)``;

export const AccordionItemWrapper = styled(AccordionItem)`
  transition: all 0.4s;
`;

export const OpenIcon = styled.div``;
export const CloseIcon = styled.div`
  opacity: 0;
`;

export const AccordionTitleWrapper = styled(AccordionItemHeading)`
  transition: all 0.4s;
  > div {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    h5{
      transition: all .3s;
    }
    &:hover{
      h5{
        color: #ffffff;
      }
    }
    &[aria-expanded="false"] {
      ${OpenIcon} {
        opacity: 0;
      }
      ${CloseIcon} {
        opacity: 1;
      }
      
    }

    &[aria-expanded="true"] {
      h5{
        color: #ffffff;
      }
    }
  }
  &:focus {
    outline: none;
  }
  * {
    flex-grow: 1;
  }
`;
export const AccordionItemButtonWrapper = styled(AccordionItemButton)``;
export const AccordionBodyWrapper = styled(AccordionItemPanel)`
  transition: all 0.4s;
  animation: 0.35s ${fadeIn} ease-in;
  &.accordion__body--hidden {
    /* animation: 0.35s ${fadeIn} ease-in; */
    transition: all 0.4s;
  }
`;

export const IconWrapper = styled.div`
  margin-left: 30px;
  width: 40px;
  position: relative;
  ${OpenIcon},
  ${CloseIcon} {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    transition: 0.25s ease-in-out;
    font-size: 18px;
    color: #888c8f;
  }

  &:hover {
    ${OpenIcon},
    ${CloseIcon} {
      color: #ffffff;
    }
  }
`;

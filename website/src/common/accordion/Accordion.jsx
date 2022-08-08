import "react-accessible-accordion/dist/fancy-example.css";
import {
  AccordionWrapper,
  AccordionItemWrapper,
  AccordionTitleWrapper,
  AccordionItemButtonWrapper,
  AccordionBodyWrapper,
  IconWrapper,
  OpenIcon,
  CloseIcon,
} from "./Accordion.style";

const Accordion = ({
  className,
  children,
  allowZeroExpanded,
  preExpanded,
  ...props
}) => {
  // Add all classs to an array
  const addAllClasses = ["reusecore__accordion"];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  return (
    <AccordionWrapper
      allowZeroExpanded={allowZeroExpanded}
      className={addAllClasses.join(" ")}
      {...props}
    >
      {children}
    </AccordionWrapper>
  );
};

const AccordionItem = ({ className, children }) => {
  // Add all classs to an array
  const addAllClasses = ["accordion__item"];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  return (
    <AccordionItemWrapper className={addAllClasses.join(" ")}>
      {children}
    </AccordionItemWrapper>
  );
};

const AccordionTitle = ({ className, children }) => {
  // const [expand, setExpand] = useState(false)
  const addAllClasses = ["accordion__header"];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  return (
    <AccordionTitleWrapper
      className={addAllClasses.join(" ")} 
    >
      <AccordionItemButtonWrapper>{children}</AccordionItemButtonWrapper>
    </AccordionTitleWrapper>
  );
};

const AccordionBody = ({ className, children }) => {
  // Add all classs to an array
  const addAllClasses = ["accordion__body"];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  return (
    <AccordionBodyWrapper className={addAllClasses.join(" ")}>
      {children}
    </AccordionBodyWrapper>
  );
};

export {
  Accordion,
  AccordionItem,
  AccordionTitle,
  AccordionBody,
  IconWrapper,
  OpenIcon,
  CloseIcon,
};

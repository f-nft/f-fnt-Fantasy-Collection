import { FiPlus, FiMinus } from "react-icons/fi";

import SectionTitle from "../../../../common/sectionTitle";
import {
  Accordion,
  AccordionItem,
  AccordionTitle,
  AccordionBody,
  IconWrapper,
  OpenIcon,
  CloseIcon,
} from "../../../../common/accordion/Accordion";
import faqBgThumb from "../../../../assets/images/bg/faq_bg_wattermark.png";
import data from "../../../../assets/data/faq";
import FAQStyleWrapper from "./Faq.style";

const FAQ = () => { 

  return (
    <FAQStyleWrapper className="f-nft_faq_sect" id="faq">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <SectionTitle
              title="FREQUENTLY ASKED QUESTIONS"
              subtitle="QUESTIONS & ANSWERS"
              className="section_title"
            />

            <div className="f-nft_title_text">
              <span>Don't get your answer?</span>
              <span>
                Fell free to leave a message,<a href="# ">Ask Here!</a>
              </span>
            </div>
          </div>

          <div className="col-md-6">
            <div className="f-nft_faq_content">
              <div className="f-nft_faq_questions">
                <Accordion className="faq_questions">
                  {data?.map((item, i) => (
                    <AccordionItem key={i}>
                      <AccordionTitle>
                        <h5>{item.title}</h5>
                        <IconWrapper>
                          <OpenIcon>
                            <FiMinus />
                          </OpenIcon>
                          <CloseIcon>
                            <FiPlus />
                          </CloseIcon>
                        </IconWrapper>
                      </AccordionTitle>
                      <AccordionBody>
                        <p>{item.text}</p>
                      </AccordionBody>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
        <div className="faq_bg_wattermark">
          <img src={faqBgThumb} alt="f-nft nft faq" />
        </div>
      </div>
    </FAQStyleWrapper>
  );
};

export default FAQ;

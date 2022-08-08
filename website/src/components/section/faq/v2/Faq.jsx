import { FaMinus, FaPlus } from "react-icons/fa";

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
import faqBearShape from "../../../../assets/images/nft/faq_bear.png";
import data from "../../../../assets/data/faq";
import FAQStyleWrapper from "./Faq.style";

const FAQ = () => {
  return (
    <FAQStyleWrapper className="f-nft_faq_sect" id="faq">
      <div className="container">
        <div className="f-nft_faq_content">
          <SectionTitle
            isCenter={true}
            title="FREQUENTLY ASKED QUESTIONS"
            subtitle="QUESTIONS & ANSWERS"
            className="text-center faq-title"
          />

          <div className="f-nft_faq_questions">
            <div className="faq_bear_img">
              <img src={faqBearShape} alt="f-nft nft faq" />
            </div>
            <Accordion className="faq_questions">
              {data?.map((item, i) => (
                <AccordionItem key={i}>
                  <AccordionTitle>
                    <h5>{item.title}</h5>
                    <IconWrapper>
                      <OpenIcon>
                        <FaMinus />
                      </OpenIcon>
                      <CloseIcon>
                        <FaPlus />
                      </CloseIcon>
                    </IconWrapper>
                  </AccordionTitle>
                  <AccordionBody>
                    <p>{item.text}</p>
                  </AccordionBody>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="faq_bg_wattermark">
              <img src={faqBgThumb} alt="f-nft nft faq" />
            </div>
          </div>
        </div>
      </div>
    </FAQStyleWrapper>
  );
};

export default FAQ;

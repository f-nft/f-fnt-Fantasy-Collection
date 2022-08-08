import AboutCardStyleWrapper from "./AboutCard.style";

const AboutCard = ({ title, icon, text }) => {
  return (
    <AboutCardStyleWrapper className="about_us_text_card">
      <h3>
        <img src={icon} alt="" />
        {title}
      </h3>
      <p>{text}</p>
    </AboutCardStyleWrapper>
  );
};

export default AboutCard;

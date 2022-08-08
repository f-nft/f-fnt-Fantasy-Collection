import styled from "styled-components"


const AboutInfoCardListWrapper = styled.div` 
    position: relative;
    margin-top: 120px; 
    z-index: 1;  


    @media only screen and (max-width: 991px) {
        .about_us_text_card_sect {
        margin-top: 60px;

        &.md-mt-0 {
            margin-top: 0;
        }
        }
    }

    @media only screen and (max-width: 767px) {
        .row{
            .col-md-4 + .col-md-4{ 
                margin-top: 30px; 
            }
        }
    }
`

export default AboutInfoCardListWrapper;
import SectionTitle from "../../../../common/sectionTitle";
import TeamMember from "../teamMember";
import teamBearImg from "../../../../assets/images/nft/team_bear_img.png";
import data from "../../../../assets/data/team/teamMembersV2";
import TeamStyleWrapper from "./Team.style";

const Team = () => {
  return (
    <TeamStyleWrapper>
      <div className="f-nft_team_sect" id="team">
        <div className="team_bear_img">
          <img src={teamBearImg} alt="f-nft nft team" />
        </div>
        <div className="container">
          <SectionTitle
            isCenter={true}
            title="MEET THE CREW"
            subtitle="TEAM MEMBERS"
            className="text-center"
          />
          <div className="f-nft_team_content">
            <div className="row">
              {data?.map((member, i) => (
                <div key={i} className="col-lg-3 col-md-4 col-sm-6">
                  <TeamMember {...member} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TeamStyleWrapper>
  );
};

export default Team;

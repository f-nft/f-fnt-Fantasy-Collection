import SectionTitle from "../../../../common/sectionTitle";
import RoadMapItem from "./RoadMapItem";
import data from "../../../../assets/data/roadMap/dataV3";
import RoadMapStyleWrapper from "./RoadMap.style";
const RoadMap = () => {
  return (
    <RoadMapStyleWrapper id="roadmap">
      <div className="container">
        <SectionTitle
          isCenter={true}
          title="Roadmap"
          subtitle="Our Goals"
          className="text-center"
        />

        <div className="row v3_roadmap_content">
          {data?.map((item, i) => (
            <div key={i} className="col-lg-12">
              <RoadMapItem {...item} />
            </div>
          ))}
        </div>
      </div>
    </RoadMapStyleWrapper>
  );
};

export default RoadMap;

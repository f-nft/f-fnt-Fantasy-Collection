import data from "../../../assets/data/particle/bannerV3Particle";
const Particle = () => {
  return (
    <>
      {data?.map((shape, i) => (
        <span key={i} className={`shape_${i + 1} rotated-style`}>
          <img src={shape} alt="f-nft nft bg shape" />
        </span>
      ))}
    </>
  );
};

export default Particle;

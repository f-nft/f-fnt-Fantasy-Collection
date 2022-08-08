import ParticleStyleWrapper from "./Particle.style";

const Particle = ({ particles }) => {
  return (
    <ParticleStyleWrapper>
      <div className="particle_stars">
        {particles?.map((shape, i) => (
          <span key={i} className={`star_${i + 1}`}>
            <img src={shape} alt="f-nft nft background particle" />
          </span>
        ))}
      </div>
    </ParticleStyleWrapper>
  );
};

export default Particle;

import Counter from "../../../common/counter";
import bgShape1 from "../../../assets/images/icon/square_shape_1.png";
import bgShape2 from "../../../assets/images/icon/square_shape_2.png";

import CoinInfoCounterWrapper from "./Counter.style";
import coinInfoCounterData from "../../../assets/data/coinInfoCounter.json";

const CoinInfoCounter = () => {
  const { info } = coinInfoCounterData;

  return (
    <CoinInfoCounterWrapper>
      <div className="container">
        <ul>
          {info?.map((item, i) => (
            <li key={i}>
              <h3>
                <Counter
                  end={item.number}
                  decimal="."
                  decimals={item.number % 1 !== 0 ? "2" : "0"}
                  suffix={item.unit}
                />
              </h3>
              <h4>{item.text}</h4>
            </li>
          ))}
        </ul>
      </div>
      <img
        src={bgShape2}
        className="bg-shape shape-left shape-top"
        alt="f-nft bg shape"
      />
      <img
        src={bgShape1}
        className="bg-shape shape-left shape-bottom"
        alt="f-nft bg shape"
      />
      <img
        src={bgShape2}
        className="bg-shape shape-right shape-top"
        alt="f-nft bg shape"
      />
      <img
        src={bgShape1}
        className="bg-shape shape-right shape-bottom"
        alt="f-nft bg shape"
      />
    </CoinInfoCounterWrapper>
  );
};

export default CoinInfoCounter;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { darken } from "polished";

const gradients = [
  {
    color1: "#ff9966",
    color2: "#ff5e62",
  },
  {
    color1: "#66ffaa",
    color2: "#70ff5e",
  },
  {
    color1: "#26D0CE",
    color2: "#1A2980",
  },
  {
    color1: "#AA076B",
    color2: "#61045F",
  },
  {
    color1: "#DA22FF",
    color2: "#9733EE",
  },
  {
    color1: "#EA384D",
    color2: "#D31027",
  },
  {
    color1: "#6dd5ed",
    color2: "#2193b0",
  },
  {
    color1: "#66adff",
    color2: "#5e65ff",
  },
  {
    color1: "#DA22FF",
    color2: "#9733EE",
  },
  {
    color1: "#66ffaa",
    color2: "#70ff5e",
  },
  {
    color1: "#AA076B",
    color2: "#61045F",
  },
  {
    color1: "#ff9966",
    color2: "#ff5e62",
  },
];

export function Card({
  container: {
    measurements,
    container_weight,
    max_capacity,
    tag_id,
    ...container
  },
  i,
}) {
  console.log(i);
  if (!measurements || !measurements.length) return null;
  const {
    product,
    current_volume,
    measure_date,
    ...measurement
  } = measurements[measurements.length - 1];

  if (!product) return null;

  const progress = (current_volume * 100) / max_capacity;

  return (
    <StyledCard progress={progress} background={gradients[i]}>
      <div className="top">
        <h1>{product.name}</h1>
        <span>Container #{i}</span>
      </div>
      <div className="card-mid">
        <div>
          <span>
            Last measurement:{" "}
            {format(new Date(parseInt(measure_date, 10)), "d MMMM")}
          </span>
        </div>
        <div>
          {current_volume} / {max_capacity}
        </div>
      </div>
      <div className="card-bar">
        <div className="card-progress"></div>
      </div>
    </StyledCard>
  );
}

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://smart-scale-api.herokuapp.com/api/user/marcsir97@gmail.com"
      );
      const json = await res.json();
      setData(json);
    }
    fetchData();
  }, []);

  if (!data) return null;

  const { scales } = data;
  const { containers } = scales[0];
  return (
    <HomeWrapper>
      {containers.map((container, i) => (
        <Card container={container} i={i} />
      ))}
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  max-height: 620px;
  overflow-y: scroll;
`;

const StyledCard = styled.div`
  /* width: calc(50% - 10px * 2); */
  width: 100%;
  margin: 9px;
  height: 200px;
  /* border: 1px solid gray; */

  border-radius: 15px;
  padding: 0px 20px;

  color: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15), 0 2px 2px rgba(0, 0, 0, 0.15),
    0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.15);

  background: ${({ background }) => `linear-gradient(
    90deg,
    ${background.color1} 0%,
    ${background.color2} 100%
  )`};

  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;

  .card-bar {
    width: calc(100% - 10px);
    margin: 0 auto 20px;
    border-radius: 5px;
    height: 30px;
    background-color: ${({ background }) => darken(0.4, background.color1)};
    border: 2px solid white;
    overflow: hidden;
    .card-progress {
      height: 100%;
      width: ${({ progress }) => progress}%;
      max-width: 100%;
      background-color: ${({ background }) => darken(0.2, background.color1)};
    }
  }
  .top {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    h1 {
      text-transform: capitalize;
      margin: 0px;
    }
  }
`;

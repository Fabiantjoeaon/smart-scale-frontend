import React from "react";
import styled from "styled-components";
import Image from "next/image";

export function Header() {
  return (
    <StyledHeader>
      <div className="header__inner">
        <div className="avatar">
          <Image
            src="/avatar.jpeg"
            alt="Picture of the author"
            width={80}
            height={80}
          />
        </div>
        <div className="header__details">
          <h4>Bart Klomp</h4>
          <h5>Kitchen scale</h5>
        </div>
      </div>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  height: 100px;
  width: 100%;

  .header__inner {
    height: 100%;

    margin: 25px auto 0px;

    width: ${({ theme }) => theme.innerWidth};
    display: flex;

    .avatar {
      img {
        border-radius: 50%;
      }
    }

    .header__details {
      display: flex;

      flex-flow: column nowrap;
      height: 50px;
      margin-left: 20px;

      h4,
      h5 {
        margin: 0px;
      }

      h4 {
        font-weight: 600;
        margin-bottom: 15px;
        margin-top: 10px;
      }

      h5 {
        font-weight: 400;
        color: #333333;
      }
    }
  }
`;

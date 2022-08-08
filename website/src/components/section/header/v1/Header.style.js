import styled from "styled-components";

const NavWrapper = styled.nav`
  z-index: 999;
  &.f-nft_header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    margin-top: 1px;
    height: 90px;
    transition: all 0.3s;

    &.sticky {
      position: fixed;
      top: 0;
      width: 100%;
      background: rgba(27, 34, 38, 0.8);
      backdrop-filter: blur(15px);
      z-index: 1000;
      margin-top: 0px;
      transition: all 0.2s;
    }
  }

  .f-nft_menu_sect {
    height: 90px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .f-nft_menu_left_sect {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 15%;

    .logo {
      a {
        display: inline-block;
      }
    }
  }

  .f-nft_menu_right_sect {
    width: 85%;
    display: flex;
    align-items: center;
    justify-content: end;
  }

  .f-nft_menu_list {
    margin-left: 65px;
    margin-right: 96px;
    max-width: 514px;
    min-width: 409px;
    width: 100%;
    ul {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0;
      padding: 0;

      li {
        position: relative;
        cursor: pointer;

        a {
          font-family: "Bakbak One";
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          text-transform: uppercase;
          color: #ffffff;
        }

        &:hover {
          a {
            color: #8A2BE2;
          }
        }

        /* submenu */
        &.submenu {
          .sub_menu_sect {
            background: transparent;
            border-top: 50px solid transparent;
            position: absolute;
            top: -50px;
            left: -20px;
            width: 190px;
            visibility: hidden;
            opacity: 0;
            z-index: -100;
            transition: all 0.5s;

            .sub_menu_list {
              padding: 15px 20px;
              background: #171f25;
              flex-wrap: wrap;
              li {
                a {
                  font-family: "Bakbak One";
                  font-style: normal;
                  font-weight: 400;
                  font-size: 16px;
                  line-height: 40px;
                  color: rgba(255, 255, 255, 0.8);
                  text-transform: capitalize;
                }

                &:hover {
                  a {
                    color: #8A2BE2;
                  }
                }
              }
            }
          }

          &:hover {
            .sub_menu_sect {
              top: 7px;
              visibility: visible;
              opacity: 1;
              z-index: 99;
            }
          }
        }
      }
    }
  }

  .f-nft_menu_btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: center;
    min-width: 284px;
    button {
      color: #ffffff;
      text-transform: uppercase;
      font-family: "Bakbak One";
      font-weight: 400;
      font-size: 16px;
    }

    .menu_btn {
      display: none;
      border: none;
      background: transparent;
      cursor: pointer;
      svg {
        font-size: 40px;
      }
    }

    .join_btn {
      height: 50px;
      width: 114px;
      background-color: transparent;
    }

    .connect_btn {
      height: 50px;
      min-width: 150px;
      border: none;
      margin-left: 20px;
      background: rgba(255, 255, 255, 0.2);

      svg {
        font-size: 20px;
      }
    }
  }

  @media (max-width: 1024px) {
    .f-nft_menu_list {
      margin-right: 20px;
    }
  }
  @media (max-width: 991px) {
    .f-nft_menu_right_sect {
      justify-content: end;
    }
    .f-nft_menu_btns {
      justify-content: end;
      .menu_btn {
        display: block;
      }
    }

    .f-nft_menu_btns {
      .join_btn {
        display: none;
      }
    }
    .f-nft_menu_list {
      display: none;
      visibility: hidden;
      opacity: 0;
    }
  }

  @media (max-width: 667px) {
    .f-nft_menu_btns {
      .connect_btn {
        display: none;
      }

      .menu_btn {
        svg {
          font-size: 30px;
        }
      }
    }
  }

  @media (max-width: 540px) {
    .f-nft_menu_left_sect {
      width: 100px;
      .logo {
        img {
          width: 79%;
        }
      }
    }

    .f-nft_menu_right_sect {
      width: 50%;
      .f-nft_menu_right_sect {
        width: 50%;
      }
    }
  }
`;

export default NavWrapper;

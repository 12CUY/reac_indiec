# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

.Togglecontent {
      margin: ${({ isOpen }) => (isOpen ? `auto 40px` : `auto 15px`)};
      width: 36px;
      height: 20px;
      border-radius: 10px;
      transition: all 0.3s;
      position: relative;
      .theme-container {
        background-blend-mode: multiply, multiply;
        transition: 0.4s;
        .grid {
          display: grid;
          justify-items: center;
          align-content: center;
          height: 100vh;
          width: 100vw;
          font-family: "Lato", sans-serif;
        }
        .demo {
          font-size: 32px;
          .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
            .theme-swither {
              opacity: 0;
              width: 0;
              height: 0;
              &:checked + .slider:before {
                left: 4px;
                content: "🌑";
                transform: translateX(26px);
              }
            }
            .slider {
              position: absolute;
              cursor: pointer;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: ${({ themeUse }) =>
                themeUse === "light" ? v.lightcheckbox : v.checkbox};

              transition: 0.4s;
              &::before {
                position: absolute;
                content: "☀️";
                height: 0px;
                width: 0px;
                left: -10px;
                top: 16px;
                line-height: 0px;
                transition: 0.4s;
              }
              &.round {
                border-radius: 34px;

                &::before {
                  border-radius: 50%;
                }
              }
            }
          }
        }
      }
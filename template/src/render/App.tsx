import "./App.css";
import RsBuildIcon from "../../public/assets/icons/128x128.png"
import ElectronIcon from "../../public/assets/images/electron.svg"
import RsbuildBackground from "../../public/assets/images/background-lines.png"

const App = () => {


  const onSendIPC = () => {
    window.electron.send("ping")
  }

  return (
    <div className="container">
      <div className="logo_wrapper">
        <img alt="logo" className="rsbuild-logo logo" src={RsBuildIcon} />
        <img alt="logo" className="electron-logo logo" src={ElectronIcon} />
      </div>
      <img alt="logo" className="background" src={RsbuildBackground} />
      <div className="text">
        Build an Electron + Rsbuild app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <div className="actions">
        <div className="action">
          <a href="https://github.com/ClearLuvMoki/electron-rsbuild-template" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={onSendIPC}>
            Send IPC
          </a>
        </div>
      </div>
      <div className="footer">
        <ul className="versions">
          <li className="electron-version">Electron v{window.electron.version.electron}</li>
          <li className="chrome-version">Chromium v{window.electron.version.chrome}</li>
          <li className="node-version">Node v{window.electron.version.node}</li>
        </ul>
        <div className="creator">Powered by @clearluvmoki/electron-rsbuild-template</div>
      </div>
    </div>
  );
};

export default App;

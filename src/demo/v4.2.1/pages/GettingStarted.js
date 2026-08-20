import React from 'react'
import { NavPageContainer} from '../_lib'
import { Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { AppConfigCSSDefault } from './codes/gettingStarted'

const GettingStarted = () => {

  return (
    <NavPageContainer
      hasPadding
      animateTransition>

      <h1>GettingStarted</h1>
      <p>Initialize a Vite React app and install <b>react-windows-ui</b>.</p>

      <SyntaxHighlighter
        language="bash"
        style={vscDarkPlus}
        className="code code-container">
        {`pnpm create vite MyAppName --template react
cd MyAppName
pnpm add react-windows-ui`}
      </SyntaxHighlighter>

      <h1>Structure</h1>

      <div className='app-code' style={{whiteSpace: "pre-line", lineHeight: "normal", padding:"10px 40px 15px 20px"}}>
        src/<br/>
          │ &nbsp; ├─ App.jsx<br/>
          │ &nbsp; └─ main.jsx<br/>
        package.json<br/>
      </div>
      <br/><br/>
      

      <h2>app-config.css</h2>
      <p>By default below <span className='app-code'>app-config.css</span> file is used by the app.</p>
      <SyntaxHighlighter
        language="javascript"
        style={vscDarkPlus}
        className="code code-container">
        {AppConfigCSSDefault}
      </SyntaxHighlighter>

      <br/><p>If you want to use your own <b>primary color</b> or <b>font-family</b>,
      <br/>Create a new <span className='app-code'>app-config.css</span> and <span className='app-code'>update</span> import file below:</p>
      <p><b>app/src/index.js</b></p>
      <SyntaxHighlighter
        language="javascript"
        style={vscDarkPlus}
        className="code code-container">
        {`import "react-windows-ui/config/app-config.css";`}
      </SyntaxHighlighter>

    <br/><br/><br/><br/><br/><br/>
    </NavPageContainer>
  )
}

export default GettingStarted

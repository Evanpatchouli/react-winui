const UIAppJS =
`import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AppContainer, NavBar, NavBarLink, NavBarThemeSwitch, NavPageContainer } from "@evanpatchouli/react-winui";

import "@evanpatchouli/react-winui/config/app-config.css";
import "@evanpatchouli/react-winui/styles.css";
import "@evanpatchouli/react-winui/icons/winui-icons.min.css";

const App = () => {
  return (
    <BrowserRouter basename={'/'}>
      <NavBarRoutes/>  
    </BrowserRouter>
  )
}

const Page0 = () => {return (<NavPageContainer style={{backgroundColor: "blueviolet"}}></NavPageContainer>)};
const Page1 = () => {return (<NavPageContainer style={{backgroundColor: "red"}}></NavPageContainer>)};
const Page2 = () => {return (<NavPageContainer style={{backgroundColor: "green"}}></NavPageContainer>)};

const NavBarRoutes = () => {

  const navigate = useNavigate();
  const [route, setRoute] = useState("/");
  const _navigate = (route) => {
    navigate(route);
    setRoute(route);
  }
  
  return (
    <AppContainer>
      <NavBar
        title="App Name"
        shadowOnScroll={true}
        titleBarMobile={<div><span className="ui-navbar-name">react-winui</span></div>}>

        <NavBarThemeSwitch/>
        <h1>Pages</h1>
        <div className="ui-hr"></div>
        <NavBarLink
          text="Home"
          active={route === "/" ?? true}
          onClick={() => _navigate("/")}
          icon={<i className="icons10-home"></i>}
        />
        <NavBarLink
          text="Page1"
          active={route === "page1" ?? true}
          onClick={() => _navigate("page1")}
          icon={<i className="icons10-grid-2"></i>}
        />
        <NavBarLink
          text="Page2"
          active={route === "page2" ?? true}
          onClick={() => _navigate("page2")}
          icon={<i className="icons10-columns"></i>}
        />
      </NavBar>
      <Routes>
        <Route path="/" element={<Page0/>} exact/>
        <Route path="page1" element={<Page1/>} />
        <Route path="page2" element={<Page2/>} />
      </Routes>
    </AppContainer>
  )
}
    
export default App;
`;

const NavBarSearch = 
`import { InputSearchBox } from "@evanpatchouli/react-winui";

<InputSearchBox
  placeholder="Search Here.."
  onChange={() => {}}
  suggest={[
    {text: "home", icon: <i className="icons10-home"></i>},
    {text: "alert", onClick: () => alert("Hi Again")}
  ]}
/>
`;

const NavBarThemeSwitch = 
`import { NavBarThemeSwitch } from "@evanpatchouli/react-winui";

<NavBarThemeSwitch
  onChange={(scheme) => console.log(scheme)}
/>
`

const NavBarSubMenu = 
`import { NavBarSubMenu } from "@evanpatchouli/react-winui";

<NavBarSubMenu title="Title">
  ...
  <NavBarLink
    text="Page1"
    onClick={() => {}}
    icon={<i className="icons10-add"></i>}
  />
  ...
</NavBarSubMenu>
`

const NavBarLink = 
`import { NavBarLink } from "@evanpatchouli/react-winui";

<NavBarLink
  text="Page1"
  active={true}
  onClick={() => {}}
  icon={<i className="icons10-home"></i>}
/>
`

const NavBarLinkImg = 
`import { NavBarLink } from "@evanpatchouli/react-winui";

<NavBarLink
  text="Page1"
  active={true}
  imgSrc={Img1}
  imgAlt="Img alt text"
  onClick={() => {}}
  icon={<i className="icons10-home"></i>}
/>
`

const NavBarTitle = 
`<h1>Title</h1>
<div className="ui-hr"></div>
`

const PageContainer = 
`import { NavPageContainer } from "@evanpatchouli/react-winui";

<NavPageContainer
  hasPadding={true}
  animateTransition={true}>
  <>children ..</>
</NavPageContainer>
`

export {
  UIAppJS,
  NavBarSearch,
  NavBarThemeSwitch,
  NavBarSubMenu,
  NavBarLink,
  NavBarLinkImg,
  NavBarTitle,
  PageContainer
}

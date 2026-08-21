const NavPageContainerImportCode =
`import { NavPageContainer } from "@evanpatchouli/react-winui";`;

const NavPageContainerUsageCode =
`<NavPageContainer
  hasPadding={true}
  animateTransition={true}>
  <>children ..</>
</NavPageContainer>`;

const NavPageContainerInnerUsageCode =
`<NavPageContainer
  hasPadding={true}
  animateTransition={true}>
  <NavPageContainer.Inner>
    <>children ..</>
  </NavPageContainer.Inner>
</NavPageContainer>`;



export {
  NavPageContainerImportCode,
  NavPageContainerUsageCode,
  NavPageContainerInnerUsageCode
}

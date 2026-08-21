import React from 'react';
import { NavPageContainer } from "@evanpatchouli/react-winui";
import IconsView from './Icons';

const Icons = () => {
  return (
    <NavPageContainer hasPadding animateTransition>
      <IconsView/>
    </NavPageContainer>
  );
}

export default Icons;
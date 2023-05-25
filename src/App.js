import styled from 'styled-components'
import { useState } from 'react';
import GlobalStyles from './GlobalStyles';

import { Main } from './components/Main';
import { Header } from './components/Header';

const App = () => {
  return (
    <AppContainer>
      <GlobalStyles/>
      {/* <Header/> */}
      <Main/>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-width: 1300px;
  font-family: 'Nunito Sans', sans-serif;
`

export default App;

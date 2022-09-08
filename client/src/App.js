import React from 'react'
import Main from './component/Main';
import DataProvider from './GlobalContext';

function App() {
  return (
    <DataProvider>
      <Main/>
    </DataProvider>
  )
}

export default App
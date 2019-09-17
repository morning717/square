import React from 'react';
import SubfaceV2 from './component/subfaceV2'
import Subface from './component/subface'
import ThreeMap from './component/mapTest'
import PlumbTest from './component/plumbTest'

const App: React.FC = () => {
  return (
    <div className="App">
        {/*<ThreeMap/>*/}
        <PlumbTest/>
        <Subface/>
    </div>
  );
};

export default App;

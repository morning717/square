import React from 'react';
import SubfaceV2 from './component/subfaceV2'
import Subface from './component/subface'
import ThreeMap from './component/mapTest'
import PlumbTest from './component/plumbTest'
import TextExport from './component/testExport'

const App: React.FC = () => {
    //入口切换
  return (
    <div className="App">
         {/*OpenGL ES*/}
        {/*<ThreeMap/>*/}
        {/*<PlumbTest/>*/}
        {/*<Subface/>*/}
      <TextExport/>
    </div>
  );
};

export default App;

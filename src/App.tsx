import React from 'react';
import SubfaceV2 from './component/subfaceV2'
import Subface from './component/subface'
import ThreeMap from './component/mapTest'
import PlumbTest from './component/plumbTest'
import TextExport from './component/testExport'
import SnakeGame from "./snake/snakeGame";

const App: React.FC = () => {
    //入口切换
  return (
    <div className="App">
         {/*OpenGL ES*/}
        {/*<ThreeMap/>*/}
        {/*<PlumbTest/>*/}
        {/*<Subface/>*/}
      {/*<TextExport/>*/}
      <SnakeGame/>
    </div>
  );
};

export default App;

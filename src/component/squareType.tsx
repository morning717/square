
const createSquare  = () => {
    let r = ramdomSquare()
    return {
        square :r[0],
        top:0,
        left:6,
        type:r[1],
        color:getRandomColor()
    }
};

function ramdomSquare (){
   let allTypeIndex= [
        [[1,1,1,1]],
        [[1,1],[1,1]],
        [[1,1,0],[0,1,1]],
        [[0,1,1],[1,1,0]],
        [[0,1,0],[1,1,1]],
        [[1,0,0],[1,1,1]],
        [[0,0,1],[1,1,1]]
    ];
   let allType = ['I','O','Z','UZ','T','L','UL'];
   let num = Math.floor(Math.random()*6);
   return [allTypeIndex[num],allType[num]];
}

function getRandomColor(){
    return '#'+Math.floor(Math.random()*0xffffff).toString(16);
}

export {
    createSquare
}


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
   let num = Math.floor(Math.floor(Math.random()*7));
   return [allTypeIndex[num],allType[num]];
}

function getRandomColor(){
    let colorH:string = '#'+Math.floor(Math.random()*0xffffff).toString(16);
    if (colorH == '#111111') getRandomColor()
    // return '#'+Math.floor(Math.random()*0xffffff).toString(16);
    return colorH;
}

const transformL = () => {
    let tl= [
        [
            [1,1],[1,0],[1,0]
        ],
        [
            [1,1,1],[0,0,1]
        ],
        [
            [0,1],[0,1],[1,1]
        ],
        [
            [1,0,0],[1,1,1]
        ]
    ];
    return tl;
};

const transformUL = () => {
    let tul= [
        [
            [1,0],[1,0],[1,1]
        ],
        [
            [1,1,1],[1,0,0]
        ],
        [
            [1,1],[0,1],[0,1]
        ],
        [
            [0,0,1],[1,1,1]
        ]
    ];
    return tul;
};

const transformT = () => {
    let tul= [
        [
            [1,0],[1,1],[1,0]
        ],
        [
            [1,1,1],[0,1,0]
        ],
        [
            [0,1],[1,1],[0,1]
        ],
        [
            [0,1,0],[1,1,1]
        ]
    ];
    return tul;
};

export {
    createSquare,
    transformL,
    transformUL,
    transformT,
}


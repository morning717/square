import React from 'react';
import './subfaceStyle.less'
import GraphicalModels from "./graphicalModels";
import {createSquare} from "./squareType";


class Subface extends React.Component<any,any> {

    public timePromise : any;
    constructor(props: any) {
        super(props);
        this.createSubfaceMap   = this.createSubfaceMap.bind(this);
        this.createGraphicalMap = this.createGraphicalMap.bind(this);
        this.initOneSquare      = this.initOneSquare.bind(this);
        this.resetAndNewSquare  = this.resetAndNewSquare.bind(this);
        this.move               = this.move.bind(this);
        this.state = {
            graphicalModel : new GraphicalModels(),
            subfaceModel   : new GraphicalModels(),
            squareItem     : createSquare()
        }

    }



    componentDidMount() {
        window.addEventListener('keydown', (e)=> {
            if (e.key == 'ArrowLeft'){
                this.move('left');
            }else if(e.key == 'ArrowRight'){
                this.move('right');
            }else if (e.key == 'ArrowDown'){
                this.autoSquareFalling()
            }else if (e.key == 'ArrowUp'){
                this.changeSquare();
            }
        });
        this.start();
    }

    changeSquare(){
        // 1清空画布 -> 2处理旋转 -> 3initNewSquare
        /*1*/
        let newGraphicalModel = new GraphicalModels();
        this.state.graphicalModel.subface = newGraphicalModel.subface;
        /*2*/
        // 判断周围有足够(3*3)空间进行互换 I型足够(4*4)空间
        let squareItem = this.state.squareItem;
        if (squareItem.type == "I"){
            let trI:any = [];
            for (let i = 0 ; i < squareItem.square[0].length; i++){
                trI[i] = [];
            }
            for (let i = 0 ; i < squareItem.square.length; i++){
                for (let j = 0 ; j < squareItem.square[0].length; j++){
                    trI[j][i] = squareItem.square[i][j];
                }
            }
            this.state.squareItem.square = trI;
        }else if (squareItem.type == "O"){

        }else if (squareItem.type == "Z" || squareItem.type == "UZ"){
            let tr:any = [];
            for (let i = 0 ; i < squareItem.square[0].length; i++){
                tr[i] = [];
            }
            for (let i = 0 ; i < squareItem.square.length; i++){
                for (let j = 0 ; j < squareItem.square[0].length; j++){
                    tr[j][i] = squareItem.square[i][j];
                }
            }
            this.state.squareItem.square = tr;
        }else if (squareItem.type == "L" || squareItem.type == "UL"){

        }else {

        }
        /*3*/
        this.initOneSquare()
    }

    start(){
        //初始化一个方块
        this.initOneSquare();
        //启动下落
        this.timePromise = setInterval(() => this.autoSquareFalling(), 1000);
    }

    autoSquareFalling (){
        this.state.graphicalModel.subface = new GraphicalModels().subface;
        this.state.squareItem.top += 1;
        // 边界处理 接触到底边或堆积最高行
        if (this.state.squareItem.top > (new GraphicalModels().subface.length - this.state.squareItem.square.length)){
            window.clearInterval(this.timePromise);
            // subface 修改数据
            {this.saveToSubfaceMap()}
            // 清空graphicalModel 创建新的方块
            {this.resetAndNewSquare()}


        }else {
            this.initOneSquare();
        }
    }

    // 方块下落结束后更新显示subfaceMap
    saveToSubfaceMap(){

        let saveIndex :any = [];
        for (let i = 0 ; i < this.state.squareItem.square.length ; i++){
            for (let j = 0;j < this.state.squareItem.square[i].length;j++){

                if (this.state.squareItem.square[i][j] == 1){
                    // 移动到最左最右情况下 处理越界
                    // if (this.state.squareItem.left == 0 || this.state.squareItem.left == (this.state.subfaceModel.subface[0].length -  this.state.squareItem.square[i].length)){
                    //     saveIndex.push(
                    //         [i + (this.state.squareItem.top - 1), j + this.state.squareItem.left]
                    //     )
                    // }else {
                    //     saveIndex.push(
                    //         [i + (this.state.squareItem.top - 1), j + (this.state.squareItem.left-1)]
                    //     )
                    // }
                    saveIndex.push(
                        [i + (this.state.squareItem.top - 1), j + (this.state.squareItem.left)]
                    )
                }
            }
        }
        for (let k = 0 ; k < saveIndex.length;k++){
            this.state.subfaceModel.subface[saveIndex[k][0]][saveIndex[k][1]][0] = 1;
            this.state.subfaceModel.subface[saveIndex[k][0]][saveIndex[k][1]][1] = this.state.squareItem.color;
        }
        this.setState({
            subfaceModel:this.state.subfaceModel
        })
    }

    resetAndNewSquare(){
        let newGraphicalModel = new GraphicalModels();
        let newSquareItem = createSquare();
        this.state.graphicalModel.subface = newGraphicalModel.subface;
        this.state.squareItem.square = newSquareItem.square;
        this.state.squareItem.top    = newSquareItem.top;
        this.state.squareItem.left   = newSquareItem.left;
        this.state.squareItem.color  = newSquareItem.color;
        this.state.squareItem.type   = newSquareItem.type;
        this.initOneSquare();
        this.timePromise = setInterval(() => this.autoSquareFalling(), 1000);
    }


    move(type:string){
        this.state.graphicalModel.subface = new GraphicalModels().subface;
        if (type === 'left'){
            this.state.squareItem.left -= 1;
        }else if(type === 'right'){
            this.state.squareItem.left += 1;
        }else if(type === ' '){

        }
        this.initOneSquare();
    }

    // 初始化一个方块 + 移动操作
    initOneSquare(){
        for (let j = 0 ; j < this.state.squareItem.square.length ; j++){
            for (let k = 0 ; k < this.state.squareItem.square[j].length ; k++){
                if (this.state.squareItem.square[j][k] == 1){
                    this.state.graphicalModel.subface[this.state.squareItem.top + j][this.state.squareItem.left + k][0] = 1;
                    this.state.graphicalModel.subface[this.state.squareItem.top + j][this.state.squareItem.left + k][1] = this.state.squareItem.color;
                }
            }
        }

        this.setState({
            graphicalModel:this.state.graphicalModel
        })

    }
    


    createSubfaceMap(): any {
        let data: any = this.state.subfaceModel.subface;
        let rs: Array<object> = [];
        for (let i = 0; i < data.length * data[0].length; i++) {
            let col: number = parseInt((i / data[0].length).toString());
            let row: number = parseInt((i % data[0].length).toString());
            let sideL: number = 30;
            let color: string = data[col][row][1];
            rs.push(
                <div key={'subface' + i} style={{
                    position: 'absolute',
                    top: sideL * col,
                    left: sideL * row,
                    width: sideL,
                    height: sideL,
                    backgroundColor:color,
                    border: 'black solid thin'
                }}></div>
            )
        }
        return rs;
    }

    createGraphicalMap(): any {
        let data: any = this.state.graphicalModel.subface;
        let rs: Array<object> = [];
        for (let i = 0; i < data.length * data[0].length; i++) {
            let col: number = parseInt((i / data[0].length).toString());
            let row: number = parseInt((i % data[0].length).toString());
            let sideL: number = 30;
            let color: string = data[col][row][1];
            rs.push(
                <div key={'subface' + i} style={{
                    position: 'absolute',
                    top: sideL * col,
                    left: sideL * row,
                    width: sideL,
                    height: sideL,
                    backgroundColor:color,
                    border: 'black solid thin',
                    opacity:data[col][row][0] == 1 ? 1: 0
                }}></div>
            )
        }
        return rs;
    }

    render() {
        return (
            <div>
                {this.createSubfaceMap()}
                {this.createGraphicalMap()}
            </div>
        )
    }

    componentWillUnmount() {
        clearInterval(this.timePromise);
    }
}

export default Subface
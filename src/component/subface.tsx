import React from 'react';
import './subfaceStyle.less'
import GraphicalModels from "./graphicalModels";
import {createSquare ,transformL ,transformUL , transformT} from "./squareType";


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
            squareItem     : createSquare(),
            tIndex         : {type:'',index:-1},
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
                if (this.state.tIndex.index >= 3){
                    this.state.tIndex.index = 0;
                }else {
                    this.state.tIndex.index += 1;
                }

                this.changeSquare();
            }
        });
        this.start();
    }

    changeSquare(){
        console.log(this.state.tIndex.index)
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
            this.checkTransformSpace(trI);
            // this.state.squareItem.square = trI;
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
            this.checkTransformSpace(tr);
            // this.state.squareItem.square = tr;
        }else if (squareItem.type == "L" || squareItem.type == "UL"){
            if (squareItem.type == "L"){
                this.checkTransformSpace(transformL()[this.state.tIndex.index]);
                // this.state.squareItem.square = transformL()[this.state.tIndex.index];
            }else {
                this.checkTransformSpace(transformUL()[this.state.tIndex.index]);
                // this.state.squareItem.square = transformUL()[this.state.tIndex.index];
            }
        }else {
            this.checkTransformSpace(transformT()[this.state.tIndex.index]);
            // this.state.squareItem.square = transformT()[this.state.tIndex.index];
        }
        /*3*/
        this.initOneSquare()
    }

    checkTransformSpace(p:any){
        // 空间足够旋转 && 旋转后位置足够
        console.log(p);
        // this.state.squareItem.square = p;
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

        // 获取显示画布当前行数
        let currentBottomLine:number =  new GraphicalModels().subface.length;
        for (let i = currentBottomLine-1 ; i >= 0 ; i--){
            let s:any = [];
            for (let j = 0;j < this.state.subfaceModel.subface[i].length;j++) {
                s.push(
                    this.state.subfaceModel.subface[i][j][0]
                );
                if (s.indexOf(1) > -1) {
                    currentBottomLine = i;
                } else {
                    continue;
                }
            }
        }



        for (let i = 0; i < this.state.squareItem.square[this.state.squareItem.square.length-1].length;i++){
            console.log(this.state.squareItem.square[this.state.squareItem.square.length-1][i]);
        }

        console.log(this.state.subfaceModel.subface[this.state.squareItem.top + this.state.squareItem.square.length]);

        if (this.state.squareItem.top > (currentBottomLine - this.state.squareItem.square.length)){
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
        // this.timePromise = setInterval(() => this.autoSquareFalling(), 1000);
    }


    move(type:string){
        this.state.graphicalModel.subface = new GraphicalModels().subface;
        if (type === 'left'){
            if (this.state.squareItem.left < 1) return;;
            this.state.squareItem.left -= 1;
        }else if(type === 'right'){
            if (this.state.squareItem.left > (this.state.graphicalModel.subface[0].length - this.state.squareItem.square[0].length -1)) return;
            this.state.squareItem.left += 1;
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
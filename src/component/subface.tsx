import React from 'react';
import './subfaceStyle.less'
import GraphicalModels  from "./graphicalModels";
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
            tIndex         : {type:'',index:-1}, // transform index
            tLock          : {cState:false}, // transform lock
            point          : {curPoint:0},
            timeInterval   : {interval:1000},
            nextSquareItem : {nextSquare:createSquare()},
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
            }else if(e.key == ' '){
                window.clearInterval(this.timePromise);
                this.timePromise = setInterval(() => this.autoSquareFalling(), 1);
            }
        });
        this.start();

    }


    changeSquare(){
        // console.log(this.state.tLock);
        if (this.state.tLock.cState == true) return;
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
        /*3  checkTransformSpace */
        // this.initOneSquare()

    }

    checkTransformSpace(p:any){
        // 空间足够旋转(非硬性) && 旋转后位置足够 (this.state.subfaceModel.subface[0].length - p[0].length) < this.state.squareItem.left(此判断不严谨 需处理)
        if ((this.state.subfaceModel.subface.length - p.length) <  this.state.squareItem.top ||
            (this.state.subfaceModel.subface[0].length - p[0].length) < this.state.squareItem.left){
            this.state.tLock.cState = true;
            return;
        }
        // 获取当前快旋转后位置的横纵坐标
        let curSquareXY:any = [];
        for (let i = 0; i < p.length; i++){
            for (let j = 0; j < p[i].length ; j++){
                if (p[i][j] == 1){
                    curSquareXY.push(
                        [this.state.squareItem.left+j,this.state.squareItem.top + i]
                    )
                }
            }
        }
        // 获取当前块下一步位置的subFace上的值
        let subFacePosition = [];
        for (let i = 0; i < curSquareXY.length; i++){
            subFacePosition.push(
                this.state.subfaceModel.subface[curSquareXY[i][1]][curSquareXY[i][0]][0]
            )
        }
        // isTransform==true 不能旋转
        let isTransform:boolean = subFacePosition.includes(1);
        // console.log(isTransform);
        if (!isTransform){
            this.state.squareItem.square = p;
            /*3*/
            this.initOneSquare()
        }else {
            // 出现一次不能旋转后 锁定旋转操作 左右操作或新生成块是解锁
            this.state.tLock.cState = true;
        }
    }

    start(){
        //初始化一个方块
        this.initOneSquare();
        //启动下落
        this.timePromise = setInterval(() => this.autoSquareFalling(), this.state.timeInterval.interval);
    }

    checkNextSquareLocation(curSquareItem:any){
        // 触底
        if (curSquareItem.top >= (this.state.subfaceModel.subface.length - curSquareItem.square.length)) return 1;
        // 获取当前快下一步位置的横纵坐标
        let curSquareXY:any = [];
        for (let i = 0; i < curSquareItem.square.length; i++){
            for (let j = 0; j < curSquareItem.square[i].length ; j++){
                if (curSquareItem.square[i][j] == 1){
                    curSquareXY.push(
                        [curSquareItem.left+j,curSquareItem.top + i + 1]
                    )
                }
            }
        }
        // 获取当前块下一步位置的subFace上的值
        let subFacePosition = [];
        for (let i = 0; i < curSquareXY.length; i++){
            subFacePosition.push(
                this.state.subfaceModel.subface[curSquareXY[i][1]][curSquareXY[i][0]][0]
            )
        }
        let isDown = subFacePosition.indexOf(1);
        return isDown;
    }

    autoSquareFalling (){
        /*清空画布*/
        this.state.graphicalModel.subface = new GraphicalModels().subface;
        // let curSquareItem = this.state.squareItem;
        /*判断是否可以下降*/
        // 提取下一个方块位置信息
        let isDown =  this.checkNextSquareLocation(this.state.squareItem);
        this.state.squareItem.top += 1;
        if (isDown == -1){
            this.initOneSquare();
        }else {
            window.clearInterval(this.timePromise);
            // subface 修改数据
            // console.log(this.state.squareItem);
            {this.saveToSubfaceMap()}
            // 清空graphicalModel 创建新的方块
            {this.resetAndNewSquare()}
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

        // console.log(saveIndex);

        for (let k = 0 ; k < saveIndex.length;k++){
            this.state.subfaceModel.subface[saveIndex[k][0]][saveIndex[k][1]][0] = 1;
            this.state.subfaceModel.subface[saveIndex[k][0]][saveIndex[k][1]][1] = this.state.squareItem.color;
        }

        // 找出满足消除的行
        let allSubFaceValue:any = [];
        for (let i = 0; i < this.state.subfaceModel.subface.length; i++){
            let columnValue :any = [];
            for(let j = 0 ; j < this.state.subfaceModel.subface[0].length ; j++){
                columnValue.push(this.state.subfaceModel.subface[i][j][0]);
            }
            if (!columnValue.includes(0)){
                allSubFaceValue.push(i)
            }
        }

        // 删除行 添加新行
        for (let i = 0; i < allSubFaceValue.length ; i++) {
            this.state.subfaceModel.subface.splice(allSubFaceValue[i], 1);
            this.state.subfaceModel.subface.unshift(new GraphicalModels().subface[0]);
            this.state.point.curPoint +=100;
        }

        this.setState({
            subfaceModel:this.state.subfaceModel
        })
    }

    resetAndNewSquare(){
        let newGraphicalModel = new GraphicalModels();
        // let newSquareItem = createSquare();
        //1 将下一个块 赋予当前块
        let newSquareItem = this.state.nextSquareItem.nextSquare;
        this.state.graphicalModel.subface = newGraphicalModel.subface;
        this.state.squareItem.square = newSquareItem.square;
        this.state.squareItem.top    = newSquareItem.top;
        this.state.squareItem.left   = newSquareItem.left;
        this.state.squareItem.color  = newSquareItem.color;
        this.state.squareItem.type   = newSquareItem.type;
        //2 获取下一个块
        this.state.nextSquareItem.nextSquare = createSquare();
        this.initOneSquare();
        this.timePromise = setInterval(() => this.autoSquareFalling(), this.state.timeInterval.interval);

    }


    move(type:string){
        this.state.tLock.cState = true;
        this.state.graphicalModel.subface = new GraphicalModels().subface;
        if (type === 'left'){
            if (this.state.squareItem.left < 1) return;
            if(!this.checkAroundSquareLocation('left')) {
                this.state.squareItem.left -= 1;
            }

        }else if(type === 'right'){
            if (this.state.squareItem.left > (this.state.graphicalModel.subface[0].length - this.state.squareItem.square[0].length -1)) return;
            if(!this.checkAroundSquareLocation('right')) {
                this.state.squareItem.left += 1;
            }
        }

        this.initOneSquare();
    }

    checkAroundSquareLocation(type:string){
        // console.log(this.state.squareItem);
        // 获取当前快左右移动后位置的横纵坐标
        let curSquareXY:any = [];
        for (let i = 0; i < this.state.squareItem.square.length; i++){
            for (let j = 0; j < this.state.squareItem.square[i].length ; j++){
                if (this.state.squareItem.square[i][j] == 1){
                    curSquareXY.push(
                        [this.state.squareItem.left+j + (type === 'left' ? -1 : 1),this.state.squareItem.top + i]
                    )
                }
            }
        }
        // 获取当前块下一步位置的subFace上的值
        let subFacePosition = [];
        for (let i = 0; i < curSquareXY.length; i++){
            subFacePosition.push(
                this.state.subfaceModel.subface[curSquareXY[i][1]][curSquareXY[i][0]][0]
            )
        }
        // isMove==true 不能移动
        let isMove:boolean = subFacePosition.includes(1);
        // console.log(isMove);
        return isMove;
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
            tLock : {cState:false},
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
                <div key={'subFace' + i} style={{
                    position: 'absolute',
                    top: sideL * col,
                    left: sideL * row,
                    width: sideL,
                    height: sideL,
                    backgroundColor:color,
                    border:data[col][row][0] == 1 ? 'black solid thin' : 'black solid thin'
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
                <div key={'graphicalModel' + i} style={{
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
                {this.nextSquareShow()}
                {this.getPoint()}
                {this.createSubfaceMap()}
                {this.createGraphicalMap()}
            </div>
        )
    }

    nextSquareShow(){
        let data: any = [];
        for (let i = 0; i < 6; i++) {
            data.push([]);
            for (let j = 0; j < 6; j++) {
                data[i].push([0,'white'])
            }
        }

        let nextSquare = this.state.nextSquareItem.nextSquare.square;

        for (let j = 0; j < nextSquare.length; j++){
            for (let k = 0 ; k < nextSquare[0].length ; k++){
                if (nextSquare[j][k] == 1){
                    data[j+2][k+1][0] = 1;
                    data[j+2][k+1][1] = this.state.nextSquareItem.nextSquare.color
                }
            }
        }


        let rs: Array<object> = [];

        for (let i = 0; i < data.length * data[0].length; i++) {
            let col: number = parseInt((i / data[0].length).toString());
            let row: number = parseInt((i % data[0].length).toString());
            let sideL: number = 30;
            let color: string = data[col][row][1];
            rs.push(
                <div key={'graphicalModel' + i} style={{
                    position: 'absolute',
                    top: sideL * col,
                    left: 450 + sideL * row,
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

    getPoint(){
        // 处理分数达到一定值 底部随机添加一行
        if (this.state.point.curPoint >= 100){
            this.randomRow();
        }
        this.state.timeInterval.interval = (this.state.timeInterval.interval * (1 - this.state.point.curPoint / 1000 /100)) < 300 ? 300:(this.state.timeInterval.interval * (1 - this.state.point.curPoint / 1000 /100));
        console.log(this.state.timeInterval.interval)
        return <div className='point'>{this.state.point.curPoint}</div>
    }

    randomRow(){
        // 逻辑待处理 增加bool控制是否在1000分段内增加过 当前分数%1000
        this.state.subfaceModel.subface.splice(0,1);

        this.state.subfaceModel.subface.unshift();
    }

    componentWillUnmount() {
        clearInterval(this.timePromise);
    }
}

export default Subface
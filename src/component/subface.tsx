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

            }else if (e.key == ' '){
                this.move(' ');
            }
        });

        //初始化一个方块
        this.initOneSquare();
        //启动下落
        this.timePromise = setInterval(() => this.autoSquareFalling(), 300);

    }

    componentWillUnmount() {
        clearInterval(this.timePromise);
    }

    autoSquareFalling (){
        this.state.graphicalModel.subface = new GraphicalModels().subface;
        this.state.squareItem.top += 1;
        console.log(this.state.squareItem.top);
        if (this.state.squareItem.top>18){
            window.clearInterval(this.timePromise);
        }else {
            this.initOneSquare();
        }

    }

    // 初始化一个方块
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
    
    move(type:string){
        this.state.graphicalModel.subface = new GraphicalModels().subface;
        if (type === 'left'){
            this.state.squareItem.left -= 1;
        }else if(type === 'right'){
            this.state.squareItem.left += 1;
        }else if(type === ' '){

        }
        console.log(this.state.squareItem.left);
        console.log(this.state.squareItem);

        this.initOneSquare();
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
}

export default Subface
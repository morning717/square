import React from 'react';
import './subfaceStyle.less'
import GraphicalModels from "./graphicalModels";
import {createSquare} from "./squareType";

class Subface extends React.Component<any,any> {
    constructor(props: any) {
        super(props);
        this.createMap = this.createMap.bind(this);
        this.move = this.move.bind(this);
        this.state = {
            gmodel : new GraphicalModels(),
            squareItems:createSquare()
        }
         
    }

    componentDidMount() {

        window.addEventListener('keydown', (e)=> {
            if (e.key == 'ArrowLeft'){

            }else if(e.key == 'ArrowRight'){

            }
        })



        for (let j = 0 ; j < this.state.squareItems.square.length ; j++){
            for (let k = 0 ; k < this.state.squareItems.square[j].length ; k++){
                if (this.state.squareItems.square[j][k] == 1){
                    this.state.gmodel.subface[this.state.squareItems.top + j][this.state.squareItems.left + k][0] = 1;
                    this.state.gmodel.subface[this.state.squareItems.top + j][this.state.squareItems.left + k][1] = this.state.squareItems.color;
                }
            }
        }

        console.log(this.state.squareItems);
        this.setState({
            gmodel:this.state.gmodel
        })
    }


    
    move(index:number){
        this.setState({
            gmodel : this.state.gmodel
        })
    }

    createMap(): any {
        let data: any = this.state.gmodel.subface;
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

    render() {
        console.log(this.state.gmodel);
        return (
            <div>
                {this.createMap()}
            </div>
        )
    }
}

export default Subface
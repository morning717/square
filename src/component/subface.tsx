import React from 'react';
import './subfaceStyle.less'

class Subface extends React.Component<any,any>{
    constructor(props: any) {
        super(props);
        this.createMap = this.createMap.bind(this)
    }

    componentDidMount() {
        window.addEventListener('keydown',function (e) {
            // console.log(e);
            switch (e.key) {
                case 'ArrowLeft':{
                    console.log('左');
                }
                    break;
                case 'ArrowRight':{
                    console.log('右');
                }
                    break;
            }
        })
    }

    map(r:number,c:number){
        let data:any = [];
        for(let i = 0; i < r; i++){
            data.push([]);
            data[i].length = c;
            data[i].fill(0);
        }
        return data;
    }

    createMap():any {
        let data:any = this.map(15,20);
        let rs :Array<object> = [];
        for (let i = 0 ; i < data.length * data[0].length ; i++) {
            let row : number = parseInt((i / data[0].length).toString());
            let col : number = parseInt((i % data[0].length).toString());
            let sideL  : number = 30;
            rs.push(
                <div key={'subface' + i} style={{position:'absolute',top:sideL *col,left:sideL *row ,width:sideL,height:sideL,backgroundColor:'black',border:'red solid thin'}}></div>
            )
        }
        return rs;
    }

    render(){
        return(
            <div>
                {this.createMap()}
            </div>
        )
    }

}


export default Subface
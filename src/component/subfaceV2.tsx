import React from 'react';
import './subfaceStyle.less'

class SubfaceV2 extends React.Component<any,any>{
    constructor(props: any) {
        super(props);
        this.createMap = this.createMap.bind(this);
        this.sortList  = this.sortList.bind(this);
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
                <div key={'subfacev2' + i} style={{position:'absolute',top:sideL *col,left:sideL *row ,width:sideL,height:sideL,backgroundColor:'black',border:'red solid thin'}}></div>
            )
        }
        return rs;
    }

    render(){
        return(
            <div>
                {this.createMap()}
                {this.sortList("0.1G",'100M','0.001111T')}
            </div>
        )
    }

    sortList(r1:string,r2:string,r3:string) {
        let param: any = [this.format(r1), this.format(r2), this.format(r3)];
        let dict: any = {};
        let allKeys: any = [];
        param.map((item: any, index: number) => {
            dict[item[0][0]] = item[0][1];
            allKeys.push(
                item[0][0]
            )
        })

        let s: any;
        for (let i: number = 0; i < allKeys.length; i++) {
            for (let j: number = 0; j < allKeys.length; j++) {
                if (allKeys[j] > allKeys[j + 1]) {
                    s = allKeys[j];
                    allKeys[j] = allKeys[j + 1];
                    allKeys[j + 1] = s;
                }
            }
        }
        this.getInput(allKeys, param);
    }

    getInput(sortL:any,r:any){
        let rs : any = [];
        sortL.map((d:any,index:number)=>{
            r.map((rd:any,rindex:number)=>{
                if (d == r[rindex][0][0]){
                    rs.push(
                        r[rindex][0][1]
                    )
                }
            })
        })

        console.log(Array.from(new Set(rs)));
        console.log('验证 == ' + sortL);
    }

    format(r:string){
        let rs:any = [];
        let unit:string = r.substr(r.length-1,1);
        let num:number  = parseFloat(r.replace(/[^0-9 .]/ig,""));
        if (unit == "G"){
            num = num * 1000;
        }else if(unit == "T"){
            num = num * 1000 * 1000
        }
        rs.push(
            [num,r]
        )
        return rs;
    }
}


export default SubfaceV2
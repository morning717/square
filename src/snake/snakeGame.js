import React from "react";
import "./snake.less"

const boardWh = [600,600]
const snakeItemWh = [10,10]

export default class SnakeGame extends React.Component{

    constructor() {
        super();
        this.state = {
            snakeInfo:{
                width:snakeItemWh[0],
                height:snakeItemWh[1],
                body:[
                    {x:boardWh[0]/snakeItemWh[0]/2,y:boardWh[1]/snakeItemWh[1]/2, color:"#fff"},
                    {x:boardWh[0]/snakeItemWh[0]/2+1,y:boardWh[1]/snakeItemWh[1]/2,color:"#fff"},
                    {x:boardWh[0]/snakeItemWh[0]/2+2,y:boardWh[1]/snakeItemWh[1]/2,color:"#fff"},
                ],
                direction:"left",
            },
            foodInfo:{
                width:snakeItemWh[0],
                height:snakeItemWh[1],
                x:Math.floor(Math.random()*(boardWh[0]/snakeItemWh[0])),
                y:Math.floor(Math.random()*(boardWh[1]/snakeItemWh[1])),
                color:'#fff',
            },
            foodIsEat:false,
            lastDirection:"left",
            gameRunning:false,
            gameOver:false,
            gamePoint:0,
            // 移动速度控制
            timeInterval   : {interval:100},
        }
    }

    componentDidMount() {
        const snakeInfo = this.state.snakeInfo
        window.addEventListener('keydown', (e)=> {
            if (e.key === 'ArrowLeft' && snakeInfo.direction !== "right" && "left" !== this.state.lastDirection){
                snakeInfo.direction = "left"
            }else if(e.key === 'ArrowRight' && snakeInfo.direction !== "left" && "right" !== this.state.lastDirection){
                snakeInfo.direction = "right"
            }else if (e.key === 'ArrowDown' && snakeInfo.direction !== "up" && "down" !== this.state.lastDirection){
                snakeInfo.direction = "down"
            }else if (e.key === 'ArrowUp' && snakeInfo.direction !== "down" && "up" !== this.state.lastDirection){
                snakeInfo.direction = "up"
            }else if(e.key === ' '){
                this.gamePause()
            }
        });
    }

    gamePause(){
        if (this.state.gameRunning){
            clearInterval(this.timePromise)
            this.state.gameRunning = false
        }else {
            this.start()
        }
    }

    initFood(){
        const food = this.state.foodInfo
        let x = food.x
        let y = food.y

        if (this.state.foodIsEat){
            x = Math.floor(Math.random()*(boardWh[0]/snakeItemWh[0]))
            y = Math.floor(Math.random()*(boardWh[1]/snakeItemWh[1]))
            this.state.foodInfo.x = x
            this.state.foodInfo.y = y
            this.state.foodIsEat = false
        }

        const style = {
            width  : food.width  + "px",
            height : food.height + "px",
            background : food.color,
            position   : "absolute",
            top  : y*food.height + "px",
            left : x*food.width  + "px",
            border : 'black solid thin',
        }
        return <div key={"food"} style={style} />

    }

    initSnake(){
        const snakeBody = this.state.snakeInfo.body
        const snake = []
        for (let i = 0; i < snakeBody.length; i++) {
            snake.push(this.createSnakeSection(snakeBody[i].x,snakeBody[i].y,i,snakeBody[i].color))
        }
        return snake
    }

    createSnakeSection(x,y,index,color){
        const snakeInfo = this.state.snakeInfo
        const style = {
            width  : snakeInfo.width  + "px",
            height : snakeInfo.height + "px",
            background : color,
            position   : "absolute",
            top  : y*snakeInfo.height + "px",
            left : x*snakeInfo.width  + "px",
            border : 'black solid thin',
            borderRadius : index === 0 ? this.changeHeader(snakeInfo) : null,
        }
        return <div key={"snake" + index} style={style} />
    }

    changeHeader(snakeInfo){
        switch(snakeInfo.direction)
        {
            case "left":
                return "5px 0 0 5px"
            case "right":
                return "0 5px 5px 0 "
            case "up":
                return "5px 5px 0 0"
            case "down":
                return "0 0 5px 5px"
        }
    }

    autoRun(){
        const {body,direction} = this.state.snakeInfo
        const {x,y} = this.state.foodInfo

        for (let i = body.length - 1; i > 0; i--) {
            body[i].x = body[i-1].x
            body[i].y = body[i-1].y
            body[i].color = body[i-1].color
        }
        // 移动处理
        switch(direction)
        {
            case "left":
                body[0].x -= 1;
                this.state.lastDirection = "right"
                break;
            case "right":
                body[0].x += 1;
                this.state.lastDirection = "left"
                break;
            case "up":
                body[0].y -= 1;
                this.state.lastDirection = "down"
                break;
            case "down":
                body[0].y += 1;
                this.state.lastDirection = "up"
                break;
        }

        // 边界处理
        const isCross = this.isCrossBorder(body[0])
        // 吃到食物处理
        if (body[0].x === x &&  body[0].y === y){
            this.state.foodIsEat = true
            body.push({x:body[body.length-1].x,y:body[body.length-1].y,color: "#fff"})
        }
        // 吃到身体处理
        const isEatSelf = this.isEatSelfBody(body)

        this.state.gamePoint = body.length - 3

        if (!isCross && !isEatSelf){
            this.state.snakeInfo.body = body
            this.setState({
                snakeInfo:this.state.snakeInfo,
                lastDirection:this.state.lastDirection
            })
        }else {
            this.state.snakeInfo.body = [
                {x:boardWh[0]/snakeItemWh[0]/2,y:boardWh[1]/snakeItemWh[1]/2, color:"#fff"},
                {x:boardWh[0]/snakeItemWh[0]/2+1,y:boardWh[1]/snakeItemWh[1]/2,color:"#fff"},
                {x:boardWh[0]/snakeItemWh[0]/2+2,y:boardWh[1]/snakeItemWh[1]/2,color:"#fff"},
            ]
            this.state.snakeInfo.direction = "left"
            this.setState({
                snakeInfo:this.state.snakeInfo,
                lastDirection:this.state.lastDirection,
            })
        }
    }

    isCrossBorder(snakeHeader){
        if (snakeHeader.x < 0 || snakeHeader.x >= boardWh[0]/snakeItemWh[0] || snakeHeader.y < 0 || snakeHeader.y >= boardWh[1]/snakeItemWh[1]){
            clearInterval(this.timePromise)
            this.state.gameRunning = false
            this.state.gameOver = true
            return true
        }
        return false
    }

    isEatSelfBody(body){
        for (let i = 4 ; i < body.length; i++) {
            if (body[0].x === body[i].x && body[0].y === body[i].y){
                clearInterval(this.timePromise)
                this.state.gameRunning = false
                this.state.gameOver = true
                return true
            }
        }
        return false
    }

    start(){
        if (!this.state.gameRunning){
            this.setState({
                gameRunning :true,
                gamePoint:0,
                gameOver:false,
            })
            this.timePromise = setInterval(() => this.autoRun(), this.state.timeInterval.interval);
        }
    }

    render(){
        return (
            <div>
                <div id="board" className="board" style={{width:boardWh[0], height:boardWh[1]}}/>
                {this.initSnake()}
                {this.initFood()}
                {this.state.gameOver ? <div>游戏结束，菜鸡</div> : null }
                <div>得分：{this.state.gamePoint}</div>
            </div>
        )
    }
}

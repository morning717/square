import React, { Component } from 'react';
import jsplumb from 'jsplumb';
const jsPlumb = jsplumb.jsPlumb;



class Dotcon extends Component {
    componentDidMount(){
        jsPlumb.ready(function () {

            var endpointOptions = { isSource:true, isTarget:true };
            var window1Endpoint = jsPlumb.addEndpoint('window1', { anchor:"Top" }, endpointOptions );
            var window2Endpoint = jsPlumb.addEndpoint('window2', { anchor:"Top" }, endpointOptions );


            // jsPlumb.connect({
            //     source:window1Endpoint,
            //     target:window2Endpoint,
            //     paintStyle:{strokeWidth:1,stroke:'rgb(243,230,18)'},
            //     endpointStyle:{fill:'rgb(243,229,0)'},
            //     connector:'Flowchart',
            // });

            jsPlumb.connect({
                source:'window3',
                target:'window4',
                paintStyle:{ strokeWidth:10, stroke:'rgba(0, 0, 200, 0.5)' },
                anchors:["Right", "Left"],
                endpoint:[ "Rectangle", { width:10, height:8 } ]
            });
            jsPlumb.draggable("window3", {
                // grid:[50,50]
            });
            jsPlumb.draggable("window4", {
                // grid:[50,50]
            });
            // jsPlumb.connect({
            //     source:'window2',
            //     target:'window3',
            //     paintStyle:{strokeWidth:8, stroke:'rgb(189,11,11    )'},
            //     anchors:["Bottom", "Top"],
            //     endpoint:"Rectangle"
            // });
            // jsPlumb.connect({
            //     source:'window1',
            //     target:'window2',
            //     anchors:["Bottom", [0.75,0,0,-1]],
            //     paintStyle:{strokeWidth:1,stroke:'rgb(243,230,18)'},
            //     endpointStyle:{fill:'rgb(243,229,0)'}
            // });
            // var w23Stroke = 'rgb(189,11,11)';
            // jsPlumb.connect({
            //     source:'window2',
            //     target:'window3',
            //     paintStyle:{strokeWidth:8,stroke:w23Stroke},
            //     anchors:[[0.3,1,0,1], "Top"],
            //     endpoint:"Rectangle",
            //     endpointStyles:[{ gradient : {stops:[[0, w23Stroke], [1, '#558822']] }},
            //         { gradient : {stops:[[0, w23Stroke], [1, '#882255']] }}]
            // });
            // jsPlumb.connect({
            //     source:'window1',
            //     target:'window2',
            //     dragOptions:{
            //         cursor:'crosshair'
            //     }
            // });

        })
    }
    render() {
        let window1={
            position: 'absolute',
            height: '80px',
            width: '80px',
            border: '1px solid blue',
            color: 'blue',
            left:'100px',
            top:'100px'
        };
        let window2={
            position: 'absolute',
            height: '80px',
            width: '80px',
            border: '1px solid blue',
            color: 'blue',
            left:'350px',
            top:'100px'
        };
        let window3={
            position: 'absolute',
            height: '80px',
            width: '80px',
            border: '1px solid blue',
            color: 'blue',
            left:'550px',
            top:'100px'
        };
        let window4={
            position: 'absolute',
            height: '80px',
            width: '80px',
            border: '1px solid blue',
            color: 'blue',
            left:'750px',
            top:'300px'
        };
        return (
            <div className="Dotcon">
                <div id="window1" style={window1}></div>
                <div id="window2" style={window2}></div>
                <div id="window3" style={window3}></div>
                <div id="window4" style={window4}></div>
            </div>
        );
    }
}

export default Dotcon;



// class Dotcon extends Component {
//     componentDidMount(){
//         var common = {
//             isSource: true,
//             isTarget: true,
//             connector: ['Straight']
//         }
//         jsPlumbIn.ready(function () {
//             jsPlumbIn.connect({
//                 connector:'Flowchart',
//                 source: 'item_left',
//                 target: 'item_right',
//                 endpoint: 'Rectangle',
//                 paintStyle: { stroke: 'red', strokeWidth: 3 },
//                 endpointStyle: { fill: 'red', outlineStroke: 'darkgray', outlineWidth: 2 },
//                 overlays: [ ['Arrow', { width: 12, length: 12, location: 0.5 }] ]
//             })
//             jsPlumbIn.addEndpoint('item_left', {
//                 anchors: ['Right']
//             }, common)
//
//             jsPlumbIn.addEndpoint('item_right', {
//                 // anchor: 'Left'
//                 anchors:[
//                     [ "Perimeter", { shape:"Triangle" } ],
//                     [ "Perimeter", { shape:"Diamond" } ]
//                 ]
//             }, common)
//
//             jsPlumbIn.addEndpoint('item_right', {
//                 anchor: 'Right'
//             }, common)
//         })
//         jsPlumbIn.draggable('item_left')
//         jsPlumbIn.draggable('item_right')
//     }
//     render() {
//         let diagramContainer={
//             padding: '20px',
//             width: '80%',
//             height: '200px',
//             border: '1px solid gray'
//         };
//         let item={
//             position: 'absolute',
//             height: '80px',
//             width: '80px',
//             border: '1px solid blue',
//             color: 'blue',
//             float: 'left'
//         };
//         let leftPo={
//             position: 'absolute',
//             height: '80px',
//             width: '80px',
//             border: '1px solid blue',
//             color: 'blue',
//             float: 'left',
//             left:'150px'
//         };
//         return (
//             <div className="Dotcon" style={diagramContainer}>
//                 <div id="item_left" style={item}></div>
//                 <div id="item_right" style={leftPo}></div>
//             </div>
//         );
//     }
// }
//
// export default Dotcon;
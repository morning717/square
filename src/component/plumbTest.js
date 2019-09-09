import React, { Component } from 'react';
import jsplumb from 'jsplumb';
const jsPlumbIn = jsplumb.jsPlumb;

class Dotcon extends Component {
    componentDidMount(){
        var common = {
            isSource: true,
            isTarget: true,
            connector: ['Straight']
        }
        jsPlumbIn.ready(function () {
            jsPlumbIn.connect({
                connector:'Flowchart',
                source: 'item_left',
                target: 'item_right',
                endpoint: 'Rectangle',
                paintStyle: { stroke: 'red', strokeWidth: 3 },
                endpointStyle: { fill: 'red', outlineStroke: 'darkgray', outlineWidth: 2 },
                overlays: [ ['Arrow', { width: 12, length: 12, location: 0.5 }] ]
            })
            jsPlumbIn.addEndpoint('item_left', {
                anchors: ['Right']
            }, common)

            jsPlumbIn.addEndpoint('item_right', {
                anchor: 'Left'
            }, common)

            jsPlumbIn.addEndpoint('item_right', {
                anchor: 'Right'
            }, common)
        })
        jsPlumbIn.draggable('item_left')
        jsPlumbIn.draggable('item_right')
    }
    render() {
        let diagramContainer={
            padding: '20px',
            width: '80%',
            height: '200px',
            // border: '1px solid gray'
        };
        let item={
            position: 'absolute',
            height: '80px',
            width: '80px',
            border: '1px solid blue',
            color: 'blue',
            float: 'left'
        };
        let leftPo={
            position: 'absolute',
            height: '80px',
            width: '80px',
            border: '1px solid blue',
            color: 'blue',
            float: 'left',
            left:'150px'
        };
        return (
            <div className="Dotcon" style={diagramContainer}>
                <div id="item_left" style={item}></div>
                <div id="item_right" style={leftPo}></div>
            </div>
        );
    }
}

export default Dotcon;
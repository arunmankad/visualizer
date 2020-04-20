import React from 'react';

import {Tree, treeUtil} from 'react-d3-tree';
import axios from 'axios';
import DynamicSelect from './DynamicSelect';
import Draggable from 'react-draggable';
import { treeData, treeData2, mockFlatArray, debugData, individualShapesData } from './mockData';

const myTreeData = [
  {
    name: 'Duty Load',
    attributes: {
      type: 'Parameter',
      comp_type: 'dropdown',
      values: '2100,2500,2800'
    },
    children: [
      {
        name: 'Level 2: A',
        attributes: {
          keyA: 'val A',
          keyB: 'val B',
          keyC: 'val C',
        },
      },
      {
        name: 'Level 2: B',
      },
    ],
  },
];
const arrayOfData = [
  {
    id: '1 - Jerry',
    name: 'Jerry'    
  },
  {
    id: '2 - Elaine',
    name: 'Elaine'    
  },
  {
    id: '3 - Kramer',
    name: 'Kramer'    
  },
  {
    id: '4 - George',
    name: 'George'    
  },
];
class MyTree extends React.Component {
  constructor(){
    super();
    this.state = {
      data: treeData,
      url: '',
      urlData: {},
      propertiesFromUrlData:[],
      nodeSvgShape: {
        shape: 'circle',
        shapeProps: {
          r: 10,
        },
      },
      // pathFunc: (d, orientation) => orientation && `M${d.source.y},${d.source.x}V${d.target.x}H${d.target.y}`,
      circleRadius: undefined,
      orientation: 'vertical',
      translateX: 200,
      translateY: 300,
      collapsible: true,
      initialDepth: 1,
      depthFactor: undefined,
      zoomable: true,
      zoom: 1,
      scaleExtent: { min: 0.1, max: 1 },
      separation: { siblings: 1, nonSiblings: 2 },
      nodeSize: { x: 140, y: 140 },
      transitionDuration: 500,
      styles: {
        links: {
          stroke: '#ffffff',
          strokeWidth: 1,
        },
        nodes: {
          node: {
            name: {
              stroke: '#ffffff',
              fill: '#ffffff',
              strokeOpacity: "0",
            },
            circle: {
              stroke: '#a9a9a9',
              strokeOpacity: "0",
              fill: '#52e2c5',
            },
            attributes: {
              stroke: 'transparent',
              fill: '#a9a9a9',
            },
          },
          leafNode: {
            name: {
              stroke: 'transparent',
              fill: '#ffffff'
            },
            circle: {
              fill: '#52e2c5',
              strokeOpacity: "0",
            },
            attributes: {
              stroke: 'transparent',
              fill: '#ffffff',
            },
          },
        },
      },
      settingsStateOpen: false,
      settingsContainerMinWidth: 0
    };
    this.setTreeData = this.setTreeData.bind(this);
    this.setTreeDataFromFlatArray = this.setTreeDataFromFlatArray.bind(this);
  
    this.setOrientation = this.setOrientation.bind(this);
  }
  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translateX: dimensions.width / 2.5,
      translateY: dimensions.height / 4,
    });
  }
  setTreeData(data) {
    console.log(data)
    this.setState({ data });
  }
  setTreeDataFromFlatArray(flatArray) {
    // this.setState({
    //   ...this.state.data
    // })
    // const data = treeUtil.generateHierarchy(flatArray);
    // console.log(data);
    // this.setState({ data });
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translateX: dimensions.width / 2.5,
      translateY: dimensions.height / 4,
    });
  }
  setOrientation(orientation) {
    this.setState({ orientation });
  }
  getDataFromUrl = ()=>{
    if(this.state.url){
      axios.get(this.state.url)
      .then(res => {
        const urlData = res.data;
        this.setState({ urlData });
        this.processPropertyData(urlData)
      })
    }else{
      alert('url blank!')
    }
    
  }
  handleChange = event => {
    this.setState({ url: event.target.value });
  };
  handleSelectChange = async (selectedValue) =>{
    alert(selectedValue)
    const selectedParameter = this.state.urlData.data.parameters[selectedValue];
    // console.log('selected paramter', selectedParameter);
    const treeAray = [];
    const tempObj = {};
    tempObj.name = selectedParameter.label;
    tempObj.attributes = {
      keyA: selectedParameter.label,
      //  ... selectedParameter
    }
     tempObj.children = await this.getRulesForPropertiesAsChildNode(selectedParameter); 
    treeAray.push(tempObj);
    // console.log(treeAray);
    this.setState({
      data: treeAray
    });
  }
  handleGraphClick = (nodeData, evt)=>{
    console.log("nodeData", nodeData);
    console.log("evt",evt);
  }
  handleClick = () => {
    // alert("cool" + index);
    // this.props.save();
    if (this.state.settingsStateOpen) {
      this.setState({
        settingsStateOpen: false,
        settingsContainerMinWidth: 0
      });
    } else {
      this.setState({
        settingsStateOpen: true,
        // settingsContainerMinWidth: 100
      });
      // this.scrollToMyRef();
      // if()
      // console.log("MYREF", this.myRef.current);
    }
  };
  getRulesForPropertiesAsChildNode =  (selectedParameter)=>{
    //  return [
    //   {
    //     name: "Rule Id: 2193"
    //   },
    //   {
    //     name: "Rule Id: 2194"
    //   },
    //   {
    //     name: "Rule Id: 2195"
    //   },
    //   {
    //     name: "Rule Id: 2196"
    //   },
    //   {
    //     name: "Rule Id: 2197"
    //   },
    //   {
    //     name: "Rule Id: 2198"
    //   }

    // ]
    // ------------------------------------------
    // return [
    //   {
    //     name: "Rule: "+selectedParameter.rId[0],
    //     nodeSvgShape:  {
    //       shape: 'rect',
    //       shapeProps: {
    //         width: 20,
    //         height: 20,
    //         x: -10,
    //         y: -10,
    //       },
    //     },
    //     attributes: {
    //       keyA: 'val A',
    //       keyB: 'val B',
    //       keyC: 'val C',
    //     },
    //     children: [
    //       {
    //         name: 'Son of A',
    //         nodeSvgShape:  {
    //           shape: 'rect',
    //           shapeProps: {
    //             width: 20,
    //             height: 20,
    //             x: -10,
    //             y: -10,
    //           },
    //         },
    //         attributes: {
    //           keyA: 'val A',
    //           keyB: 'val B',
    //           keyC: 'val C',
    //         },
    //       },
    //       {
    //         name: 'Daughter of A',
    //         attributes: {
    //           keyA: 'val A',
    //           keyB: 'val B',
    //           keyC: 'val C',
    //         },
    //       },
    //       {
    //         name: 'Son of A',
    //         nodeSvgShape:  {
    //           shape: 'rect',
    //           shapeProps: {
    //             width: 20,
    //             height: 20,
    //             x: -10,
    //             y: -10,
    //           },
    //         },
    //       },
    //       {
    //         name: 'Daughter of A',
    //       },
    //     ],
    //   },
    //   {
    //     name: 'Level 2: B',
    //     children: [
    //       {
    //         name: 'Son of B',
    //         nodeSvgShape:  {
    //           shape: 'rect',
    //           shapeProps: {
    //             width: 20,
    //             height: 20,
    //             x: -10,
    //             y: -10,
    //           },
    //         },
    //       },
    //       {
    //         name: 'Daughter of B',
    //         nodeSvgShape:  {
    //           shape: 'rect',
              
    //           shapeProps: {
    //             fill: '#ff0000',
    //             width: 20,
    //             height: 20,
    //             x: -10,
    //             y: -10,
    //           },
    //         },
    //       },
    //     ],
    //   },
    // ];
    
    const childrenArray = [];
    // let ruleObj = {};
    alert(selectedParameter.rId.length);
    for(let i=0; i<selectedParameter.rId.length; i++){
      let ruleObj = {};
      ruleObj.name = "Rule Id: "+selectedParameter.rId[i];
      ruleObj.attributes = {
        action: this.state.urlData.data.rules[selectedParameter.rId[i]].action,
      //  ...this.state.urlData.data.rules[selectedParameter.rId[i]]
       };
      
      childrenArray.push(ruleObj);
    }
    
    return childrenArray;
  }
  processPropertyData = (rawData) => {
    console.log(rawData.data.parameters);
    const propertyArray = [];
    if(!this.isEmpty(rawData.data.parameters)){
      for (let key in rawData.data.parameters) {
        let value = rawData.data.parameters[key];
        propertyArray.push({
          id: key,
          ...value
        })
      }
      this.setState({
        propertiesFromUrlData: propertyArray
      })
    } else {
      alert('parameters Object Empty!')
    }
  }
  isEmpty = (obj)=>{
    console.log('OBJ', obj);
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }
  render() {
    return (
      <div className="demo-container">
         
        <div className="column-right">
          <div ref={tc => (this.treeContainer = tc)} className="tree-container">
            <Tree data={this.state.data}
             orientation={this.state.orientation}
             onClick={this.handleGraphClick}
             translate={{ x: this.state.translateX, y: this.state.translateY }}
             styles={this.state.styles} />
          </div>
        </div>
        <Draggable >
         
          <div className='container-pbi-box'
            // onClick={this.handleClick}
            style={{
              height: this.state.settingsStateOpen ? 300 : 40,
              minWidth: `${this.state.settingsContainerMinWidth}%`,
              backgroundColor:'transparent',
              overflow:this.state.settingsStateOpen ? 'scroll':'hidden'
        
            }}
          >
           <div>
          <button onClick={this.handleClick}>Settings</button>
          </div>
         
            <div style={{
              display: this.state.settingsStateOpen ? 'block' : 'none'
            }} className="prop-container">
                {/* <h2 className="title">React D3 Tree</h2>
                <h3 className="title">v</h3> */}
                <span className="prop">Examples</span>
                <div style={{ marginBottom: '5px' }}>
                  <button
                    type="button"
                    className="btn btn-controls btn-block"
                    onClick={() => this.setTreeData(debugData)}
                  >
                    Debug
                  </button>
                  <input
                  type="text"
                   name="url"
                   value={this.state.url}
                   onChange={this.handleChange}
                   ></input>
                  <button
                    type="button"
                    className="btn btn-controls btn-block"
                    onClick={this.getDataFromUrl}
                  >
                    Get Data!
                  </button>
                  <DynamicSelect arrayOfData={this.state.propertiesFromUrlData} onSelectChange={this.handleSelectChange} />
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-controls btn-block"
                    onClick={() => this.setTreeData(treeData2)}
                  >
                    Simple B
                  </button>
                  <button
                    type="button"
                    className="btn btn-controls btn-block"
                    onClick={() => this.setTreeData(individualShapesData)}
                  >
                    Individual Node Shapes
                  </button>
                  <button
                    type="button"
                    className="btn btn-controls btn-block"
                    onClick={() => this.setTreeDataFromFlatArray(mockFlatArray)}
                  >
                    From Flat Array
                  </button>
                </div>
            </div>
         
            <div
             style={{
              display: this.state.settingsStateOpen ? 'block' : 'none'
            }}
             className="prop-container">
                    <span className="prop">Orientation</span>
                    <button
                      type="button"
                      className="btn btn-controls btn-block"
                      onClick={() => this.setOrientation('horizontal')}
                    >
                      {'Horizontal'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-controls btn-block"
                      onClick={() => this.setOrientation('vertical')}
                    >
                      {'Vertical'}
                    </button>
              </div>
          </div>
        </Draggable>
      </div>
    );
  }
}

export default MyTree;
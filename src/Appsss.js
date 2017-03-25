import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import { Container, Row, Col} from 'react-grid-system';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
const tableHeight="300px";
class SubmitButtonProgress extends Component{
  state={
    err:"",
    success:"",
    waitingResponse:false
  }
  submit=()=>{
    const {handleSubmit}=this.props;
    const msToWait=3000;
    this.setState({waitingResponse:true});
    handleSubmit((err, res)=>{
      if(err){
        this.setState({
          err:"Error!",
          success:"",
          waitingResponse:false
        }, ()=>{
          setTimeout(()=>{
            this.setState({
              err:""
            })
          }, msToWait)
        })
      }
      else{
        this.setState({
          success:"Success!",
          err:"",
          waitingResponse:false
        }, ()=>{
          setTimeout(()=>{
            this.setState({
              success:""
            })
          }, msToWait)
        })
      }
    })
  }
  render(){
    const {success, err, waitingResponse}=this.state;
    return(
      err?<RaisedButton secondary onTouchTap={this.submit} label={err}/>:
      success?<RaisedButton primary onTouchTap={this.submit} label={success}/>:
      waitingResponse?<CircularProgress/>:<RaisedButton primary onTouchTap={this.submit} label="Submit"/>
    )
  }
}
SubmitButtonProgress.propTypes={
  handleSubmit:React.PropTypes.func.isRequired
}
const RenderStepActions=({step, maxStep, handleStepChange})=>
<div style={{margin: '12px 0'}}>
  {step<(maxStep-1) && (<RaisedButton
    label="Next"
    disableTouchRipple={true}
    disableFocusRipple={true}
    primary={true}
    onTouchTap={()=>{return handleStepChange(step+1);}}
    style={{marginRight: 12}}
  />)}
  {step > 0 &&  (
    <FlatButton
      label="Back"
      disableTouchRipple={true}
      disableFocusRipple={true}
      onTouchTap={()=>{return handleStepChange(step-1);}}
    />
  )}
</div>
RenderStepActions.propTypes={
  step:React.PropTypes.number.isRequired,
  maxStep:React.PropTypes.number.isRequired,
  handleStepChange:React.PropTypes.func.isRequired
}


const RemovableTable=({rows, undo, delF, colNames, title, height})=>{
  const cols=rows.length>0?Object.keys(rows[0]):"";
  colNames=colNames?colNames:cols;
  const numCols=colNames.length;
  return(
    <Table selectable={false} height={height?height:"inherit"}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
         {title?<TableRow>
          <TableHeaderColumn colSpan={colNames.length+1}  style={{textAlign: 'center'}}>
            {title}
          </TableHeaderColumn>
        </TableRow>:""}
        <TableRow>
          {colNames.map((val, index)=>{
            return <TableHeaderColumn key={index}>{val}</TableHeaderColumn>
          })}
          
          <TableHeaderColumn></TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {rows.map((val, index)=>{
          return(
            <TableRow key={index}>
              {val.undo?
              <TableRowColumn><FlatButton label="Undo" onTouchTap={()=>{undo(val.key)}}/></TableRowColumn>:
              cols.filter((v, index)=>index<numCols).map((keys, index)=>{
                return <TableRowColumn key={index}>{val[keys]}</TableRowColumn>
              })}
              {val.undo?"":
              <TableRowColumn><ActionDelete onClick={()=>delF(val)}/> </TableRowColumn>}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
RemovableTable.propTypes={
  rows:React.PropTypes.array.isRequired,
  delF:React.PropTypes.func.isRequired,
  colNames:React.PropTypes.array,
  title:React.PropTypes.string,
  height:React.PropTypes.string
}
const SelectableTable=({rows, rowF, colNames, title, height})=>{
  const cols=rows.length>0?Object.keys(rows[0]):"";
  colNames=colNames?colNames:cols;
  const numCols=colNames.length;
  return(
    <Table multiSelectable={true} onRowSelection={rowF} height={height?height:"inherit"}>
      
      <TableHeader >
        {title?<TableRow>
          <TableHeaderColumn colSpan={colNames.length}  style={{textAlign: 'center'}}>
            {title}
          </TableHeaderColumn>
        </TableRow>:""}
        <TableRow>
          {colNames.map((val, index)=>{
            return <TableHeaderColumn key={index}>{val}</TableHeaderColumn>
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((val, index)=>{
          return(
            <TableRow key={index}>
              {cols.filter((val, index)=>index<numCols).map((keys, index)=>{
                
                return <TableRowColumn key={index}>{val[keys]}</TableRowColumn>
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );

}
SelectableTable.propTypes={
  rows:React.PropTypes.array.isRequired,
  rowF:React.PropTypes.func.isRequired,
  colNames:React.PropTypes.array,
  title:React.PropTypes.string,
  height:React.PropTypes.string
}
const Scope=({selectedWorkpaper, risks, workpapers, onScopeUndo, handleSelect, handleAdd, handleSubmit, handleText, handleDelete, handleRating})=>{
    return(
      <Container>
        <Row>
          <Col xs={12} xl={4}>
            <TextField floatingLabelText="Risk" onChange={handleText} />
          </Col>
          <Col xs={12} xl={4}>
            <SelectField
              floatingLabelText="Workpaper"
              value={selectedWorkpaper}
              onChange={handleSelect}
            >
              {workpapers.map((val, index)=>{
                return(<MenuItem key={index} value={val.title} primaryText={val.title} />);
              })}
            </SelectField>
          </Col>
          <Col xs={12} xl={4}>
            <TextField floatingLabelText="Rating" onChange={handleRating}/>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <RaisedButton primary onTouchTap={handleAdd} label="Add"/>
          </Col>
        </Row>
        <Row>
          <RemovableTable rows={risks.data} undo={onScopeUndo} delF={handleDelete} colNames={risks.colname} height={tableHeight}/>
        </Row>
        <Row>
          <Col>
            <SubmitButtonProgress handleSubmit={handleSubmit}/>
          </Col>
        </Row>
      </Container>
    )
}

const SkillsAssessment =({selectedSkills, onSkillUndo, skillOptions, capableResources, handleSelect, handleDelete, handleRowSelect, handleSubmit})=>{
return(
  <Container>
    <Row>
      <Col xs={12}>
        <SelectField
            floatingLabelText="Skills"
            onChange={handleSelect}
          >
          {skillOptions.map((val, index)=>{
            return <MenuItem key={index} value={val.key} primaryText={val.val} />;
          })}
        </SelectField>
      </Col>
    </Row>
    <Row>
      <Col sm={6}>
        <RemovableTable rows={selectedSkills.data} undo={onSkillUndo} delF={handleDelete} colNames={selectedSkills.colname} title="Skills required for validation" height={tableHeight}/>
      </Col>
      <Col sm={6}>
        <SelectableTable rows={capableResources.data} rowF={handleRowSelect} colNames={capableResources.colname} title="People who have the skills" height={tableHeight} />
      </Col>
    </Row>
    <Row>
      <Col>
        <SubmitButtonProgress handleSubmit={handleSubmit}/>
      </Col>
    </Row>
  </Container>
);
}

const ValidationWork=({step, nodeArray})=>{ 
  return nodeArray[step];
}

const ValidationFlow=({handleStepChange, step, maxStep, contents})=>{
  return (
      <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
        <Stepper
          activeStep={step}
          linear={false}
          orientation="vertical"
        >
        {contents.map((val, index, arr)=>{
          const {title, text}=val;
          return(
            <Step key={index}>
              <StepButton onTouchTap={() => handleStepChange(index)}>
                {title}
              </StepButton>
              <StepContent>
                <p>
                  {text}
                </p>
                <RenderStepActions step={index} maxStep={maxStep} handleStepChange={handleStepChange}/>
              </StepContent>
            </Step>
          );
        })}
        </Stepper>
      </div>
  );
}


const contents=[
  {
    title:"Skill Assessment",
    text:"Enter the skills required and find applicable talent"
  },
  {
    title:"Scope",
    text:"Use risk based scoping"
  },
  {
    title:"Workpapers",
    text:"Fill out workpapers according to scope"
  },
  {
    title:"Issues",
    text:"Write issues"
  }
]
const skillOptions=[
  {val:"Stochastic Calculus",key:0, selected:false},
  {val:"BSA/AML",key:1, selected:false},
  {val:"Logistic Regression",key:2, selected:false},
]
const workpapers=[
  {
    title:"Theory and Developmental Evidence"
  },
  {
    title:"Outcomes Analysis"
  }
]
const capableResources={colname:["Name"], data:[{name:"Daniel"}, {name:"Terrance"}, {name:"Thomas"}]};
class App extends Component {
  maxStep=contents.length;
  state={
    step:0,
    selectedSkills:{colname:["Skills"], data:skillOptions},
    risks:{colname:["Workpaper", "Risk", "Rating"], data:[]},
    selectedRisk:"",
    selectedWorkpaper:"",
    selectedRating:0
  }
  handleStepChange=(step)=>{
    if(step>=0 &&step<=this.maxStep){
      this.setState({step:step});
    }
  }
  handleSkillSelect=(e, i, v)=>{
    console.log(v);
    this.trulyDeleteSkill(()=>{
      this.setState((prevState, prevProps)=>{
        const {data, colname}=prevState.selectedSkills;
        return Object.assign(prevState,{
            selectedSkills:{data:data.map((val, index)=>{
              return val.key===v?Object.assign(val, {selected:true}):val;
            }), colname:colname}});
      })});
  }
  trulyDeleteSkill=(cb)=>{
    this.setState((prevState, prevProps)=>{
      const {data, colname}=prevState.selectedSkills;
      return Object.assign(prevState,{
        selectedSkills:{data:data.map((val)=>val.undo?Object.assign(val, {undo:false,selected:false}):val), colname:colname},
      })
    }, cb);
  }
  onSkillUndo=(v)=>{
    this.setState((prevState, prevProps)=>{
      const {data, colname}=prevState.selectedSkills;
      return Object.assign(prevState,{
        selectedSkills:{data:data.map((val)=>val.key===v?Object.assign(val, {undo:false,selected:true}):val), colname:colname},
      })
    });
  }
  handleSkillDelete=(v)=>{
    this.setState((prevState, prevProps)=>{
      const {data, colname}=prevState.selectedSkills;
      return Object.assign(prevState,{
        selectedSkills:{data:data.map((val)=>val.key===v.key?Object.assign(val, {undo:true}):val), colname:colname},//.concat([v]),
      })
    });
  }
  
  handleSkillSubmit=(cb)=>{
    console.log("Put API call here");
    setTimeout(()=>{
      cb(null, "result")
    }, 3000);
  }
  handleSkillRowSelect=(selectedRows)=>{
    console.log(selectedRows);
  }
  handleScopeSelect=(e, i, v)=>{
    this.setState({selectedWorkpaper:v})
  }
  handleScopeText=(e, v)=>{
    this.setState({selectedRisk:v});
  }
  handleScopeRating=(e, v)=>{
    this.setState({selectedRating:v});
  }
  handleScopeSubmit=(cb)=>{
    console.log("Put API call here");
    setTimeout(()=>{
      cb(null, "result")
    }, 3000);
  }
  handleScopeAdd=()=>{
    this.trulyDeleteScope(()=>{
      this.setState((prevState, props)=>{
        const {data, colname}=prevState.risks;
        const value={workpaper:prevState.selectedWorkpaper, risk:prevState.selectedRisk, rating:prevState.selectedRating, selected:true};
        return Object.assign(prevState,
          {
            risks:{data:data.concat([value]), colname:colname}
          }
        )
      })
    });
  }
  trulyDeleteScope=(cb)=>{
    this.setState((prevState, prevProps)=>{
      const {data, colname}=prevState.risks;
      return Object.assign(prevState,{
        risks:{data:data.filter((val)=>!val.undo), colname:colname},
      })
    }, cb);
  }
  handleScopeDelete=(v)=>{
    console.log(v);
    this.setState((prevState)=>{
      const {data, colname}=prevState.risks;
      return Object.assign(prevState,
        {
          risks:{data:data.map((val)=>val.risk===v.risk?Object.assign(val, {undo:true}):val), colname:colname}
        } 
      )
    })
  }
  onScopeUndo=(v)=>{
    this.setState((prevState, prevProps)=>{
      const {data, colname}=prevState.risks;
      return Object.assign(prevState,{
        risks:{data:data.map((val)=>val.Risk===v?Object.assign(val, {undo:false,selected:true}):val), colname:colname},
      })
    });
  }
  render() { //{renderSomethingOnPageTemp(step)}
    const {step, selectedSkills, risks, selectedWorkpaper}=this.state;
    const subsetSkills={data:selectedSkills.data.filter((val)=>val.selected), colname:selectedSkills.colname};
    const skillOptions=selectedSkills.data.filter((val)=>!val.selected);
    const subsetRisk={data:risks.data.filter((val)=>val.selected), colname:risks.colname};
    const componentPerItem=[
      <SkillsAssessment onSkillUndo={this.onSkillUndo} selectedSkills={subsetSkills} skillOptions={skillOptions} capableResources={capableResources} handleSelect={this.handleSkillSelect} handleDelete={this.handleSkillDelete} handleRowSelect={this.handleSkillSelect} handleSubmit={this.handleSkillSubmit}/>,
      <Scope selectedWorkpaper={selectedWorkpaper} onScopeUndo={this.onScopeUndo} risks={subsetRisk} workpapers={workpapers} handleSelect={this.handleScopeSelect} handleSubmit={this.handleScopeSubmit} handleAdd={this.handleScopeAdd} handleText={this.handleScopeText} handleDelete={this.handleScopeDelete} handleRating={this.handleScopeRating} />,
      <p>
        On step {step}
      </p>,
      <p>
        On step {step}
      </p>
    ];
    return (
      <MuiThemeProvider>
        <Container>
          <Row>
            <Col sm={4}>
              <ValidationFlow contents={contents} maxStep={this.maxStep} handleStepChange={this.handleStepChange} step={step}/>
            </Col>
            <Col sm={8}>
              <Paper  zDepth={1} style={{marginTop:25, paddingBottom:15}}>
                <ValidationWork 
                  step={step} 
                  nodeArray={componentPerItem} 
                />
              </Paper>
            </Col>

          </Row>
        </Container>
      </MuiThemeProvider>
    );
  }
}

export default App;

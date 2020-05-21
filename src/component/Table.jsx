import React, {useState} from 'react';
import './Table.scss';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
const axios = require('axios');


const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: value => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});
export default class StickyHeadTable extends React.Component {
  // let allInformation = props.allData;
  constructor() {
    super();
    this.state = {
         allStates: [],
         allData: [],
         filteredStateData: '',
         uniqueStateList: '',
         dataToShowTable:'',
         allDistrictData:[],
         allDistrictList: '',
         selectedDistrictData: '',
         openPopupModal: false,
         searchedDist:'',
    };
  }

  componentDidMount(){

  }

  componentWillReceiveProps(props){
    console.log('props:::::::::', props.allData)
    let validListData =  props.allData && props.allData.filter((element, i)=>{
      return element.detectedstate !== '';
    })
    this.setState({allData: validListData, dataToShowTable: validListData })

    let data = [];
    props.allData && props.allData.map((element, i)=>{
    if(element.detectedstate){
      data.push(element.detectedstate)
    }
  })
  var uniqueAndSorted = [...new Set(data)].sort()
  this.setState({uniqueStateList: uniqueAndSorted})
  }

   filterState = (e) => {
    let filteredStateData = this.state.allData && this.state.allData.filter((element,i)=>{
      return element.detectedstate == e;
    })
    if(e == 'none'){
      this.setState({dataToShowTable: this.state.allData})
      }else{
        this.setState({dataToShowTable: filteredStateData})
      }
      this.getDistrictData(e)
  }

  filterDistrict = (e) => {
    if(e == 'none'){
      this.setState({openPopupModal:false, selectedDistrictData:'', searchedDist:''})
      return;
    }
    console.log('district to get data::::::::', e,  this.state.allDistrictData.districtData[e])
    this.setState({selectedDistrictData: this.state.allDistrictData.districtData[e], openPopupModal:true, searchedDist:e})
  //   if(e == 'none'){
  //     this.setState({dataToShowTable: this.state.allData})
  //     }else{
  //       this.setState({dataToSho})
  // }
}

  getDistrictData = (stateName) => {
    // this.setState({loader:true})
    console.log('tgs called function', stateName)
    axios.get('https://api.covid19india.org/state_district_wise.json')
        .then((response) => {
            // handle success
            console.log('tgs data res::::::::',stateName, response.data[stateName], Object.keys(response.data[stateName].districtData))
            this.setState({ allDistrictData: response.data[stateName], loader: false, allDistrictList: Object.keys(response.data[stateName].districtData)},()=>{
              console.log('district data::::::', this.state.allDistrictData)
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}

    render(){
      const self = this;
      return (
        <Paper style={{width:'100%'}}>
          <div className="parent-filter-box" style={{display:'flex', background: 'radial-gradient(#fc910b, #e63d3a)', justifyContent:'flex-end', alignItems:'center'}}>
            <div className="inner-filter-box">
            <span style={{fontSize:'14px', marginRight:'5px', color:'#fff'}}>State:- </span> 
              <select style={{marginBottom: '5px', marginTop: '5px', marginRight: '5px'}} id="stateList" onChange={(e) => this.filterState(e.target.value)}>
              <option value="none">No Selected</option>
                {this.state.uniqueStateList && this.state.uniqueStateList.map((element, i)=>{
                  return <option value={element}>{element}</option>
                })}
              </select>
            </div>
            <div className="inner-filter-box">
            <span style={{fontSize:'14px', marginRight:'5px', color:'#fff'}}>District:- </span> 
              <select disabled={this.state.allDistrictList?'':'disabled'} style={{marginBottom: '5px', marginTop: '5px', marginRight: '5px'}} id="stateList" onChange={(e) => this.filterDistrict(e.target.value)}>
              <option value="none">No Selected</option>
                {this.state.allDistrictList && this.state.allDistrictList.map((element, i)=>{
                  return <option value={element}>{element}</option>
                })}
              </select>
            </div>
            </div>
            
          <TableContainer style={{maxHeight:'440px'}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Patient No:</TableCell>
                  <TableCell align="right">State</TableCell>
                  <TableCell align="right">Confirmed on</TableCell>
                  <TableCell align="right">discharged_on</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Travel From</TableCell>
                </TableRow>
              </TableHead>
    
              <TableBody>
                {this.state.dataToShowTable && this.state.dataToShowTable.map(row => (
                  <TableRow key={row.patientnumber}>
                    <TableCell component="th" scope="row">{row.patientnumber}</TableCell>
                    <TableCell align="right">{row.detectedstate}</TableCell>
                    <TableCell align="right">{row.dateannounced}</TableCell>
                    <TableCell align="right">{row.statuschangedate}</TableCell>
                    <TableCell align="right">{row.currentstatus}</TableCell>
                    <TableCell align="right">{row.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {this.state.openPopupModal ? 
                    <div id="myModal" className="modal">
          <div className="modal-content">
          <div className="modal-header">
            <span className="close" onClick={()=>this.setState({openPopupModal:false})}>&times;</span>
          <h2>{this.state.searchedDist && this.state.searchedDist}</h2>
          </div>
          <div className="modal-body">
            <div className="cc-box">
            <span>Confirmed Cases:- </span>
            <span>{this.state.selectedDistrictData.confirmed}</span>
            </div>
          </div>
          {/* <div className="modal-footer">
            <h3>Modal Footer</h3>
          </div> */}
          </div></div>:''}
        </Paper>
      );
    } 
}

import React from 'react';
import './style.scss';
import '../../common.scss';
import SimpleCard from '../../component/Card';
import SimpleTable from '../../component/Table';
import Piechart from '../../component/charts/pieCharts';
import BarChart from '../../component/charts/barChart';
import DoughnutChart from '../../component/charts/Doughnut Chart';
import DynamicLineChart from '../../component/charts/Dynamic Line Chart';
import StackedBarChart from '../../component/charts/Stacked Bar Chart';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import DateRangeIcon from '@material-ui/icons/DateRange';
import LinkIcon from '@material-ui/icons/Link';
import HouseIcon from '@material-ui/icons/House';
import MetaTags from 'react-meta-tags';
var loader = require('../../assets/loader_main.gif')
var logo = require('../../assets/covid_logo.png')

const axios = require('axios');

var cors_api_url = 'https://cors-anywhere.herokuapp.com/';


class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            dataHtml: '',
            coronaDataArray: '',
            hossData: '',
            loader1: true,
            loader2: true,
            coronaOverViewData: '',
            tabsValue: 0,
            todayAllTested:'',
            todayCases:'',
        };
    }


    componentDidMount() {
        this.getCoronaData();
        this.getCoronaOverViewData();
        this.todayConfirmedCases();
        // this.getData()
    }

    getCoronaData = () => {
        this.setState({loader1:true})
        console.log('tgs called function')
        axios.get('https://api.covid19india.org/raw_data.json')
            .then((response) => {
                // handle success
                console.log('tgs data res::::::::', response.data.raw_data)
                this.setState({ coronaDataArray: response.data.raw_data, loader1: false })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    todayConfirmedCases = () => {
        // this.setState({loader1:true})
        console.log('tgs called function')
        axios.get('https://api.covid19india.org/data.json')
            .then((response) => {
                // handle success
                console.log('tgs data res:2323232:::::::', response.data)
                this.setState({ todayAllTested: response.data.tested})
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    getCoronaOverViewData = () => {
        console.log('tgs called function')
        axios.get('https://api.covid19india.org/data.json')
            .then((response) => {
                // handle success
                console.log('tgs data res11111::::::::', response.data.statewise[0])
                this.setState({ coronaOverViewData: response.data.statewise[0], loader2: false })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    cardConfirmedCases = () => {
        return (
            <div className="keep-center card-content">
                <span className="card-title">CONFIRMED CASES</span>
                <div className="card-desc">
                    <span className="value">{this.state.coronaOverViewData.confirmed}</span>
                    {/* <span> 0% of total cases in Intensive Care</span> */}
                </div>
            </div>
        )
    }

    cardDeathCases = () => {
        return (
            <div className="keep-center card-content">
                <span className="card-title">DEATH CASES</span>
                <div className="card-desc">
                    <span className="value">{this.state.coronaOverViewData.deaths}</span><span> {Math.round(this.state.coronaOverViewData.deaths * 100 / this.state.coronaOverViewData.confirmed)}% of total cases</span>
                </div>
            </div>
        )
    }

    cardRecoveredCases = () => {
        return (
            <div className="keep-center card-content">
                <span className="card-title">RECOVERED CASES</span>
                <div className="card-desc">
                    <span className="value">{this.state.coronaOverViewData.recovered}</span><span> {Math.round(this.state.coronaOverViewData.recovered * 100 / this.state.coronaOverViewData.confirmed)}% of total cases</span>
                </div>
            </div>
        )
    }

    cardHospitalizedCases = () => {
        // let hospitalizedCases = this.state.coronaDataArray && this.state.coronaDataArray.filter((elem, i)=>{
        //     return elem.currentstatus == "Hospitalized"; 
        // }).length
        // console.log('tgs hospitalized::::', hospitalizedCases)
        return (
            <div className="keep-center card-content">
                <span className="card-title">HOSPITALIZED CASES</span>
                <div className="card-desc">
                    <span className="value">{this.state.coronaOverViewData.active}</span><span> {Math.round(this.state.coronaOverViewData.active * 100 / this.state.coronaOverViewData.confirmed)}% of total cases</span>
                </div>
            </div>
        )
    }

    cardTodayCases = () => {
        // let hospitalizedCases = this.state.coronaDataArray && this.state.coronaDataArray.filter((elem, i)=>{
        //     return elem.currentstatus == "Hospitalized"; 
        // }).length
        // console.log('tgs hospitalized::::', hospitalizedCases)
        const arraylen = this.state.todayAllTested.length;
        let lastCases = this.state.todayAllTested[arraylen-1];
        let secondLastCases = this.state.todayAllTested[arraylen-1];
        const todayCases = (lastCases && lastCases.totalpositivecases - secondLastCases && secondLastCases.totalpositivecases)

        console.log('today cases::::::', arraylen, lastCases, )
        return ( 
            <div className="keep-center card-content">
                <span className="card-title">TODAY CONFIRMED CASES</span>
                <div className="card-desc">
                    {/* <span className="value">{this.state.todayAllTested.active}</span> */}
                </div>
            </div>
        )
    }

    cardDoughnutChart = () => {
        let indian = this.state.coronaDataArray && this.state.coronaDataArray.filter((elem, i) => {
            return elem.nationality == "India"
        }).length

        let notIndian = this.state.coronaDataArray && this.state.coronaDataArray.filter((elem, i) => {
            return elem.nationality !== "India" && elem.nationality !== "";
        }).length

        console.log('indis infected::::', indian, notIndian)

        let nationalityData = {
            all: this.state.coronaOverViewData.confirmed,
            indian: indian
        }
        return <DoughnutChart nationalityData={nationalityData}></DoughnutChart>
    }

    cardStachBarChart = () => {
        let stateData = [];
        let indian = this.state.coronaDataArray && this.state.coronaDataArray.forEach((elem, i) => {
            let data = { label: elem.detectedstate, y: 1 }
            let checkState = stateData.filter((e, i) => {
                return (
                    e.label == elem.detectedstate
                )
            })
            if (checkState.length > 0) {
                stateData.forEach((ele, index) => {
                    if (ele.label == elem.detectedstate) {
                        stateData[index].y = stateData[index].y + 1
                    }
                })
                console.log('tgs if state')
            } else {
                stateData.push(data)
                console.log('tgs if else')
            }
        })
        console.log('tgs hospitalizedsdsd::::', stateData)

        return <StackedBarChart data={stateData}></StackedBarChart>
    }

    cardBarChart = () => {
        let hospitalizedData = this.state.coronaDataArray && this.state.coronaDataArray.filter((elem, i) => {
            return (elem.status == "HOSPITALIZED" && elem.confirmed_on == "04 Mar 2020")
        })
        console.log('hospitalizedData::::::::', this.state.hossData)
        return <BarChart hospitalizedData={this.state.hossData}></BarChart>
    }



    cardLineChart = () => {
        return <DynamicLineChart></DynamicLineChart>
    }

    doCORSRequest = (options, printResult) => {
        var x = new XMLHttpRequest();
        x.open(options.method, cors_api_url + options.url);
        x.onload = x.onerror = function () {
            printResult(
                options.method + ' ' + options.url + '\n' +
                x.status + ' ' + x.statusText + '\n\n' +
                (x.responseText || '')
            );
        };
        if (/^POST/i.test(options.method)) {
            x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        x.send(options.data);
    }

    //   getData = (e) => {
    //     const self = this
    //     console.log('func call')
    //     // e.preventDefault();
    //     this.doCORSRequest({
    //       method: 'GET',
    //       url: 'https://covidout.in/',
    //     }, function printResult (result){
    //         document.getElementById('corona-data').innerHTML = result
    //         let allData = document.getElementsByTagName('script')[3].innerHTML.split('= ');
    //         console.log('dataerererere::::::::::', JSON.parse(allData[1]))
    //         self.setState({coronaDataArray: JSON.parse(allData[1])},()=>{
    //             console.log('dataerererere::::::::::', typeof(JSON.parse(allData[1])))
    //         })
    //     });
    //   };

    handleChange = (event, newValue) => {
        console.log('handle changeL::', newValue)
        this.setState({ tabsValue: newValue })
        if(newValue == 0){
            this.getCoronaData()
        }
    };

    render() {
        console.log('html data')
        return (
            <div className="padding-50">
                {this.state.loader1 || this.state.loader2 ? <div className="loader-box">
                    <img src={loader} ></img>
                </div> : ''}
                {/* --tabs material-- */}
                <Paper square>
                    <Tabs
                        value={this.state.tabsValue}
                        onChange={this.handleChange}
                        variant="fullWidth"
                        indicatorColor="secondary"
                        textColor="secondary"
                        aria-label="icon label tabs example"
                    >
                        <Tab icon={<DateRangeIcon />} label="STATUS" />
                        <Tab icon={<HouseIcon />} label="TEST CENTER" />
                        <Tab icon={<LinkIcon />} label="USEFUL LINKS" />
                    </Tabs>

                    {/* page 1::::::::::::::: */}
                {this.state.tabsValue == 0 ?<div className="allInfoPage">
                <div className="card-row">
                    <SimpleCard content={this.cardConfirmedCases()}></SimpleCard>
                    <SimpleCard content={this.cardHospitalizedCases()}></SimpleCard>
                    <SimpleCard content={this.cardRecoveredCases()}></SimpleCard>
                    <SimpleCard content={this.cardDeathCases()}></SimpleCard>
                    {/* <SimpleCard content={this.cardTodayCases()}></SimpleCard> */}
                </div>
                <div className="table-row">
                    {/* <div>
                        <SimpleCard content={this.cardDoughnutChart()}></SimpleCard>
                    </div> */}
                    <div>
                        <SimpleCard content={this.cardStachBarChart()}></SimpleCard>
                        {/* <Piechart></Piechart>        */}
                    </div>
                </div>
                {/* <div className="barChart-row">
                    <div>
                    <SimpleCard content={this.cardBarChart()}></SimpleCard>
                    </div>
                    <div>
                    <SimpleCard content={this.cardLineChart()}></SimpleCard>
                    </div>
                </div> */}
                <div className="table-row-simple">
                    <SimpleTable allData={this.state.coronaDataArray}></SimpleTable>
                </div>
                </div>:''}

                {/* Page 2:::::::::::::::: */}
                {this.state.tabsValue == 1 ?<div className="test-centers">
                <div className="test-center-container">
                        <span>Andhra Pradesh</span>
                       <li>Sri Venkateswara Institute of Medical Sciences, Tirupati</li>
                        <li>Sri Venkateswara Institute of Medical Sciences, Tirupati</li>
                    </div> 
                    <div className="test-center-container">
                        <span>Andaman & Nicobar islands</span>
                       <li>GMC, Anantapur, AP</li>
                       <li>Regional Medical Research Centre, Port Blair, Andaman and Nicobar</li>
                    </div> 
                     <div className="test-center-container">
                        <span>Assam</span>
                       <li>Gauhati Medical College, Guwahati</li>
                       <li>Regional Medical Research Center, Dibrugarh</li>
                    </div>  
                     <div className="test-center-container">
                        <span>Bihar</span>
                        <li>Rajendra Memorial Research Institute of Medical Sciences, Patna</li>
                    </div>  
                    <div className="test-center-container">
                        <span>Haryana</span>
                        <li>Pt. B.D. Sharma Post Graduate Inst. of Med. Sciences, Rohtak, Haryana</li>
                        <li>BPS Govt Medical College, Sonipat</li>
                    </div>    
                    <div className="test-center-container">
                        <span>Himachal Pradesh</span>
                        <li>Indira Gandhi Medical College, Shimla, Himachal Pradesh</li>
                        <li>Dr.Rajendra Prasad Govt. Med. College, Kangra, Tanda, HP</li>
                    </div>     
                    <div className="test-center-container">
                        <span>Jammu and Kashmir</span>
                        <li>Sher‐e‐Kashmir Institute of Medical Sciences, Srinagar</li>
                        <li>Government Medical College, Jammu</li>
                    </div> 
                    <div className="test-center-container">
                        <span>Jharkhand</span>
                        <li>MGM Medical College, Jamshedpur</li>
                    </div> 
                    <div className="test-center-container">
                        <span>Karnataka</span>
                        <li>Bangalore Medical College & Research Institute, Bangalore</li>
                        <li>National Institute of Virology Field Unit Bangalore</li>
                        <li>Mysore Medical College & Research Institute, Mysore</li>                        
                        <li>Hassan Inst. of Med. Sciences, Hassan, Karnataka</li>
                        <li>Shimoga Inst. of Med. Sciences, Shivamogga, Karnataka</li>
                    </div> 
                    <div className="test-center-container">
                        <span>Kerala</span>
                        <li>National Institute of Virology Field Unit, Kerala</li>
                        <li>Govt. Medical College, Thriuvananthapuram, Kerala</li>
                        <li>Govt. Medical College, Kozhikhode, Kerala</li>
                    </div> 
                    <div className="test-center-container">
                        <span>Madhya Pradesh</span>
                        <li>All India Institute Medical Sciences, Bhopal</li>
                        <li>National Institute of Research in Tribal Health (NIRTH), Jabalpur</li>
                    </div> 
                    <div className="test-center-container">
                        <span>Meghalaya</span>
                        <li>NEIGRI of Health and Medical Sciences, Shillong, Meghalaya</li>
                    </div> 
                    <div className="test-center-container">
                        <span>Maharashtra</span>
                        <li>Indira Gandhi Government Medical College, Nagpur</li>
                        <li>Kasturba Hospital for Infectious Diseases, Mumbai</li>
                    </div>
                    <div className="test-center-container">
                        <span>Manipur</span>
                        <li> J N Inst. of Med. Sciences Hospital, Imphal‐East, Manipur</li>
                    </div><div className="test-center-container">
                        <span>Odisha</span>
                        <li>Regional Medical Research Center, Bhubaneswar</li>
                    </div><div className="test-center-container">
                        <span>Puducherry</span>
                        <li>Jawaharlal Institute of Postgraduate Medical Education & Research, Puducherry</li>
                    </div><div className="test-center-container">
                        <span>Punjab</span>
                        <li>Government Medical College, Patiala, Punjab</li>
                        <li>Government Medical College, Amritsar</li>
                    </div><div className="test-center-container">
                        <span>Rajasthan</span>
                        <li>Sawai Man Singh, Jaipur</li>
                        <li>Dr. S.N Medical College, Jodhpur</li>  
                        <li>Jhalawar Medical College, Jhalawar, Rajasthan</li>
                        <li>SP Med. College, Bikaner, Rajasthan</li>
                    </div> 
                    <div className="test-center-container">
                        <span>Tamil Nadu</span>
                        <li>King’s Institute of Preventive Medicine & Research, Chennai</li>
                        <li>Government Medical College, Theni</li>
                    </div> 
                    <div className="test-center-container">
                        <span>Tripura</span>
                        <li>Government Medical College, Agartala</li>
                    </div> 
                    <div className="test-center-container">
                        <li>Gandhi Medical College, Secunderabad</li>
                    </div> 
                    <div className="test-center-container">
                        <span>Uttar Pradesh</span>
                        <li>King’s George Medical University, Lucknow</li>
                        <li>Institute of Medical Sciences, Banaras Hindu University, Varanasi</li>
                        <li>Jawaharlal Nehru Medical College, Aligarh</li>
                    </div> 
                    <div className="test-center-container">
                        <span>Uttarakhand</span>
                        <li>Government Medical College, Haldwani</li>
                    </div> 
                    <div className="test-center-container">
                        <span>West Bengal</span>
                        <li>National Institute of Cholera and Enteric Diseases, Kolkata</li>
                        <li>IPGMER, Kolkata</li>
                    </div> 
                    
                </div>:''}
                {/* Page3:::::::::::::::: */}
                {this.state.tabsValue == 2 ? <div className="useful-links">
                <div className="useful-link-container">
                        <span>GET EPASS DELHI</span>
                        <a href="https://epass.jantasamvad.org/epass/relief/english/" target="_blank">epass.jantasamvad.org</a>
                    </div> 
                    <div className="useful-link-container">
                        <span>GET EPASS MUMBAI</span>
                        <a href="https://epassnmpolice.pce.ac.in/" target="_blank">epassnmpolice.pce.ac.in</a>
                    </div> 
                    <div className="useful-link-container">
                        <span>HELPLINE NUMBERS [BY STATE]</span>
                        <a href="https://www.mohfw.gov.in/coronvavirushelplinenumber.pdf" target="_blank">WWW.MOHFW.GOV.IN / CORONVAVIRUSHELPLINENUMBER.PDF</a>
                    </div> 
                    <div className="useful-link-container">
                        <span>MINISTRY OF HEALTH AND FAMILY WELFARE, GOV. OF INDIA</span>
                        <a href="https://www.mohfw.gov.in/" target="_blank">WWW.MOHFW.GOV.IN</a>
                    </div> 
                    <div className="useful-link-container">
                        <span>WHO : COVID-19 HOME PAGE</span>
                        <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019" target="_blank">WWW.WHO.INT</a>
                    </div> 
                    <div className="useful-link-container">
                        <span>CDC</span>
                        <a href="https://www.cdc.gov/coronavirus/2019-ncov/faq.html" target="_blank">WWW.CDC.GOV</a>
                    </div> 
                    <div className="useful-link-container">
                        <span>COVID-19 GLOBAL TRACKER</span>
                        <a href="https://coronavirus.thebaselab.com/" target="_blank">CORONAVIRUS.THEBASELAB.COM</a>
                    </div> 
                </div>: ''}
                </Paper>
                


            </div>
        )
    }
}

export default Home
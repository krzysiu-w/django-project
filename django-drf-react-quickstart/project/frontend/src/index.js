import React from 'react';
import ReactDOM from 'react-dom';
import CustomNavbar from "./components/Nav.js";
import { Bar, Pie } from "react-chartjs-2";
import { Row, Col, Button } from 'react-bootstrap';




let jo = document.getElementById("data").value;

let people = JSON.parse(jo);
let skillsList = [];
let candidates = [];
let juryList = [];
const multiplier = 10;



for (let i = 0; i < people.length; i++) {
    if (people[i].skils) {
    
        people[i].skils = JSON.parse(people[i].skils);
        
        let temp = Object.getOwnPropertyNames(people[i].skils)
        juryList = juryList.concat(temp)
        let x;
        for (x in people[i].skils) {
            
            skillsList = skillsList.concat(Object.getOwnPropertyNames(people[i].skils[x]));
            let y;
            for(y in people[i].skils[x]){
                people[i].skils[x][y] = parseInt(people[i].skils[x][y])
            }
            
        }
        
        people[i] = {...people[i], ...people[i].skils};
        delete people[i].skils;

    }
    else{
        people[i] = undefined;
    }
}

let tableOfPeople = [];
let i = 0;
people.map((item) => {
    if(item){
        tableOfPeople[i] = item;
        i++;
    }
});
people = tableOfPeople;

people.map((item, i) => {
    item.name = `${item.first_name.trim()} ${item.last_name.trim()}`;
    delete item.first_name;
    delete item.last_name;
    candidates[i] = item.name;
});



juryList = Array.from(new Set(juryList));
skillsList = Array.from(new Set(skillsList));




console.log(people, skillsList, juryList, candidates);

// const juryList = ["Mariusz Max Kolonko", "Bogusław Łęcina", "Mistrz Shao Lin"];
// const skillsList = ["Python", "Cpp", "JS", "English"];
// const candidates = ["Tomek Makowski", "Niemy Michałek", "Uczeń Kamil Zdun"];

// const people = [
//     {
//         "id": 0,
//         "name": "Tomek Makowski",
//         "Mariusz Max Kolonko": {
//             "Python": 3,
//             "Cpp": 2,
//             "JS": 5,
//             "English": 4
//         },
//         "Bogusław Łęcina": {
//             "Python": 3,
//             "Cpp": 3,
//             "JS": 4,
//             "English": 3
//         },
//         "Mistrz Shao Lin": {
//             "Python": 1,
//             "Cpp": 2,
//             "JS": 3,
//             "English": 3
//         }
//     },
//     {
//         "id": 1,
//         "name": "Niemy Michałek",
//         "Mariusz Max Kolonko": {
//             "Python": 1,
//             "Cpp": 2,
//             "JS": 3,
//             "English": 0
//         },
//         "Bogusław Łęcina": {
//             "Python": 0,
//             "Cpp": 0,
//             "JS": 0,
//             "English": 1
//         },
//         "Mistrz Shao Lin": {
//             "Python": 1,
//             "Cpp": 2,
//             "JS": 2,
//             "English": 3.5
//         }
//     },
//     {
//         "id": 2,
//         "name": "Uczeń Kamil Zdun",
//         "Mariusz Max Kolonko": {
//             "Python": 1,
//             "Cpp": 3,
//             "JS": 0,
//             "English": 4.5
//         },
//         "Bogusław Łęcina": {
//             "Python": 2,
//             "Cpp": 2,
//             "JS": 1,
//             "English": 5
//         },
//         "Mistrz Shao Lin": {
//             "Python": 1,
//             "Cpp": 2,
//             "JS": 2,
//             "English": 5
//         }
//     }
// ]


// people.map((item) => {
//     item["Average Rates"] = {
//         Python: handleCalculateAverage(people[item.id], "Python"),
//         Cpp: handleCalculateAverage(people[item.id], "Cpp"),
//         JS: handleCalculateAverage(people[item.id], "JS"),
//         English: handleCalculateAverage(people[item.id], "English")
//     };
// });

people.map((item) => {
    item["Average Rates"] = {};
    skillsList.map((item2) => {
        item["Average Rates"][item2] = handleCalculateAverage(item, item2);
    });
});

function handleCalculateAverage(person, skill) {
    let average = 0;
    juryList.map((item2) => {
        average += person[item2][skill]
    });
    
    return ((Math.round((average / juryList.length) * 100)) / 100);
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeSkill = this.handleChangeSkill.bind(this);
        this.handleChangeRecruter = this.handleChangeRecruter.bind(this);
        this.handleMarkCandidate = this.handleMarkCandidate.bind(this);
        this.handleCreateCurrentRates = this.handleCreateCurrentRates.bind(this);
        this.handleSetAverage = this.handleSetAverage.bind(this);
        this.state = {
            currentJury: "Average Rates",
            currentSkill: skillsList[0],
            currentCandidates: candidates,
            currentRates: this.handleCreateCurrentRates(candidates, "Average Rates", skillsList[0]),
            dataBar: {
                labels: candidates,
                datasets: [
                    {
                        label: skillsList[0],
                        data: this.handleCreateCurrentRates(candidates, "Average Rates", skillsList[0]),
                        backgroundColor: [
                            "rgba(255, 134,159,0.4)",
                            "rgba(98,  182, 239,0.4)",
                            "rgba(255, 218, 128,0.4)",
                            "rgba(113, 205, 205,0.4)",
                            "rgba(170, 128, 252,0.4)",
                            "rgba(255, 177, 101,0.4)"
                        ],
                        borderWidth: 2,
                        borderColor: [
                            "rgba(255, 134, 159, 1)",
                            "rgba(98,  182, 239, 1)",
                            "rgba(255, 218, 128, 1)",
                            "rgba(113, 205, 205, 1)",
                            "rgba(170, 128, 252, 1)",
                            "rgba(255, 177, 101, 1)"
                        ]
                    }
                ]
            },
            barChartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            barPercentage: 1,
                            gridLines: {
                                display: true,
                                color: "rgba(255, 255, 255, 0.2)"
                            }
                        }
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                display: true,
                                color: "rgba(255, 255, 255, 0.2)"
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        }
    }

    handleCreateCurrentRates(currentCandidates, currentJury, currentSkill) {
        let table = [];
        
        currentCandidates.map((item) => {
            let canItem = item;
            people.map((item2) => {
                if (item2.name == canItem) {
                    table.push(parseFloat(item2[currentJury][currentSkill]) * multiplier);
                }
            });
        });
        return table;
    }

    handleChangeSkill(skill) {
        this.setState((prev) => {
            return {
                currentSkill: skill,
                currentRates: this.handleCreateCurrentRates(prev.currentCandidates, prev.currentJury, skill),
                dataBar: {
                    labels: prev.currentCandidates,
                    datasets: [
                        {
                            label: skill,
                            data: this.handleCreateCurrentRates(prev.currentCandidates, prev.currentJury, skill),
                            backgroundColor: [
                                "rgba(255, 134,159,0.4)",
                                "rgba(98,  182, 239,0.4)",
                                "rgba(255, 218, 128,0.4)",
                                "rgba(113, 205, 205,0.4)",
                                "rgba(170, 128, 252,0.4)",
                                "rgba(255, 177, 101,0.4)"
                            ],
                            borderWidth: 2,
                            borderColor: [
                                "rgba(255, 134, 159, 1)",
                                "rgba(98,  182, 239, 1)",
                                "rgba(255, 218, 128, 1)",
                                "rgba(113, 205, 205, 1)",
                                "rgba(170, 128, 252, 1)",
                                "rgba(255, 177, 101, 1)"
                            ]
                        }
                    ]
                }
            };
        })
    }
    handleChangeRecruter(recruter) {
        this.setState((prev) => {
            return {
                currentJury: recruter,
                currentRates: this.handleCreateCurrentRates(prev.currentCandidates, recruter, prev.currentSkill),
                dataBar: {
                    labels: prev.currentCandidates,
                    datasets: [
                        {
                            label: prev.currentSkill,
                            data: this.handleCreateCurrentRates(prev.currentCandidates, recruter, prev.currentSkill),
                            backgroundColor: [
                                "rgba(255, 134,159,0.4)",
                                "rgba(98,  182, 239,0.4)",
                                "rgba(255, 218, 128,0.4)",
                                "rgba(113, 205, 205,0.4)",
                                "rgba(170, 128, 252,0.4)",
                                "rgba(255, 177, 101,0.4)"
                            ],
                            borderWidth: 2,
                            borderColor: [
                                "rgba(255, 134, 159, 1)",
                                "rgba(98,  182, 239, 1)",
                                "rgba(255, 218, 128, 1)",
                                "rgba(113, 205, 205, 1)",
                                "rgba(170, 128, 252, 1)",
                                "rgba(255, 177, 101, 1)"
                            ]
                        }
                    ]
                }
            };
        });
    }
    handleMarkCandidate(candidate) {
        if (this.state.currentCandidates.indexOf(candidate) > -1) {
            let newTable = [];
            let i = 0;
            this.state.currentCandidates.map((item) => {
                if (item != candidate) {
                    newTable[i] = item;
                    i++;
                }
            });

            this.setState((prev) => {
                return {
                    currentCandidates: newTable,
                    currentRates: this.handleCreateCurrentRates(newTable, this.state.currentJury, this.state.currentSkill),
                    dataBar: {
                        labels: newTable,
                        datasets: [
                            {
                                label: prev.currentSkill,
                                data: this.handleCreateCurrentRates(newTable, prev.currentJury, prev.currentSkill),
                                backgroundColor: [
                                    "rgba(255, 134,159,0.4)",
                                    "rgba(98,  182, 239,0.4)",
                                    "rgba(255, 218, 128,0.4)",
                                    "rgba(113, 205, 205,0.4)",
                                    "rgba(170, 128, 252,0.4)",
                                    "rgba(255, 177, 101,0.4)"
                                ],
                                borderWidth: 2,
                                borderColor: [
                                    "rgba(255, 134, 159, 1)",
                                    "rgba(98,  182, 239, 1)",
                                    "rgba(255, 218, 128, 1)",
                                    "rgba(113, 205, 205, 1)",
                                    "rgba(170, 128, 252, 1)",
                                    "rgba(255, 177, 101, 1)"
                                ]
                            }
                        ]
                    }
                };
            });
        }
        else {
            let currTable = this.state.currentCandidates.concat([candidate]);

            this.setState((prev) => {
                return {
                    currentCandidates: prev.currentCandidates.concat([candidate]),
                    currentRates: this.handleCreateCurrentRates(currTable, this.state.currentJury, this.state.currentSkill),
                    dataBar: {
                        labels: prev.currentCandidates.concat([candidate]),
                        datasets: [
                            {
                                label: prev.currentSkill,
                                data: this.handleCreateCurrentRates(prev.currentCandidates.concat([candidate]), prev.currentJury, prev.currentSkill),
                                backgroundColor: [
                                    "rgba(255, 134,159,0.4)",
                                    "rgba(98,  182, 239,0.4)",
                                    "rgba(255, 218, 128,0.4)",
                                    "rgba(113, 205, 205,0.4)",
                                    "rgba(170, 128, 252,0.4)",
                                    "rgba(255, 177, 101,0.4)"
                                ],
                                borderWidth: 2,
                                borderColor: [
                                    "rgba(255, 134, 159, 1)",
                                    "rgba(98,  182, 239, 1)",
                                    "rgba(255, 218, 128, 1)",
                                    "rgba(113, 205, 205, 1)",
                                    "rgba(170, 128, 252, 1)",
                                    "rgba(255, 177, 101, 1)"
                                ]
                            }
                        ]
                    }
                };
            });
        } this.props.currentRates
    }
    handleSetAverage() {
        console.log("click");
        this.setState((prev) => {
            return {
                currentJury: "Average Rates",
                currentRates: this.handleCreateCurrentRates(prev.currentCandidates, "Average Rates", prev.currentSkill),
                dataBar: {
                    labels: prev.currentCandidates,
                    datasets: [
                        {
                            label: prev.currentSkill,
                            data: this.handleCreateCurrentRates(prev.currentCandidates, "Average Rates", prev.currentSkill),
                            backgroundColor: [
                                "rgba(255, 134,159,0.4)",
                                "rgba(98,  182, 239,0.4)",
                                "rgba(255, 218, 128,0.4)",
                                "rgba(113, 205, 205,0.4)",
                                "rgba(170, 128, 252,0.4)",
                                "rgba(255, 177, 101,0.4)"
                            ],
                            borderWidth: 2,
                            borderColor: [
                                "rgba(255, 134, 159, 1)",
                                "rgba(98,  182, 239, 1)",
                                "rgba(255, 218, 128, 1)",
                                "rgba(113, 205, 205, 1)",
                                "rgba(170, 128, 252, 1)",
                                "rgba(255, 177, 101, 1)"
                            ]
                        }
                    ]
                }
            };
        });
    }
    render() {
        return (
            <div>
                <CustomNavbar />
                <div className="dashboard">

                    <Row>
                        <Col md={8}>
                            <CustomChart
                                className={`custom-chart`}
                                currentCandidates={this.state.currentCandidates}
                                currentJury={this.state.currentJury}
                                currentSkill={this.state.currentSkill}
                                currentRates={this.state.currentRates}
                                dataBar={this.state.dataBar}
                                barChartOptions={this.state.barChartOptions}
                            />
                        </Col>
                        <Col md={4}>
                            <Row>
                                <Col>
                                    <Jury
                                        className="jury"
                                        currentJury={this.state.currentJury}
                                        handleChangeRecruter={this.handleChangeRecruter}
                                        handleSetAverage={this.handleSetAverage}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <People
                                        className="people"
                                        currentSkill={this.state.currentSkill}
                                        currentJury={this.state.currentJury}
                                        handleMarkCandidate={this.handleMarkCandidate}
                                        currentCandidates={this.state.currentCandidates}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Skills
                                        className="skills"
                                        currentSkill={this.state.currentSkill}
                                        handleChangeSkill={this.handleChangeSkill}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>



        );
    }
}

class CustomChart extends React.Component {
    constructor(props) {
        super(props);
        this.index = 0;
    }
    render() {
        return (
            <div className={this.props.className}>
                <BarChart
                    currentCandidates={this.props.currentCandidates}
                    currentSkill={this.props.currentSkill}
                    currentJury={this.props.currentJury}
                    currentRates={this.props.currentRates}
                    dataBar={this.props.dataBar}
                    barChartOptions={this.props.barChartOptions}
                />
            </div>
        );
    }
}

class BarChart extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="chart-container">
                <h3 className="mt-5">{this.props.currentJury}</h3>
                <Bar data={this.props.dataBar} options={this.props.barChartOptions} />
            </div>
        );
    }
}

class PieChart extends React.Component {
    constructor(props) {
        super(props);
        this.currentAverageRates = [];
        this.currentPerson;
        
        people.map((item) => {
            if(item.id == this.props.personId){
                this.currentPerson = item;
            }
        });
        
        skillsList.map((item) => {
            console.log(this.currentPerson);
            this.currentAverageRates.push(this.currentPerson["Average Rates"][item]*multiplier);
        });

        this.state = {
            dataPie: {
                labels: skillsList,
                datasets: [
                    {
                        data: this.currentAverageRates,
                        backgroundColor: [
                            "#F7464A",
                            "#46BFBD",
                            "#FDB45C",
                            "#949FB1",
                            "#4D5360",
                            "#AC64AD"
                        ],
                        hoverBackgroundColor: [
                            "#FF5A5E",
                            "#5AD3D1",
                            "#FFC870",
                            "#A8B3C5",
                            "#616774",
                            "#DA92DB"
                        ]
                    }
                ]
            }
        }
    }


    render() {
        return (
            <div>
                <Pie data={this.state.dataPie} options={{ responsive: true }} />
            </div>


        );
    }
}

class Skills extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeSkill = this.handleChangeSkill.bind(this);
        this.state = {
        };
    }
    handleChangeSkill(skill) {
        this.props.handleChangeSkill(skill);
    }
    render() {
        return (
            <div className={this.props.className}>
                <h2 className="custom-title">Skills</h2>
                <ul className="personSkills">
                    {skillsList.map((item, i) =>
                        <Skill
                            key={item + i}
                            skillName={item}
                            handleChangeSkill={this.handleChangeSkill}
                            isActive={this.props.currentSkill == item ? "active" : ""}
                        />)}
                </ul>
            </div>
        );
    }
}

class Skill extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeSkill = this.handleChangeSkill.bind(this);
        this.state = {
        }
    }
    handleChangeSkill() {
        this.props.handleChangeSkill(this.props.skillName);
    }
    render() {
        return (
            <li
                name="personSkill"
                className={`person-skill ${this.props.isActive}`}
                onClick={this.handleChangeSkill}
            >
                {this.props.skillName}
            </li>
        );
    }
}

class Jury extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeRecruter = this.handleChangeRecruter.bind(this);
    }
    handleChangeRecruter(recruter) {
        this.props.handleChangeRecruter(recruter);
    }
    render() {
        return (
            <div className={this.props.className}>
                <h2 className="custom-title">
                    Jury
                    <Button
                        variant="warning"
                        className="box-shadow-1 float-right mr-3"
                        onClick={this.props.handleSetAverage}
                    >Average</Button>
                </h2>
                <ul>
                    {juryList.map((item, i) =>
                        <Recruter
                            key={`${item + i}`}
                            juryName={item}
                            isActive={item == this.props.currentJury ? "active" : ""}
                            handleChangeRecruter={this.handleChangeRecruter}
                        />
                    )}
                </ul>
            </div>
        );
    }
}

class Recruter extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeRecruter = this.handleChangeRecruter.bind(this);
    }
    handleChangeRecruter() {
        this.props.handleChangeRecruter(this.props.juryName)
    }
    render() {
        return (
            <li
                className={`recruter ${this.props.isActive}`}
                onClick={this.handleChangeRecruter}
            >
                {this.props.juryName}
            </li>
        );
    }
}

class People extends React.Component {
    constructor(props) {
        super(props);
        this.handleMarkCandidate = this.handleMarkCandidate.bind(this);
    }
    handleMarkCandidate(candidate) {
        this.props.handleMarkCandidate(candidate);
    }
    render() {
        return (
            <div className={this.props.className}>
                <h2 className="custom-title">Candidates</h2>
                <ul>
                    {people.map((item, i) =>
                        <Person
                            key={`person${i}`}
                            personId={item.id}
                            personName={item.name}
                            currentRate={item[this.props.currentJury][this.props.currentSkill]}
                            currentJury={this.props.currentJury}
                            handleMarkCandidate={this.handleMarkCandidate}
                            isActive={this.props.currentCandidates.indexOf(item.name) > -1 ? "active" : ""}
                        />
                    )}
                </ul>
            </div>
        );
    }
}

class Person extends React.Component {
    constructor(props) {
        super(props);
        this.handleMarkCandidate = this.handleMarkCandidate.bind(this);
        this.handleShowDetails = this.handleShowDetails.bind(this);
        this.state = {
            drop: false
        }
    }
    handleMarkCandidate() {
        this.props.handleMarkCandidate(this.props.personName);
    }
    handleShowDetails() {
        this.setState((prev) => {
            return {
                drop: !prev.drop
            };
        });
    }
    render() {
        return (
            <li className="person">
                <span className={`personId ${this.props.isActive}`} onClick={this.handleMarkCandidate}><span></span></span>
                <span className="personName">{this.props.personName}</span>
                <span className="personRate">
                    <span
                        className="drop-down"
                        onClick={this.handleShowDetails}
                    >
                        {this.state.drop ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
                    </span>
                </span>

                <Row mt={4} className="show-content">
                    <Col>
                        <PieChart
                            personId = {this.props.personId}
                        />
                    </Col>
                </Row>

            </li>
        );
    }
}

// ========================================

ReactDOM.render(
    <Dashboard />,
    document.getElementById('root')
);
import React from 'react';
import ReactDOM from 'react-dom';
import { Bar } from "react-chartjs-2";
import { Row, Col } from 'react-bootstrap';



const juryList = ["Mariusz Max Kolonko", "Bogusław Łęcina", "Mistrz Shao Lin"];
const skillsList = ["Python", "Cpp", "JS", "English"];
const candidates = ["Tomek Makowski", "Niemy Michałek", "Uczeń Kamil Zdun"];

const people = [
    {
        "id": 0,
        "name": "Tomek Makowski",
        "Mariusz Max Kolonko": {
            "Python": 3,
            "Cpp": 2,
            "JS": 5,
            "English": 4
        },
        "Bogusław Łęcina": {
            "Python": 3,
            "Cpp": 3,
            "JS": 4,
            "English": 3
        },
        "Mistrz Shao Lin": {
            "Python": 1,
            "Cpp": 2,
            "JS": 3,
            "English": 3
        }
    },
    {
        "id": 1,
        "name": "Niemy Michałek",
        "Mariusz Max Kolonko": {
            "Python": 1,
            "Cpp": 2,
            "JS": 3,
            "English": 0
        },
        "Bogusław Łęcina": {
            "Python": 0,
            "Cpp": 0,
            "JS": 0,
            "English": 1
        },
        "Mistrz Shao Lin": {
            "Python": 1,
            "Cpp": 2,
            "JS": 2,
            "English": 3.5
        }
    },
    {
        "id": 2,
        "name": "Uczeń Kamil Zdun",
        "Mariusz Max Kolonko": {
            "Python": 1,
            "Cpp": 3,
            "JS": 0,
            "English": 4.5
        },
        "Bogusław Łęcina": {
            "Python": 2,
            "Cpp": 2,
            "JS": 1,
            "English": 5
        },
        "Mistrz Shao Lin": {
            "Python": 1,
            "Cpp": 2,
            "JS": 2,
            "English": 5
        }
    }
]

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeSkill = this.handleChangeSkill.bind(this);
        this.handleChangeRecruter = this.handleChangeRecruter.bind(this);
        this.handleMarkCandidate = this.handleMarkCandidate.bind(this);
        this.handleCreateCurrentRates = this.handleCreateCurrentRates.bind(this);
        this.state = {
            currentJury: juryList[0],
            currentSkill: skillsList[0],
            currentCandidates: candidates,
            currentRates: this.handleCreateCurrentRates(candidates, juryList[0], skillsList[0]),
            dataBar: {
                labels: candidates,
                datasets: [
                    {
                        label: skillsList[0],
                        data: this.handleCreateCurrentRates(candidates, juryList[0], skillsList[0]),
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
                    table.push(parseFloat(item2[currentJury][currentSkill])*20);
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
        })
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
        }this.props.currentRates
    }
    handleCreateColor(){

    }
    render() {
        return (
            <div className="dashboard">
                <Row>
                    <Col md={8}>
                        <CustomChart
                            className="custom-chart"
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
                {
                    `Current jury: ${this.props.currentJury} || Current skill: ${this.props.currentSkill} || Current candidates: ${this.props.currentCandidates} || Current rates: ${this.props.currentRates}`
                }
                <ChartsPage
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

class ChartsPage extends React.Component {
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
                <h2 className="custom-title">Jury</h2>
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
                <h2 className="custom-title">Candidates<span>{this.props.currentSkill}</span></h2>
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
    handleShowDetails(){
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
                        {this.state.drop ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i> }
                    </span>
                </span>

            </li>
        );
    }
}

// ========================================

ReactDOM.render(
    <Dashboard />,
    document.getElementById('root')
);
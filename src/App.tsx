import React from "react"
import "./App.css"
// import { SalaryInput } from "./components/salary-input"
import { RegionSelect } from "components/region-select"
import { SalaryInput } from "components/salary-input"

function App() {
    return (
        <div className="App" style={{ display: "flex" }}>
            <div className="input">
                <RegionSelect />
                <SalaryInput />
                {/*<Test/>*/}
                {/*<CombineUI/>*/}
            </div>
            <div className="result-table">{/*<SalaryResultTable />*/}</div>
            <div className="result-graph"></div>
        </div>
    )
}

export default App

import React from "react"
import "App.css"
import { RegionSelect } from "components/region-select"
import { SalaryInput } from "components/salary-input"
import { SalaryResultTable } from "components/salary-result-table"

function App() {
    return (
        <div className="App" style={{ display: "flex" }}>
            <div className="input">
                <RegionSelect />
                <SalaryInput />
            </div>
            <div className="result-table">{<SalaryResultTable />}</div>
            <div className="result-graph"></div>
        </div>
    )
}

export default App

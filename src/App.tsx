import React from "react"
import "./App.css"
import { RegionSelect } from "./components/region-select"
import { SalaryInput } from "./components/salary-input"

function App() {
    return (
        <div className="App">
            <div className="InputColumn">
                <RegionSelect />
                <SalaryInput />
            </div>

        </div>
    )
}

export default App;

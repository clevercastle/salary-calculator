// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from "react"
import { CityPolicy } from "city-config"
import { SalaryInputType } from "salary.model"
import { isValid } from "utils"

interface Combine {
    value: number
    enabled: boolean
}

export const useCombine = (
    salary: number,
    cityPolicy: CityPolicy,
    calc: (n: number, p: CityPolicy) => number,
    updateSalaryInput: (newData: Partial<SalaryInputType>) => void,
    updateSalaryInputHint: Partial<SalaryInputType>
) => {
    const [combine, setCombine] = useState<Combine>({
        value: calc(salary, cityPolicy),
        enabled: false,
    })

    const toggle = (b: boolean) => {
        setCombine((prevCombine) => ({
            ...prevCombine,
            enabled: b,
        }))
        if (!b) {
            updateValue(calc(salary, cityPolicy))
        }
    }

    const updateValue = (num: number) => {
        setCombine((prevCombine) => ({
            ...prevCombine,
            value: num,
        }))
        const { sib, hpfb } = updateSalaryInputHint
        if (isValid(sib)) {
            updateSalaryInput({ sib: num })
        } else if (isValid(hpfb)) {
            updateSalaryInput({ hpfb: num })
        }
    }

    return {
        combine,
        toggle,
        updateNumber: updateValue,
    }
}

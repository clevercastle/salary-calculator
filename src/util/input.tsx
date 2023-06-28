import React, { useState } from "react"
import { CityPolicy } from "city-config"

interface Combine {
    value: number
    enabled: boolean
}

export const useCombine = (salary: number, cityPolicy: CityPolicy, calc: (n: number, p: CityPolicy) => number) => {
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
            setCombine((prevCombine) => ({
                ...prevCombine,
                value: calc(salary, cityPolicy),
            }))
        }
    }

    const updateValue = (num: number) => {
        setCombine((prevCombine) => ({
            ...prevCombine,
            value: num,
        }))
    }

    return {
        combine,
        toggle,
        updateNumber: updateValue,
    }
}

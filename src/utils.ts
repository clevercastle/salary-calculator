import { CityPolicy } from "city-config"

export const sibCalculate = (salary: number, cityPolicy: CityPolicy) => {
    if (salary > cityPolicy.sibMax) {
        return cityPolicy.sibMax
    }
    if (salary < cityPolicy.sibMin) {
        return cityPolicy.sibMin
    }
    return salary
}

export const hpfbCalculate = (salary: number, cityPolicy: CityPolicy) => {
    if (salary > cityPolicy.hpfbMax) {
        return cityPolicy.hpfbMax
    }
    if (salary < cityPolicy.hpfbMin) {
        return cityPolicy.hpfbMin
    }
    return salary
}

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

export const isValid = (value: unknown) => !(value === undefined || value === null || value === "")

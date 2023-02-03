import { CityPolicy } from "./city-config"

export const sibCalculate = (salary: number, cityPolicy: CityPolicy) => {
    console.log(salary)
    console.log(cityPolicy)
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

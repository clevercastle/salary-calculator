import { CityPolicy } from "../city-config"
import { SalaryResultType } from "../salary.model"

export interface SalaryContextType {
    region: string
    salary: number
    oneOffBonus: number
    enableCustomSIB: boolean
    sib: number // social insurance base
    enableCustomHPFB: boolean
    hpfb: number // housing provider fund base
    cityPolicy: CityPolicy
    setRegion: (str: string | null) => void
    setSalary: (num: number | null) => void
    setSIB: (num: number | null) => void
    setHPFB: (num: number | null) => void
    setEnableCustomSIB: (bol: boolean | null) => void
    setEnableCustomHPFB: (bol: boolean | null) => void
    setOneOffBonus: (num: number | null) => void
    setCityPolicy: (cityPolicy: CityPolicy | null) => void

    salaryResult: SalaryResultType
    setSalaryResult: (salaryResult: SalaryResultType | null) => void
}


export enum OneOffBonusType {
    combine,
    single,
}



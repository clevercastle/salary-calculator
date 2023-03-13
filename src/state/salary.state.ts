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

    oneOffBonusType: number
    setOneOffBonusType: (num: number | null) => void


    childEducation: number
    setChildEducation: (num: number | null) => void
    enableChildEducation: boolean
    setEnableChildEducation: (bol: boolean | null) => void

    continuingEducation: number
    setContinuingEducation: (num: number | null) => void
    enableContinuingEducation: boolean
    setEnableContinuingEducation: (bol: boolean | null) => void

    seriousDiseases: number
    setSeriousDiseases: (num: number | null) => void
    enableSeriousDiseases: boolean
    setEnableSeriousDiseases: (bol: boolean | null) => void

    housingLoanInterest: number
    setHousingLoanInterest: (num: number | null) => void
    enableHousingLoanInterest: boolean
    setEnableHousingLoanInterest: (bol: boolean | null) => void

    housingRent: number
    setHousingRent: (num: number | null) => void
    enableHousingRent: boolean
    setEnableHousingRent: (bol: boolean | null) => void

    elderSupport: number
    setElderSupport: (num: number | null) => void
    enableElderSupport: boolean
    setEnableElderSupport: (bol: boolean | null) => void

    babyCare: number
    setBabyCare: (num: number | null) => void
    enableBabyCare: boolean
    setEnableBabyCare: (bol: boolean | null) => void
}

export enum OneOffBonusType {
    combine,
    single,
}
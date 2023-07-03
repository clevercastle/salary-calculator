import { CityPolicy } from "../city-config"
import { SalaryInputAdvance, SalaryInputType, SalaryResultType } from "../salary.model"

export interface SalaryContextType {
    region: string
    salaryInput: SalaryInputType
    salaryInputAdvance: SalaryInputAdvance
    salaryResult: SalaryResultType
    cityPolicy: CityPolicy
    setRegion: (newRegion: string) => void
    updateSalaryInput: (newData: Partial<SalaryInputType>) => void
    updateSalaryInputAdvance: (newData: Partial<SalaryInputAdvance>) => void
    updateSalaryResult: (newData: Partial<SalaryResultType>) => void
    setCityPolicy: (newData: CityPolicy) => void
    showSalaryResult: () => void

    toggleEnableCustomerSIB: (enable: boolean) => void
    toggleEnableCustomerHPFB: (enable: boolean) => void
}

export enum OneOffBonusType {
    combine,
    single,
}

import { CityPolicy } from "./city-config"
import { OneOffBonusType } from "./state/salary.state"

export interface SalaryInputType {
    salary: number
    oneOffBonus: number
    oneOffBonusType: OneOffBonusType
    sib: number // social insurance base
    enableCustomSIB: boolean
    hpfb: number // housing provider fund base
    enableCustomHPFB: boolean
    cityPolicy: CityPolicy
}

export interface SalaryInputAdvance {
    childEducation: number
    enableChildEducation: boolean
    continuingEducation: number
    enableContinuingEducation: boolean
    seriousDiseases: number
    enableSeriousDiseases: boolean
    housingLoanInterest: number
    enableHousingLoanInterest: boolean
    housingRent: number
    enableHousingRent: boolean
    elderSupport: number
    enableElderSupport: boolean
    babyCare: number
    enableBabyCare: boolean
}

// endowment insurance
// medical insurance
// unemployment insurance
// work injury insurance
// maternity insurance
// housing provident fund
export interface SalaryResultType {
    endowmentUser: number
    endowmentCompany: number
    medicalUser: number
    medicalCompany: number
    unemploymentUser: number
    unemploymentCompany: number
    workInjuryUser: number
    workInjuryCompany: number
    maternityUser: number
    maternityCompany: number
    hpfUser: number
    hpfCompany: number

    oneOffBonus: number
    oneOffBonusType: number

    childEducation: number
    continuingEducation: number
    seriousDiseases: number
    housingLoanInterest: number
    housingRent: number
    elderSupport: number
    babyCare: number
}

export const calculateSalary = (
    salary: number,
    sib: number,
    hpfb: number,
    cityPolicy: CityPolicy,
    oneOffBonus: number,
    oneOffBonusType: number,
    childEducation: number,
    continuingEducation: number,
    seriousDiseases: number,
    housingLoanInterest: number,
    housingRent: number,
    elderSupport: number,
    babyCare: number
) => {
    const salaryResult: SalaryResultType = {
        endowmentUser: sib * cityPolicy.endowmentUserRate,
        endowmentCompany: sib * cityPolicy.endowmentCompanyRate,
        medicalUser: sib * cityPolicy.medicalUserRate,
        medicalCompany: sib * cityPolicy.medicalCompanyRate,
        unemploymentUser: sib * cityPolicy.unemploymentUserRate,
        unemploymentCompany: sib * cityPolicy.unemploymentCompanyRate,
        workInjuryUser: sib * cityPolicy.workInjuryUserRate,
        workInjuryCompany: sib * cityPolicy.workInjuryCompanyRate,
        maternityUser: sib * cityPolicy.maternityUserRate,
        maternityCompany: sib * cityPolicy.maternityCompanyRate,
        hpfUser: hpfb * cityPolicy.hpfUserRate,
        hpfCompany: hpfb * cityPolicy.hpfCompanyRate,

        oneOffBonus: oneOffBonus,
        oneOffBonusType: oneOffBonusType,

        childEducation: childEducation,
        continuingEducation: continuingEducation,
        seriousDiseases: seriousDiseases,
        housingLoanInterest: housingLoanInterest,
        housingRent: housingRent,
        elderSupport: elderSupport,
        babyCare: babyCare,
    }
    return salaryResult
}

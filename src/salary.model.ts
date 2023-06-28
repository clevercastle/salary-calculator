import { OneOffBonusType } from "state/salary.state"
import { CityPolicy } from "city-config"

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
    salary: number
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
    salaryInput: SalaryInputType,
    salaryInputAdvance: SalaryInputAdvance,
    cityPolicy: CityPolicy
) => {
    const salaryResult: SalaryResultType = {
        salary: salaryInput.salary,
        endowmentUser: salaryInput.sib * cityPolicy.endowmentUserRate,
        endowmentCompany: salaryInput.sib * cityPolicy.endowmentCompanyRate,
        medicalUser: salaryInput.sib * cityPolicy.medicalUserRate,
        medicalCompany: salaryInput.sib * cityPolicy.medicalCompanyRate,
        unemploymentUser: salaryInput.sib * cityPolicy.unemploymentUserRate,
        unemploymentCompany: salaryInput.sib * cityPolicy.unemploymentCompanyRate,
        workInjuryUser: salaryInput.sib * cityPolicy.workInjuryUserRate,
        workInjuryCompany: salaryInput.sib * cityPolicy.workInjuryCompanyRate,
        maternityUser: salaryInput.sib * cityPolicy.maternityUserRate,
        maternityCompany: salaryInput.sib * cityPolicy.maternityCompanyRate,
        hpfUser: salaryInput.hpfb * cityPolicy.hpfUserRate,
        hpfCompany: salaryInput.hpfb * cityPolicy.hpfCompanyRate,

        oneOffBonus: salaryInput.oneOffBonus,
        oneOffBonusType: salaryInput.oneOffBonusType,

        childEducation: salaryInputAdvance.childEducation,
        continuingEducation: salaryInputAdvance.continuingEducation,
        seriousDiseases: salaryInputAdvance.seriousDiseases,
        housingLoanInterest: salaryInputAdvance.housingLoanInterest,
        housingRent: salaryInputAdvance.housingRent,
        elderSupport: salaryInputAdvance.elderSupport,
        babyCare: salaryInputAdvance.babyCare,
    }
    return salaryResult
}

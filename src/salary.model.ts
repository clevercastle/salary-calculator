import { CityPolicy } from "./city-config"


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

    oneOffBonus: number,
    oneOffBonusType: number,

    childEducation: number,
    continuingEducation: number,
    seriousDiseases: number,
    housingLoanInterest: number,
    housingRent: number,
    elderSupport: number,
    babyCare: number,
}


export const calculateSalary = (salary: number, sib: number, hpfb: number, cityPolicy: CityPolicy,
                                oneOffBonus: number, oneOffBonusType: number,
                                childEducation: number, continuingEducation: number, seriousDiseases: number,
                                housingLoanInterest: number, housingRent: number, elderSupport: number,
                                babyCare: number) => {
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
        babyCare: babyCare
    }
    return salaryResult
}
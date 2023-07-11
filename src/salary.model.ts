import { OneOffBonusType } from "state/salary.state"
import { CityPolicy } from "city-config"
import NP from "number-precision"

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

    salaryMinusSibHpfb: number

    oneOffBonusTax: number
    netSalary: number
    tax: number
    yearAllIncoming: number
}

export const calculateSalary = (
    salaryInput: SalaryInputType,
    salaryInputAdvance: SalaryInputAdvance,
    cityPolicy: CityPolicy
) => {
    const endowmentUser = salaryInput.sib * cityPolicy.endowmentUserRate
    const medicalUser = salaryInput.sib * cityPolicy.medicalUserRate
    const unemploymentUser = salaryInput.sib * cityPolicy.unemploymentUserRate
    const workInjuryUser = salaryInput.sib * cityPolicy.workInjuryUserRate
    const maternityUser = salaryInput.sib * cityPolicy.maternityUserRate
    const hpfUser = salaryInput.hpfb * cityPolicy.hpfUserRate
    const sibHpfAllUser = NP.plus(hpfUser, endowmentUser, medicalUser, unemploymentUser, maternityUser, workInjuryUser)
    const specialDeduction = NP.plus(
        salaryInputAdvance.babyCare,
        salaryInputAdvance.continuingEducation,
        salaryInputAdvance.seriousDiseases,
        salaryInputAdvance.housingLoanInterest,
        salaryInputAdvance.housingRent,
        salaryInputAdvance.elderSupport,
        salaryInputAdvance.childEducation
    )
    const salaryMinusSibHpfb = NP.minus(salaryInput.salary, sibHpfAllUser)
    const taxableIncome = NP.minus(salaryInput.salary, sibHpfAllUser, specialDeduction)

    let yeaTaxableIncome = NP.minus(NP.times(taxableIncome, 12), 60000)
    if (salaryInput.oneOffBonusType === OneOffBonusType.combine) {
        yeaTaxableIncome = NP.minus(
            NP.plus(NP.times(taxableIncome, 12), salaryInput.oneOffBonus),
            60000
        )
    }
    let yearTax = 0
    if (yeaTaxableIncome <= 0) {
        yearTax = 0
    } else if (yeaTaxableIncome <= 36000) {
        yearTax = NP.round(NP.times(yeaTaxableIncome, 0.03), 2)
    } else if (yeaTaxableIncome <= 144000) {
        yearTax = NP.round(NP.minus(NP.times(yeaTaxableIncome, 0.1), 2520), 2)
    } else if (yeaTaxableIncome <= 300000) {
        yearTax = NP.round(NP.minus(NP.times(yeaTaxableIncome, 0.2), 16920), 2)
    } else if (yeaTaxableIncome <= 420000) {
        yearTax = NP.round(NP.minus(NP.times(yeaTaxableIncome, 0.25), 31920), 2)
    } else if (yeaTaxableIncome <= 660000) {
        yearTax = NP.round(NP.minus(NP.times(yeaTaxableIncome, 0.3), 52920), 2)
    } else if (yeaTaxableIncome <= 960000) {
        yearTax = NP.round(NP.minus(NP.times(yeaTaxableIncome, 0.35), 85920), 2)
    } else if (yeaTaxableIncome > 960000) {
        yearTax = NP.round(NP.minus(NP.times(yeaTaxableIncome, 0.45), 181920), 2)
    }

    let oneOffBonusTax = 0
    const oneOffBonus = salaryInput.oneOffBonus
    if (OneOffBonusType.single === salaryInput.oneOffBonusType) {
        if (salaryInput.oneOffBonus <= 36000) {
            oneOffBonusTax = NP.round(NP.times(oneOffBonus, 0.03), 2)
        } else if (oneOffBonus <= 144000) {
            oneOffBonusTax = NP.round(NP.minus(NP.times(oneOffBonus, 0.1), 2520), 2)
        } else if (oneOffBonus <= 300000) {
            oneOffBonusTax = NP.round(NP.minus(NP.times(oneOffBonus, 0.2), 16920), 2)
        } else if (oneOffBonus <= 420000) {
            oneOffBonusTax = NP.round(NP.minus(NP.times(oneOffBonus, 0.25), 31920), 2)
        } else if (oneOffBonus <= 660000) {
            oneOffBonusTax = NP.round(NP.minus(NP.times(oneOffBonus, 0.3), 52920), 2)
        } else if (oneOffBonus <= 960000) {
            oneOffBonusTax = NP.round(NP.minus(NP.times(oneOffBonus, 0.35), 85920), 2)
        } else if (oneOffBonus > 960000) {
            oneOffBonusTax = NP.round(NP.minus(NP.times(oneOffBonus, 0.45), 181920), 2)
        }
    }
    let netSalary = 0
    if (OneOffBonusType.combine === salaryInput.oneOffBonusType) {
        const yearTaxableIncome = NP.times(taxableIncome, 12)
        const salaryPercent = NP.divide(yearTaxableIncome, NP.plus(yearTaxableIncome + oneOffBonus))
        const oneOffBonusPercent = NP.divide(oneOffBonus, NP.plus(yearTaxableIncome + oneOffBonus))
        const allNetIncoming = NP.minus(NP.plus(yearTaxableIncome, oneOffBonus), yearTax)
        netSalary = NP.divide(NP.times(salaryPercent, allNetIncoming), 12)
        oneOffBonusTax = NP.minus(oneOffBonus, NP.times(oneOffBonusPercent, allNetIncoming))
    }
    if (OneOffBonusType.single === salaryInput.oneOffBonusType) {
        netSalary = NP.minus(salaryMinusSibHpfb, NP.divide(yearTax, 12))
    }

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
        oneOffBonusTax: oneOffBonusTax,

        salaryMinusSibHpfb: salaryMinusSibHpfb,
        netSalary: netSalary,
        tax: NP.divide(yearTax, 12),
        yearAllIncoming: NP.plus(NP.times(netSalary, 12), NP.minus(oneOffBonus, oneOffBonusTax)),
    }
    return salaryResult
}

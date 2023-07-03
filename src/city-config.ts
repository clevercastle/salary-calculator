export interface CityPolicy {
    region: string
    sibMin: number
    sibMax: number
    hpfbMin: number
    hpfbMax: number

    endowmentUserRate: number
    endowmentCompanyRate: number
    medicalUserRate: number
    medicalCompanyRate: number
    unemploymentUserRate: number
    unemploymentCompanyRate: number
    workInjuryUserRate: number
    workInjuryCompanyRate: number
    maternityUserRate: number
    maternityCompanyRate: number
    hpfUserRate: number
    hpfCompanyRate: number
}

export const default_city_policy: CityPolicy = {
    region: "beijing",
    sibMin: 6377,
    sibMax: 31884,
    hpfbMin: 2320,
    hpfbMax: 31884,
    endowmentUserRate: 0.08,
    endowmentCompanyRate: 0.16,
    medicalUserRate: 0.02,
    medicalCompanyRate: 0.098,
    unemploymentUserRate: 0.005,
    unemploymentCompanyRate: 0.005,
    workInjuryUserRate: 0,
    workInjuryCompanyRate: 0.002,
    maternityUserRate: 0,
    maternityCompanyRate: 0,
    hpfUserRate: 0.12,
    hpfCompanyRate: 0.12,
}

export const city_polices = new Map<string, CityPolicy>()

city_polices.set("beijing", {
    region: "beijing",
    sibMin: 5869,
    sibMax: 31884,
    hpfbMin: 2320,
    hpfbMax: 31884,
    endowmentUserRate: 0.08,
    endowmentCompanyRate: 0.16,
    medicalUserRate: 0.02,
    medicalCompanyRate: 0.098,
    unemploymentUserRate: 0.005,
    unemploymentCompanyRate: 0.005,
    workInjuryUserRate: 0,
    workInjuryCompanyRate: 0.002,
    maternityUserRate: 0,
    maternityCompanyRate: 0,
    hpfUserRate: 0.12,
    hpfCompanyRate: 0.12,
})

city_polices.set("shanghai", {
    region: "shanghai",
    sibMin: 6837,
    sibMax: 34188,
    hpfbMin: 2590,
    hpfbMax: 34188,
    endowmentUserRate: 0.08,
    endowmentCompanyRate: 0.16,
    medicalUserRate: 0.02,
    medicalCompanyRate: 0.1,
    unemploymentUserRate: 0.005,
    unemploymentCompanyRate: 0.005,
    workInjuryUserRate: 0,
    workInjuryCompanyRate: 0.0016,
    maternityUserRate: 0,
    maternityCompanyRate: 0,
    hpfUserRate: 0.07,
    hpfCompanyRate: 0.07,
})

city_polices.set("hangzhou", {
    region: "hangzhou",
    sibMin: 3957,
    sibMax: 19783,
    hpfbMin: 2280,
    hpfbMax: 36675,
    endowmentUserRate: 0.08,
    endowmentCompanyRate: 0.14,
    medicalUserRate: 0.04,
    medicalCompanyRate: 0.115,
    unemploymentUserRate: 0.02,
    unemploymentCompanyRate: 0.01,
    workInjuryUserRate: 0,
    workInjuryCompanyRate: 0.008,
    maternityUserRate: 0,
    maternityCompanyRate: 0.006,
    hpfUserRate: 0.12,
    hpfCompanyRate: 0.12,
})

city_polices.set("nanjing", {
    region: "nanjing",
    sibMin: 4250,
    sibMax: 22470,
    hpfbMin: 2280,
    hpfbMax: 37200,
    endowmentUserRate: 0.08,
    endowmentCompanyRate: 0.16,
    medicalUserRate: 0.02,
    medicalCompanyRate: 0.09,
    unemploymentUserRate: 0.005,
    unemploymentCompanyRate: 0.005,
    workInjuryUserRate: 0,
    workInjuryCompanyRate: 0.004,
    maternityUserRate: 0,
    maternityCompanyRate: 0.008,
    hpfUserRate: 0.08,
    hpfCompanyRate: 0.08,
})

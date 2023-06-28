import * as React from "react"
import { createContext, useContext, useState } from "react"
import { city_polices, CityPolicy, default_city_policy } from "city-config"
import { OneOffBonusType, SalaryContextType } from "state/salary.state"
import { SalaryInputAdvance, SalaryInputType, SalaryResultType } from "salary.model"

const SalaryContext = createContext<SalaryContextType | undefined>(undefined)
export const useSalary = () => useContext<SalaryContextType | undefined>(SalaryContext) as SalaryContextType

// @ts-ignore
export const SalaryProvider = ({ children }) => {
    const [region, dispatchSetRegion] = useState<string>("beijing")
    const [cityPolicy, dispatchSetCityPolicy] = useState<CityPolicy>(city_polices.get(region) || default_city_policy)
    const [salaryInput, setSalaryInput] = useState<SalaryInputType>({
        salary: 0,
        oneOffBonus: 0,
        enableCustomSIB: true,
        sib: 0, // social insurance base
        enableCustomHPFB: true,
        hpfb: 0, // housing provider fund base
        cityPolicy: cityPolicy,
        oneOffBonusType: OneOffBonusType.combine,
    })
    const [salaryInputAdvance, setSalaryInputAdvance] = useState<SalaryInputAdvance>({
        babyCare: 0,
        childEducation: 0,
        continuingEducation: 0,
        elderSupport: 0,
        enableBabyCare: false,
        enableChildEducation: false,
        enableContinuingEducation: false,
        enableElderSupport: false,
        enableHousingLoanInterest: false,
        enableHousingRent: false,
        enableSeriousDiseases: false,
        housingLoanInterest: 0,
        housingRent: 0,
        seriousDiseases: 0,
    })
    const [salaryResult, setSalaryResult] = useState<SalaryResultType>({
        endowmentUser: 0,
        endowmentCompany: 0,
        medicalUser: 0,
        medicalCompany: 0,
        unemploymentUser: 0,
        unemploymentCompany: 0,
        maternityUser: 0,
        maternityCompany: 0,
        workInjuryCompany: 0,
        workInjuryUser: 0,
        hpfCompany: 0,
        hpfUser: 0,
        oneOffBonus: 0,
        oneOffBonusType: 0,
        childEducation: 0,
        continuingEducation: 0,
        seriousDiseases: 0,
        housingLoanInterest: 0,
        housingRent: 0,
        elderSupport: 0,
        babyCare: 0,
    })

    const updateSalaryInput = (newData: Partial<SalaryInputType>) => {
        setSalaryInput({ ...salaryInput, ...newData })
    }

    const updateSalaryInputAdvance = (newData: Partial<SalaryInputAdvance>) => {
        setSalaryInputAdvance({ ...salaryInputAdvance, ...newData })
    }

    const updateSalaryResult = (newData: Partial<SalaryResultType>) => {
        setSalaryResult({ ...salaryResult, ...newData })
    }

    const setRegion = (newRegion: string) => {
        // todo update sib hpfb
        dispatchSetRegion(newRegion)
        setCityPolicy(city_polices.get(newRegion))
    }

    const setCityPolicy = (newCityPolicy?: CityPolicy) => {
        if (newCityPolicy) {
            dispatchSetCityPolicy(newCityPolicy)
        }
    }

    return (
        <SalaryContext.Provider
            value={{
                region,
                salaryInput,
                salaryInputAdvance,
                salaryResult,
                cityPolicy,
                setRegion,
                updateSalaryInput,
                updateSalaryInputAdvance,
                updateSalaryResult,
                setCityPolicy,
            }}>
            {children}
        </SalaryContext.Provider>
    )
}

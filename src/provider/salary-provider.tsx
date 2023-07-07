import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { city_polices, CityPolicy, default_city_policy } from "city-config"
import { OneOffBonusType, SalaryContextType } from "state/salary.state"
import { calculateSalary, SalaryInputAdvance, SalaryInputType, SalaryResultType } from "salary.model"
import { hpfbCalculate, sibCalculate } from "utils"

const SalaryContext = createContext<SalaryContextType | undefined>(undefined)
export const useSalary = () => useContext<SalaryContextType | undefined>(SalaryContext) as SalaryContextType

// @ts-ignore
export const SalaryProvider = ({ children }) => {
    const [region, dispatchSetRegion] = useState<string>("beijing")
    const [cityPolicy, dispatchSetCityPolicy] = useState<CityPolicy>(city_polices.get(region) || default_city_policy)
    const [salaryInput, setSalaryInput] = useState<SalaryInputType>({
        salary: 0,
        oneOffBonus: 0,
        enableCustomSIB: false,
        sib: cityPolicy.sibMin, // social insurance base
        enableCustomHPFB: false,
        hpfb: cityPolicy.hpfbMin, // housing provider fund base
        cityPolicy: default_city_policy,
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
        salary: 0,
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
        oneOffBonusTax: 0,
        tax: 0,
        netSalary: 0,
        salaryMinusSibHpfbAll: 0,
        yearAllIncoming:0
    })

    useEffect(() => {
        if (!salaryInput.enableCustomSIB) {
            updateSalaryInput({ sib: sibCalculate(salaryInput.salary, cityPolicy) })
        }
        if (!salaryInput.enableCustomHPFB) {
            updateSalaryInput({ hpfb: hpfbCalculate(salaryInput.salary, cityPolicy) })
        }
    }, [cityPolicy])

    useEffect(() => {
        if (!salaryInput.enableCustomSIB) {
            updateSalaryInput({ sib: sibCalculate(salaryInput.salary, cityPolicy) })
        } else {
            updateSalaryInput({ sib: salaryInput.sib })
        }
    }, [salaryInput.salary, cityPolicy, salaryInput.enableCustomSIB])

    useEffect(() => {
        if (!salaryInput.enableCustomHPFB) {
            updateSalaryInput({ hpfb: hpfbCalculate(salaryInput.salary, cityPolicy) })
        } else {
            updateSalaryInput({ hpfb: salaryInput.hpfb })
        }
    }, [salaryInput.salary, cityPolicy, salaryInput.enableCustomHPFB])

    const updateSalaryInput = (newData: Partial<SalaryInputType>) => {
        setSalaryInput((prev) => ({ ...prev, ...newData }))
    }

    const updateSalaryInputAdvance = (newData: Partial<SalaryInputAdvance>) => {
        setSalaryInputAdvance((prev) => ({ ...prev, ...newData }))
    }

    const updateSalaryResult = (newData: Partial<SalaryResultType>) => {
        setSalaryResult((prev) => ({ ...prev, ...newData }))
    }

    const setRegion = (newRegion: string) => {
        dispatchSetRegion(newRegion)
        setCityPolicy(city_polices.get(newRegion))
    }

    const setCityPolicy = (newCityPolicy?: CityPolicy) => {
        if (newCityPolicy) {
            dispatchSetCityPolicy(newCityPolicy)
        }
    }

    const showSalaryResult = () => {
        const result = calculateSalary(salaryInput, salaryInputAdvance, cityPolicy)
        setSalaryResult(result)
    }

    const toggleEnableCustomerSIB = (b: boolean) => {
        updateSalaryInput({
            enableCustomSIB: b,
        })
    }

    const toggleEnableCustomerHPFB = (b: boolean) => {
        updateSalaryInput({
            enableCustomHPFB: b,
        })
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
                showSalaryResult,
                toggleEnableCustomerSIB,
                toggleEnableCustomerHPFB,
            }}>
            {children}
        </SalaryContext.Provider>
    )
}

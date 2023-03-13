import * as React from "react"
import { createContext, useContext, useState } from "react"
import { city_polices, CityPolicy, default_city_policy } from "../city-config"
import { SalaryContextType } from "../state/salary.state"
import { SalaryResultType } from "../salary.model"

const SalaryContext = createContext<SalaryContextType | null>(null)
export const useSalary = () => useContext<SalaryContextType | null>(SalaryContext)

// @ts-ignore
export const SalaryProvider = ({ children }) => {
    const [region, dispatchSetRegion] = useState<string>("beijing")
    const [salary, dispatchSetSalary] = useState<number>(0)
    const [cityPolicy, dispatchSetCityPolicy] = useState<CityPolicy>(city_polices.get(region) || default_city_policy)
    const [sib, dispatchSetSIB] = useState<number>(cityPolicy.sibMin)
    const [hpfb, dispatchSetHPFB] = useState<number>(cityPolicy.hpfbMin)
    const [oneOffBonus, dispatchSetOneOffBonus] = useState<number>(0)
    const [oneOffBonusType, dispatchSetOneOffBonusType] = useState<number>(0)
    const [enableCustomSIB, dispatchSetEnableCustomSIB] = useState<boolean>(false)
    const [enableCustomHPFB, dispatchSetEnableCustomHPFB] = useState<boolean>(false)
    const [salaryResult, dispatchSetSalaryResult] = useState<SalaryResultType>({
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
        babyCare: 0

    })
    const [childEducation, dispatchSetChildEducation] = useState<number>(12000)
    const [continuingEducation, dispatchSetContinuingEducation] = useState<number>(3600)
    const [seriousDiseases, dispatchSetSeriousDiseases] = useState<number>(0)
    const [housingLoanInterest, dispatchSetHousingLoanInterest] = useState<number>(12000)
    const [housingRent, dispatchSetHousingRent] = useState<number>(9600)
    const [elderSupport, dispatchSetElderSupport] = useState<number>(24000)
    const [babyCare, dispatchSetBabyCare] = useState<number>(12000)

    const [enableChildEducation, dispatchSetEnableChildEducation] = useState<boolean>(false)
    const [enableContinuingEducation, dispatchSetEnableContinuingEducation] = useState<boolean>(false)
    const [enableSeriousDiseases, dispatchSetEnableSeriousDiseases] = useState<boolean>(false)
    const [enableHousingLoanInterest, dispatchSetEnableHousingLoanInterest] = useState<boolean>(false)
    const [enableHousingRent, dispatchSetEnableHousingRent] = useState<boolean>(false)
    const [enableElderSupport, dispatchSetEnableElderSupport] = useState<boolean>(false)
    const [enableBabyCare, dispatchSetEnableBabyCare] = useState<boolean>(false)

    const setEnableChildEducation = (bol: boolean | null) => {
        if (bol != null) {
            dispatchSetEnableChildEducation(bol)
        }
    }
    const setEnableContinuingEducation = (bol: boolean | null) => {
        if (bol != null) {
            dispatchSetEnableContinuingEducation(bol)
        }
    }
    const setEnableSeriousDiseases = (bol: boolean | null) => {
        if (bol != null) {
            dispatchSetEnableSeriousDiseases(bol)
        }
    }
    const setEnableHousingLoanInterest = (bol: boolean | null) => {
        if (bol != null) {
            dispatchSetEnableHousingLoanInterest(bol)
        }
    }
    const setEnableHousingRent = (bol: boolean | null) => {
        if (bol != null) {
            dispatchSetEnableHousingRent(bol)
        }
    }
    const setEnableElderSupport = (bol: boolean | null) => {
        if (bol != null) {
            dispatchSetEnableElderSupport(bol)
        }
    }
    const setEnableBabyCare = (bol: boolean | null) => {
        if (bol != null) {
            dispatchSetEnableBabyCare(bol)
        }
    }

    const setRegion = (str: string | null) => {
        if (str) {
            dispatchSetRegion(str)
        }
    }

    const setSalary = (num: number | null) => {
        if (num) {
            dispatchSetSalary(num)
        }
    }

    const setSIB = (num: number | null) => {
        if (num) {
            dispatchSetSIB(num)
        }
    }

    const setHPFB = (num: number | null) => {
        if (num) {
            dispatchSetHPFB(num)
        }
    }

    const setEnableCustomSIB = (bol: boolean | null) => {
        if (bol != null) {
            dispatchSetEnableCustomSIB(bol)
        }
    }

    const setEnableCustomHPFB = (bol: boolean | null) => {
        if (bol != null) {
            dispatchSetEnableCustomHPFB(bol)
        }
    }

    const setOneOffBonus = (num: number | null) => {
        if (num) {
            dispatchSetOneOffBonus(num)
        }
    }

    const setOneOffBonusType = (num: number | null) => {
        if (num != null) {
            dispatchSetOneOffBonusType(num)
        }
    }

    const setCityPolicy = (cityPolicy: CityPolicy | null) => {
        if (cityPolicy) {
            dispatchSetCityPolicy(cityPolicy)
        }
    }

    const setSalaryResult = (salaryResult: SalaryResultType | null) => {
        if (salaryResult) {
            dispatchSetSalaryResult(salaryResult)
        }
    }

    const setChildEducation = (num: number | null) => {
        if (num != null) {
            dispatchSetChildEducation(num)
        }
    }
    const setContinuingEducation = (num: number | null) => {
        if (num != null) {
            dispatchSetContinuingEducation(num)
        }
    }
    const setSeriousDiseases = (num: number | null) => {
        if (num != null) {
            dispatchSetSeriousDiseases(num)
        }
    }
    const setHousingLoanInterest = (num: number | null) => {
        if (num != null) {
            dispatchSetHousingLoanInterest(num)
        }
    }
    const setElderSupport = (num: number | null) => {
        if (num != null) {
            dispatchSetElderSupport(num)
        }
    }
    const setBabyCare = (num: number | null) => {
        if (num != null) {
            dispatchSetBabyCare(num)
        }
    }

    const setHousingRent = (num: number | null) => {
        if (num != null) {
            dispatchSetHousingRent(num)
        }
    }
    return (
        <SalaryContext.Provider
            value={{
                region,
                setRegion,
                salary,
                setSalary,
                sib,
                setSIB,
                hpfb,
                setHPFB,
                enableCustomSIB,
                setEnableCustomSIB,
                enableCustomHPFB,
                setEnableCustomHPFB,
                oneOffBonus,
                setOneOffBonus,
                cityPolicy,
                setCityPolicy,
                salaryResult,
                setSalaryResult,
                oneOffBonusType,
                setOneOffBonusType,
                childEducation,
                setChildEducation,
                enableChildEducation,
                setEnableChildEducation,
                continuingEducation,
                setContinuingEducation,
                enableContinuingEducation,
                setEnableContinuingEducation,
                seriousDiseases,
                setSeriousDiseases,
                enableSeriousDiseases,
                setEnableSeriousDiseases,
                housingLoanInterest,
                setHousingLoanInterest,
                enableHousingLoanInterest,
                setEnableHousingLoanInterest,
                housingRent,
                setHousingRent,
                enableHousingRent,
                setEnableHousingRent,
                elderSupport,
                setElderSupport,
                enableElderSupport,
                setEnableElderSupport,
                babyCare,
                setBabyCare,
                enableBabyCare,
                setEnableBabyCare
            }}>
            {children}
        </SalaryContext.Provider>
    )
}

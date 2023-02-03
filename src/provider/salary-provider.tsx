import * as React from "react"
import { createContext, useContext, useState } from "react"
import { city_polices, CityPolicy, default_city_policy } from "../city-config"
import { SalaryContextType } from "../state/salary.state"

const SalaryContext = createContext<SalaryContextType | null>(null)
export const useSalaryInput = () => useContext<SalaryContextType | null>(SalaryContext)

// @ts-ignore
export const SalaryProvider = ({ children }) => {
    const [region, dispatchSetRegion] = useState<string>("beijing")
    const [salary, dispatchSetSalary] = useState<number>(0)
    const [cityPolicy, dispatchSetCityPolicy] = useState<CityPolicy>(city_polices.get(region) || default_city_policy)
    const [sib, dispatchSetSIB] = useState<number>(cityPolicy.sibMin)
    const [hpfb, dispatchSetHPFB] = useState<number>(cityPolicy.hpfbMin)
    const [oneOffBonus, dispatchSetOneOffBonus] = useState<number>(0)
    const [enableCustomSIB, dispatchSetEnableCustomSIB] = useState<boolean>(false)
    const [enableCustomHPFB, dispatchSetEnableCustomHPFB] = useState<boolean>(false)

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

    const setCityPolicy = (cityPolicy: CityPolicy | null) => {
        if (cityPolicy) {
            dispatchSetCityPolicy(cityPolicy)
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
                setCityPolicy
            }}>
            {children}
        </SalaryContext.Provider>
    )
}

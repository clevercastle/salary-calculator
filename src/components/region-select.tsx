import React from "react"


import { Cascader, Form } from "antd"
import { support_cities } from "../city"
import { useSalary } from "../provider/salary-provider"
import { SalaryContextType } from "../state/salary.state"
import { city_polices, default_city_policy } from "../city-config"
import { hpfbCalculate, sibCalculate } from "../util"

export const RegionSelect = () => {
    const {
        region,
        setRegion,
        salary,
        setCityPolicy,
        enableCustomSIB,
        setSIB,
        enableCustomHPFB,
        setHPFB
    } = useSalary() as SalaryContextType

    const regionChange = (e: any) => {
        const region = e[e.length - 1]
        const cityPolicy = city_polices.get(region) || default_city_policy
        setRegion(region)
        setCityPolicy(cityPolicy)
        if (!enableCustomSIB) {
            setSIB(sibCalculate(salary, cityPolicy))
        }
        if (!enableCustomHPFB) {
            setHPFB(hpfbCalculate(salary, cityPolicy))
        }
    }

    return (
        <Form className="input-region">
            <Form.Item>
                <Cascader defaultValue={[region]} options={support_cities}
                          onChange={regionChange}
                          placeholder="Select Address" />
            </Form.Item>
        </Form>
    )
}

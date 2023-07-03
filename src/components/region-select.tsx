import React from "react"

import { Cascader, Form } from "antd"
import { support_cities } from "city"
import { useSalary } from "provider/salary-provider"
import { city_polices, CityPolicy } from "city-config"

export const RegionSelect = () => {
    const { region, setRegion, setCityPolicy } = useSalary()

    const regionChange = (e: any) => {
        const region = e[e.length - 1]
        const cityPolicy = city_polices.get(region) && (city_polices.get("beijing") as CityPolicy)
        setCityPolicy(cityPolicy!!)
        setRegion(region)
    }

    return (
        <Form className="input-region">
            <Form.Item>
                <Cascader
                    defaultValue={[region]}
                    options={support_cities}
                    onChange={regionChange}
                    placeholder="Select Address"
                />
            </Form.Item>
        </Form>
    )
}

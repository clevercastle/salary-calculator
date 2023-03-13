import React from "react"

import { Cascader, Form } from "antd"
import { support_cities } from "../city"
import { useSalary } from "../provider/salary-provider"

export const RegionSelect = () => {
    const { region, setRegion } = useSalary()

    const regionChange = (e: any) => {
        const region = e[e.length - 1]
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

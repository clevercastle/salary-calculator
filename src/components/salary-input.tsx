import React from "react"

import { Button, Checkbox, Form, InputNumber } from "antd"
import { useSalaryInput } from "../provider/salary-provider"
import { SalaryContextType } from "../state/salary.state"
import { hpfbCalculate, sibCalculate } from "../util"

export const SalaryInput = () => {
    const {
        salary,
        setSalary,
        sib,
        setSIB,
        enableCustomSIB,
        setEnableCustomSIB,
        hpfb,
        setHPFB,
        enableCustomHPFB,
        setEnableCustomHPFB,
        oneOffBonus,
        setOneOffBonus,
        cityPolicy
    } = useSalaryInput() as SalaryContextType


    return (
        <div>
            <Form onSubmitCapture={() => {
                console.log("?????????????????")
                console.log(sib)
                console.log(hpfb)
            }}>
                <Form.Item label="薪水" rules={[{ required: true, message: "必填" }]}>
                    <InputNumber value={salary} onChange={(e) => {
                        setSalary(e)
                        if (!enableCustomSIB) {
                            setSIB(sibCalculate(e!!, cityPolicy))
                        }
                        if (!enableCustomHPFB) {
                            setHPFB(hpfbCalculate(e!!, cityPolicy))
                        }
                    }} />
                </Form.Item>
                <Form.Item label="社保基数">
                    <Checkbox checked={enableCustomSIB} onChange={e => {
                        console.log(e.target.checked)
                        setEnableCustomSIB(e.target.checked)
                        if (!e.target.checked) {
                            setSIB(sibCalculate(salary, cityPolicy))
                        }
                    }} />
                    <InputNumber disabled={!enableCustomSIB} value={sib} onChange={(e) => setSIB(e)} />
                </Form.Item>
                <Form.Item label="公积金基数">
                    <Checkbox checked={enableCustomHPFB} onChange={e => {
                        setEnableCustomHPFB(e.target.checked)
                        if (!e.target.checked) {
                            setHPFB(hpfbCalculate(salary, cityPolicy))
                        }
                    }} />
                    <InputNumber disabled={!enableCustomHPFB} value={hpfb} onChange={(e) => setHPFB(e)} />
                </Form.Item>
                <Form.Item label="年终奖">
                    <InputNumber value={oneOffBonus} onChange={(e) => setOneOffBonus(e)} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

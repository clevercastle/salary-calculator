import React from "react"
import { Button, Checkbox, Form, InputNumber, Radio, Space } from "antd"
import { useSalary } from "provider/salary-provider"
import { useCombine } from "util/input"
import { hpfbCalculate, sibCalculate } from "utils"

export const SalaryInput = () => {
    const { cityPolicy, salaryInput, updateSalaryInput, salaryInputAdvance, updateSalaryInputAdvance } = useSalary()
    const {
        combine: sib,
        toggle: toggleSIB,
        updateNumber: updateSIB,
    } = useCombine(salaryInput.salary, cityPolicy, sibCalculate)
    const {
        combine: hpfb,
        toggle: toggleHPFB,
        updateNumber: updateHPFB,
    } = useCombine(salaryInput.salary, cityPolicy, hpfbCalculate)

    const list = [
        {
            key: "childEducation",
            enableKey: "enableChildEducation",
            label: "子女教育",
            enable: salaryInputAdvance.enableChildEducation,
            value: salaryInputAdvance.childEducation,
        },
        {
            key: "continuingEducation",
            enableKey: "enableContinuingEducation",
            label: "继续教育",
            enable: salaryInputAdvance.enableContinuingEducation,
            value: salaryInputAdvance.continuingEducation,
        },
        {
            key: "seriousDiseases",
            enableKey: "enableSeriousDiseases",
            label: "大病医疗",
            enable: salaryInputAdvance.enableSeriousDiseases,
            value: salaryInputAdvance.seriousDiseases,
        },
        {
            key: "housingLoanInterest",
            enableKey: "enableHousingLoanInterest",
            label: "住房贷款利息",
            enable: salaryInputAdvance.enableHousingLoanInterest,
            value: salaryInputAdvance.housingLoanInterest,
        },
        {
            key: "housingRent",
            enableKey: "enableHousingRent",
            label: "住房租金",
            enable: salaryInputAdvance.enableHousingRent,
            value: salaryInputAdvance.housingRent,
        },
        {
            key: "elderSupport",
            enableKey: "enableElderSupport",
            label: "赡养老人",
            enable: salaryInputAdvance.enableElderSupport,
            value: salaryInputAdvance.elderSupport,
        },
        {
            key: "babyCare",
            enableKey: "enableBabyCare",
            label: "3岁以下婴幼儿照护",
            enable: salaryInputAdvance.enableBabyCare,
            value: salaryInputAdvance.babyCare,
        },
    ]
    const rows = []
    for (let i = 0; i < list.length; i++) {
        rows.push(
            <Form.Item key={list[i].key} label={list[i].label}>
                <Checkbox
                    className="input-checkbox"
                    checked={list[i].enable}
                    onChange={(e) => {
                        updateSalaryInputAdvance({ [list[i].enableKey]: e.target.checked, [list[i].key]: 0 })
                    }}
                />
                <InputNumber
                    className="input-number"
                    disabled={!list[i].enable}
                    step={100}
                    value={list[i].value}
                    onChange={(e) => {
                        updateSalaryInputAdvance({ [list[i].key]: e })
                    }}
                />
            </Form.Item>
        )
    }

    return (
        <div>
            <Form className="input-form">
                <Form.Item label="薪水" rules={[{ required: true, message: "必填" }]}>
                    <InputNumber
                        step={100}
                        value={salaryInput.salary}
                        onChange={(e) => {
                            if (!sib.enabled) {
                                updateSIB(sibCalculate(e!!, cityPolicy))
                            }
                            if (!hpfb.enabled) {
                                updateHPFB(hpfbCalculate(e!!, cityPolicy))
                            }
                            updateSalaryInput({ salary: e!! })
                        }}
                    />
                </Form.Item>
                <Form.Item label="社保基数">
                    <Checkbox
                        className="input-checkbox"
                        checked={sib.enabled}
                        onChange={(e) => {
                            toggleSIB(e.target.checked)
                        }}
                    />
                    <InputNumber
                        step={100}
                        className="input-number"
                        disabled={!sib.enabled}
                        value={sib.value}
                        onChange={(e) => {
                            updateSIB(e!!)
                        }}
                    />
                </Form.Item>

                <Form.Item label="公积金基数">
                    <Checkbox
                        className="input-checkbox"
                        checked={hpfb.enabled}
                        onChange={(e) => {
                            toggleHPFB(e.target.checked)
                        }}
                    />
                    <InputNumber
                        step={100}
                        className="input-number"
                        disabled={!hpfb.enabled}
                        value={hpfb.value}
                        onChange={(e) => updateHPFB(e!!)}
                    />
                </Form.Item>
                <Form.Item label="年终奖">
                    <InputNumber
                        value={salaryInput.oneOffBonus}
                        onChange={(e) => {
                            updateSalaryInput({ oneOffBonus: e!! })
                        }}
                    />
                </Form.Item>
                <Form.Item label="年终奖计税方式">
                    <Radio.Group
                        onChange={(e) => {
                            updateSalaryInput({ oneOffBonusType: e.target.value })
                        }}
                        value={salaryInput.oneOffBonusType}>
                        <Space direction="vertical">
                            <Radio value={0}>合并计税</Radio>
                            <Radio value={1}>单独计税</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <p>专项扣除</p>
                {rows}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

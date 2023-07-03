import React from "react"
import { Button, Checkbox, Form, InputNumber, Radio, Space } from "antd"
import { useSalary } from "provider/salary-provider"

export const SalaryInput = () => {
    const {
        salaryInput,
        updateSalaryInput,
        salaryInputAdvance,
        updateSalaryInputAdvance,
        showSalaryResult,
        toggleEnableCustomerSIB,
        toggleEnableCustomerHPFB,
    } = useSalary()
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
            <Form className="input-form" onSubmitCapture={showSalaryResult}>
                <Form.Item label="薪水" rules={[{ required: true, message: "必填" }]}>
                    <InputNumber
                        step={100}
                        value={salaryInput.salary}
                        onChange={(e) => {
                            updateSalaryInput({ salary: e!! })
                        }}
                    />
                </Form.Item>
                <Form.Item label="社保基数">
                    <Checkbox
                        className="input-checkbox"
                        checked={salaryInput.enableCustomSIB}
                        onChange={(e) => {
                            toggleEnableCustomerSIB(e.target.checked)
                        }}
                    />
                    <InputNumber
                        step={100}
                        className="input-number"
                        disabled={!salaryInput.enableCustomSIB}
                        value={salaryInput.sib}
                        onChange={(e) => {
                            updateSalaryInput({ sib: e!! })
                        }}
                    />
                </Form.Item>

                <Form.Item label="公积金基数">
                    <Checkbox
                        className="input-checkbox"
                        checked={salaryInput.enableCustomHPFB}
                        onChange={(e) => {
                            toggleEnableCustomerHPFB(e.target.checked)
                        }}
                    />
                    <InputNumber
                        step={100}
                        className="input-number"
                        disabled={!salaryInput.enableCustomHPFB}
                        value={salaryInput.hpfb}
                        onChange={(e) => updateSalaryInput({ hpfb: e!! })}
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
                        计算
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

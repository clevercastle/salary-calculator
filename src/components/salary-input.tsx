import React from "react"

import { Button, Checkbox, Form, InputNumber, Radio, Space } from "antd"
import { useSalary } from "../provider/salary-provider"
import { SalaryContextType } from "../state/salary.state"
import { hpfbCalculate, sibCalculate } from "../util"
import { calculateSalary } from "../salary.model"

export const SalaryInput = () => {
    const {
        salary, setSalary,
        sib, setSIB,
        enableCustomSIB, setEnableCustomSIB,
        hpfb, setHPFB,
        enableCustomHPFB, setEnableCustomHPFB,
        oneOffBonus, setOneOffBonus,
        cityPolicy,
        setSalaryResult,
        oneOffBonusType, setOneOffBonusType,
        childEducation, setChildEducation, enableChildEducation, setEnableChildEducation,
        continuingEducation, setContinuingEducation, enableContinuingEducation, setEnableContinuingEducation,
        seriousDiseases, setSeriousDiseases, enableSeriousDiseases, setEnableSeriousDiseases,
        housingLoanInterest, setHousingLoanInterest, enableHousingLoanInterest, setEnableHousingLoanInterest,
        housingRent, setHousingRent, enableHousingRent, setEnableHousingRent,
        elderSupport, setElderSupport, enableElderSupport, setEnableElderSupport,
        babyCare, setBabyCare, enableBabyCare, setEnableBabyCare
    } = useSalary() as SalaryContextType


    const list = [
        {
            key: "childEducation",
            label: "子女教育",
            enable: enableChildEducation,
            setEnable: setEnableChildEducation,
            value: childEducation,
            setValue: setChildEducation
        },
        {
            key: "continuingEducation",
            label: "继续教育",
            enable: enableContinuingEducation,
            setEnable: setEnableContinuingEducation,
            value: continuingEducation,
            setValue: setContinuingEducation
        },
        {
            key: "seriousDiseases",
            label: "大病医疗",
            enable: enableSeriousDiseases,
            setEnable: setEnableSeriousDiseases,
            value: seriousDiseases,
            setValue: setSeriousDiseases
        },
        {
            key: "housingLoanInterest",
            label: "住房贷款利息",
            enable: enableHousingLoanInterest,
            setEnable: setEnableHousingLoanInterest,
            value: housingLoanInterest,
            setValue: setHousingLoanInterest
        },
        {
            key: "housingRent",
            label: "住房租金",
            enable: enableHousingRent,
            setEnable: setEnableHousingRent,
            value: housingRent,
            setValue: setHousingRent
        },
        {
            key: "elderSupport",
            label: "赡养老人",
            enable: enableElderSupport,
            setEnable: setEnableElderSupport,
            value: elderSupport,
            setValue: setElderSupport
        },
        {
            key: "babyCare",
            label: "3岁以下婴幼儿照护",
            enable: enableBabyCare,
            setEnable: setEnableBabyCare,
            value: babyCare,
            setValue: setBabyCare
        }
    ]
    const rows = []
    for (let i = 0; i < list.length; i++) {
        rows.push(<Form.Item key={list[i].key} label={list[i].label}>
            <Checkbox className="input-checkbox" checked={list[i].enable}
                      onChange={e => {
                          list[i].setEnable(e.target.checked)
                      }} />
            <InputNumber className="input-number" disabled={!list[i].enable}
                         value={list[i].value}
                         onChange={(e) => {
                             if (e != null && e >= 0) {
                                 list[i].setValue(e)
                             }
                         }} />
        </Form.Item>)
    }

    return (
        <div>
            <Form className="input-form" onSubmitCapture={() => {
                const result = calculateSalary(salary, sib, hpfb, cityPolicy, oneOffBonus, oneOffBonusType,
                    childEducation,
                    continuingEducation,
                    seriousDiseases,
                    housingLoanInterest,
                    housingRent,
                    elderSupport,
                    babyCare)
                setSalaryResult(result)
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
                    <Checkbox className="input-checkbox" checked={enableCustomSIB}
                              onChange={e => {
                                  console.log(e.target.checked)
                                  setEnableCustomSIB(e.target.checked)
                                  if (!e.target.checked) {
                                      setSIB(sibCalculate(salary, cityPolicy))
                                  }
                              }} />
                    <InputNumber className="input-number" disabled={!enableCustomSIB} value={sib}
                                 onChange={(e) => setSIB(e)} />
                </Form.Item>
                <Form.Item label="公积金基数">
                    <Checkbox className="input-checkbox" checked={enableCustomHPFB} onChange={e => {
                        setEnableCustomHPFB(e.target.checked)
                        if (!e.target.checked) {
                            setHPFB(hpfbCalculate(salary, cityPolicy))
                        }
                    }} />
                    <InputNumber className="input-number" disabled={!enableCustomHPFB} value={hpfb}
                                 onChange={(e) => setHPFB(e)} />
                </Form.Item>
                <Form.Item label="年终奖">
                    <InputNumber value={oneOffBonus} onChange={(e) => setOneOffBonus(e)} />
                </Form.Item>
                <Form.Item label="年终奖计税方式">
                    <Radio.Group onChange={e => {
                        setOneOffBonusType(e.target.value)
                    }
                    } value={oneOffBonusType}>
                        <Space direction="vertical">
                            <Radio value={0}>合并计税</Radio>
                            <Radio value={1}>单独计税</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <p>专项扣除</p>
                {rows}
                <Form.Item>
                    <Button type="primary" htmlType="submit" />
                </Form.Item>
            </Form>
        </div>
    )
}

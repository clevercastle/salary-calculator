import React from "react"
import { useSalary } from "provider/salary-provider"
import { SalaryContextType } from "state/salary.state"
import { Table } from "antd"
import { ColumnsType } from "antd/es/table"
import NP from "number-precision"

interface DataType {
    key: React.Key
    name: string
    user: number
    company: number | null
    all: number | null
}

export const SalaryResultTable = () => {
    const { salaryResult } = useSalary() as SalaryContextType

    const columns: ColumnsType<DataType> = [
        {
            title: "名称",
            width: 100,
            dataIndex: "name",
            key: "name",
            fixed: "left",
        },
        {
            title: "个人",
            width: 100,
            dataIndex: "user",
            key: "user",
            fixed: "left",
        },
        {
            title: "公司",
            width: 100,
            dataIndex: "company",
            key: "company",
            fixed: "left",
        },
        {
            title: "总计",
            width: 100,
            dataIndex: "all",
            key: "all",
            fixed: "left",
        },
    ]

    const data: DataType[] = []
    data.push({
        key: "hpf",
        name: "住房公积金",
        user: NP.round(salaryResult.hpfUser, 2),
        company: NP.round(salaryResult.hpfCompany, 2),
        all: NP.round(NP.plus(salaryResult.hpfUser, salaryResult.hpfCompany), 2),
    })
    data.push({
        key: "endowment",
        name: "养老保险",
        user: NP.round(salaryResult.endowmentUser, 2),
        company: NP.round(salaryResult.endowmentCompany, 2),
        all: NP.round(NP.plus(salaryResult.endowmentUser, salaryResult.endowmentCompany), 2),
    })
    data.push({
        key: "medical",
        name: "医疗保险",
        user: NP.round(salaryResult.medicalUser, 2),
        company: NP.round(salaryResult.medicalCompany, 2),
        all: NP.round(NP.plus(salaryResult.medicalUser, salaryResult.medicalCompany), 2),
    })
    data.push({
        key: "unemployment",
        name: "失业保险",
        user: NP.round(salaryResult.unemploymentUser, 2),
        company: NP.round(salaryResult.unemploymentCompany, 2),
        all: NP.round(NP.plus(salaryResult.unemploymentUser, salaryResult.unemploymentCompany), 2),
    })
    data.push({
        key: "maternity",
        name: "生育保险",
        user: NP.round(salaryResult.maternityUser, 2),
        company: NP.round(salaryResult.maternityCompany, 2),
        all: NP.round(NP.plus(salaryResult.maternityUser, salaryResult.maternityCompany), 2),
    })
    data.push({
        key: "workInjury",
        name: "工伤保险",
        user: NP.round(salaryResult.workInjuryUser, 2),
        company: NP.round(salaryResult.workInjuryCompany, 2),
        all: NP.round(NP.plus(salaryResult.workInjuryUser, salaryResult.workInjuryCompany), 2),
    })
    const sibHpfAllUser = NP.round(
        NP.plus(
            salaryResult.hpfUser,
            salaryResult.endowmentUser,
            salaryResult.medicalUser,
            salaryResult.unemploymentUser,
            salaryResult.maternityUser,
            salaryResult.workInjuryUser
        ),
        2
    )
    const sibHpfAllCompany = NP.round(
        NP.plus(
            salaryResult.hpfCompany,
            salaryResult.endowmentCompany,
            salaryResult.medicalCompany,
            salaryResult.unemploymentCompany,
            salaryResult.maternityCompany,
            salaryResult.workInjuryCompany
        ),
        2
    )
    data.push({
        key: "sib-hpfb-all",
        name: "五险一金总支出",
        user: sibHpfAllUser,
        company: sibHpfAllCompany,
        all: NP.round(NP.plus(sibHpfAllUser, sibHpfAllCompany), 2),
    })
    // todo
    const salaryMinusSibHpfbAll = NP.minus(salaryResult.salary, sibHpfAllUser)
    data.push({
        key: "salary-minus-sib-hpfb-all",
        name: "扣除五险一金薪水",
        user: NP.round(salaryMinusSibHpfbAll, 2),
        company: null,
        all: null,
    })
    console.log(salaryMinusSibHpfbAll)
    let tax = 0

    let yearTaxSalary = NP.minus(NP.times(salaryMinusSibHpfbAll, 12), 60000)
    console.log(salaryResult.oneOffBonusType)
    console.log(yearTaxSalary)
    if (salaryResult.oneOffBonusType === 0) {
        console.log("年终奖")
        yearTaxSalary = NP.minus(NP.plus(NP.times(salaryMinusSibHpfbAll, 12), salaryResult.oneOffBonus), 60000)
        console.log(yearTaxSalary)
    }
    if (yearTaxSalary <= 0) {
        tax = 0
    } else if (yearTaxSalary <= 36000) {
        tax = NP.round(NP.times(yearTaxSalary, 0.03), 2)
    } else if (yearTaxSalary <= 144000) {
        tax = NP.round(NP.minus(NP.times(yearTaxSalary, 0.1), 2520), 2)
    } else if (yearTaxSalary <= 300000) {
        tax = NP.round(NP.minus(NP.times(yearTaxSalary, 0.2), 16920), 2)
    } else if (yearTaxSalary <= 420000) {
        tax = NP.round(NP.minus(NP.times(yearTaxSalary, 0.25), 31920), 2)
    } else if (yearTaxSalary <= 660000) {
        tax = NP.round(NP.minus(NP.times(yearTaxSalary, 0.3), 52920), 2)
    } else if (yearTaxSalary <= 960000) {
        tax = NP.round(NP.minus(NP.times(yearTaxSalary, 0.35), 85920), 2)
    } else if (yearTaxSalary > 960000) {
        tax = NP.round(NP.minus(NP.times(yearTaxSalary, 0.45), 181920), 2)
    }

    data.push({
        key: "tax",
        name: "个人所得税",
        user: NP.round(NP.divide(tax, 12), 2),
        company: null,
        all: null,
    })

    let oneOffBonusTax = 0
    if (1 === salaryResult.oneOffBonusType) {
        if (salaryResult.oneOffBonus <= 36000) {
            oneOffBonusTax = NP.round(NP.times(salaryResult.oneOffBonus, 0.03), 2)
        } else if (salaryResult.oneOffBonus <= 144000) {
            oneOffBonusTax = NP.round(NP.minus(NP.times(salaryResult.oneOffBonus, 0.1), 2520), 2)
        } else if (salaryResult.oneOffBonus <= 300000) {
            oneOffBonusTax = NP.round(NP.minus(NP.times(salaryResult.oneOffBonus, 0.2), 16920), 2)
        } else if (salaryResult.oneOffBonus <= 420000) {
            oneOffBonusTax = NP.round(NP.minus(NP.times(salaryResult.oneOffBonus, 0.25), 31920), 2)
        } else if (salaryResult.oneOffBonus <= 660000) {
            oneOffBonusTax = NP.round(NP.minus(NP.times(salaryResult.oneOffBonus, 0.3), 52920), 2)
        } else if (salaryResult.oneOffBonus <= 960000) {
            oneOffBonusTax = NP.round(NP.minus(NP.times(salaryResult.oneOffBonus, 0.35), 85920), 2)
        } else if (salaryResult.oneOffBonus > 960000) {
            oneOffBonusTax = NP.round(NP.minus(NP.times(salaryResult.oneOffBonus, 0.45), 181920), 2)
        }
    }

    if (0 === salaryResult.oneOffBonusType) {
        data.push({
            key: "salary",
            name: "税后月薪",
            user: NP.round(
                NP.minus(NP.plus(salaryMinusSibHpfbAll, NP.divide(salaryResult.oneOffBonus, 12)), NP.divide(tax, 12)),
                2
            ),
            company: null,
            all: null,
        })
        data.push({
            key: "yearIncome",
            name: "全年收入",
            user: NP.round(NP.minus(NP.plus(NP.times(salaryMinusSibHpfbAll, 12), salaryResult.oneOffBonus), tax), 2),
            company: null,
            all: null,
        })
    } else {
        data.push({
            key: "salary",
            name: "税后月薪",
            user: NP.round(NP.minus(salaryMinusSibHpfbAll, NP.divide(tax, 12)), 2),
            company: null,
            all: null,
        })
        data.push({
            key: "oneOffBonus",
            name: "全年一次性奖金",
            user: NP.round(NP.minus(salaryResult.oneOffBonus, oneOffBonusTax), 2),
            company: null,
            all: null,
        })
        data.push({
            key: "yearIncome",
            name: "全年收入",
            user: NP.round(
                NP.plus(NP.times(salaryMinusSibHpfbAll, 12), NP.minus(salaryResult.oneOffBonus, oneOffBonusTax)),
                2
            ),
            company: null,
            all: null,
        })
    }
    return (<Table columns={columns} dataSource={data} pagination={{ hideOnSinglePage: true }} />)
}

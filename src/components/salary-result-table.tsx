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

    data.push({
        key: "salary-minus-sib-hpfb-all",
        name: "扣除五险一金薪水",
        user: NP.round(salaryResult.salaryMinusSibHpfbAll, 2),
        company: null,
        all: null,
    })

    data.push({
        key: "tax",
        name: "个人所得税",
        user: NP.round(salaryResult.tax, 2),
        company: null,
        all: null,
    })

    data.push({
        key: "salary",
        name: "税后月薪",
        user: NP.round(salaryResult.netSalary, 2),
        company: null,
        all: null,
    })

    data.push({
        key: "oneOffBonus",
        name: "全年一次性奖金",
        user: NP.round(NP.minus(salaryResult.oneOffBonus, salaryResult.oneOffBonusTax), 2),
        company: null,
        all: null,
    })

    data.push({
        key: "oneOffBonusTax",
        name: "全年一次性奖金税",
        user: NP.round(salaryResult.oneOffBonusTax, 2),
        company: null,
        all: null,
    })

    data.push({
        key: "yearIncome",
        name: "全年收入",
        user: NP.round(salaryResult.yearAllIncoming, 2),
        company: null,
        all: null,
    })
    return <Table columns={columns} dataSource={data} pagination={{ hideOnSinglePage: true }} />
}

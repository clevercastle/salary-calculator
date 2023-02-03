interface Option {
    value: string;
    label: string;
    children?: Option[] | null;
}

export const support_cities: Option[] = [
    {
        value: "beijing",
        label: "北京",
        children: null
    },
    {
        value: "shanghai",
        label: "上海",
        children: null
    },
    {
        value: "zhejiang",
        label: "浙江",
        children: [
            {
                value: "hangzhou",
                label: "杭州",
                children: null
            }
        ]
    },
    {
        value: "jiangsu",
        label: "江苏",
        children: [
            {
                value: "nanjing",
                label: "南京",
                children: null
            }
        ]
    }

]

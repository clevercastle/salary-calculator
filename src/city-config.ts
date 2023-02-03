export interface CityPolicy {
    sibMin: number
    sibMax: number
    hpfbMin: number
    hpfbMax: number
}

export const default_city_policy = {
    sibMin: 1000,
    sibMax: 1000,
    hpfbMin: 1000,
    hpfbMax: 1000
}

export const city_polices = new Map<string, CityPolicy>()


city_polices.set("beijing", {
    sibMin: 3000,
    sibMax: 15000,
    hpfbMin: 5000,
    hpfbMax: 30000
})

city_polices.set("shanghai", {
    sibMin: 4000,
    sibMax: 16000,
    hpfbMin: 6000,
    hpfbMax: 31000
})


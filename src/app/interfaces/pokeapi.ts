export interface Data{
    count: number,
    next: string,
    previous: string,
    result: Resultado[]
}

export interface Resultado{
    name: string,
    url: string,
}
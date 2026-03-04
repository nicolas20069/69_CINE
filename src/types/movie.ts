export interface Movie{
    title: string;
    year : number;
    genero: string;
    director: string;
    image: string;
}

export type MovieCategory= 'new' | 'old';
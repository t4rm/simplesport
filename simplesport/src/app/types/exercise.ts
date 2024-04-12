export interface Exercise {
    difficulty: string;
    equipment: string;
    instructions: string;
    muscle: string;
    name: string;
    type: string;
    series: number;
}

export interface Gym {
    name: string;
    lat: number;
    lng: number;
    category: string[];
}

export interface Marker {
    lat: number;
    lng: number;
    name: string;
}
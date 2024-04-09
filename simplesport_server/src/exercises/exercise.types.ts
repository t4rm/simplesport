import { Muscle, ExerciseType, Difficulty } from './exercise.constants';

export type Exercise = {
    name: string;
    type: ExerciseType;
    muscle: Muscle;
    equipment: string;
    difficulty: Difficulty;
    instructions: string;
};
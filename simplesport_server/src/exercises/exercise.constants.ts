const MUSCLES = ['abdominals', 'abductors', 'adductors', 'biceps', 'calves', 'chest', 'forearms', 'glutes', 'hamstrings', 'lats', 'lower_back', 'middle_back', 'neck', 'quadriceps', 'traps', 'triceps'] as const;
const TYPES = ['cardio', 'olympic_weightlifting', 'plyometrics', 'powerlifting', 'strength', 'stretching', 'strongman'] as const;
const DIFFICULTIES = ['beginner', 'intermediate', 'expert'] as const;

export const ExerciseConstants = {
    MUSCLES,
    TYPES,
    DIFFICULTIES
};

export type Muscle = typeof MUSCLES[number];
export type ExerciseType = typeof TYPES[number];
export type Difficulty = typeof DIFFICULTIES[number];
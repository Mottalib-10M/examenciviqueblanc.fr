/** Accès à la banque au moment du build (jamais importé par un composant client). */
import BANK from '../data/questions/bank.json';
import type { Question } from './engine/exam';
export const QUESTIONS: Question[] = BANK.questions as Question[];

export type SectionId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type AppMode = 'student' | 'teacher';

export interface AttendanceRecord {
  id: string;
  name: string;
  studentNumber: string;
  className: string;
  status: 'Hadir' | 'Izin' | 'Sakit';
  mood: string;
  hope: string;
  timestamp: string;
}

export interface LearningObjective {
  id: string;
  category: 'Kognitif' | 'Afektif' | 'Psikomotorik';
  title: string;
  description: string;
  indicator: string;
  completed?: boolean;
}

export interface ApperceptionCase {
  id: string;
  title: string;
  withoutLaw: {
    description: string;
    imagePrompt: string;
    impact: string;
  };
  withLaw: {
    description: string;
    imagePrompt: string;
    impact: string;
  };
  lesson: string;
}

export interface LawCase {
  id: number;
  title: string;
  cartoonCharacter: string;
  avatar: string;
  scenario: string;
  location: 'Sekolah' | 'Jalan Raya' | 'Masyarakat' | 'Media Sosial' | 'Lingkungan';
  question: string;
  options: {
    text: string;
    isFair: boolean;
    explanation: string;
    point: number;
  }[];
}

export interface SortItem {
  id: string;
  text: string;
  icon: string;
  category: 'taat' | 'melanggar';
  explanation: string;
}

export interface ReflectionData {
  threeLearnings: string[];
  twoFavorites: string[];
  oneCommitment: string;
  rating: number;
  studentName: string;
  completedDate: string;
}

export interface GroupTeam {
  id: number;
  name: string;
  colorName: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  badgeBg: string;
  ringColor: string;
  avatar: string;
  motto: string;
  score: number;
  boardPosition: number; // 1 to 30
  casesSolved: number;
  buzzersWon: number;
}

export interface BoardCell {
  index: number;
  type: 'start' | 'normal' | 'ladder' | 'slide' | 'quiz' | 'mystery' | 'finish';
  title: string;
  description: string;
  icon: string;
  targetIndex?: number;
  points?: number;
  badge?: string;
}

export interface BuzzerQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

export interface MysteryCard {
  id: number;
  title: string;
  icon: string;
  description: string;
  actionText: string;
  pointsDelta: number;
  stepsDelta: number;
  isChallenge?: boolean;
}

export interface WheelSegment {
  id: number;
  label: string;
  icon: string;
  color: string;
  points: number;
  type: 'case' | 'constitution' | 'court' | 'institution' | 'quick' | 'protection' | 'surprise' | 'grand';
}

export interface WheelChallenge {
  id: number;
  segmentId: number;
  title: string;
  category: string;
  scenario: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  rewardPoints: number;
}

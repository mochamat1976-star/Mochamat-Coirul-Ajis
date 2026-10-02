/**
 * Central Student Submission Store
 * Menyimpan seluruh data interaksi dan jawaban siswa secara persisten di browser (localStorage)
 * Khusus untuk direkap, diperiksa, dan dicetak oleh Guru Pengampu pada Mode Guru.
 */

export interface StudentSubmission {
  id: string;
  studentName: string;
  studentClass: string;
  studentNumber: string;
  submittedAt: string;
  attendance?: {
    status: 'Hadir' | 'Izin' | 'Sakit';
    mood: string;
    hope: string;
    timestamp: string;
  };
  aperceptionAnswer?: {
    question: string;
    selectedText: string;
    isCorrect: boolean;
    timestamp: string;
  };
  materialQuiz?: {
    question: string;
    selectedAnswer: string;
    isCorrect: boolean;
    timestamp: string;
  };
  tournamentRank?: {
    teamName: string;
    teamScore: number;
    rank: number;
  };
  reflection?: {
    q1Understand: string;
    q2Question: string;
    q3FavoriteActivity: string;
    q4MoralValue: string;
    commitment: string;
    starRating: number;
    timestamp: string;
  };
  sumatifAssessment?: {
    score: number;
    correctCount: number;
    totalQuestions: number;
    isPassed: boolean;
    timestamp: string;
    answersDetail: {
      questionId: number;
      question: string;
      studentAnswerText: string;
      correctAnswerText: string;
      isCorrect: boolean;
    }[];
  };
}

const STORAGE_KEY = 'ruang_belajar_ppkn_student_submissions';

export const getStoredSubmissions = (): StudentSubmission[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with initial realistic class submissions for demonstration
      const initial: StudentSubmission[] = [
        {
          id: 'sub-1',
          studentName: 'Ahmad Faiz Fadhlurrahman',
          studentClass: 'Kelas VIII-A',
          studentNumber: '01',
          submittedAt: new Date(Date.now() - 3600000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          attendance: {
            status: 'Hadir',
            mood: '🔥 Membara Semangat',
            hope: 'Ingin mengerti tugas lembaga-lembaga hukum di Indonesia.',
            timestamp: '07:30 WIB'
          },
          aperceptionAnswer: {
            question: 'Mengapa dalam Pasal 1 Ayat 3 ditegaskan Indonesia adalah Negara Hukum?',
            selectedText: 'Agar seluruh warga negara terlindungi hak asasinya, ada kepastian hukum, dan keadilan tegak tanpa pandang bulu.',
            isCorrect: true,
            timestamp: '07:45 WIB'
          },
          materialQuiz: {
            question: 'Pasal manakah yang menyatakan Negara Indonesia adalah negara hukum?',
            selectedAnswer: 'Pasal 1 Ayat (3)',
            isCorrect: true,
            timestamp: '08:00 WIB'
          },
          reflection: {
            q1Understand: 'Saya paham bahwa hukum menempati kedudukan tertinggi (supremasi hukum) dan semua orang sama di depan hukum (equality before the law).',
            q2Question: 'Bagaimana peran Mahkamah Konstitusi dalam menguji undang-undang?',
            q3FavoriteActivity: 'Bermain Roda Putar Keadilan bersama Kelompok 1 dan kuis rebutan bel.',
            q4MoralValue: 'Keberanian menolak kecurangan akademik dan tidak melakukan perundungan di kelas.',
            commitment: 'Saya berjanji akan menjunjung tinggi aturan hukum dan tata tertib SMPN 5 Madiun.',
            starRating: 5,
            timestamp: '08:30 WIB'
          },
          sumatifAssessment: {
            score: 100,
            correctCount: 10,
            totalQuestions: 10,
            isPassed: true,
            timestamp: '08:40 WIB',
            answersDetail: [
              { questionId: 1, question: 'Pasal 1 Ayat 3 UUD NRI 1945 menyatakan...', studentAnswerText: 'Negara Indonesia adalah negara hukum', correctAnswerText: 'Negara Indonesia adalah negara hukum', isCorrect: true },
              { questionId: 2, question: 'Prinsip persamaan di depan hukum disebut...', studentAnswerText: 'Equality before the law', correctAnswerText: 'Equality before the law', isCorrect: true },
              { questionId: 3, question: 'Lembaga yang menguji UU terhadap UUD 1945...', studentAnswerText: 'Mahkamah Konstitusi', correctAnswerText: 'Mahkamah Konstitusi', isCorrect: true }
            ]
          }
        },
        {
          id: 'sub-2',
          studentName: 'Nadhira Putri Kirana',
          studentClass: 'Kelas VIII-A',
          studentNumber: '02',
          submittedAt: new Date(Date.now() - 1800000).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          attendance: {
            status: 'Hadir',
            mood: '😊 Ceria & Bahagia',
            hope: 'Ingin belajar menjadi penegak hukum yang jujur.',
            timestamp: '07:32 WIB'
          },
          aperceptionAnswer: {
            question: 'Mengapa dalam Pasal 1 Ayat 3 ditegaskan Indonesia adalah Negara Hukum?',
            selectedText: 'Agar seluruh warga negara terlindungi hak asasinya, ada kepastian hukum, dan keadilan tegak tanpa pandang bulu.',
            isCorrect: true,
            timestamp: '07:46 WIB'
          },
          materialQuiz: {
            question: 'Pasal manakah yang menyatakan Negara Indonesia adalah negara hukum?',
            selectedAnswer: 'Pasal 1 Ayat (3)',
            isCorrect: true,
            timestamp: '08:02 WIB'
          },
          reflection: {
            q1Understand: 'Memahami pentingnya tata tertib dan rambu-rambu hukum agar kehidupan masyarakat tertib.',
            q2Question: 'Perbedaan tugas polisi dan jaksa dalam persidangan pidana.',
            q3FavoriteActivity: 'Game refleks Uji Fokus Hakim Pancasila dan simulasi sidang peradilan LKPD.',
            q4MoralValue: 'Menghargai martabat teman tanpa diskriminasi.',
            commitment: 'Saya berjanji akan selalu tertib di sekolah dan bijak menggunakan media sosial.',
            starRating: 5,
            timestamp: '08:32 WIB'
          },
          sumatifAssessment: {
            score: 90,
            correctCount: 9,
            totalQuestions: 10,
            isPassed: true,
            timestamp: '08:42 WIB',
            answersDetail: [
              { questionId: 1, question: 'Pasal 1 Ayat 3 UUD NRI 1945 menyatakan...', studentAnswerText: 'Negara Indonesia adalah negara hukum', correctAnswerText: 'Negara Indonesia adalah negara hukum', isCorrect: true },
              { questionId: 2, question: 'Prinsip persamaan di depan hukum disebut...', studentAnswerText: 'Equality before the law', correctAnswerText: 'Equality before the law', isCorrect: true },
              { questionId: 3, question: 'Lembaga yang menguji UU terhadap UUD 1945...', studentAnswerText: 'Mahkamah Konstitusi', correctAnswerText: 'Mahkamah Konstitusi', isCorrect: true }
            ]
          }
        }
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const saveStudentSubmission = (
  studentName: string,
  studentClass: string,
  updateFn: (prev: StudentSubmission) => StudentSubmission
): StudentSubmission => {
  const all = getStoredSubmissions();
  const effectiveName = studentName.trim() || 'Peserta Didik Aktif';
  const effectiveClass = studentClass.trim() || 'Kelas VIII-A';

  let existingIdx = all.findIndex(
    s => s.studentName.toLowerCase() === effectiveName.toLowerCase() && s.studentClass === effectiveClass
  );

  let target: StudentSubmission;
  if (existingIdx >= 0) {
    target = updateFn(all[existingIdx]);
    all[existingIdx] = target;
  } else {
    const newSubmission: StudentSubmission = {
      id: `sub-${Date.now()}`,
      studentName: effectiveName,
      studentClass: effectiveClass,
      studentNumber: String(all.length + 1).padStart(2, '0'),
      submittedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    target = updateFn(newSubmission);
    all.push(target);
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (err) {
    console.error('Failed to save to localStorage', err);
  }

  return target;
};

export const clearAllSubmissions = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear localStorage', err);
  }
};

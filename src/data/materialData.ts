import { ApperceptionCase, LawCase, LearningObjective, SortItem, GroupTeam, BoardCell, BuzzerQuestion, MysteryCard, WheelSegment, WheelChallenge } from '../types';

export const MODULE_INFO = {
  curriculum: 'Kurikulum Merdeka (Permendikdasmen No. 13 Tahun 2025)',
  codeATP: 'SMP.D.PPKn.8.2',
  title: 'Indonesia Sebagai Negara Hukum',
  appTitle: 'Ruang Belajar Pendidikan Pancasila Kelas VIII',
  subject: 'Pendidikan Pancasila',
  phase: 'Fase D',
  grade: 'Kelas VIII (Delapan) / Semester Ganjil',
  school: 'SMP Negeri 5 Madiun',
  author: 'Mochamat Choirul Ajis, S.Pd.',
  role: 'Mahasiswa PPG Pendidikan Pancasila',
  academicYear: '2026/2027',
  timeAllocation: '2 x 40 Menit (1 Pertemuan)',
  constitutionalArticle: 'UUD NRI Tahun 1945 Pasal 1 Ayat (3)',
  constitutionalText: '“Negara Indonesia adalah negara hukum.”',
  model: 'Problem Based Learning (PBL) & Deep Learning'
};

export const NATIONAL_ANTHEM = {
  title: 'Dari Sabang Sampai Merauke',
  composer: 'R. Soerarjo',
  lyrics: [
    'Dari Sabang sampai Merauke berjajar pulau-pulau,',
    'Sambung menyambung menjadi satu, itulah Indonesia.',
    'Indonesia tanah airku, aku berjanji padamu,',
    'Menjunjung tanah airku, tanah airku Indonesia.'
  ],
  meaning: 'Menegaskan bahwa ribuan pulau yang terbentang luas dari Sabang di ujung barat hingga Merauke di ujung timur dipersatukan oleh satu hukum dan kedaulatan konstitusi Negara Republik Indonesia yang adil dan beradab.'
};

export const PRAYERS = [
  {
    id: 'islam',
    title: 'Doa Sebelum Belajar (Islami)',
    arabic: 'رَضِيتُ بِاللهِ رَبًّا، وَبِالإِسْلاَمِ دِينًا، وَبِمُحَمَّدٍ نَبِيًّا وَرَسُولاً، رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا',
    latin: 'Rodhitu billahi robba, wabil islami dina, wabimuhammadin nabiyya warosula. Robbi zidnii \'ilman warzuqnii fahma.',
    meaning: 'Kami ridho Allah sebagai Tuhanku, Islam sebagai agamaku, dan Nabi Muhammad sebagai nabi dan rasulku. Ya Tuhanku, tambahkanlah kepadaku ilmu dan berilah aku karunia untuk memahaminya.',
    adab: 'Duduk tegak, angkat kedua tangan, tundukkan pandangan, dan fokuskan hati memohon keberkahan ilmu dan tegaknya keadilan.'
  },
  {
    id: 'universal',
    title: 'Doa Pelajar Pancasila (Bersama / Universal)',
    arabic: 'Tuhan Yang Maha Esa, Sumber Segala Keadilan dan Kebijaksanaan',
    latin: 'Doa Kebangsaan Menguatkan Nilai Ketuhanan & Keadilan Sosial',
    meaning: 'Ya Tuhan Yang Maha Adil dan Maha Bijaksana, berkahilah ruang belajar kami di SMP Negeri 5 Madiun hari ini. Terangilah akal dan hati nurani kami agar kami mampu memahami makna Indonesia sebagai negara hukum, menjunjung tinggi hak asasi sesama, serta menjadi insan yang jujur, disiplin, dan berintegritas bagi bangsa Indonesia. Amin.',
    adab: 'Satukan niat mulia, bernapas tenang, dan bertekad menegakkan kebenaran antarteman.'
  },
  {
    id: 'christian',
    title: 'Doa Kristiani / Katolik',
    arabic: 'Dalam Nama Bapa, dan Putra, dan Roh Kudus',
    latin: 'Doa Terang Roh Kudus untuk Kebijaksanaan dan Ketertiban Hidup',
    meaning: 'Bapa Surgawi yang penuh kasih dan keadilan, kami mengucap syukur atas kesempatan belajar hari ini. Berkatilah guru kami Pak Mochamat Choirul Ajis dan segenap teman sekelas kami, agar kami diberi hikmat untuk taat pada aturan yang benar, saling mengasihi, dan tidak menindas yang lemah. Amin.',
    adab: 'Melipat tangan, memusatkan hati dalam kasih dan kebenaran Tuhan.'
  },
  {
    id: 'silent',
    title: 'Hening Cipta / Doa Menurut Keyakinan Diri',
    arabic: 'Mengheningkan Cipta untuk Mengagungkan Sang Pencipta & Pendiri Bangsa',
    latin: 'Refleksi Batin & Doa Khidmat untuk Keadilan Hukum Negeri',
    meaning: 'Dalam keheningan ini, marilah kita bersyukur atas anugerah konstitusi negara hukum, memohon kemudahan dalam menyerap ilmu keadilan, dan berikrar menjadi pribadi yang tertib serta bertanggung jawab.',
    adab: 'Tutup mata sejenak selama 30 detik, bernapas teratur, dan panjatkan niat terbaikmu.'
  }
];

export const LEARNING_OBJECTIVES: LearningObjective[] = [
  {
    id: 'tp-1',
    category: 'Kognitif',
    title: 'Menganalisis Kedudukan Indonesia Sebagai Negara Hukum',
    description: 'Menganalisis ketentuan UUD NRI Tahun 1945 Pasal 1 Ayat (3) bahwa Indonesia adalah negara hukum (Rechtsstaat) secara kritis dan komprehensif.',
    indicator: 'Mampu menjelaskan makna Rechtsstaat vs Machtsstaat dan asas supremasi hukum dalam kehidupan bernegara.'
  },
  {
    id: 'tp-2',
    category: 'Kognitif',
    title: 'Mengidentifikasi Asas & Ciri Utama Negara Hukum',
    description: 'Mengidentifikasi prinsip persamaan di depan hukum (equality before the law - Pasal 27 Ayat 1), asas legalitas, dan perlindungan hak asasi manusia.',
    indicator: 'Mampu menguraikan ciri-ciri negara hukum Pancasila dan tata urutan peraturan perundang-undangan (UU No. 12 Tahun 2011).'
  },
  {
    id: 'tp-3',
    category: 'Afektif',
    title: 'Mengevaluasi Peran Lembaga Penegak Hukum & Keadilan',
    description: 'Mengevaluasi peran Kepolisian, Kejaksaan, Kehakiman, Mahkamah Konstitusi, dan KPK dalam menegakkan hukum secara adil dan tidak pandang bulu.',
    indicator: 'Menunjukkan sikap hormat pada hukum, menolak korupsi, kecurangan akademik, dan ujaran kebencian.'
  },
  {
    id: 'tp-4',
    category: 'Psikomotorik',
    title: 'Menyelesaikan Simulasi Kasus Hukum & Budaya Tertib',
    description: 'Merumuskan solusi berkeadilan atas studi kasus pelanggaran hukum di sekolah, masyarakat, dan media sosial melalui diskusi kelompok serta turnamen interaktif.',
    indicator: 'Berhasil memecahkan simulasi kasus sengketa perundungan dan hak cipta dalam turnamen kelompok 30 menit.'
  }
];

export const APPERCEPTION_CASES: ApperceptionCase[] = [
  {
    id: 'traffic-rule',
    title: 'Studi Kasus 1: Perempatan Jalan Raya (Ada vs Tanpa Aturan Hukum)',
    withoutLaw: {
      description: 'Lampu lalu lintas mati, tidak ada rambu dan marka jalan, aparat polisi absen. Semua pengendara saling serobot, mobil besar menindas motor, terjadi kemacetan total, keributan fisik, dan kecelakaan fatal.',
      imagePrompt: 'Perempatan jalan raya semrawut tanpa rambu, hukum rimba berlaku',
      impact: 'Hukum rimba (yang kuat menindas yang lemah), anarki sosial, rasa takut, dan kerugian jiwa serta materi bagi semua orang.'
    },
    withLaw: {
      description: 'Lampu lalu lintas menyala tertib, marka jalan ditaati, semua pengendara memakai helm dan sabuk pengaman. Pejabat maupun warga biasa antre bergantian sesuai sinyal lampu hijau/merah dengan diawasi kamera tilang elektronik.',
      imagePrompt: 'Lalu lintas rapi, tertib, semua pengendara aman dan saling menghormati',
      impact: 'Arus lalu lintas lancar, hak pejalan kaki terlindungi, keadilan terasa nyata karena hukum berlaku sama untuk semua orang.'
    },
    lesson: 'Ubi Societas Ibi Ius — Di mana ada masyarakat, di situ pasti ada hukum. Hukum hadir bukan untuk membatasi kebebasan, melainkan menjamin ketertiban dan keselamatan bersama!'
  },
  {
    id: 'digital-justice',
    title: 'Studi Kasus 2: Media Sosial & Kebebasan Berekspresi Beradab',
    withoutLaw: {
      description: 'Dunia maya tanpa regulasi hukum. Orang bebas memfitnah, membuat akun palsu penyebar hoaks pemeras, mencuri data pribadi teman, dan melakukan cyberbullying tanpa ada rasa bersalah atau takut dihukum.',
      imagePrompt: 'Layar gadget penuh ujaran kebencian, fitnah, dan kepanikan digital',
      impact: 'Korban mengalami trauma mental berat, rusaknya nama baik, perpecahan sosial, dan hilangnya rasa aman di ruang digital.'
    },
    withLaw: {
      description: 'Terdapat regulasi perlindungan data pribadi dan penegakan hukum siber yang adil. Netizen beretika, saling mengapresiasi karya, dan aparat kepolisian siber menindak akun penipu secara transparan.',
      imagePrompt: 'Ruang digital ramah, aman, kolaboratif, dan saling memajukan',
      impact: 'Ruang internet menjadi sarana inovasi dan belajar yang aman, hak cipta terlindungi, dan keadilan dapat dituntut secara sah.'
    },
    lesson: 'Kebebasan di negara hukum adalah kebebasan yang bertanggung jawab dan dibatasi oleh hak asasi orang lain serta norma hukum yang sah!'
  }
];

export const LEGAL_STATE_CONCEPTS = {
  constitutionalBasis: {
    article: 'UUD NRI Tahun 1945 Pasal 1 Ayat (3)',
    text: '“Negara Indonesia adalah negara hukum.”',
    meaning: 'Ketentuan ini menegaskan bahwa segala sendi kehidupan bermasyarakat, berbangsa, dan bernegara harus didasarkan pada hukum yang berkeadilan, BUKAN atas kekuasaan sepihak penguasa (Rechtsstaat, bukan Machtsstaat).'
  },
  principles: [
    {
      title: 'Supremasi Hukum (Supremacy of Law)',
      tag: 'Hukum Tertinggi',
      icon: 'Shield',
      desc: 'Hukum menempati kedudukan tertinggi dalam tata kelola negara. Semua lembaga negara, pejabat pemerintah, maupun rakyat wajib tunduk pada hukum.'
    },
    {
      title: 'Persamaan di Depan Hukum (Equality Before the Law)',
      tag: 'Pasal 27 Ayat (1)',
      icon: 'Scale',
      desc: 'Semua warga negara bersamaan kedudukannya di dalam hukum dan pemerintahan tanpa ada pengecualian atau perlakuan istimewa bagi status sosial atau jabatan.'
    },
    {
      title: 'Asas Legalitas (Legality Principle)',
      tag: 'Dasar Yuridis Sah',
      icon: 'BookOpen',
      desc: 'Setiap kebijakan pemerintah dan penindakan hukum harus bersandar pada peraturan perundang-undangan yang sah dan telah diundangkan sebelumnya.'
    },
    {
      title: 'Peradilan yang Bebas & Tidak Memihak (Independent Judiciary)',
      tag: 'Kekuasaan Kehakiman',
      icon: 'Landmark',
      desc: 'Hakim memiliki kemerdekaan untuk memeriksa dan memutus perkara semata-mata demi kebenaran, keadilan, dan Ketuhanan Yang Maha Esa tanpa intervensi kekuasaan lain.'
    },
    {
      title: 'Jaminan Perlindungan Hak Asasi Manusia (HAM)',
      tag: 'Pasal 28A - 28J',
      icon: 'Users',
      desc: 'Negara hukum wajib melindungi hak dasar warga: hak hidup, hak bersuara, hak berpendidikan, serta hak atas rasa aman dari kesewenang-wenangan.'
    }
  ],
  rechtsstaatVsMachtsstaat: [
    {
      aspect: 'Landasan Bertindak',
      rechtsstaat: 'Hukum dan konstitusi tertulis yang adil (Rule of Law).',
      machtsstaat: 'Kehendak bebas dan kekuasaan mutlak penguasa (Rule of Power).'
    },
    {
      aspect: 'Kedudukan Warga',
      rechtsstaat: 'Semua sama di hadapan hukum (Equality before the law).',
      machtsstaat: 'Rakyat sebagai bawahan yang tunduk tanpa jaminan kepastian hukum.'
    },
    {
      aspect: 'Peradilan & Pengawasan',
      rechtsstaat: 'Peradilan independen dan adanya kontrol hukum terbuka.',
      machtsstaat: 'Pengadilan dikendalikan penguasa demi melanggengkan kekuasaan.'
    },
    {
      aspect: 'Tujuan Akhir',
      rechtsstaat: 'Keadilan sosial, kepastian hukum, dan perlindungan martabat rakyat.',
      machtsstaat: 'Mempertahankan hegemoni dan kepentingan elite penguasa.'
    }
  ],
  institutions: [
    {
      name: 'Kepolisian Negara RI (Polri)',
      role: 'Memelihara ketertiban masyarakat, menegakkan hukum, serta mengayomi dan melayani warga (Pasal 30 Ayat 4 UUD 1945).',
      icon: 'ShieldAlert'
    },
    {
      name: 'Kejaksaan Republik Indonesia',
      role: 'Melakukan penuntutan perkara pidana di pengadilan dan melaksanakan penetapan serta putusan hakim yang berkekuatan hukum tetap.',
      icon: 'Briefcase'
    },
    {
      name: 'Mahkamah Agung (MA)',
      role: 'Puncak peradilan umum, agama, militer, dan tata usaha negara, serta menguji peraturan di bawah undang-undang terhadap undang-undang.',
      icon: 'Landmark'
    },
    {
      name: 'Mahkamah Konstitusi (MK)',
      role: 'Menguji undang-undang terhadap UUD 1945, memutus sengketa kewenangan lembaga negara, dan memutus perselisihan hasil pemilu.',
      icon: 'Scale'
    },
    {
      name: 'Komisi Pemberantasan Korupsi (KPK)',
      role: 'Lembaga independen yang bertugas mencegah, mengawasi, dan menindak tindak pidana korupsi demi menyelamatkan keuangan negara.',
      icon: 'Search'
    }
  ],
  hierarchy: [
    { level: 1, name: 'UUD NRI Tahun 1945', desc: 'Hukum dasar tertulis tertinggi negara Indonesia.' },
    { level: 2, name: 'Ketetapan MPR (Tap MPR)', desc: 'Ketetapan majelis permusyawaratan rakyat yang masih berlaku.' },
    { level: 3, name: 'Undang-Undang / Perppu', desc: 'Dibentuk DPR bersama Presiden untuk mengatur hajat hidup masyarakat.' },
    { level: 4, name: 'Peraturan Pemerintah (PP)', desc: 'Ditetapkan Presiden untuk menjalankan Undang-Undang sebagaimana mestinya.' },
    { level: 5, name: 'Peraturan Presiden (Perpres)', desc: 'Ditetapkan Presiden untuk menjalankan amanat PP atau kewenangan konstitusional.' },
    { level: 6, name: 'Peraturan Daerah Provinsi', desc: 'Dibentuk DPRD Provinsi bersama Gubernur untuk kebutuhan daerah provinsi.' },
    { level: 7, name: 'Peraturan Daerah Kabupaten/Kota', desc: 'Dibentuk DPRD Kab/Kota bersama Bupati/Wali Kota untuk wilayah setempat.' }
  ]
};

// Alias for backwards compatibility
export const NKRI_CONCEPTS = LEGAL_STATE_CONCEPTS;

// 6 Teams for classroom competition
export const DEFAULT_TEAMS: GroupTeam[] = [
  {
    id: 1,
    name: 'Kelompok 1: Satria Konstitusi (Merah)',
    colorName: 'Merah Berani',
    bgColor: 'bg-rose-500',
    textColor: 'text-rose-600',
    borderColor: 'border-rose-400',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    ringColor: 'ring-rose-500',
    avatar: '⚖️',
    motto: 'UUD 1945 Pasal 1 Ayat 3 Pedoman Hukum Kami!',
    score: 0,
    boardPosition: 1,
    casesSolved: 0,
    buzzersWon: 0
  },
  {
    id: 2,
    name: 'Kelompok 2: Garda Keadilan (Biru)',
    colorName: 'Biru Wibawa',
    bgColor: 'bg-blue-600',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-400',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    ringColor: 'ring-blue-500',
    avatar: '🛡️',
    motto: 'Semua Sama di Hadapan Hukum Tanpa Pandang Bulu!',
    score: 0,
    boardPosition: 1,
    casesSolved: 0,
    buzzersWon: 0
  },
  {
    id: 3,
    name: 'Kelompok 3: Laskar Hakim Berintegritas (Kuning)',
    colorName: 'Kuning Kejujuran',
    bgColor: 'bg-amber-500',
    textColor: 'text-amber-600',
    borderColor: 'border-amber-400',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    ringColor: 'ring-amber-500',
    avatar: '🔨',
    motto: 'Tegakkan Keadilan Walaupun Langit Runtuh!',
    score: 0,
    boardPosition: 1,
    casesSolved: 0,
    buzzersWon: 0
  },
  {
    id: 4,
    name: 'Kelompok 4: Duta Anti-Korupsi (Hijau)',
    colorName: 'Hijau Integritas',
    bgColor: 'bg-emerald-600',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-400',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    ringColor: 'ring-emerald-500',
    avatar: '🌿',
    motto: 'Katakan Tidak pada Korupsi dan Kecurangan!',
    score: 0,
    boardPosition: 1,
    casesSolved: 0,
    buzzersWon: 0
  },
  {
    id: 5,
    name: 'Kelompok 5: Punggawa Anti-Bullying (Ungu)',
    colorName: 'Ungu Peduli HAM',
    bgColor: 'bg-purple-600',
    textColor: 'text-purple-600',
    borderColor: 'border-purple-400',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    ringColor: 'ring-purple-500',
    avatar: '🤝',
    motto: 'Hargai Hak Asasi Teman, Stop Perundungan!',
    score: 0,
    boardPosition: 1,
    casesSolved: 0,
    buzzersWon: 0
  },
  {
    id: 6,
    name: 'Kelompok 6: Pandu Taat Norma Madiun (Oranye)',
    colorName: 'Oranye Disiplin',
    bgColor: 'bg-orange-500',
    textColor: 'text-orange-600',
    borderColor: 'border-orange-400',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    ringColor: 'ring-orange-500',
    avatar: '🚦',
    motto: 'Tertib Aturan Dimulai dari Diri Sendiri!',
    score: 0,
    boardPosition: 1,
    casesSolved: 0,
    buzzersWon: 0
  }
];

// 8 Dynamic Segments for Roda Putar Keadilan (Spinning Wheel of Justice)
export const WHEEL_SEGMENTS: WheelSegment[] = [
  { id: 0, label: 'Misi Detektif', icon: '🔍', color: '#EF4444', points: 25, type: 'case' },
  { id: 1, label: 'Pasal 1 Ayat 3', icon: '📜', color: '#F59E0B', points: 20, type: 'constitution' },
  { id: 2, label: 'Putusan Hakim', icon: '⚖️', color: '#10B981', points: 30, type: 'court' },
  { id: 3, label: 'Penegak Hukum', icon: '🏛️', color: '#3B82F6', points: 20, type: 'institution' },
  { id: 4, label: 'Kuis Kilat', icon: '💡', color: '#8B5CF6', points: 15, type: 'quick' },
  { id: 5, label: 'Lindungi HAM', icon: '🛡️', color: '#EC4899', points: 25, type: 'protection' },
  { id: 6, label: 'Bonus Berkah', icon: '🎁', color: '#14B8A6', points: 20, type: 'surprise' },
  { id: 7, label: 'Hakim Agung', icon: '👑', color: '#D97706', points: 40, type: 'grand' }
];

export const WHEEL_CHALLENGES: WheelChallenge[] = [
  {
    id: 1,
    segmentId: 0,
    title: 'Misi Detektif: Kasus Penemuan Dompet di Perpustakaan',
    category: 'Analisis Kasus Nyata',
    scenario: 'Siswa A dituduh mencuri dompet karena rekaman CCTV menunjukkan ia sempat memegang dompet yang tertinggal di meja perpustakaan. Namun ia mengaku hanya berniat membawanya ke meja guru pustakawan.',
    question: 'Berdasarkan asas hukum "Presumption of Innocence" (Praduga Tak Bersalah), apa sikap yang paling benar?',
    options: [
      'Langsung menyebarkan foto Siswa A di grup medsos kelas sebagai pencuri.',
      'Menganggap Siswa A belum tentu bersalah sampai ada bukti sah dan melakukan klarifikasi bersama guru BK.',
      'Meminta Siswa A dihukum skorsing sebelum mendengarkan keterangannya.',
      'Membiarkan begitu saja tanpa ada penyerahan dompet kepada pemiliknya.'
    ],
    correctIndex: 1,
    explanation: 'Benar! Di negara hukum berlaku asas praduga tak bersalah (presumption of innocence): seseorang tidak boleh dianggap bersalah sebelum terbukti secara sah dan meyakinkan.',
    rewardPoints: 25
  },
  {
    id: 2,
    segmentId: 1,
    title: 'Tantangan Pasal Konstitusi: Makna Pasal 1 Ayat 3',
    category: 'Landasan Yuridis',
    scenario: 'UUD NRI 1945 Pasal 1 Ayat (3) berbunyi tegas: "Negara Indonesia adalah negara hukum."',
    question: 'Apa implikasi hukum tertinggi dari bunyi pasal tersebut terhadap penyelenggaraan negara?',
    options: [
      'Presiden berhak mengubah undang-undang secara sepihak tanpa persetujuan DPR.',
      'Segala kebijakan penguasa dan perilaku warga negara harus berlandaskan hukum yang sah dan adil.',
      'Hanya rakyat kecil yang wajib mematuhi peraturan daerah.',
      'Hukum adat tidak boleh dihormati sama sekali di seluruh wilayah nusantara.'
    ],
    correctIndex: 1,
    explanation: 'Tepat sekali! Negara hukum (Rechtsstaat) berarti kekuasaan diatur dan dibatasi oleh hukum, mencegah kesewenang-wenangan penguasa (Machtsstaat).',
    rewardPoints: 20
  },
  {
    id: 3,
    segmentId: 2,
    title: 'Duel Putusan Hakim: Kasus Pelanggaran Lampu Merah Pejabat',
    category: 'Persamaan di Depan Hukum',
    scenario: 'Sebuah mobil dinas berplat istimewa menerobos lampu merah saat tidak sedang dalam tugas darurat resmi. Pengendara motor di belakangnya juga ikut menerobos karena melihat mobil tersebut tidak ditegur.',
    question: 'Berdasarkan asas Equality Before the Law (Pasal 27 Ayat 1), tindakan adil polisi lalu lintas adalah:',
    options: [
      'Hanya menilang pengendara motor karena jabatannya lebih rendah.',
      'Membiarkan keduanya karena plat mobil dinas memiliki kekebalan mutlak.',
      'Menindak tegas dan menilang kedua pelanggar secara adil sesuai ketentuan UU Lalu Lintas.',
      'Meminta maaf kepada pejabat dan meminta uang damai tanpa surat tilang.'
    ],
    correctIndex: 2,
    explanation: 'Hebat! Pasal 27 Ayat (1) menegaskan bahwa segala warga negara bersamaan kedudukannya di dalam hukum dan pemerintahan tanpa diskriminasi.',
    rewardPoints: 30
  },
  {
    id: 4,
    segmentId: 3,
    title: 'Lembaga Penegak Hukum: Uji Materi Undang-Undang',
    category: 'Struktur Lembaga Negara',
    scenario: 'Masyarakat merasa sebuah Undang-Undang yang baru disahkan melanggar hak-hak dasar konstitusi yang diatur dalam UUD 1945.',
    question: 'Lembaga peradilan manakah yang berwenang menguji undang-undang terhadap UUD 1945?',
    options: [
      'Mahkamah Agung (MA)',
      'Mahkamah Konstitusi (MK)',
      'Komisi Yudisial (KY)',
      'Kejaksaan Agung'
    ],
    correctIndex: 1,
    explanation: 'Tepat! Mahkamah Konstitusi (MK) berwenang menguji konstitusionalitas Undang-Undang terhadap Undang-Undang Dasar Negara Republik Indonesia Tahun 1945.',
    rewardPoints: 20
  },
  {
    id: 5,
    segmentId: 4,
    title: 'Kuis Kilat: Asas Legalitas Hukum Pidana',
    category: 'Konsep Hukum Dasar',
    scenario: 'Pepatah hukum Romawi: "Nullum delictum nulla poena sine praevia lege poenali".',
    question: 'Apa arti dari asas legalitas tersebut dalam sistem hukum Indonesia?',
    options: [
      'Suatu perbuatan tidak dapat dihukum kecuali atas kekuatan aturan pidana yang sudah ada sebelumnya.',
      'Hukum boleh dibuat berlaku surut untuk menghukum musuh politik.',
      'Setiap orang yang bersalah langsung dihukum tanpa melalui persidangan.',
      'Hakim boleh menciptakan hukuman baru sesuka hati tanpa dasar undang-undang.'
    ],
    correctIndex: 0,
    explanation: 'Sempurna! Asas legalitas (Pasal 1 Ayat 1 KUHP) menjamin kepastian hukum: perbuatan hanya dapat dipidana jika telah ada undang-undangnya terlebih dahulu.',
    rewardPoints: 15
  },
  {
    id: 6,
    segmentId: 5,
    title: 'Lindungi HAM: Solusi Bijak Menghentikan Cyberbullying',
    category: 'Perlindungan Hak Asasi Teman',
    scenario: 'Seorang siswa menjadi korban editan foto bernada menghina di story media sosial teman sekelasnya hingga ia malu masuk sekolah.',
    question: 'Tindakan kelompok kalian yang paling mencerminkan penegakan hukum berkeadilan restoratif di sekolah adalah:',
    options: [
      'Membalas dengan mengedit foto pelaku agar dia merasakan hal yang sama.',
      'Mengajak teman lain mendiamkan dan mengucilkan korban perundungan.',
      'Melaporkan bukti tangkapan layar kepada Guru BK/Pamong dan mendampingi korban dengan empati.',
      'Menertawakan postingan tersebut karena dianggap candaan wajar remaja.'
    ],
    correctIndex: 2,
    explanation: 'Tepat! Menjaga martabat orang lain adalah amanat HAM (Pasal 28G UUD 1945) dan undang-undang perlindungan anak serta UU ITE.',
    rewardPoints: 25
  },
  {
    id: 7,
    segmentId: 6,
    title: 'Kartu Berkah Integritas: Bonus Keberuntungan Kelompok',
    category: 'Apresiasi Karakter Pelajar',
    scenario: 'Kelompok kalian selalu menunjukkan kekompakan, mendengarkan argumen teman, dan menjunjung musyawarah mufakat.',
    question: 'Nilai Pancasila manakah yang paling mencerminkan musyawarah dalam permusyawaratan/perwakilan?',
    options: [
      'Sila ke-1 (Ketuhanan)',
      'Sila ke-2 (Kemanusiaan)',
      'Sila ke-4 (Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan)',
      'Sila ke-5 (Keadilan Sosial)'
    ],
    correctIndex: 2,
    explanation: 'Hebat! Sila ke-4 mengajarkan penyelesaian masalah melalui musyawarah mufakat demi kebaikan bersama.',
    rewardPoints: 20
  },
  {
    id: 8,
    segmentId: 7,
    title: 'Misi Hakim Agung: Hierarki Peraturan Perundang-undangan',
    category: 'Tantangan Emas Regulasi',
    scenario: 'Berdasarkan UU No. 12 Tahun 2011, jika ada Peraturan Daerah (Perda) yang bertentangan dengan Undang-Undang di atasnya, peraturan tersebut dinyatakan batal demi hukum.',
    question: 'Lembaga yang berwenang melakukan uji materiil Perda terhadap Undang-Undang adalah:',
    options: [
      'Mahkamah Agung (MA)',
      'Komisi Pemberantasan Korupsi (KPK)',
      'DPRD Tingkat Kabupaten',
      'Menteri Koordinator Politik dan Keamanan'
    ],
    correctIndex: 0,
    explanation: 'Luar biasa! Mahkamah Agung berwenang menguji peraturan perundang-undangan di bawah undang-undang terhadap undang-undang.',
    rewardPoints: 40
  }
];

// Fallback BOARD_CELLS so any legacy reference doesn't error
export const BOARD_CELLS: BoardCell[] = [
  { index: 1, type: 'start', title: 'Mulai Sidang', description: 'Titik awal perjalanan keadilan.', icon: '⚖️' },
  { index: 2, type: 'normal', title: 'Pasal 1 Ayat 3', description: 'Indonesia adalah negara hukum.', icon: '📜' }
];

export const MYSTERY_CARDS: MysteryCard[] = [
  { id: 1, title: 'Kejujuran Berbuah Manis', icon: '🌟', description: 'Kelompok menjunjung transparansi data.', actionText: 'Maju & Bonus', pointsDelta: 20, stepsDelta: 2 }
];

// Buzzer Questions for Arena 2
export const BUZZER_QUESTIONS: BuzzerQuestion[] = [
  {
    id: 1,
    category: 'Landasan Konstitusi',
    question: 'Pasal dan ayat berapakah dalam UUD NRI 1945 yang secara eksplisit menyatakan bahwa "Negara Indonesia adalah negara hukum"?',
    options: ['Pasal 1 Ayat (1)', 'Pasal 1 Ayat (2)', 'Pasal 1 Ayat (3)', 'Pasal 2 Ayat (1)'],
    correctAnswer: 2,
    explanation: 'Pasal 1 Ayat (3) UUD NRI 1945 menyatakan dengan tegas: "Negara Indonesia adalah negara hukum."',
    points: 20
  },
  {
    id: 2,
    category: 'Asas Hukum',
    question: 'Asas yang menyatakan bahwa semua orang memiliki kedudukan yang setara dan sama di depan hukum tanpa diskriminasi disebut...',
    options: ['Presumption of Innocence', 'Equality Before the Law', 'Rule of Power', 'Lex Superior Derogat Legi Inferiori'],
    correctAnswer: 1,
    explanation: 'Equality Before the Law adalah prinsip persamaan setiap warga negara di hadapan hukum (Pasal 27 Ayat 1 UUD 1945).',
    points: 20
  },
  {
    id: 3,
    category: 'Konsep Negara Hukum',
    question: 'Istilah negara hukum yang dianut Indonesia berasal dari konsep Eropa Kontinental yang disebut...',
    options: ['Machtsstaat', 'Rechtsstaat', 'Monarki Absolut', 'Oligarki'],
    correctAnswer: 1,
    explanation: 'Indonesia menganut paham Rechtsstaat (negara hukum), bukan Machtsstaat (negara kekuasaan).',
    points: 20
  },
  {
    id: 4,
    category: 'Lembaga Peradilan',
    question: 'Lembaga yang memegang kekuasaan kehakiman tertinggi untuk mengadili kasasi dan menguji peraturan di bawah undang-undang adalah...',
    options: ['Komisi Yudisial', 'Mahkamah Konstitusi', 'Mahkamah Agung', 'Kejaksaan Agung'],
    correctAnswer: 2,
    explanation: 'Mahkamah Agung (MA) adalah pengadilan tertinggi di Indonesia (Pasal 24A UUD 1945).',
    points: 20
  },
  {
    id: 5,
    category: 'Lembaga Konstitusi',
    question: 'Lembaga negara yang berwenang menguji undang-undang terhadap UUD NRI 1945 serta memutus sengketa hasil pemilu adalah...',
    options: ['Mahkamah Konstitusi', 'Mahkamah Agung', 'Komisi Yudisial', 'DPR RI'],
    correctAnswer: 0,
    explanation: 'Mahkamah Konstitusi (MK) memiliki wewenang menguji UU terhadap UUD 1945 (Pasal 24C UUD 1945).',
    points: 20
  },
  {
    id: 6,
    category: 'Hierarki Peraturan',
    question: 'Berdasarkan UU No. 12 Tahun 2011, peraturan perundang-undangan yang menempati hierarki tertinggi di Indonesia adalah...',
    options: ['Ketetapan MPR', 'Undang-Undang', 'UUD NRI Tahun 1945', 'Peraturan Pemerintah'],
    correctAnswer: 2,
    explanation: 'UUD NRI Tahun 1945 merupakan hukum dasar tertulis tertinggi di Negara Kesatuan Republik Indonesia.',
    points: 20
  },
  {
    id: 7,
    category: 'Penegakan Hukum',
    question: 'Aparat penegak hukum yang memiliki wewenang utama melakukan penuntutan perkara pidana di pengadilan adalah...',
    options: ['Kepolisian', 'Kejaksaan', 'Advokat', 'Hakim'],
    correctAnswer: 1,
    explanation: 'Jaksa pada lembaga Kejaksaan RI bertindak sebagai penuntut umum dalam perkara pidana.',
    points: 20
  },
  {
    id: 8,
    category: 'Pemberantasan Korupsi',
    question: 'Lembaga independen yang dibentuk secara khusus untuk mencegah dan memberantas tindak pidana korupsi adalah...',
    options: ['BPK', 'KPK', 'Komnas HAM', 'Ombudsman'],
    correctAnswer: 1,
    explanation: 'Komisi Pemberantasan Korupsi (KPK) berfokus pada pencegahan dan penindakan korupsi.',
    points: 20
  },
  {
    id: 9,
    category: 'Hak Asasi Manusia',
    question: 'Jaminan hak asasi manusia dalam UUD NRI 1945 diatur secara komprehensif dalam pasal...',
    options: ['Pasal 1 - Pasal 5', 'Pasal 28A - Pasal 28J', 'Pasal 33 - Pasal 34', 'Pasal 35 - Pasal 37'],
    correctAnswer: 1,
    explanation: 'Pasal 28A sampai dengan 28J UUD NRI 1945 memuat jaminan hak asasi manusia warga negara.',
    points: 20
  },
  {
    id: 10,
    category: 'Budaya Hukum Siswa',
    question: 'Perilaku nyata seorang siswa yang mencerminkan ketaatan terhadap hukum di lingkungan sekolah adalah...',
    options: [
      'Mencontek saat ujian jika pengawas tidak melihat',
      'Memakai helm saat naik motor hanya jika ada polisi',
      'Mengantre dengan tertib di kantin dan mematuhi tata tertib sekolah',
      'Membully teman yang berbeda pendapat'
    ],
    correctAnswer: 2,
    explanation: 'Tertib mengantre dan mematuhi tata tertib sekolah adalah wujud kesadaran hukum sejak dini.',
    points: 20
  }
];

// Cartoon Cases for Arena 3 (Court Trial)
export const CARTOON_CASES: LawCase[] = [
  {
    id: 1,
    title: 'Kasus 1: Mencontek & Integritas Akademik',
    cartoonCharacter: 'Budi (Siswa Kelas 8)',
    avatar: '👦',
    location: 'Sekolah',
    scenario: 'Budi ketahuan membawa kertas contekan saat ujian PPKn. Ia beralasan takut nilainya jelek dan dimarahi orang tua. Teman sebangkunya, Riko, ditawari contekan namun menolak.',
    question: 'Bagaimana putusan majelis hakim peradilan kelas yang adil dan mendidik?',
    options: [
      {
        text: 'Menghukum Budi dikeluarkan dari sekolah selamanya tanpa bimbingan.',
        isFair: false,
        explanation: 'Terlalu berat dan tidak edukatif. Sanksi sekolah harus bersifat pembinaan karakter.',
        point: 0
      },
      {
        text: 'Membatalkan nilai ujian yang dicontek, meminta Budi membuat karya tulis tentang kejujuran, dan menguji ulang secara jujur.',
        isFair: true,
        explanation: 'Tepat dan adil! Menegakkan aturan sekaligus memberikan kesempatan belajar memperbaiki integritas diri.',
        point: 30
      },
      {
        text: 'Membiarkan Budi karena nilainya memang perlu ditolong.',
        isFair: false,
        explanation: 'Salah! Membiarkan kecurangan merusak keadilan bagi teman-teman lain yang belajar dengan jujur.',
        point: 0
      }
    ]
  },
  {
    id: 2,
    title: 'Kasus 2: Pelanggaran Lalu Lintas Anak di Bawah Umur',
    cartoonCharacter: 'Doni & Rangga (Pelajar SMP)',
    avatar: '🛵',
    location: 'Jalan Raya',
    scenario: 'Doni yang belum memiliki SIM nekat mengendarai sepeda motor ke sekolah tanpa helm dan berboncengan tiga bersama Rangga.',
    question: 'Apa langkah penegakan hukum lalu lintas yang tepat oleh polisi pamong?',
    options: [
      {
        text: 'Memberikan teguran dan surat tilang, memanggil orang tua, serta mengamankan motor demi keselamatan jiwa Doni.',
        isFair: true,
        explanation: 'Tepat! Hukum lalu lintas dibuat demi keselamatan jiwa pengendara dan pengguna jalan lainnya.',
        point: 30
      },
      {
        text: 'Membiarkan Doni karena ia masih anak sekolah yang terburu-buru.',
        isFair: false,
        explanation: 'Berbahaya! Membiarkan pelanggaran anak di bawah umur dapat berakibat fatal kecelakaan maut.',
        point: 0
      },
      {
        text: 'Membentak Doni di depan umum dan menyita motor selamanya tanpa proses hukum sah.',
        isFair: false,
        explanation: 'Salah! Aparat harus menindak sesuai prosedur hukum yang beradab dan santun.',
        point: 0
      }
    ]
  },
  {
    id: 3,
    title: 'Kasus 3: Cyberbullying di Grup Chat WhatsApp Kelas',
    cartoonCharacter: 'Siti & Grup Cyber',
    avatar: '📱',
    location: 'Media Sosial',
    scenario: 'Siti membuat stiker ejekan fisik mengenai seorang teman dan menyebarkannya di grup chat hingga korban menangis dan tidak mau masuk sekolah.',
    question: 'Bagaimana penanganan berkeadilan hukum dan kemanusiaan sesuai UU ITE dan aturan sekolah?',
    options: [
      {
        text: 'Mengharuskan Siti meminta maaf secara tulus di hadapan guru BK, menghapus konten, dan memulihkan nama baik korban.',
        isFair: true,
        explanation: 'Bijak dan memulihkan! Mengedepankan Restorative Justice untuk membangun kesadaran menghargai martabat sesama.',
        point: 30
      },
      {
        text: 'Menyebarkan aib Siti ke seluruh media sosial sebagai balasan.',
        isFair: false,
        explanation: 'Kejahatan tidak boleh dibalas kejahatan; tindakan ini melanggar hukum siber.',
        point: 0
      },
      {
        text: 'Menganggapnya hanya lelucon biasa anak SMP.',
        isFair: false,
        explanation: 'Perundungan maya memiliki dampak psikologis serius dan melanggar hak asasi perlindungan anak.',
        point: 0
      }
    ]
  }
];

export const SORT_ITEMS: SortItem[] = [
  { id: 's1', text: 'Memakai helm SNI dan mematuhi rambu lalu lintas', icon: '⛑️', category: 'taat', explanation: 'Menjaga keselamatan diri dan menaati UU Lalu Lintas.' },
  { id: 's2', text: 'Menerobos lampu merah saat jalanan terlihat sepi', icon: '🚦', category: 'melanggar', explanation: 'Melanggar asas kepatuhan hukum dan membahayakan nyawa orang lain.' },
  { id: 's3', text: 'Mengembalikan dompet yang ditemukan kepada pihak berwenang', icon: '👛', category: 'taat', explanation: 'Wujud integritas dan kejujuran hukum.' },
  { id: 's4', text: 'Mencontek saat ujian berlangsung', icon: '📝', category: 'melanggar', explanation: 'Kecurangan akademik yang melanggar norma kejujuran.' },
  { id: 's5', text: 'Menghargai teman yang sedang beribadah', icon: '🤲', category: 'taat', explanation: 'Mengamalkan Pasal 29 UUD 1945 tentang kebebasan beragama.' },
  { id: 's6', text: 'Menyebarkan kabar bohong/fitnah di media sosial', icon: '📱', category: 'melanggar', explanation: 'Melanggar UU ITE dan mencemarkan nama baik orang lain.' }
];

export const MOTIVATIONAL_QUOTES = [
  {
    quote: '“Hukum tidak boleh tajam ke bawah dan tumpul ke atas. Keadilan sejati lahir ketika hukum tegak melindungi yang lemah dan menindak siapa pun yang bersalah tanpa pandang bulu.”',
    author: 'Prof. Dr. Mahfud MD',
    role: 'Pakar Hukum Tata Negara & Mantan Ketua Mahkamah Konstitusi'
  },
  {
    quote: '“Hukum bukan sekadar pasal-pasal kaku di dalam kitab undang-undang, melainkan kepekaan nurani untuk membela yang benar dan membahagiakan rakyatnya.”',
    author: 'Prof. Satjipto Rahardjo',
    role: 'Guru Besar Hukum Progresif Indonesia'
  },
  {
    quote: '“Di mana hukum ditegakkan dengan adil dan nurani, di sanalah martabat dan kemakmuran bangsa akan tumbuh mekar. Keadilan bukan sekadar slogan, melainkan komitmen moral yang kita wujudkan bersama setiap hari.”',
    author: 'Mochamat Choirul Ajis, S.Pd.',
    role: 'Mahasiswa PPG Pendidikan Pancasila'
  },
  {
    quote: '“Lawan terbesar penegakan hukum bukanlah kejahatan itu sendiri, melainkan ketidakpedulian orang-orang baik untuk menegakkan kebenaran.”',
    author: 'Ki Hajar Dewantara',
    role: 'Bapak Pendidikan Nasional Indonesia'
  }
];

export const SUMMARY_ACRONYM = [
  { letter: 'H', word: 'Hormati Aturan & Norma Sosial', desc: 'Patuhi tata tertib sekolah dan hukum nasional demi ketertiban bersama.' },
  { letter: 'U', word: 'Utamakan Keadilan & Kesetaraan', desc: 'Mewujudkan asas equality before the law, tidak membeda-bedakan status teman.' },
  { letter: 'K', word: 'Konstitusi Pedoman Moral', desc: 'Menjadikan UUD NRI 1945 Pasal 1 Ayat (3) dan Pancasila sebagai panduan perilaku berbangsa.' },
  { letter: 'U', word: 'Upayakan Penyelesaian Damai', desc: 'Selesaikan perselisihan melalui musyawarah mufakat dan jalur hukum yang sah.' },
  { letter: 'M', word: 'Mulai dari Diri Sendiri', desc: 'Jadilah teladan disiplin hukum: anti-mencontek, anti-bullying, dan tertib berlalu lintas.' }
];

export const REFLECTION_QUESTIONS = [
  {
    id: 'q1',
    number: 14,
    question: 'Hal apa yang paling saya pahami dari pembelajaran materi Indonesia sebagai Negara Hukum hari ini?',
    placeholder: 'Contoh: Saya memahami bahwa berdasarkan UUD 1945 Pasal 1 Ayat 3, Indonesia adalah negara hukum (Rechtsstaat) di mana hukum menempati kedudukan tertinggi dan semua orang sama di hadapan hukum...'
  },
  {
    id: 'q2',
    number: 15,
    question: 'Hal apa yang masih membingungkan atau perlu saya pelajari lebih lanjut?',
    placeholder: 'Contoh: Saya ingin mempelajari lebih dalam tentang kewenangan Mahkamah Konstitusi dibanding Mahkamah Agung dalam menguji peraturan...'
  },
  {
    id: 'q3',
    number: 16,
    question: 'Aktivitas apa yang paling menarik bagi saya selama pembelajaran hari ini?',
    placeholder: 'Contoh: Bermain Roda Putar Keadilan bersama 6 kelompok, menganalisis kasus detektif hukum, dan mengetuk palu sidang...'
  },
  {
    id: 'q4',
    number: 17,
    question: 'Nilai atau sikap apa yang saya pelajari dari pembelajaran hari ini?',
    placeholder: 'Contoh: Berani membela kebenaran, menolak kecurangan akademik/mencontek, dan menghargai hak asasi teman tanpa bullying...'
  }
];

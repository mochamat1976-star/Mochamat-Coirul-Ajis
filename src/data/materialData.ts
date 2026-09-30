import { ApperceptionCase, LawCase, LearningObjective, SortItem } from '../types';

export const PRAYERS = [
  {
    id: 'islam',
    title: 'Doa Sebelum Belajar (Islami)',
    arabic: 'رَضِيتُ بِاللهِ رَبًّا، وَبِالإِسْلاَمِ دِينًا، وَبِمُحَمَّدٍ نَبِيًّا وَرَسُولاً، رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا',
    latin: 'Rodhitu billahi robba, wabil islami dina, wabimuhammadin nabiyya warosula. Robbi zidnii \'ilman warzuqnii fahma.',
    meaning: 'Kami ridho Allah sebagai Tuhanku, Islam sebagai agamaku, dan Nabi Muhammad sebagai nabi dan rasulku. Ya Tuhanku, tambahkanlah kepadaku ilmu dan berilah aku karunia untuk memahaminya.',
    adab: 'Duduk tegak, angkat kedua tangan, tundukkan pandangan, dan fokuskan hati mengharap keberkahan ilmu.'
  },
  {
    id: 'universal',
    title: 'Doa Pelajar Pancasila (Universal / Bersama)',
    arabic: 'Tuhan Yang Maha Esa, Sumber Segala Keadilan dan Kebijaksanaan',
    latin: 'Doa Kebangsaan & Nilai Luhur Ketuhanan Yang Maha Esa',
    meaning: 'Ya Tuhan Yang Maha Pengasih, berkahilah ruang belajar kami hari ini. Bukakanlah pikiran dan hati kami agar mampu memahami hukum dan keadilan, mendisiplinkan diri, mencintai tanah air, dan menjadi warga negara yang bertanggung jawab bagi Indonesia tercinta. Amin.',
    adab: 'Satukan niat baik, bernapas tenang, dan bertekad menggunakan ilmu untuk kebaikan sesama.'
  },
  {
    id: 'christian',
    title: 'Doa Kristiani / Katolik',
    arabic: 'Dalam Nama Bapa, dan Putra, dan Roh Kudus',
    latin: 'Doa Terang Roh Kudus dan Karunia Kebijaksanaan',
    meaning: 'Bapa Surgawi, terima kasih atas anugerah kehidupan dan kesempatan belajar hari ini. Curahkanlah Roh Kebijaksanaan-Mu kepada kami agar kami memahami arti keadilan, hukum yang melindungi sesama, dan memiliki hati yang taat serta penuh kasih. Amin.',
    adab: 'Melipat tangan, memusatkan pikiran pada terang kasih Tuhan Yang Maha Kasih.'
  },
  {
    id: 'silent',
    title: 'Hening Cipta / Doa Menurut Keyakinan Diri',
    arabic: 'Mengheningkan Cipta untuk Mengagungkan Sang Pencipta',
    latin: 'Meditasi & Doa Pribadi Penuh Kedamaian',
    meaning: 'Dalam keheningan ini, marilah kita bersyukur kepada Tuhan atas nikmat akal dan budi pekerti, memohon kemudahan dalam menuntut ilmu, dan mendoakan para pahlawan pejuang hukum serta bangsa Indonesia.',
    adab: 'Tutup mata sejenak selama 30 detik, bernapas teratur, dan panjatkan harapan terbaikmu.'
  }
];

export const LEARNING_OBJECTIVES: LearningObjective[] = [
  {
    id: 'obj-1',
    category: 'Kognitif',
    title: 'Memahami Konsep Dasar Negara Hukum',
    description: 'Menjelaskan makna Indonesia sebagai negara hukum berdasarkan Pasal 1 Ayat (3) UUD NRI Tahun 1945 serta membedakan konsep Rechtsstaat dan Rule of Law.',
    indicator: 'Dapat menyebutkan bunyi pasal konstitusi dan menjelaskan 5 ciri utama negara hukum.'
  },
  {
    id: 'obj-2',
    category: 'Kognitif',
    title: 'Mengenal Lembaga Penegak Hukum',
    description: 'Mengidentifikasi peran dan wewenang lembaga penegak hukum di Indonesia (Kepolisian, Kejaksaan, Kehakiman/MA-MK, KPK, dan Advokat).',
    indicator: 'Dapat menghubungkan tugas masing-masing lembaga dengan kasus penegakan keadilan.'
  },
  {
    id: 'obj-3',
    category: 'Afektif',
    title: 'Menumbuhkan Sikap Taat & Tertib Hukum',
    description: 'Mengembangkan kesadaran moral bahwa hukum diciptakan untuk menciptakan keadilan, keamanan, dan perlindungan bagi semua warga tanpa diskriminasi.',
    indicator: 'Menunjukkan komitmen mematuhi tata tertib sekolah, etika bermedia sosial, dan norma masyarakat.'
  },
  {
    id: 'obj-4',
    category: 'Psikomotorik',
    title: 'Menganalisis Perilaku Adil dalam Kehidupan',
    description: 'Mampu membedakan tindakan taat hukum vs perbuatan melanggar hukum serta memberikan solusi adil pada studi kasus kehidupan nyata.',
    indicator: 'Menyelesaikan simulasi peran Hakim Cilik dan membuat piagam komitmen diri sadar hukum.'
  }
];

export const APPERCEPTION_CASES: ApperceptionCase[] = [
  {
    id: 'traffic',
    title: 'Kasus 1: Lampu Lalu Lintas di Perempatan Kota',
    withoutLaw: {
      description: 'Semua kendaraan (mobil, motor, bus) saling serobot, tidak ada lampu merah, pengendara tanpa helm melaju cepat. Terjadi kemacetan total, keributan antar warga, dan kecelakaan beruntun!',
      imagePrompt: 'Simulasi kekacauan tanpa aturan lalu lintas',
      impact: 'Bahaya nyawa, kekacauan massal, saling menyalahkan.'
    },
    withLaw: {
      description: 'Lampu merah, kuning, dan hijau berfungsi tertib. Semua pengendara patuh berhenti di belakang garis zebra cross, memakai helm SNI, dan pejalan kaki menyeberang dengan aman dan selamat.',
      imagePrompt: 'Simulasi ketertiban lalu lintas dengan aturan',
      impact: 'Perjalanan lancar, nyawa terlindungi, masyarakat saling menghargai.'
    },
    lesson: 'Hukum lalu lintas dibuat BUKAN untuk menyusahkan kita, melainkan untuk MENJAGA KESELAMATAN & NYAWA semua orang!'
  },
  {
    id: 'school-canteen',
    title: 'Kasus 2: Antrean di Kantin Sekolah',
    withoutLaw: {
      description: 'Siswa yang badannya lebih besar menyerobot antrean, makanan berebutan tumpah, siswa yang lebih kecil tidak kebagian makan dan menangis. Terjadi perkelahian.',
      imagePrompt: 'Kantin kacau tanpa antrean',
      impact: 'Ketidakadilan, yang kuat menindas yang lemah (hukum rimba).'
    },
    withLaw: {
      description: 'Ada aturan antre bergantian sesuai kedatangan (First Come, First Served). Semua siswa menunggu dengan sabar, penjual melayani dengan tertib dan ramah.',
      imagePrompt: 'Kantin tertib berbaris rapi',
      impact: 'Rasa adil, nyaman, dan budaya saling menghargai hak teman.'
    },
    lesson: 'Hukum menjamin KESETARAAN: Orang kuat tidak boleh semena-mena terhadap yang lemah!'
  },
  {
    id: 'social-media',
    title: 'Kasus 3: Media Sosial & Internet',
    withoutLaw: {
      description: 'Orang bebas menyebarkan berita bohong (hoaks), menipu uang, menghina dan mempermalukan teman secara online (cyberbullying) tanpa ada sanksi apapun.',
      imagePrompt: 'Dunia maya penuh kebencian dan penipuan',
      impact: 'Korban depresi, perpecahan bangsa, hilangnya rasa percaya.'
    },
    withLaw: {
      description: 'Ada regulasi hukum (UU ITE) dan etika digital: Siapa yang memfitnah atau menipu dapat diproses hukum. Ruang digital menjadi sarana edukasi, karya kreatif, dan silaturahmi positif.',
      imagePrompt: 'Ruang siber aman dan produktif',
      impact: 'Kebebasan berekspresi tetap terlindungi sekaligus menjaga kehormatan orang lain.'
    },
    lesson: 'Kebebasan kita dibatasi oleh hak dan rasa aman orang lain. Di situlah hukum hadir!'
  }
];

export const LAW_CONCEPTS = {
  constitutionalBasis: {
    article: 'UUD NRI Tahun 1945 Pasal 1 Ayat (3)',
    text: '“Negara Indonesia adalah negara hukum.”',
    meaning: 'Ketentuan ini menegaskan bahwa segala sendi kehidupan bermasyarakat, berbangsa, dan bernegara harus berlandaskan pada hukum yang adil, BUKAN atas dasar kekuasaan mutlak penguasa semata (Rule of Law, not Rule of Power).'
  },
  principles: [
    {
      title: 'Supremasi Hukum (Supremacy of Law)',
      icon: 'Crown',
      tag: 'Hukum Tertinggi',
      desc: 'Hukum memegang kedudukan paling tinggi dalam negara. Tidak ada satu pun individu, pejabat, atau penguasa yang berada di atas hukum.'
    },
    {
      title: 'Persamaan di Hadapan Hukum (Equality Before the Law)',
      icon: 'Scale',
      tag: 'Tanpa Pandang Bulu',
      desc: 'Semua warga negara berkedudukan sama di depan hukum. Baik pejabat, orang kaya, maupun rakyat biasa diperlakukan adil tanpa diskriminasi.'
    },
    {
      title: 'Asas Legalitas (Principle of Legality)',
      icon: 'BookOpen',
      tag: 'Berdasarkan Peraturan',
      desc: 'Segala tindakan pemerintah dan aparat harus didasarkan pada peraturan perundang-undangan tertulis yang sah dan jelas.'
    },
    {
      title: 'Peradilan yang Merdeka & Tak Memihak (Independent Judiciary)',
      icon: 'ShieldCheck',
      tag: 'Hakim Jujur & Adil',
      desc: 'Lembaga peradilan bebas dari campur tangan pihak manapun (eksekutif, partai, uang, atau tekanan politik) dalam menegakkan vonis adil.'
    },
    {
      title: 'Jaminan & Perlindungan Hak Asasi Manusia (HAM)',
      icon: 'HeartHandshake',
      tag: 'Hormati Harkat Manusia',
      desc: 'Hukum wajib melindungi hak hidup, hak berpendapat, beragama, pendidikan, dan rasa aman bagi setiap warga Indonesia.'
    }
  ],
  institutions: [
    {
      name: 'Kepolisian Negara RI (Polri)',
      role: 'Penyelidik, Penyidik & Pengayom Masyarakat',
      duties: 'Memelihara keamanan, ketertiban umum, menegakkan hukum, serta memberikan perlindungan, pengayoman, dan pelayanan kepada masyarakat.',
      symbol: 'Rastra Sewakotama (Abdi Utama bagi Nusa dan Bangsa)',
      color: 'from-amber-600 to-amber-800'
    },
    {
      name: 'Kejaksaan Republik Indonesia',
      role: 'Penuntut Umum & Eksekutor Putusan Pengadilan',
      duties: 'Melakukan penuntutan perkara pidana di muka hakim sidang pengadilan dan melaksanakan penetapan hakim.',
      symbol: 'Satya Adhi Wicaksana',
      color: 'from-emerald-700 to-emerald-900'
    },
    {
      name: 'Lembaga Peradilan (MA & MK)',
      role: 'Kekuasaan Kehakiman yang Merdeka',
      duties: 'Mahkamah Agung mengadili perkara kasasi & mengawasi jalannya peradilan; Mahkamah Konstitusi menguji undang-undang terhadap UUD 1945.',
      symbol: 'Timbangan Keadilan & Palu Sidang',
      color: 'from-blue-700 to-indigo-900'
    },
    {
      name: 'KPK (Komisi Pemberantasan Korupsi)',
      role: 'Pemberantas & Pencegah Tindak Pidana Korupsi',
      duties: 'Mencegah, menyelidiki, dan menuntut tindak pidana korupsi yang merugikan keuangan negara demi integritas bangsa.',
      symbol: 'Integritas, Independensi & Keadilan',
      color: 'from-red-600 to-red-800'
    },
    {
      name: 'Advokat / Penasihat Hukum',
      role: 'Pembela Hak Hukum & Pendamping Keadilan',
      duties: 'Memberikan jasa hukum dan membela hak-hak tersangka atau terdakwa agar mendapat peradilan yang adil dan sesuai prosedur.',
      symbol: 'Officium Nobile (Profesi Terhormat)',
      color: 'from-purple-700 to-purple-900'
    }
  ],
  hierarchy: [
    { level: 1, name: 'UUD NRI Tahun 1945', note: 'Hukum dasar tertulis tertinggi di Indonesia', color: 'bg-red-600 text-white' },
    { level: 2, name: 'Ketetapan MPR (Tap MPR)', note: 'Ketetapan Majelis Permusyawaratan Rakyat', color: 'bg-orange-500 text-white' },
    { level: 3, name: 'Undang-Undang / Perppu', note: 'Dibuat DPR bersama Presiden / Peraturan Pemerintah Pengganti UU', color: 'bg-amber-500 text-slate-900' },
    { level: 4, name: 'Peraturan Pemerintah (PP)', note: 'Ditetapkan Presiden untuk menjalankan UU', color: 'bg-emerald-600 text-white' },
    { level: 5, name: 'Peraturan Presiden (Perpres)', note: 'Ditetapkan Presiden untuk materi yang diperintahkan UU', color: 'bg-teal-600 text-white' },
    { level: 6, name: 'Peraturan Daerah Provinsi (Perda Prov)', note: 'Dibuat DPRD Provinsi bersama Gubernur', color: 'bg-blue-600 text-white' },
    { level: 7, name: 'Peraturan Daerah Kab/Kota (Perda Kab/Kota)', note: 'Dibuat DPRD Kab/Kota bersama Bupati/Walikota', color: 'bg-indigo-600 text-white' }
  ],
  environments: [
    {
      domain: 'Lingkungan Keluarga',
      icon: 'Home',
      examples: [
        'Saling menghormati hak setiap anggota keluarga',
        'Mematuhi nasihat orang tua dan kesepakatan jam malam',
        'Menyelesaikan perselisihan keluarga secara musyawarah tanpa kekerasan'
      ]
    },
    {
      domain: 'Lingkungan Sekolah',
      icon: 'GraduationCap',
      examples: [
        'Mematuhi tata tertib sekolah dan hadir tepat waktu',
        'Tidak mencontek, tidak membolos, dan tidak melakukan bullying/perundungan',
        'Menghormati bapak/ibu guru dan menjaga fasilitas sarana belajar'
      ]
    },
    {
      domain: 'Lingkungan Masyarakat',
      icon: 'Users',
      examples: [
        'Menghormati norma adat, kesopanan, dan kesusilaan',
        'Ikut menjaga keamanan lingkungan (ronda/siskamling) dan tidak membuat gaduh',
        'Membuang sampah pada tempatnya dan memelihara kebersihan fasilitas umum'
      ]
    },
    {
      domain: 'Lingkungan Berbangsa & Bernegara',
      icon: 'Flag',
      examples: [
        'Mematuhi rambu lalu lintas dan memiliki SIM saat cukup umur',
        'Membayar pajak tepat waktu demi pembangunan fasilitas publik',
        'Menjaga persatuan dan tidak menyebarkan kebencian / kabar bohong (hoaks)'
      ]
    }
  ]
};

export const CARTOON_CASES: LawCase[] = [
  {
    id: 1,
    title: 'Misteri Pengendara Cilik & Lampu Merah',
    cartoonCharacter: 'Kak Adila (Hakim Cilik Indonesia)',
    avatar: '👩‍⚖️',
    scenario: 'Doni (13 tahun, siswa SMP) mengendarai sepeda motor tanpa helm dan menerobos lampu merah dengan alasan "buru-buru takut terlambat les sepak bola". Ia dihentikan oleh Pak Polisi Ramah di pos lalu lintas.',
    location: 'Jalan Raya',
    question: 'Sebagai Hakim Cilik, keputusan hukum apa yang paling adil dan mendidik untuk Doni?',
    options: [
      {
        text: 'Membebaskan Doni karena kasihan dia masih anak sekolah dan les itu penting.',
        isFair: false,
        explanation: 'Keliru! Hukum lalu lintas berlaku sama untuk semua demi keselamatan nyawa. Membiarkan anak di bawah umur membawa motor berbahaya bagi dirinya dan orang lain.',
        point: 0
      },
      {
        text: 'Memberikan tilang dan teguran edukatif, memanggil orang tua Doni, dan mengingatkan bahwa anak di bawah umur belum memiliki SIM demi keselamatan nyawanya.',
        isFair: true,
        explanation: 'Tepat sekali! Asas Equality Before the Law & Kepastian Hukum: Penegakan aturan demi menjaga keselamatan jiwa Doni dan pengguna jalan lain.',
        point: 20
      },
      {
        text: 'Menyuruh Doni membayar uang damai langsung ke petugas tanpa surat tilang resmi.',
        isFair: false,
        explanation: 'Sangat salah! Ini adalah praktik suap/pungli yang melanggar hukum dan mencoreng integritas negara hukum.',
        point: 0
      }
    ]
  },
  {
    id: 2,
    title: 'Kasus "Geng Keren" & Perundungan di Kantin',
    cartoonCharacter: 'Pak Guru Budi (Penasihat Tata Tertib)',
    avatar: '👨‍🏫',
    scenario: 'Di jam istirahat, kelompok siswa "Geng Keren" mengancam adik kelas dan memaksa mereka memberikan uang saku. Jika menolak, adik kelas tersebut diancam akan disoraki dan dikucilkan.',
    location: 'Sekolah',
    question: 'Tindakan penegakan hukum dan aturan sekolah apa yang paling mencerminkan keadilan?',
    options: [
      {
        text: 'Mengabaikannya karena itu cuma candaan masa remaja antar teman.',
        isFair: false,
        explanation: 'Keliru! Perundungan (bullying) dan pemerasan adalah pelanggaran serius terhadap hak asasi manusia dan tata tertib sekolah.',
        point: 0
      },
      {
        text: 'Membalas mengeroyok anggota Geng Keren agar mereka kapok.',
        isFair: false,
        explanation: 'Salah! Negara hukum melarang aksi "main hakim sendiri" (Eigenrichting). Masalah harus diselesaikan lewat prosedur hukum yang sah.',
        point: 0
      },
      {
        text: 'Melaporkan ke guru BK/Kepala Sekolah, memberi perlindungan bagi korban, serta menjatuhkan sanksi edukatif dan pembinaan disiplin bagi pelaku sesuai tata tertib.',
        isFair: true,
        explanation: 'Hebat! Kamu menerapkan asas peradilan yang adil, perlindungan martabat korban, dan penegakan tata tertib sekolah secara prosedural.',
        point: 20
      }
    ]
  },
  {
    id: 3,
    title: 'Bocoran Kunci Jawaban Ujian Nasional',
    cartoonCharacter: 'Siti (Ketua OSIS Jujur)',
    avatar: '👧',
    scenario: 'Sebelum ujian akhir, seorang siswa menyebarkan foto lembar kunci jawaban di grup WhatsApp kelas dan meminta teman-teman mengumpulkan uang 50 ribu rupiah per anak untuk membeli kunci jawaban tersebut.',
    location: 'Sekolah',
    question: 'Bagaimana seharusnya sikap pelajar Pancasila yang sadar hukum?',
    options: [
      {
        text: 'Menolak keras kunci jawaban tersebut, mengerjakan ujian dengan jujur, dan melaporkan kecurangan kepada pihak sekolah.',
        isFair: true,
        explanation: 'Luar biasa! Kejujuran dan integritas adalah fondasi hukum. Berani membela kebenaran adalah sifat pahlawan hukum.',
        point: 20
      },
      {
        text: 'Ikut patungan uang agar nilai rapor kelas tinggi dan tidak dimarahi orang tua.',
        isFair: false,
        explanation: 'Salah! Kecurangan akademik melanggar norma kejujuran, hukum hak cipta, dan menciderai rasa keadilan teman yang belajar sungguh-sungguh.',
        point: 0
      },
      {
        text: 'Diam saja dan pura-pura tidak tahu meskipun tahu itu perbuatan salah.',
        isFair: false,
        explanation: 'Kurang tepat. Menjadi saksi kebenaran dan peduli terhadap ketertiban bersama adalah tanggung jawab moral warga negara yang baik.',
        point: 5
      }
    ]
  },
  {
    id: 4,
    title: 'Limbah Plastik & Sungai Bersih Kampung Kita',
    cartoonCharacter: 'Pak RT Slamet (Penggerak Desa Ramah)',
    avatar: '👴',
    scenario: 'Sebuah warung makan membuang kantong-kantong sampah sisa makanan dan minyak jelantah langsung ke aliran sungai di malam hari secara diam-diam. Akibatnya aliran air tersumbat dan bau tak sedap menyebar ke pemukiman.',
    location: 'Lingkungan',
    question: 'Langkah apa yang sesuai dengan peraturan perundang-undangan lingkungan hidup (UU Perlindungan Lingkungan)?',
    options: [
      {
        text: 'Warga ramai-ramai merusak warung makan tersebut di malam hari.',
        isFair: false,
        explanation: 'Melanggar hukum! Perusakan properti adalah tindak pidana main hakim sendiri yang dilarang undang-undang.',
        point: 0
      },
      {
        text: 'Pengurus RT memberikan teguran tertulis berlandaskan Perda Ketertiban Lingkungan, meminta pemilik warung mengolah limbah secara benar, dan bila membangkang dilaporkan ke Satpol PP/Dinas Lingkungan Hidup.',
        isFair: true,
        explanation: 'Tepat sekali! Penegakan Peraturan Daerah (Perda) secara terukur, musyawarah terlebih dahulu, lalu penindakan hukum sah oleh aparat berwenang.',
        point: 20
      },
      {
        text: 'Membiarkannya karena sungai adalah tempat umum yang bebas dipakai siapa saja.',
        isFair: false,
        explanation: 'Keliru! Fasilitas alam dan lingkungan hidup adalah milik bersama yang wajib dilindungi oleh hukum demi generasi mendatang.',
        point: 0
      }
    ]
  },
  {
    id: 5,
    title: 'Jempol Cerdas: Menghadapi Fitnah di Media Sosial',
    cartoonCharacter: 'Rian (Duta Literasi Digital)',
    avatar: '👦',
    scenario: 'Akun anonim di Instagram memposting foto editan seorang siswi bernama Maya dengan narasi bohong yang memfitnahnya mencuri uang kas kelas. Postingan tersebut di-like ratusan orang.',
    location: 'Media Sosial',
    question: 'Berdasarkan hukum di Indonesia (UU ITE), tindakan apa yang harus diambil?',
    options: [
      {
        text: 'Mengumpulkan tangkapan layar (screenshot) sebagai bukti hukum digital, melapor ke pihak sekolah dan kepolisian bagian siber (Cyber Crime), serta melaporkan akun tersebut ke platform.',
        isFair: true,
        explanation: 'Sempurna! Kamu memahami alat bukti elektronik yang sah dan jalur penegakan hukum UU ITE untuk memulihkan nama baik dan menghukum pelaku fitnah.',
        point: 20
      },
      {
        text: 'Ikut membagikan (repost) postingan tersebut ke grup keluarga agar semakin viral.',
        isFair: false,
        explanation: 'Berbahaya! Meneruskan konten fitnah (pencemaran nama baik) tanpa verifikasi dapat ikut dijerat pasal penyebaran informasi bohong / fitnah.',
        point: 0
      },
      {
        text: 'Membalas dengan membuat akun palsu baru dan menyebarkan aib orang lain.',
        isFair: false,
        explanation: 'Salah! Kejahatan tidak boleh dibalas dengan kejahatan. Gunakan instrumen hukum yang sah untuk mencari keadilan.',
        point: 0
      }
    ]
  },
  {
    id: 6,
    title: 'Sengketa Hak Cipta Karya Seni & Plagiasi Bazaar',
    cartoonCharacter: 'Bella (Ilustrator Muda Kreatif)',
    avatar: '🎨',
    scenario: 'Bella membuat ilustrasi digital orisinil bertema "Garuda Nusantara" untuk tugas pameran. Tanpa izin Bella, seorang peserta bazaar mengunduh gambar tersebut, menghapus tanda air (watermark) Bella, mencetaknya menjadi merchandise gantungan kunci dan baju kaos, lalu menjualnya demi keuntungan pribadi.',
    location: 'Sekolah',
    question: 'Berdasarkan UU Hak Cipta No. 28 Tahun 2014 dan perlindungan karya kreatif, apa vonis paling adil?',
    options: [
      {
        text: 'Menghormati hak cipta moral dan ekonomi Bella: Penjual wajib menghentikan peredaran produk tanpa izin, meminta maaf, dan memberikan royalti/kompensasi yang disepakati kepada Bella.',
        isFair: true,
        explanation: 'Luar biasa adil! Hak Cipta menjamin perlindungan karya cipta intelektual bangsa. Menghargai hak cipta menumbuhkan iklim kreativitas yang bermartabat.',
        point: 20
      },
      {
        text: 'Membiarkannya karena apapun yang diunggah ke internet otomatis menjadi milik publik yang bebas dikomersilkan.',
        isFair: false,
        explanation: 'Keliru! Internet adalah media publikasi, bukan penghapus hak cipta. Mengambil karya orang tanpa izin untuk keuntungan komersial melanggar UU Hak Cipta.',
        point: 0
      },
      {
        text: 'Mengajak kawan-kawan memboikot dan merusak stan bazaar tersebut secara paksa.',
        isFair: false,
        explanation: 'Salah! Menegakkan keadilan tidak boleh dengan cara anarkis atau perusakan sarana.',
        point: 0
      }
    ]
  }
];

export const DEFAULT_TEAMS: import('../types').GroupTeam[] = [
  {
    id: 1,
    name: 'Kelompok 1: Satria Konstitusi',
    colorName: 'Merah Berani',
    bgColor: 'bg-rose-500',
    textColor: 'text-rose-600',
    borderColor: 'border-rose-400',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    ringColor: 'ring-rose-500',
    avatar: '🛡️',
    motto: 'UUD 1945 Panduan Nyata Kami!',
    score: 0,
    boardPosition: 1,
    casesSolved: 0,
    buzzersWon: 0
  },
  {
    id: 2,
    name: 'Kelompok 2: Garda Keadilan',
    colorName: 'Biru Samudra',
    bgColor: 'bg-blue-600',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-400',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    ringColor: 'ring-blue-500',
    avatar: '⚖️',
    motto: 'Keadilan Tegak Tanpa Pandang Bulu!',
    score: 0,
    boardPosition: 1,
    casesSolved: 0,
    buzzersWon: 0
  },
  {
    id: 3,
    name: 'Kelompok 3: Laskar Bhinneka',
    colorName: 'Kuning Emas',
    bgColor: 'bg-amber-500',
    textColor: 'text-amber-600',
    borderColor: 'border-amber-400',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    ringColor: 'ring-amber-500',
    avatar: '🌟',
    motto: 'Toleransi & Harmoni Hukum Bersatu!',
    score: 0,
    boardPosition: 1,
    casesSolved: 0,
    buzzersWon: 0
  },
  {
    id: 4,
    name: 'Kelompok 4: Duta Hak Asasi',
    colorName: 'Hijau Zamrud',
    bgColor: 'bg-emerald-600',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-400',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    ringColor: 'ring-emerald-500',
    avatar: '🌱',
    motto: 'Menjunjung Martabat dan HAM Setiap Insan!',
    score: 0,
    boardPosition: 1,
    casesSolved: 0,
    buzzersWon: 0
  },
  {
    id: 5,
    name: 'Kelompok 5: Punggawa Integritas',
    colorName: 'Ungu Bangsawan',
    bgColor: 'bg-purple-600',
    textColor: 'text-purple-600',
    borderColor: 'border-purple-400',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    ringColor: 'ring-purple-500',
    avatar: '💎',
    motto: 'Jujur, Berani, Katakan Tidak Pada Korupsi!',
    score: 0,
    boardPosition: 1,
    casesSolved: 0,
    buzzersWon: 0
  },
  {
    id: 6,
    name: 'Kelompok 6: Pandu Tertib Bangsa',
    colorName: 'Oranye Semangat',
    bgColor: 'bg-orange-500',
    textColor: 'text-orange-600',
    borderColor: 'border-orange-400',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    ringColor: 'ring-orange-500',
    avatar: '🚀',
    motto: 'Disiplin Nyata untuk Indonesia Emas 2045!',
    score: 0,
    boardPosition: 1,
    casesSolved: 0,
    buzzersWon: 0
  }
];

export const BOARD_CELLS: import('../types').BoardCell[] = [
  { index: 1, type: 'start', title: 'Gerbang Mulai', description: 'Pos Keberangkatan Pelajar Sadar Hukum Nusantara.', icon: '🚩', points: 0 },
  { index: 2, type: 'normal', title: 'Helm SNI', description: 'Disiplin berkendara mengenakan helm standar keselamatan.', icon: '🪖', points: 10 },
  { index: 3, type: 'normal', title: 'Zebra Cross', description: 'Menyeberang jalan di jalur penyeberangan pejalan kaki.', icon: '🚶', points: 10 },
  { index: 4, type: 'ladder', title: '🪜 Tangga Keadilan', description: 'Membantu nenek menyeberang & mengembalikan dompet jatuh! Naik pesat ke Petak 9.', icon: '🪜', targetIndex: 9, points: 25, badge: 'Naik ke #9' },
  { index: 5, type: 'quiz', title: '❓ Kuis Konstitusi', description: 'Pertanyaan: Apa bunyi resmi Pasal 1 Ayat 3 UUD NRI 1945?', icon: '❓', points: 15 },
  { index: 6, type: 'normal', title: 'Tertib Pajak', description: 'Mendukung pembangunan jembatan & sekolah lewat taat pajak.', icon: '💳', points: 10 },
  { index: 7, type: 'mystery', title: '🎁 Kotak Misteri', description: 'Buka kartu kejutan dan tantangan seru kelompok!', icon: '🎁', points: 10 },
  { index: 8, type: 'slide', title: '⚠️ Perosotan Sanksi', description: 'Menerobos lampu merah dan membahayakan warga! Meluncur turun ke Petak 3.', icon: '🛝', targetIndex: 3, points: -10, badge: 'Mundur ke #3' },
  { index: 9, type: 'normal', title: 'Pos Kamling Rukun', description: 'Menjaga kerukunan dan ronda malam bersama warga kampung.', icon: '🏮', points: 10 },
  { index: 10, type: 'quiz', title: '❓ Kuis Equality', description: 'Pertanyaan: Apa maksud asas Equality Before the Law?', icon: '❓', points: 15 },
  { index: 11, type: 'normal', title: 'Gotong Royong', description: 'Membersihkan selokan desa bersama warga tanpa membedakan suku.', icon: '🧹', points: 10 },
  { index: 12, type: 'ladder', title: '🪜 Tangga Keadilan', description: 'Menolak keras uang sogokan dan suap calo! Melompat tinggi ke Petak 17.', icon: '🪜', targetIndex: 17, points: 25, badge: 'Naik ke #17' },
  { index: 13, type: 'normal', title: 'Hormat Bendera', description: 'Menghayati upacara bendera Merah Putih dengan tertib & khidmat.', icon: '🇮🇩', points: 10 },
  { index: 14, type: 'slide', title: '⚠️ Perosotan Sanksi', description: 'Ketahuan menyontek saat ulangan semester! Meluncur turun ke Petak 7.', icon: '🛝', targetIndex: 7, points: -10, badge: 'Mundur ke #7' },
  { index: 15, type: 'mystery', title: '🎁 Kotak Misteri', description: 'Tantangan yel-yel keadilan atau bonus langkah kejutan!', icon: '🎁', points: 10 },
  { index: 16, type: 'normal', title: 'Balai Musyawarah', description: 'Menyelesaikan perbedaan pendapat lewat mufakat damai.', icon: '🏛️', points: 10 },
  { index: 17, type: 'normal', title: 'Taman HAM', description: 'Menghormati hak asasi setiap kawan tanpa diskriminasi.', icon: '🤝', points: 15 },
  { index: 18, type: 'quiz', title: '❓ Kuis MA & MK', description: 'Pertanyaan: Apa wewenang utama Mahkamah Konstitusi?', icon: '❓', points: 15 },
  { index: 19, type: 'slide', title: '⚠️ Perosotan Sanksi', description: 'Menyebarkan kabar bohong (hoaks) yang memfitnah orang lain! Merosot ke Petak 11.', icon: '🛝', targetIndex: 11, points: -15, badge: 'Mundur ke #11' },
  { index: 20, type: 'ladder', title: '🪜 Tangga Keadilan', description: 'Berani membela dan melindungi kawan dari perundungan (bullying)! Terbang ke Petak 26.', icon: '🪜', targetIndex: 26, points: 30, badge: 'Naik ke #26' },
  { index: 21, type: 'normal', title: 'Knalpot Tertib', description: 'Menggunakan knalpot standar demi ketenangan lingkungan istirahat.', icon: '🛵', points: 10 },
  { index: 22, type: 'mystery', title: '🎁 Kotak Misteri', description: 'Kejutan Satria Hukum: Kesempatan duel poin antar kelompok!', icon: '🎁', points: 15 },
  { index: 23, type: 'normal', title: 'Literasi Hukum', description: 'Membaca dan memahami hak serta kewajiban warga negara di perpustakaan.', icon: '📚', points: 10 },
  { index: 24, type: 'quiz', title: '❓ Kuis Hierarki', description: 'Pertanyaan: Apa peraturan perundang-undangan tertinggi di Indonesia?', icon: '❓', points: 15 },
  { index: 25, type: 'slide', title: '⚠️ Perosotan Sanksi', description: 'Mencoret-coret halte bus kota dan merusak fasilitas umum! Terlempar ke Petak 16.', icon: '🛝', targetIndex: 16, points: -15, badge: 'Mundur ke #16' },
  { index: 26, type: 'normal', title: 'Kantin Kejujuran', description: 'Membayar dan mengambil kembalian sendiri dengan penuh amanah.', icon: '🧁', points: 15 },
  { index: 27, type: 'normal', title: 'Gedung MK & MA', description: 'Pilar tegaknya keadilan dan penjaga marwah konstitusi bangsa.', icon: '⚖️', points: 15 },
  { index: 28, type: 'mystery', title: '🎁 Kotak Misteri', description: 'Kartu Emas Konstitusi: Poin ganda bagi kelompok paling kompak!', icon: '🎁', points: 20 },
  { index: 29, type: 'normal', title: 'Ikrar Integritas', description: 'Janji suci pemuda menjunjung tinggi kebenaran dan hukum.', icon: '📜', points: 20 },
  { index: 30, type: 'finish', title: '🏆 Istana Keadilan', description: 'Selamat! Mencapai puncak kejayaan Indonesia sebagai Negara Hukum Sejati!', icon: '👑', points: 50, badge: 'FINISH!' }
];

export const BUZZER_QUESTIONS: import('../types').BuzzerQuestion[] = [
  {
    id: 1,
    category: 'Landasan Konstitusi',
    question: 'Berdasarkan UUD NRI 1945 Pasal 1 Ayat (3), apakah bentuk kedaulatan negara Indonesia?',
    options: ['Negara Kekuasaan Mutlak (Machstaat)', 'Negara Hukum (Rechtsstaat)', 'Negara Militer Tunggal', 'Negara Tanpa Peraturan Tertulis'],
    correctAnswer: 1,
    explanation: 'Pasal 1 Ayat (3) berbunyi tegas: "Negara Indonesia adalah negara hukum", bukan negara berdasarkan kekuasaan belaka.',
    points: 20
  },
  {
    id: 2,
    category: 'Asas Hukum',
    question: 'Prinsip yang menyatakan bahwa "semua orang berkedudukan setara di hadapan hukum tanpa diskriminasi" disebut...',
    options: ['Supremacy of Law', 'Equality Before the Law', 'Presumption of Innocence', 'Habeas Corpus'],
    correctAnswer: 1,
    explanation: 'Equality Before the Law menjamin bahwa siapapun (rakyat, pejabat, konglomerat) diperlakukan adil dan setara di depan hukum.',
    points: 20
  },
  {
    id: 3,
    category: 'Hierarki Peraturan',
    question: 'Berdasarkan UU No. 12 Tahun 2011, peraturan perundang-undangan dengan tingkatan tertinggi di Indonesia adalah...',
    options: ['Undang-Undang (UU)', 'Peraturan Presiden (Perpres)', 'UUD NRI Tahun 1945', 'Ketetapan MPR'],
    correctAnswer: 2,
    explanation: 'UUD NRI 1945 adalah hukum dasar tertulis tertinggi dan menjadi acuan bagi seluruh peraturan di bawahnya.',
    points: 20
  },
  {
    id: 4,
    category: 'Lembaga Penegak Hukum',
    question: 'Lembaga yang bertugas melakukan penuntutan perkara pidana di muka sidang pengadilan adalah...',
    options: ['Kepolisian Negara RI', 'Kejaksaan Republik Indonesia', 'Mahkamah Konstitusi', 'Komisi Yudisial'],
    correctAnswer: 1,
    explanation: 'Jaksa pada Kejaksaan RI bertindak sebagai penuntut umum yang membacakan dakwaan dan tuntutan hukum di pengadilan.',
    points: 20
  },
  {
    id: 5,
    category: 'Wewenang Pengadilan',
    question: 'Lembaga peradilan yang berwenang menguji undang-undang terhadap UUD 1945 (Judicial Review) adalah...',
    options: ['Mahkamah Agung (MA)', 'Mahkamah Konstitusi (MK)', 'Pengadilan Negeri', 'Komisi Yudisial (KY)'],
    correctAnswer: 1,
    explanation: 'Mahkamah Konstitusi (MK) berwenang menguji apakah suatu UU bertentangan dengan konstitusi (UUD 1945) atau tidak.',
    points: 20
  },
  {
    id: 6,
    category: 'Ciri Negara Hukum',
    question: 'Manakah di bawah ini yang BUKAN merupakan ciri utama negara hukum?',
    options: ['Adanya supremasi hukum', 'Jaminan perlindungan Hak Asasi Manusia (HAM)', 'Penguasa kebal dari segala jeratan hukum', 'Peradilan yang bebas dan tidak memihak'],
    correctAnswer: 2,
    explanation: 'Di negara hukum, tidak ada seorang pun yang kebal hukum. Penguasa wajib tunduk pada hukum!',
    points: 20
  },
  {
    id: 7,
    category: 'Pemberantasan Korupsi',
    question: 'Lembaga independen yang dibentuk khusus untuk mencegah dan memberantas tindak pidana korupsi di Indonesia adalah...',
    options: ['Ombudsman RI', 'KPK (Komisi Pemberantasan Korupsi)', 'Komnas HAM', 'Lembaga Sensor Film'],
    correctAnswer: 1,
    explanation: 'KPK dibentuk dengan tugas penyelidikan, penyidikan, penuntutan, serta pencegahan korupsi di tanah air.',
    points: 20
  },
  {
    id: 8,
    category: 'Norma & Sanksi',
    question: 'Sanksi bagi pelanggar norma hukum bersifat tegas dan mengikat karena...',
    options: ['Dibuat dan dipaksakan oleh lembaga negara yang berwenang', 'Hanya berupa rasa bersalah di dalam batin', 'Tergantung pada kesukaan ketua RT', 'Hanya berlaku saat hari libur nasional'],
    correctAnswer: 0,
    explanation: 'Norma hukum memiliki sanksi tegas (denda/penjara) yang dapat dipaksakan oleh aparat negara yang sah.',
    points: 20
  },
  {
    id: 9,
    category: 'Penerapan di Sekolah',
    question: 'Contoh nyata ketaatan siswa terhadap hukum dan aturan di lingkungan sekolah adalah...',
    options: ['Membawa contekan kecil saat ujian susulan', 'Membayar iuran kas tetapi dipakai untuk jajan pribadi', 'Menghormati guru, tidak merundung teman, dan hadir tepat waktu', 'Membuat coretan grafiti di meja belajar kelas'],
    correctAnswer: 2,
    explanation: 'Disiplin hadir, menghormati sesama, dan menjaga fasilitas sekolah adalah wujud pelajar Pancasila sadar hukum.',
    points: 20
  },
  {
    id: 10,
    category: 'Hukum Digital (UU ITE)',
    question: 'Tindakan yang melanggar hukum siber di media sosial berdasarkan UU ITE adalah...',
    options: ['Membagikan karya gambar sendiri dengan watermark', 'Menyebarkan kabar bohong (hoaks) yang mencemarkan kehormatan orang lain', 'Mengikuti kuis edukasi online bersama teman sekelas', 'Memberikan komentar apresiasi atas prestasi teman'],
    correctAnswer: 1,
    explanation: 'Penyebaran hoaks dan pencemaran nama baik diatur ketat dalam UU ITE dengan ancaman sanksi pidana.',
    points: 20
  },
  {
    id: 11,
    category: 'Pancasila & Hukum',
    question: 'Mengapa Pancasila disebut sebagai "Sumber dari Segala Sumber Hukum Negara"?',
    options: ['Karena semua peraturan perundang-undangan di Indonesia tidak boleh bertentangan dengan nilai-nilai Pancasila', 'Karena Pancasila hanya berlaku untuk pejabat tinggi', 'Karena Pancasila baru dibuat tahun 2020', 'Karena Pancasila tidak perlu dipelajari di sekolah'],
    correctAnswer: 0,
    explanation: 'Pancasila merupakan norma fundamental negara (Staatsfundamentalnorm); segala hukum di Indonesia harus dijiwai nilai ketuhanan, kemanusiaan, persatuan, kerakyatan, dan keadilan.',
    points: 20
  },
  {
    id: 12,
    category: 'Refleksi Hukum',
    question: 'Apa akibat yang paling mungkin terjadi jika suatu negara TIDAK memiliki hukum yang ditegakkan dengan adil?',
    options: ['Masyarakat menjadi sangat damai dan sejahtera', 'Terjadi kekacauan (chaos), hukum rimba di mana yang kuat menindas yang lemah', 'Semua barang di toko menjadi gratis', 'Sekolah ditiadakan selamanya'],
    correctAnswer: 1,
    explanation: 'Tanpa hukum, berlaku hukum rimba (homo homini lupus). Kehidupan menjadi kacau dan hak warga tertindas.',
    points: 20
  }
];

export const MYSTERY_CARDS: import('../types').MysteryCard[] = [
  {
    id: 1,
    title: 'Surat Keputusan Integritas Emas',
    icon: '📜',
    description: 'Kelompokmu menunjukkan kerja sama yang sangat kompak dan menjunjung etika sidang!',
    actionText: 'Dapatkan Bonus +20 Poin Langsung!',
    pointsDelta: 20,
    stepsDelta: 2
  },
  {
    id: 2,
    title: 'Tantangan Yel-Yel Sadar Hukum',
    icon: '📢',
    description: 'Seluruh anggota kelompok harus menyanyikan atau menyerukan yel-yel bertema "Pelajar Taat Hukum" bersama-sama selama 15 detik!',
    actionText: 'Jika berhasil, kelompok meraih +25 Poin dari Dewan Juri/Guru!',
    pointsDelta: 25,
    stepsDelta: 0,
    isChallenge: true
  },
  {
    id: 3,
    title: 'Perisai Kebal Sanksi (Safe Shield)',
    icon: '🛡️',
    description: 'Kelompokmu memiliki kartu perlindungan hukum! Bebas dari perosotan berikutnya.',
    actionText: 'Kalian mendapatkan +15 Poin Keberuntungan Konstitusi!',
    pointsDelta: 15,
    stepsDelta: 1
  },
  {
    id: 4,
    title: 'Tantangan Sebutkan 3 Penegak Hukum',
    icon: '⚡',
    description: 'Perwakilan kelompok harus menyebutkan 3 lembaga penegak hukum di Indonesia dan tugasnya dalam waktu 10 detik!',
    actionText: 'Jawab dengan tepat untuk meraih +20 Poin!',
    pointsDelta: 20,
    stepsDelta: 0,
    isChallenge: true
  },
  {
    id: 5,
    title: 'Vonis Keadilan Restoratif',
    icon: '⚖️',
    description: 'Kalian berhasil mendamaikan sengketa antar dua pihak secara kekeluargaan dan adil!',
    actionText: 'Maju 3 Petak ke depan & Tambah +15 Poin!',
    pointsDelta: 15,
    stepsDelta: 3
  },
  {
    id: 6,
    title: 'Audit Transparansi Dana',
    icon: '🔍',
    description: 'Kelompokmu terbukti transparan dan jujur dalam mengelola amanah kelas!',
    actionText: 'Raih +20 Poin Integritas Bangsa!',
    pointsDelta: 20,
    stepsDelta: 1
  },
  {
    id: 7,
    title: 'Tantangan Bunyi Pasal 1 Ayat 3',
    icon: '🏛️',
    description: 'Ucapkan bunyi UUD NRI 1945 Pasal 1 Ayat 3 secara lantang dan serentak satu kelompok!',
    actionText: '"Negara Indonesia adalah negara hukum" -> Raih +25 Poin!',
    pointsDelta: 25,
    stepsDelta: 0,
    isChallenge: true
  },
  {
    id: 8,
    title: 'Angin Segar Supremasi Hukum',
    icon: '🌪️',
    description: 'Semua warga negara merasa aman karena hukum ditegakkan tanpa pilih kasih!',
    actionText: 'Melangkah Maju 2 Petak & Tambah +15 Poin!',
    pointsDelta: 15,
    stepsDelta: 2
  }
];

export const SORT_ITEMS: SortItem[] = [
  {
    id: 's1',
    text: 'Memakai helm berstandar SNI dan memiliki SIM saat berkendara',
    icon: '🛵',
    category: 'taat',
    explanation: 'Mematuhi UU Lalu Lintas demi keselamatan diri dan pengguna jalan lain.'
  },
  {
    id: 's2',
    text: 'Menerobos antrean tiket kereta api di stasiun',
    icon: '🏃',
    category: 'melanggar',
    explanation: 'Melanggar norma ketertiban umum dan hak orang lain yang datang lebih awal.'
  },
  {
    id: 's3',
    text: 'Membayar pajak kendaraan bermotor tepat pada waktunya',
    icon: '💳',
    category: 'taat',
    explanation: 'Kewajiban konstitusional warga negara untuk mendukung pembangunan bangsa.'
  },
  {
    id: 's4',
    text: 'Mencontek atau membawa catatan kecil saat ujian semester',
    icon: '📝',
    category: 'melanggar',
    explanation: 'Melanggar tata tertib sekolah dan mencederai nilai integritas/kejujuran.'
  },
  {
    id: 's5',
    text: 'Menyeberang jalan raya melalui Zebra Cross atau Jembatan Penyeberangan Orang (JPO)',
    icon: '🚶',
    category: 'taat',
    explanation: 'Memanfaatkan fasilitas keselamatan publik sesuai aturan hukum lalu lintas.'
  },
  {
    id: 's6',
    text: 'Menyebarkan kabar bohong (hoaks) yang memfitnah orang lain di medsos',
    icon: '📱',
    category: 'melanggar',
    explanation: 'Pelanggaran pidana UU ITE (pencemaran nama baik dan manipulasi informasi).'
  },
  {
    id: 's7',
    text: 'Mengikuti musyawarah pemilihan ketua RT secara tertib dan rukun',
    icon: '🤝',
    category: 'taat',
    explanation: 'Wujud partisipasi demokrasi dan ketaatan pada aturan musyawarah mufakat.'
  },
  {
    id: 's8',
    text: 'Membuang sampah kasur bekas ke aliran sungai',
    icon: '🗑️',
    category: 'melanggar',
    explanation: 'Melanggar Perda Kebersihan & UU Lingkungan Hidup yang dapat memicu banjir.'
  }
];

export const MOTIVATIONAL_QUOTES = [
  {
    quote: '“Hukum bukanlah sekadar pasal-pasal kaku di atas kertas, melainkan jalan untuk menghadirkan keadilan, ketertiban, dan kebahagiaan bagi seluruh rakyat.”',
    author: 'Prof. Dr. Satjipto Rahardjo, S.H.',
    role: 'Guru Besar Hukum Progresif Indonesia'
  },
  {
    quote: '“Kurang cerdas dapat diperbaiki dengan belajar, kurang cakap dapat dihilangkan dengan pengalaman. Namun tidak jujur itu sulit diperbaiki.”',
    author: 'Drs. Mohammad Hatta',
    role: 'Proklamator & Wakil Presiden RI Pertama'
  },
  {
    quote: '“Bila hukum ditegakkan dengan adil tanpa tebang pilih, maka sebuah bangsa akan berdiri kokoh dan makmur. Sebaliknya, bangsa akan hancur bila hukum diperjualbelikan.”',
    author: 'Prof. Dr. Mahfud MD, S.H., S.U.',
    role: 'Pakar Hukum Tata Negara & Mantan Ketua MK'
  },
  {
    quote: '“Pendidikan adalah tempat persemaian benih-benih kebudayaan dan budi pekerti dalam masyarakat. Pelajar yang beradab adalah pelajar yang menjunjung tinggi hukum.”',
    author: 'Ki Hajar Dewantara',
    role: 'Bapak Pendidikan Nasional Indonesia'
  }
];

export const SUMMARY_ACRONYM = [
  { letter: 'H', word: 'Hormati Aturan & Norma', desc: 'Jadikan tata tertib dan undang-undang sebagai pemandu dalam bertutur dan bertindak.' },
  { letter: 'U', word: 'Utamakan Keadilan & Kesetaraan', desc: 'Semua manusia memiliki martabat dan kedudukan yang sama di hadapan hukum.' },
  { letter: 'K', word: 'Konstitusi UUD 1945 Pegangannya', desc: 'Pasal 1 Ayat (3) menegaskan kedaulatan hukum, bukan kekuasaan yang sewenang-wenang.' },
  { letter: 'U', word: 'Upayakan Damai & Ketertiban', desc: 'Hindari main hakim sendiri; selesaikan segala masalah lewat jalan hukum yang sah.' },
  { letter: 'M', word: 'Mulai dari Diri Sendiri Hari Ini', desc: 'Taat hukum berawal dari hal kecil: disiplin waktu, jujur saat ujian, dan bijak bermedsos.' }
];

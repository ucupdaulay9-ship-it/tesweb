/* ===== ISI WEBSITE: hanya file ini yang perlu kamu edit ===== */
/* ============ EDIT BAGIAN INI ============ */
const CONFIG = {
  name: "Zakiyatul Hafsyah",
  date: "2026-05-18",                       // tanggal balikan (TAHUN-BULAN-TANGGAL)
  birth: "2007-11-26T00:00:00",           // TANGGAL LAHIR (TAHUN-BULAN-TANGGAL"T"JAM:MENIT:DETIK) untuk hitungan "waktu kamu di dunia"
  hint: "Petunjuk: hari yang paling aku syukuri 🤍",
  music: "music.mp3",                       // taruh file lagu di folder yang sama (kosongkan "" jika tidak ada)
  voice: "",                                // contoh: "voice.mp3" (kosongkan jika tidak ada)
  wa: "",                                   // nomor WhatsAppmu, contoh: "6281234567890" (kosongkan jika tidak ada)
  video: "video.mp4",                       // video sinematik kalian (kosongkan "" jika belum ada)
  ending: "Semoga semua doamu terkabul, semoga bahagia selalu menemanimu, dan semoga aku boleh terus ada di sampingmu. Aku sayang kamu. 🤎",
  lifeQuotes: [                             // pesan di balik kartu: tahun, hari, jam, menit, detik
    "Setiap tahun kehadiranmu membuat dunia ini lebih indah, dan hidupku jauh lebih berwarna.",
    "Ribuan hari telah kamu lewati, dan aku bersyukur menjadi bagian dari sebagian kecilnya.",
    "Setiap jam sejak kamu lahir, dunia punya satu alasan lagi untuk tersenyum.",
    "Tiap menit hidupmu berharga, dan aku ingin menemanimu di sebanyak mungkin menit yang tersisa.",
    "Bahkan di detik ini, napasmu adalah alasan aku bersyukur."
  ],
  map: {
    from: "Lhokseumawe", to: "Tebing Tinggi",
    km: 370,                                // perkiraan jarak darat, cek lagi di Google Maps lalu ganti
    time: "± 8–9 jam",
    text: "Dari Lhokseumawe sampai Tebing Tinggi memang jauh, tapi tiap kilometernya cuma membuatku makin yakin: kamu tempat yang selalu ingin kutuju. Jarak boleh memisahkan, rindu tetap sampai. 💗"
  },
  letter: [
    "Sayang, hari ini hari spesialmu, dan aku ingin kamu tahu betapa berharganya kamu buatku. Di usia yang ke-19 ini, kamu bukan hanya bertambah umur, tapi juga bertambah indah di mataku.",
    "Terima kasih sudah sabar, sudah tetap tinggal, dan sudah memilih aku lagi. Kamu membuat hari-hari biasa terasa hangat, bahkan ketika jarak membentang di antara kita.",
    "Semoga di umur yang baru ini, semua doa baikmu dijawab pelan-pelan, langkahmu selalu dimudahkan, dan kamu selalu dikelilingi orang-orang yang menyayangimu dengan tulus.",
    "Aku mungkin belum sempurna, tapi aku akan terus belajar menjadi seseorang yang pantas berdiri di sampingmu, hari ini, besok, dan seterusnya.",
    "Apa pun yang terjadi nanti, aku ingin tetap jadi orang yang ada di sampingmu. Selamat ulang tahun, cintaku."
  ],
  from: "Dari aku, untukmu 🤍",
  photos: [                                 // 19 foto: foto1.jpg ... foto19.jpg (ganti caption sesukamu)
    "Awal cerita kita", "Senyummu favoritku", "Jalan-jalan pertama", "Makan bareng",
    "Hari-hari sederhana", "Tawa yang tak terlupa", "Selfie dadakan", "Hujan dan payung",
    "Momen favoritku", "Tempat kita", "Pelukan hangat", "Hari spesial",
    "Lelah tapi bahagia", "Kamu dan senja", "Kita berdua", "Dan masih berlanjut",
    "Rindu yang sampai", "Kamu di usia 19", "Selalu kamu"
  ].map((cap, i) => ({ src: "foto" + (i + 1) + ".jpg", cap })),
  timeline: [                               // tiap item: d (label), t (judul), x (isi, boleh panjang; pisahkan paragraf dengan satu baris kosong), img (opsional, nama file foto)
    { d: "Dulu", t: "Pertama kali bertemu", x: "Aku belum tahu kamu akan jadi sepenting ini." },
    { d: "Kemudian", t: "Hari kita jadian", x: "Hari yang bikin hatiku penuh." },
    { d: "Setelahnya", t: "Momen favorit kita", x: "Tawa, cerita, dan makanan enak bersamamu." },
    { d: "Hari ini", t: "Ulang tahunmu 🎂", x: "Dan aku masih memilih kamu." }
  ],
  reasons: [                                // 19 alasan
    "Kamu sabar menghadapi aku", "Senyummu menenangkan", "Kamu tulus dan apa adanya", "Kamu selalu mendengarkan",
    "Tawamu menular", "Kamu kuat dan mandiri", "Kamu peduli pada orang lain", "Bersamamu aku jadi lebih baik",
    "Kamu rumah buatku", "Doamu selalu menguatkan", "Kamu setia di saat sulit", "Cara kamu memanggil namaku",
    "Kamu bikin hal kecil jadi indah", "Kamu selalu percaya padaku", "Kamu cantik luar dan dalam",
    "Kamu mau belajar dan tumbuh bersama", "Kamu selalu ada walau jauh", "Kamu membuatku ingin pulang",
    "Karena kamu adalah kamu"
  ],
  secret: "Kalau kamu menemukan pesan ini: aku sayang kamu lebih dari yang bisa kutulis. 🤎"
};
/* ========================================= */

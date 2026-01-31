export type SermonType = 'fixed' | 'movable';

export interface Sermon {
  id: string;
  title: string;
  category: string; // e.g., "Predici Duminicale", "Cursuri"
  audio_url: string; // Direct link to MP3
  type: SermonType;
  // For Fixed Feasts (e.g., St. Nicholas, Dec 6)
  fixed_month?: number;
  fixed_day?: number;
  // For Movable Feasts (Easter based)
  // 0 = Easter Sunday, -7 = Palm Sunday, +35 = Blind Man, +49 = Pentecost
  pascha_offset?: number;
  duration?: string; // e.g., "45:30"
  description?: string;
}

export const sermons: Sermon[] = [
  // Movable Feasts (Pascha-based)
  {
    id: 'sermon-001',
    title: 'Învierea Domnului',
    category: 'Predici Duminicale',
    audio_url: 'https://example.com/audio/sermon-invierea-domnului.mp3',
    type: 'movable',
    pascha_offset: 0,
    duration: '52:15',
    description: 'Predică despre Învierea Domnului nostru Iisus Hristos - Paștele Ortodox'
  },
  {
    id: 'sermon-002',
    title: 'Duminica Floriilor',
    category: 'Predici Duminicale',
    audio_url: 'https://example.com/audio/sermon-floriile.mp3',
    type: 'movable',
    pascha_offset: -7,
    duration: '48:30',
    description: 'Intrarea Domnului în Ierusalim - Duminica Floriilor'
  },
  {
    id: 'sermon-003',
    title: 'Duminica Orbului',
    category: 'Predici Duminicale',
    audio_url: 'https://example.com/audio/sermon-orbul.mp3',
    type: 'movable',
    pascha_offset: 35,
    duration: '45:20',
    description: 'Vindecarea orbului din naștere - Duminica a VI-a după Paști'
  },
  {
    id: 'sermon-004',
    title: 'Pogorârea Sfântului Duh',
    category: 'Predici Duminicale',
    audio_url: 'https://example.com/audio/sermon-rusalii.mp3',
    type: 'movable',
    pascha_offset: 49,
    duration: '50:45',
    description: 'Rusaliile - Pogorârea Duhului Sfânt peste Apostoli'
  },
  // Fixed Feasts
  {
    id: 'sermon-005',
    title: 'Sfântul Nicolae',
    category: 'Predici Duminicale',
    audio_url: 'https://example.com/audio/sermon-sf-nicolae.mp3',
    type: 'fixed',
    fixed_month: 12,
    fixed_day: 6,
    duration: '42:10',
    description: 'Prăznuirea Sfântului Ierarh Nicolae, Arhiepiscopul Mirelor Lichiei'
  },
  {
    id: 'sermon-006',
    title: 'Nașterea Domnului',
    category: 'Predici Duminicale',
    audio_url: 'https://example.com/audio/sermon-craciun.mp3',
    type: 'fixed',
    fixed_month: 12,
    fixed_day: 25,
    duration: '55:30',
    description: 'Crăciunul - Nașterea Mântuitorului Iisus Hristos'
  },
  {
    id: 'sermon-007',
    title: 'Bobotează',
    category: 'Predici Duminicale',
    audio_url: 'https://example.com/audio/sermon-boboteaza.mp3',
    type: 'fixed',
    fixed_month: 1,
    fixed_day: 6,
    duration: '47:25',
    description: 'Botezul Domnului - Arătarea Sfintei Treimi'
  },
  // Additional Sunday Sermons and Courses
  {
    id: 'sermon-008',
    title: 'Rugăciunea în viața creștinului',
    category: 'Cursuri',
    audio_url: 'https://example.com/audio/sermon-rugaciune.mp3',
    type: 'fixed',
    fixed_month: 3,
    fixed_day: 15,
    duration: '38:45',
    description: 'Curs despre importanța rugăciunii și cum să ne rugăm în spirit și adevăr'
  },
  {
    id: 'sermon-009',
    title: 'Pocăința adevărată',
    category: 'Cursuri',
    audio_url: 'https://example.com/audio/sermon-pocainta.mp3',
    type: 'fixed',
    fixed_month: 2,
    fixed_day: 20,
    duration: '44:15',
    description: 'Curs despre pocăință, spovedanie și reîntoarcerea la Dumnezeu'
  },
  {
    id: 'sermon-010',
    title: 'Duminica Vameșului și a Fariseului',
    category: 'Predici Duminicale',
    audio_url: 'https://example.com/audio/sermon-vamesul-fariseul.mp3',
    type: 'movable',
    pascha_offset: -70,
    duration: '41:30',
    description: 'Pilda Vameșului și a Fariseului - despre smerenie și mândrie'
  },
  {
    id: 'sermon-011',
    title: 'Sfânta Liturghie - taina comuniunii',
    category: 'Cursuri',
    audio_url: 'https://example.com/audio/sermon-liturghie.mp3',
    type: 'fixed',
    fixed_month: 5,
    fixed_day: 10,
    duration: '51:00',
    description: 'Curs despre înțelegerea Sfintei Liturghii și împărtășirea cu Hristos'
  },
  {
    id: 'sermon-012',
    title: 'Înălțarea Domnului',
    category: 'Predici Duminicale',
    audio_url: 'https://example.com/audio/sermon-inaltare.mp3',
    type: 'movable',
    pascha_offset: 39,
    duration: '46:20',
    description: 'Înălțarea la cer a Domnului Iisus Hristos'
  }
];

export default sermons;

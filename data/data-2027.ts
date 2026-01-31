export type SermonType = 'fixed' | 'movable';

export interface Sermon {
  id: string;
  title: string;
  category: string;
  audio_url: string;
  type: SermonType;
  fixed_month?: number;
  fixed_day?: number;
  pascha_offset?: number;
  duration?: string;
  description?: string;
  gospelReading?: string;
  liturgicalDate?: string;
}

export const sermons2027: Sermon[] = [
  {
    id: "s001",
    title: "Anul Nou - Tăierea împrejur - Sf. Vasile cel Mare",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Tăierea împrejur a Domnului. Sf. Vasile cel Mare. Anul nou, 2020.mp3",
    type: "fixed",
    fixed_month: 1,
    fixed_day: 1,
    duration: "21:00",
    liturgicalDate: "2027-01-01"
  },
  {
    id: "s002",
    title: "Botezul Domnului",
    category: "Predici de Sărbători",
    audio_url: "https://r2.predicileparintelui.ro/audio/Botezul Domnului - 2020.mp3",
    type: "fixed",
    fixed_month: 1,
    fixed_day: 5,
    duration: "18:00",
    liturgicalDate: "2027-01-05"
  },
  {
    id: "s003",
    title: "Sf. Ioan Botezătorul",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la sărbătoarea Sf. Ioan Botezătorul - 2020.mp3",
    type: "fixed",
    fixed_month: 1,
    fixed_day: 7,
    duration: "16:00",
    liturgicalDate: "2027-01-07"
  },
  {
    id: "s004",
    title: "Întâmpinarea Domnului",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre Tatăl care ne iubește și ne iese în întâmpinare.mp3",
    type: "fixed",
    fixed_month: 2,
    fixed_day: 2,
    duration: "30:00",
    liturgicalDate: "2027-02-02"
  },
  {
    id: "s005",
    title: "Duminica a 33-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 33-a după Rusalii - 2020.mp3",
    type: "movable",
    pascha_offset: -70,
    duration: "24:00",
    liturgicalDate: "2027-02-21"
  },
  {
    id: "s006",
    title: "Duminica a 34-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 34-a după Rusalii - 2020.mp3",
    type: "movable",
    pascha_offset: -63,
    duration: "20:00",
    liturgicalDate: "2027-02-28"
  },
  {
    id: "s007",
    title: "Duminica Înfricoșătoarei Judecăți",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Duminica Înfricoșătoarei Judecăți - 2020.mp3",
    type: "movable",
    pascha_offset: -56,
    duration: "30:00",
    liturgicalDate: "2027-03-07"
  },
  {
    id: "s008",
    title: "Duminica a 36-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 36-a după Rusalii - 2019.m4a",
    type: "movable",
    pascha_offset: -49,
    duration: "45:00",
    liturgicalDate: "2027-03-14"
  },
  {
    id: "s009",
    title: "Duminica Ortodoxiei",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Duminica 1 din Post - 2018.mp3",
    type: "movable",
    pascha_offset: -42,
    duration: "23:00",
    liturgicalDate: "2027-03-21"
  },
  {
    id: "s010",
    title: "Buna Vestire",
    category: "Predici de Sărbători",
    audio_url: "https://r2.predicileparintelui.ro/audio/Buna Vestire - 2017.mp3",
    type: "fixed",
    fixed_month: 3,
    fixed_day: 24,
    duration: "21:00",
    liturgicalDate: "2027-03-24"
  },
  {
    id: "s011",
    title: "Buna Vestire",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Buna Vestire - 2017.mp3",
    type: "fixed",
    fixed_month: 3,
    fixed_day: 25,
    duration: "21:00",
    liturgicalDate: "2027-03-25"
  },
  {
    id: "s012",
    title: "Sfântul Grigorie Palama",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 2-a din Post - 2019.m4a",
    type: "movable",
    pascha_offset: -35,
    duration: "43:00",
    liturgicalDate: "2027-03-28"
  },
  {
    id: "s013",
    title: "Duminica Sfintei Cruci",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 3-a din Post - 2019.m4a",
    type: "movable",
    pascha_offset: -28,
    duration: "38:00",
    liturgicalDate: "2027-04-04"
  },
  {
    id: "s014",
    title: "Sfântul Ioan Scărarul",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 4-a din Postul Mare - 2020.mp3",
    type: "movable",
    pascha_offset: -21,
    duration: "22:00",
    liturgicalDate: "2027-04-11"
  },
  {
    id: "s015",
    title: "Sfânta Maria Egipteanca",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 5-a din Post - 2019.m4a",
    type: "movable",
    pascha_offset: -14,
    duration: "52:00",
    liturgicalDate: "2027-04-18"
  },
  {
    id: "s016",
    title: "Sf. Mare Mucenic Gheorghe",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Sf. M. Mc. Gheorghe și asumarea jertfei în viața noastră.mp3",
    type: "fixed",
    fixed_month: 4,
    fixed_day: 23,
    duration: "20:00",
    liturgicalDate: "2027-04-23"
  },
  {
    id: "s017",
    title: "Duminica Floriilor",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Duminica a 6-a din Post (Floriile) - 2017.mp3",
    type: "movable",
    pascha_offset: -7,
    duration: "15:00",
    liturgicalDate: "2027-04-25"
  },
  {
    id: "s018",
    title: "Învierea Domnului - Paștele",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică în a doua zi de Paști (2 Mai 2016).mp3",
    type: "movable",
    pascha_offset: 0,
    duration: "24:00",
    liturgicalDate: "2027-05-02"
  },
  {
    id: "s019",
    title: "Duminica a 2-a după Paști",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 2-a după Paști - 2019.m4a",
    type: "movable",
    pascha_offset: 14,
    duration: "32:00",
    liturgicalDate: "2027-05-16"
  },
  {
    id: "s020",
    title: "Sfinții Împărați Constantin și Elena",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la sărbătoarea Sfinților Mari Împărați Constantin și Elena.mp3",
    type: "fixed",
    fixed_month: 5,
    fixed_day: 21,
    duration: "12:00",
    liturgicalDate: "2027-05-21"
  },
  {
    id: "s021",
    title: "Duminica a 3-a după Paști",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 3-a după Paști - 2020.mp3",
    type: "movable",
    pascha_offset: 21,
    duration: "23:00",
    liturgicalDate: "2027-05-23"
  },
  {
    id: "s022",
    title: "Duminica a 4-a după Paști",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 4-a după Paști - 2019.m4a",
    type: "movable",
    pascha_offset: 28,
    duration: "37:00",
    liturgicalDate: "2027-05-30"
  },
  {
    id: "s023",
    title: "Duminica a 5-a după Paști",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Duminica a 5-a după Paști - 2017.mp3",
    type: "movable",
    pascha_offset: 35,
    duration: "18:00",
    liturgicalDate: "2027-06-06"
  },
  {
    id: "s024",
    title: "Duminica a 6-a după Paști",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 6-a după Paști - 2019.m4a",
    type: "movable",
    pascha_offset: 42,
    duration: "39:00",
    liturgicalDate: "2027-06-13"
  },
  {
    id: "s025",
    title: "Duminica a 7-a după Paști",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 7-a după Paști - 2020.mp3",
    type: "movable",
    pascha_offset: 49,
    duration: "21:00",
    liturgicalDate: "2027-06-20"
  },
  {
    id: "s026",
    title: "Duminica a 2-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Duminica a 2-a după Rusalii - 2017.mp3",
    type: "movable",
    pascha_offset: 63,
    duration: "22:00",
    liturgicalDate: "2027-07-04"
  },
  {
    id: "s027",
    title: "Duminica a 3-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 3-a după Rusalii - 2019.m4a",
    type: "movable",
    pascha_offset: 70,
    duration: "46:00",
    liturgicalDate: "2027-07-11"
  },
  {
    id: "s028",
    title: "Duminica a 4-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 4-a după Rusalii - 2019.m4a",
    type: "movable",
    pascha_offset: 77,
    duration: "36:00",
    liturgicalDate: "2027-07-18"
  },
  {
    id: "s029",
    title: "Duminica a 5-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 5-a după Rusalii - 2019.m4a",
    type: "movable",
    pascha_offset: 84,
    duration: "54:00",
    liturgicalDate: "2027-07-25"
  },
  {
    id: "s030",
    title: "Duminica a 6-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 6-a după Rusalii - 2019.m4a",
    type: "movable",
    pascha_offset: 91,
    duration: "47:00",
    liturgicalDate: "2027-08-01"
  },
  {
    id: "s031",
    title: "Schimbarea la Față",
    category: "Predici de Sărbători",
    audio_url: "https://r2.predicileparintelui.ro/audio/Schimbarea la Față a Domnului - 2017.mp3",
    type: "fixed",
    fixed_month: 8,
    fixed_day: 5,
    duration: "20:00",
    liturgicalDate: "2027-08-05"
  },
  {
    id: "s032",
    title: "Schimbarea la Față a Domnului",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Schimbarea la Față a Domnului - 2017.mp3",
    type: "fixed",
    fixed_month: 8,
    fixed_day: 6,
    duration: "20:00",
    liturgicalDate: "2027-08-06"
  },
  {
    id: "s033",
    title: "Duminica a 7-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 7-a după Rusalii - 2019.mp3",
    type: "movable",
    pascha_offset: 98,
    duration: "22:00",
    liturgicalDate: "2027-08-08"
  },
  {
    id: "s034",
    title: "Duminica a 8-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 8-a după Rusalii - 2019.mp3",
    type: "movable",
    pascha_offset: 105,
    duration: "20:00",
    liturgicalDate: "2027-08-15"
  },
  {
    id: "s035",
    title: "Duminica a 9-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 9-a după Rusalii - 2015.mp3",
    type: "movable",
    pascha_offset: 112,
    duration: "17:00",
    liturgicalDate: "2027-08-22"
  },
  {
    id: "s036",
    title: "Duminica a 10-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 10-a după Rusalii - 2017.mp3",
    type: "movable",
    pascha_offset: 119,
    duration: "26:00",
    liturgicalDate: "2027-08-29"
  },
  {
    id: "s037",
    title: "Duminica a 11-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 11-a după Rusalii - 2015.mp3",
    type: "movable",
    pascha_offset: 126,
    duration: "24:00",
    liturgicalDate: "2027-09-05"
  },
  {
    id: "s038",
    title: "Nașterea Maicii Domnului",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la praznicul Adormirii Maicii Domnului - 2020.mp3",
    type: "fixed",
    fixed_month: 9,
    fixed_day: 8,
    duration: "15:00",
    liturgicalDate: "2027-09-08"
  },
  {
    id: "s039",
    title: "Duminica a 12-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 12-a după Rusalii - 2017.mp3",
    type: "movable",
    pascha_offset: 133,
    duration: "25:00",
    liturgicalDate: "2027-09-12"
  },
  {
    id: "s040",
    title: "Înălțarea Sfintei Cruci",
    category: "Predici de Sărbători",
    audio_url: "https://r2.predicileparintelui.ro/audio/Duminica după Înălțarea Sfintei Cruci - 2017.mp3",
    type: "fixed",
    fixed_month: 9,
    fixed_day: 13,
    duration: "27:00",
    liturgicalDate: "2027-09-13"
  },
  {
    id: "s041",
    title: "Înălțarea Sfintei Cruci",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Crucea, în viața Sfântului Iosif cel Nou.mp3",
    type: "fixed",
    fixed_month: 9,
    fixed_day: 14,
    duration: "31:00",
    liturgicalDate: "2027-09-14"
  },
  {
    id: "s042",
    title: "Sf. Iosif cel Nou de la Partoș",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la 15 Sept. 2019 - Sfântul Iosif cel Nou de la Partoș.mp3",
    type: "fixed",
    fixed_month: 9,
    fixed_day: 15,
    duration: "24:00",
    liturgicalDate: "2027-09-15"
  },
  {
    id: "s043",
    title: "Duminica a 13-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 13-a după Rusalii - 2017.mp3",
    type: "movable",
    pascha_offset: 140,
    duration: "20:00",
    liturgicalDate: "2027-09-19"
  },
  {
    id: "s044",
    title: "Duminica a 14-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 14-a după Rusalii - 2015.mp3",
    type: "movable",
    pascha_offset: 147,
    duration: "22:00",
    liturgicalDate: "2027-09-26"
  },
  {
    id: "s045",
    title: "Duminica a 16-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 16-a după Rusalii - 2019.mp3",
    type: "movable",
    pascha_offset: 161,
    duration: "21:00",
    liturgicalDate: "2027-10-10"
  },
  {
    id: "s046",
    title: "Duminica a 17-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Duminica a 17-a după Rusalii - 2017.mp3",
    type: "movable",
    pascha_offset: 168,
    duration: "19:00",
    liturgicalDate: "2027-10-17"
  },
  {
    id: "s047",
    title: "Duminica a 18-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 18-a după Rusalii - 2019.mp3",
    type: "movable",
    pascha_offset: 175,
    duration: "22:00",
    liturgicalDate: "2027-10-24"
  },
  {
    id: "s048",
    title: "Duminica a 19-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Duminica a 19-a după Rusalii - 2017.mp3",
    type: "movable",
    pascha_offset: 182,
    duration: "19:00",
    liturgicalDate: "2027-10-31"
  },
  {
    id: "s049",
    title: "Duminica a 20-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Duminica a 20-a după Rusalii - 2017.mp3",
    type: "movable",
    pascha_offset: 189,
    duration: "23:00",
    liturgicalDate: "2027-11-07"
  },
  {
    id: "s050",
    title: "Soborul Arhanghelilor Mihail și Gavriil",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 24-a după Rusalii (Sf. Arh. Mihail și Gavriil) - 2015.mp3",
    type: "fixed",
    fixed_month: 11,
    fixed_day: 8,
    duration: "29:00",
    liturgicalDate: "2027-11-08"
  },
  {
    id: "s051",
    title: "Duminica a 21-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Duminica a 21-a după Rusalii - 2017.mp3",
    type: "movable",
    pascha_offset: 196,
    duration: "21:00",
    liturgicalDate: "2027-11-14"
  },
  {
    id: "s052",
    title: "Duminica a 22-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 22-a după Rusalii - 2019.mp3",
    type: "movable",
    pascha_offset: 203,
    duration: "26:00",
    liturgicalDate: "2027-11-21"
  },
  {
    id: "s053",
    title: "Duminica a 23-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 23-a după Rusalii - 2019.mp3",
    type: "movable",
    pascha_offset: 210,
    duration: "20:00",
    liturgicalDate: "2027-11-28"
  },
  {
    id: "s054",
    title: "Duminica a 24-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 24-a după Rusalii - 2019.mp3",
    type: "movable",
    pascha_offset: 217,
    duration: "19:00",
    liturgicalDate: "2027-12-05"
  },
  {
    id: "s055",
    title: "Sf. Ierarh Nicolae",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 27-a după Rusalii (Sf. Nicolae) - 2015.mp3",
    type: "fixed",
    fixed_month: 12,
    fixed_day: 6,
    duration: "23:00",
    liturgicalDate: "2027-12-06"
  },
  {
    id: "s056",
    title: "Duminica a 25-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 25-a după Rusalii - 2019.mp3",
    type: "movable",
    pascha_offset: 224,
    duration: "20:00",
    liturgicalDate: "2027-12-12"
  },
  {
    id: "s057",
    title: "Duminica a 26-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 26-a după Rusalii - 2018.mp3",
    type: "movable",
    pascha_offset: 231,
    duration: "36:00",
    liturgicalDate: "2027-12-19"
  },
  {
    id: "s058",
    title: "Nașterea Domnului",
    category: "Predici de Sărbători",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica după Nașterea Domnului - 2017.mp3",
    type: "fixed",
    fixed_month: 12,
    fixed_day: 24,
    duration: "11:00",
    liturgicalDate: "2027-12-24"
  },
  {
    id: "s059",
    title: "Nașterea Domnului",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica după Nașterea Domnului - 2017.mp3",
    type: "fixed",
    fixed_month: 12,
    fixed_day: 25,
    duration: "11:00",
    liturgicalDate: "2027-12-25"
  },
  {
    id: "s060",
    title: "Duminica a 27-a după Rusalii",
    category: "Predici Duminicale",
    audio_url: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 27-a după Rusalii - 2018.m4a",
    type: "movable",
    pascha_offset: 238,
    duration: "40:00",
    liturgicalDate: "2027-12-26"
  },
];

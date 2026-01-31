export interface CoursePart {
  partNumber: number;
  title: string;
  audioFile: string;
  duration: string;
  fileSize: number;
  recordingYear?: number | null;
}

export interface CourseSeries {
  id: string;
  title: string;
  description: string;
  totalParts: number;
  category: string;
  parts: CoursePart[];
  topics?: { [key: string]: CoursePart[] };
}

export const courseSeries: CourseSeries[] = [
  {
    id: "rugaciunea-domneasca",
    title: "Rugăciunea Domnească - Tatăl Nostru",
    description: "Serie completă despre Tatăl Nostru - cele 8 părți ale rugăciunii Domnești",
    totalParts: 5,
    category: "Cursuri Biblice",
    parts: [
      {
        partNumber: 0,
        title: "Școala de Duminică - „Vie Împărăția Ta”",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - „Vie Împărăția Ta”.m4a",
        duration: "49:00",
        fileSize: 49097550,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - ”Facă-se voia Ta precum în Cer și pe Pământ”",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - ”Facă-se voia Ta precum în Cer și pe Pământ”.m4a",
        duration: "41:00",
        fileSize: 40502257,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - ”Pâinea noastră cea de toate zilele dă-ne-o nouă astăzi”",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - ”Pâinea noastră cea de toate zilele dă-ne-o nouă astăzi”.m4a",
        duration: "42:00",
        fileSize: 41798778,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - „Și ne iartă nouă greșelile noastre precum și noi iertăm greșiților noștri”",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - „Și ne iartă nouă greșelile noastre precum și noi iertăm greșiților noștri”.mp3",
        duration: "25:00",
        fileSize: 25371375,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - ”Ci ne izbăvește de cel viclean”",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - ”Ci ne izbăvește de cel viclean”.mp3",
        duration: "22:00",
        fileSize: 22470320,
        recordingYear: null
      },
    ]
  },
  {
    id: "cele-10-porunci",
    title: "Cele 10 Porunci ale lui Dumnezeu",
    description: "Tâlcuire completă a Decalogului - legea morală dată de Dumnezeu",
    totalParts: 12,
    category: "Cursuri Biblice",
    parts: [
      {
        partNumber: 0,
        title: "Poruncile 1 și 2 - 'Să nu ai alți dumnezei afară de Mine.. Să nu te închini și să nu le slujești' (1)",
        audioFile: "https://r2.predicileparintelui.ro/audio/Poruncile 1 și 2 - 'Să nu ai alți dumnezei afară de Mine.. Să nu te închini și să nu le slujești' (1).m4a",
        duration: "53:00",
        fileSize: 53183688,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Poruncile 1 și 2 - 'Să nu ai alți dumnezei afară de Mine.. Să nu te închini și să nu le slujești' (2)",
        audioFile: "https://r2.predicileparintelui.ro/audio/Poruncile 1 și 2 - 'Să nu ai alți dumnezei afară de Mine.. Să nu te închini și să nu le slujești' (2).m4a",
        duration: "1:03:00",
        fileSize: 63037381,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Porunca a 10-a - Să nu poftești nimic din cele ale aproapelui tău",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Porunca a 10-a - Să nu poftești nimic din cele ale aproapelui tău.m4a",
        duration: "40:00",
        fileSize: 40029442,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Porunca a 3-a - Să nu iei numele Domnului în deșert",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Porunca a 3-a - Să nu iei numele Domnului în deșert.mp3",
        duration: "41:00",
        fileSize: 41331066,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Porunca a 4-a - „Să cinstești ziua de odihnă”(1)",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Porunca a 4-a - „Să cinstești ziua de odihnă”(1).m4a",
        duration: "42:00",
        fileSize: 41574173,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Porunca a 4-a - „Să cinstești ziua de odihnă”(2)",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Porunca a 4-a - „Să cinstești ziua de odihnă”(2).m4a",
        duration: "50:00",
        fileSize: 50013229,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Porunca a 5-a - Cinstirea Părinților",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Porunca a 5-a - Cinstirea Părinților.mp3",
        duration: "41:00",
        fileSize: 40565027,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Porunca a 6-a - Să nu ucizi! (1)",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Porunca a 6-a - Să nu ucizi! (1).m4a",
        duration: "1:15:00",
        fileSize: 74886758,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Porunca a 6-a - Să nu ucizi! (2)",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Porunca a 6-a - Să nu ucizi! (2).m4a",
        duration: "1:16:00",
        fileSize: 75953980,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Porunca a 7-a - Să nu săvârșești adulter!",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Porunca a 7-a - Să nu săvârșești adulter!.m4a",
        duration: "57:00",
        fileSize: 57152545,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Porunca a 8-a - Să nu furi!",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Porunca a 8-a - Să nu furi!.m4a",
        duration: "45:00",
        fileSize: 44588799,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Porunca a 9-a - Să nu mărturisești strâmb împotriva aproapelui tău",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Porunca a 9-a - Să nu mărturisești strâmb împotriva aproapelui tău.m4a",
        duration: "46:00",
        fileSize: 46377728,
        recordingYear: null
      },
    ]
  },
  {
    id: "cursuri-mari",
    title: "Cursuri Aprofundate",
    description: "Studii biblice extinse și predici lungi de formare duhovnicească",
    totalParts: 2,
    category: "Cursuri Biblice",
    parts: [
      {
        partNumber: 0,
        title: "CURS MARE - CU PRIVIREA ÎNDREPTATĂ SPRE CEL CE VINE",
        audioFile: "https://r2.predicileparintelui.ro/audio/CURS MARE - CU PRIVIREA ÎNDREPTATĂ SPRE CEL CE VINE.mp3",
        duration: "1:12:00",
        fileSize: 71999319,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "CURS MARE - PETRU ȘI MARIA MAGDALENA ÎN MOMENTUL MORȚII ȘI ÎNVIERII LUI",
        audioFile: "https://r2.predicileparintelui.ro/audio/CURS MARE - PETRU ȘI MARIA MAGDALENA ÎN MOMENTUL MORȚII ȘI ÎNVIERII LUI.m4a",
        duration: "3:07:00",
        fileSize: 187056651,
        recordingYear: null
      },
    ]
  },
  {
    id: "despre-viata-duhovniceasca",
    title: "Despre Viața Duhovnicească",
    description: "Învățături tematice despre diferite aspecte ale vieții creștine",
    totalParts: 16,
    category: "Cursuri Biblice",
    parts: [
      {
        partNumber: 0,
        title: "Despre Dumnezeu -”risipitorul” Seminței",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre Dumnezeu -”risipitorul” Seminței.mp3",
        duration: "24:00",
        fileSize: 23754291,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre Maria Magdalena",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre Maria Magdalena.mp3",
        duration: "32:00",
        fileSize: 32123923,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre Rugăciunea Arhierească a lui Iisus",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre Rugăciunea Arhierească a lui Iisus.mp3",
        duration: "25:00",
        fileSize: 24800861,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre Sfântul Cuv. Ioan Iacob Hozevitul",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre Sfântul Cuv. Ioan Iacob Hozevitul.mp3",
        duration: "33:00",
        fileSize: 32908851,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre Sfântul Cuvios Paisie Aghioritul",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre Sfântul Cuvios Paisie Aghioritul.mp3",
        duration: "48:00",
        fileSize: 48126327,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre Sfântul Iosif cel Nou de la Partoș",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre Sfântul Iosif cel Nou de la Partoș.mp3",
        duration: "32:00",
        fileSize: 31695933,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Despre așteptare",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre așteptare.mp3",
        duration: "46:00",
        fileSize: 46371654,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Despre curaj și îndrăzneală în relația cu Domnul",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre curaj și îndrăzneală în relația cu Domnul.mp3",
        duration: "22:00",
        fileSize: 21733458,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Despre curajul de a construi întâlnirile cu oamenii",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre curajul de a construi întâlnirile cu oamenii.mp3",
        duration: "28:00",
        fileSize: 27535150,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Despre prietenie",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre prietenie.m4a",
        duration: "1:04:00",
        fileSize: 64231241,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Despre rugăciunea inimii (1)",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre rugăciunea inimii (1).mp3",
        duration: "25:00",
        fileSize: 24848090,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Despre rugăciunea inimii (2)",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre rugăciunea inimii (2).mp3",
        duration: "25:00",
        fileSize: 25085909,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Despre rugăciunea inimii (3)",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre rugăciunea inimii (3).mp3",
        duration: "19:00",
        fileSize: 19331865,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Despre Sfânta Liturghie",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre Sfânta Liturghie.mp3",
        duration: "36:00",
        fileSize: 35714611,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Despre Sfântul Siluan Athonitul",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre Sfântul Siluan Athonitul.mp3",
        duration: "1:01:00",
        fileSize: 60638273,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Despre Tatăl care ne iubește și ne iese în întâmpinare",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre Tatăl care ne iubește și ne iese în întâmpinare.mp3",
        duration: "30:00",
        fileSize: 29603630,
        recordingYear: null
      },
    ],
    topics: {
      "Dumnezeu -”risipitorul” Seminței": [
        {
          partNumber: 0,
          title: "Despre Dumnezeu -”risipitorul” Seminței",
          audioFile: "https://r2.predicileparintelui.ro/audio/Despre Dumnezeu -”risipitorul” Seminței.mp3",
          duration: "24:00",
          fileSize: 23754291,
          recordingYear: null
        },
      ],
      "Maria Magdalena": [
        {
          partNumber: 0,
          title: "Despre Maria Magdalena",
          audioFile: "https://r2.predicileparintelui.ro/audio/Despre Maria Magdalena.mp3",
          duration: "32:00",
          fileSize: 32123923,
          recordingYear: null
        },
      ],
      "Rugăciunea Arhierească a lui Iisus": [
        {
          partNumber: 0,
          title: "Despre Rugăciunea Arhierească a lui Iisus",
          audioFile: "https://r2.predicileparintelui.ro/audio/Despre Rugăciunea Arhierească a lui Iisus.mp3",
          duration: "25:00",
          fileSize: 24800861,
          recordingYear: null
        },
      ],
      "Sfântul Cuv": [
        {
          partNumber: 0,
          title: "Despre Sfântul Cuv. Ioan Iacob Hozevitul",
          audioFile: "https://r2.predicileparintelui.ro/audio/Despre Sfântul Cuv. Ioan Iacob Hozevitul.mp3",
          duration: "33:00",
          fileSize: 32908851,
          recordingYear: null
        },
      ],
      "Sfântul Cuvios Paisie Aghioritul": [
        {
          partNumber: 0,
          title: "Despre Sfântul Cuvios Paisie Aghioritul",
          audioFile: "https://r2.predicileparintelui.ro/audio/Despre Sfântul Cuvios Paisie Aghioritul.mp3",
          duration: "48:00",
          fileSize: 48126327,
          recordingYear: null
        },
      ],
      "Sfântul Iosif cel Nou de la Partoș": [
        {
          partNumber: 0,
          title: "Despre Sfântul Iosif cel Nou de la Partoș",
          audioFile: "https://r2.predicileparintelui.ro/audio/Despre Sfântul Iosif cel Nou de la Partoș.mp3",
          duration: "32:00",
          fileSize: 31695933,
          recordingYear: null
        },
      ],
      "așteptare": [
        {
          partNumber: 0,
          title: "Școala de Duminică - Despre așteptare",
          audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre așteptare.mp3",
          duration: "46:00",
          fileSize: 46371654,
          recordingYear: null
        },
      ],
      "curaj și îndrăzneală în relația cu Domnul": [
        {
          partNumber: 0,
          title: "Școala de Duminică - Despre curaj și îndrăzneală în relația cu Domnul",
          audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre curaj și îndrăzneală în relația cu Domnul.mp3",
          duration: "22:00",
          fileSize: 21733458,
          recordingYear: null
        },
      ],
      "curajul de a construi întâlnirile cu oamenii": [
        {
          partNumber: 0,
          title: "Școala de Duminică - Despre curajul de a construi întâlnirile cu oamenii",
          audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre curajul de a construi întâlnirile cu oamenii.mp3",
          duration: "28:00",
          fileSize: 27535150,
          recordingYear: null
        },
      ],
      "prietenie": [
        {
          partNumber: 0,
          title: "Școala de Duminică - Despre prietenie",
          audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre prietenie.m4a",
          duration: "1:04:00",
          fileSize: 64231241,
          recordingYear: null
        },
      ],
      "rugăciunea inimii (1)": [
        {
          partNumber: 0,
          title: "Școala de Duminică - Despre rugăciunea inimii (1)",
          audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre rugăciunea inimii (1).mp3",
          duration: "25:00",
          fileSize: 24848090,
          recordingYear: null
        },
      ],
      "rugăciunea inimii (2)": [
        {
          partNumber: 0,
          title: "Școala de Duminică - Despre rugăciunea inimii (2)",
          audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre rugăciunea inimii (2).mp3",
          duration: "25:00",
          fileSize: 25085909,
          recordingYear: null
        },
      ],
      "rugăciunea inimii (3)": [
        {
          partNumber: 0,
          title: "Școala de Duminică - Despre rugăciunea inimii (3)",
          audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre rugăciunea inimii (3).mp3",
          duration: "19:00",
          fileSize: 19331865,
          recordingYear: null
        },
      ],
      "Sfânta Liturghie": [
        {
          partNumber: 0,
          title: "Școala de Duminică - Despre Sfânta Liturghie",
          audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre Sfânta Liturghie.mp3",
          duration: "36:00",
          fileSize: 35714611,
          recordingYear: null
        },
      ],
      "Sfântul Siluan Athonitul": [
        {
          partNumber: 0,
          title: "Școala de Duminică - Despre Sfântul Siluan Athonitul",
          audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre Sfântul Siluan Athonitul.mp3",
          duration: "1:01:00",
          fileSize: 60638273,
          recordingYear: null
        },
      ],
      "Tatăl care ne iubește și ne iese în întâmpinare": [
        {
          partNumber: 0,
          title: "Școala de Duminică - Despre Tatăl care ne iubește și ne iese în întâmpinare",
          audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre Tatăl care ne iubește și ne iese în întâmpinare.mp3",
          duration: "30:00",
          fileSize: 29603630,
          recordingYear: null
        },
      ],
    }
  },
  {
    id: "scoala-de-duminica",
    title: "Școala de Duminică",
    description: "Întâlniri de catehizare și formare duhovnicească",
    totalParts: 53,
    category: "Cursuri Biblice",
    parts: [
      {
        partNumber: 0,
        title: "Școala de Duminică - Asumarea responsabilității - modul cel mai frumos de a trăi recunoștința",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Asumarea responsabilității - modul cel mai frumos de a trăi recunoștința.mp3",
        duration: "29:00",
        fileSize: 28557478,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Confruntarea cu păcatul și curajul schimbării",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Confruntarea cu păcatul și curajul schimbării.mp3",
        duration: "29:00",
        fileSize: 29223287,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Creștinii ÎN lume dar nu DIN lume",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Creștinii ÎN lume dar nu DIN lume.mp3",
        duration: "30:00",
        fileSize: 29532159,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Crucea, în viața Sfântului Iosif cel Nou",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Crucea, în viața Sfântului Iosif cel Nou.mp3",
        duration: "31:00",
        fileSize: 30698265,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Când sufletul este bolnav... Despre maladii spirituale",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Când sufletul este bolnav... Despre maladii spirituale.mp3",
        duration: "43:00",
        fileSize: 42562872,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Despre așteptare",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre așteptare.mp3",
        duration: "46:00",
        fileSize: 46371654,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Despre curaj și îndrăzneală în relația cu Domnul",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre curaj și îndrăzneală în relația cu Domnul.mp3",
        duration: "22:00",
        fileSize: 21733458,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Despre curajul de a construi întâlnirile cu oamenii",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre curajul de a construi întâlnirile cu oamenii.mp3",
        duration: "28:00",
        fileSize: 27535150,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Despre prietenie",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre prietenie.m4a",
        duration: "1:04:00",
        fileSize: 64231241,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Despre rugăciunea inimii (1)",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre rugăciunea inimii (1).mp3",
        duration: "25:00",
        fileSize: 24848090,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Despre rugăciunea inimii (2)",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre rugăciunea inimii (2).mp3",
        duration: "25:00",
        fileSize: 25085909,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Despre rugăciunea inimii (3)",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre rugăciunea inimii (3).mp3",
        duration: "19:00",
        fileSize: 19331865,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Despre Sfânta Liturghie",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre Sfânta Liturghie.mp3",
        duration: "36:00",
        fileSize: 35714611,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Despre Sfântul Siluan Athonitul",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre Sfântul Siluan Athonitul.mp3",
        duration: "1:01:00",
        fileSize: 60638273,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Despre Tatăl care ne iubește și ne iese în întâmpinare",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Despre Tatăl care ne iubește și ne iese în întâmpinare.mp3",
        duration: "30:00",
        fileSize: 29603630,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Din Casa lui Dumnezeu către casele oamenilor",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Din Casa lui Dumnezeu către casele oamenilor.mp3",
        duration: "19:00",
        fileSize: 18833239,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Focul acela care arde în inima Lui...",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Focul acela care arde în inima Lui....mp3",
        duration: "18:00",
        fileSize: 17572257,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Importanța stăruinței în viața duhovnicească",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Importanța stăruinței în viața duhovnicească.mp3",
        duration: "23:00",
        fileSize: 22827257,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - In Memoriam - Avva Emilian Simonopetritul",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - In Memoriam - Avva Emilian Simonopetritul.m4a",
        duration: "1:28:00",
        fileSize: 87518775,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Iubirea împlinită, e iubirea care merge până la capăt",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Iubirea împlinită, e iubirea care merge până la capăt.mp3",
        duration: "18:00",
        fileSize: 17739022,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Milostivirea - șansa unui nou început pentru toți!",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Milostivirea - șansa unui nou început pentru toți!.mp3",
        duration: "20:00",
        fileSize: 20116374,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Nevoința trupească și rolul ei în tămăduirea sufletului",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Nevoința trupească și rolul ei în tămăduirea sufletului.mp3",
        duration: "32:00",
        fileSize: 32361742,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Nostalgia Paradisului. Amintiri despre el",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Nostalgia Paradisului. Amintiri despre el.mp3",
        duration: "22:00",
        fileSize: 21567110,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - O dublă comemorare - Sf. Brâncoveni și Sf. Iosif Isihastul",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - O dublă comemorare - Sf. Brâncoveni și Sf. Iosif Isihastul.mp3",
        duration: "44:00",
        fileSize: 44345468,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Omul, între ispita confuziei, a îndoielii și retragerea pedagogică a Harului",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Omul, între ispita confuziei, a îndoielii și retragerea pedagogică a Harului.mp3",
        duration: "35:00",
        fileSize: 35167502,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Paza gândurilor - etapă esențială a luptei duhovnicești",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Paza gândurilor - etapă esențială a luptei duhovnicești.mp3",
        duration: "22:00",
        fileSize: 22327796,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Porunca a 10-a - Să nu poftești nimic din cele ale aproapelui tău",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Porunca a 10-a - Să nu poftești nimic din cele ale aproapelui tău.m4a",
        duration: "40:00",
        fileSize: 40029442,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Porunca a 3-a - Să nu iei numele Domnului în deșert",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Porunca a 3-a - Să nu iei numele Domnului în deșert.mp3",
        duration: "41:00",
        fileSize: 41331066,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Porunca a 4-a - „Să cinstești ziua de odihnă”(1)",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Porunca a 4-a - „Să cinstești ziua de odihnă”(1).m4a",
        duration: "42:00",
        fileSize: 41574173,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Porunca a 4-a - „Să cinstești ziua de odihnă”(2)",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Porunca a 4-a - „Să cinstești ziua de odihnă”(2).m4a",
        duration: "50:00",
        fileSize: 50013229,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Porunca a 5-a - Cinstirea Părinților",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Porunca a 5-a - Cinstirea Părinților.mp3",
        duration: "41:00",
        fileSize: 40565027,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Porunca a 6-a - Să nu ucizi! (1)",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Porunca a 6-a - Să nu ucizi! (1).m4a",
        duration: "1:15:00",
        fileSize: 74886758,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Porunca a 6-a - Să nu ucizi! (2)",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Porunca a 6-a - Să nu ucizi! (2).m4a",
        duration: "1:16:00",
        fileSize: 75953980,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Porunca a 7-a - Să nu săvârșești adulter!",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Porunca a 7-a - Să nu săvârșești adulter!.m4a",
        duration: "57:00",
        fileSize: 57152545,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Porunca a 8-a - Să nu furi!",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Porunca a 8-a - Să nu furi!.m4a",
        duration: "45:00",
        fileSize: 44588799,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Porunca a 9-a - Să nu mărturisești strâmb împotriva aproapelui tău",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Porunca a 9-a - Să nu mărturisești strâmb împotriva aproapelui tău.m4a",
        duration: "46:00",
        fileSize: 46377728,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Rațiunea - cale către contemplație",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Rațiunea - cale către contemplație.mp3",
        duration: "19:00",
        fileSize: 19260394,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Reflexii asupra Postului Mare",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Reflexii asupra Postului Mare.mp3",
        duration: "25:00",
        fileSize: 25109732,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Reflexții după plecarea Brâului Maicii Domnului",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Reflexții după plecarea Brâului Maicii Domnului.mp3",
        duration: "21:00",
        fileSize: 21211009,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Scandalul contradicției dintre ceea ce credem și ceea ce suntem",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Scandalul contradicției dintre ceea ce credem și ceea ce suntem.mp3",
        duration: "27:00",
        fileSize: 26964217,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Timpul",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Timpul.mp3",
        duration: "14:00",
        fileSize: 14077282,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Trei clarificări importante",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Trei clarificări importante.mp3",
        duration: "29:00",
        fileSize: 28605961,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - viața Sfântului Iosif, 'introducere' la praznicul ce se apropie",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - viața Sfântului Iosif, 'introducere' la praznicul ce se apropie.mp3",
        duration: "39:00",
        fileSize: 39447404,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Viața trupească și viața duhovnicească",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Viața trupească și viața duhovnicească.mp3",
        duration: "22:00",
        fileSize: 22186108,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Încrederea pe care o arătăm celorlalți - început al iubirii în ei",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Încrederea pe care o arătăm celorlalți - început al iubirii în ei.mp3",
        duration: "28:00",
        fileSize: 27820198,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - Între chemarea lui Hristos și provocările diavolului; asaltul asupra vocației",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - Între chemarea lui Hristos și provocările diavolului; asaltul asupra vocației.mp3",
        duration: "51:00",
        fileSize: 50746851,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - ”Ci ne izbăvește de cel viclean”",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - ”Ci ne izbăvește de cel viclean”.mp3",
        duration: "22:00",
        fileSize: 22470320,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - ”Facă-se voia Ta precum în Cer și pe Pământ”",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - ”Facă-se voia Ta precum în Cer și pe Pământ”.m4a",
        duration: "41:00",
        fileSize: 40502257,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - ”Pâinea noastră cea de toate zilele dă-ne-o nouă astăzi”",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - ”Pâinea noastră cea de toate zilele dă-ne-o nouă astăzi”.m4a",
        duration: "42:00",
        fileSize: 41798778,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - ”Și nu ne duce pe noi în ispită”",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - ”Și nu ne duce pe noi în ispită”.mp3",
        duration: "26:00",
        fileSize: 26179708,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - „Tatăl nostru Care esti în Cer”",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - „Tatăl nostru Care esti în Cer”.m4a",
        duration: "48:00",
        fileSize: 48425759,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - „Vie Împărăția Ta”",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - „Vie Împărăția Ta”.m4a",
        duration: "49:00",
        fileSize: 49097550,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Școala de Duminică - „Și ne iartă nouă greșelile noastre precum și noi iertăm greșiților noștri”",
        audioFile: "https://r2.predicileparintelui.ro/audio/Școala de Duminică - „Și ne iartă nouă greșelile noastre precum și noi iertăm greșiților noștri”.mp3",
        duration: "25:00",
        fileSize: 25371375,
        recordingYear: null
      },
    ]
  },
  {
    id: "despre-sfinti",
    title: "Despre Sfinți",
    description: "Predici și învățături despre viețile sfinților și exemple de sfințenie",
    totalParts: 2,
    category: "Despre Sfinți",
    parts: [
      {
        partNumber: 0,
        title: "Predică la Duminica a 6-a după Rusalii (Sf. Paisie Aghioritul) - 2015",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 6-a după Rusalii (Sf. Paisie Aghioritul) - 2015.mp3",
        duration: "30:00",
        fileSize: 30006542,
        recordingYear: 2015
      },
      {
        partNumber: 0,
        title: "Sf. Iosif cel Nou - de la Cruce, la Înviere; cuvânt la slujba de priveghere",
        audioFile: "https://r2.predicileparintelui.ro/audio/Sf. Iosif cel Nou - de la Cruce, la Înviere; cuvânt la slujba de priveghere.mp3",
        duration: "29:00",
        fileSize: 29151816,
        recordingYear: null
      },
    ]
  },
  {
    id: "invatături-generale",
    title: "Învățături Generale",
    description: "Predici și învățături pe diverse teme duhovnicești",
    totalParts: 176,
    category: "Predici Tematice",
    parts: [
      {
        partNumber: 0,
        title: "Despre asceza iubirii în pilda bogatului nemilostiv și săracului Lazăr",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre asceza iubirii în pilda bogatului nemilostiv și săracului Lazăr.mp3",
        duration: "32:00",
        fileSize: 32076694,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre atenta și inspirata comunicare dintre noi",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre atenta și inspirata comunicare dintre noi.mp3",
        duration: "29:00",
        fileSize: 29438118,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre bucurie",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre bucurie.mp3",
        duration: "17:00",
        fileSize: 17049390,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre bătrânețe și senectute",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre bătrânețe și senectute.mp3",
        duration: "34:00",
        fileSize: 34002650,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre caracter",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre caracter.mp3",
        duration: "19:00",
        fileSize: 19022993,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre chemarea credinței",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre chemarea credinței.mp3",
        duration: "22:00",
        fileSize: 21947453,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre cugetul duhovnicesc",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre cugetul duhovnicesc.mp3",
        duration: "39:00",
        fileSize: 38924537,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre cunoasterea lui Dumnezeu precum este",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre cunoasterea lui Dumnezeu precum este.mp3",
        duration: "22:00",
        fileSize: 21535346,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre cunoașterea lui Dumnezeu precum este",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre cunoașterea lui Dumnezeu precum este.mp3",
        duration: "21:00",
        fileSize: 21376939,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre dialog",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre dialog.mp3",
        duration: "28:00",
        fileSize: 28105664,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre dorul după Dumnezeu",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre dorul după Dumnezeu.mp3",
        duration: "23:00",
        fileSize: 22637086,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre educația copiilor",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre educația copiilor.mp3",
        duration: "30:00",
        fileSize: 29865272,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre frica de a nu-L pierde pe Iisus (partea a II-a)",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre frica de a nu-L pierde pe Iisus (partea a II-a).mp3",
        duration: "30:00",
        fileSize: 30483434,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre frica de a nu-L pierde pe Iisus (partea I)",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre frica de a nu-L pierde pe Iisus (partea I).mp3",
        duration: "17:00",
        fileSize: 17405909,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre iertare - o privire sincera din interior",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre iertare - o privire sincera din interior.mp3",
        duration: "44:00",
        fileSize: 43751130,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre importanța nevoinței cotidiene",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre importanța nevoinței cotidiene.mp3",
        duration: "24:00",
        fileSize: 24277576,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre importanța studiului duhovnicesc în viața de zi cu zi",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre importanța studiului duhovnicesc în viața de zi cu zi.mp3",
        duration: "29:00",
        fileSize: 28842944,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre importanța studiului zilnic al Evangheliei",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre importanța studiului zilnic al Evangheliei.mp3",
        duration: "20:00",
        fileSize: 20235492,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre incercări și suferință în familie",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre incercări și suferință în familie.mp3",
        duration: "28:00",
        fileSize: 28129488,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre ipocrizie",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre ipocrizie.mp3",
        duration: "45:00",
        fileSize: 44897094,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre ispitire",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre ispitire.mp3",
        duration: "52:00",
        fileSize: 51882944,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre iubirea aproapelui - un cuvânt al lui Ava Isaia",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre iubirea aproapelui - un cuvânt al lui Ava Isaia.mp3",
        duration: "32:00",
        fileSize: 32243042,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre iubirea ce merge până la capăt",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre iubirea ce merge până la capăt.mp3",
        duration: "18:00",
        fileSize: 18143189,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre iubirea cea dintâi",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre iubirea cea dintâi.mp3",
        duration: "30:00",
        fileSize: 30126914,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre jertfă și jertfirea omului",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre jertfă și jertfirea omului.mp3",
        duration: "25:00",
        fileSize: 25205027,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre minciună",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre minciună.mp3",
        duration: "39:00",
        fileSize: 38876890,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre nebunia mândriei",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre nebunia mândriei.mp3",
        duration: "33:00",
        fileSize: 32979904,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre nevoia continuă de Hristos",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre nevoia continuă de Hristos.mp3",
        duration: "32:00",
        fileSize: 32100100,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre pericolul întemeierii vieții pe noi înșine",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre pericolul întemeierii vieții pe noi înșine.mp3",
        duration: "20:00",
        fileSize: 19569683,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre realitatea virtuală",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre realitatea virtuală.mp3",
        duration: "32:00",
        fileSize: 31862699,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre recunoștința față de Hristos prin iubirea aproapelui",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre recunoștința față de Hristos prin iubirea aproapelui.mp3",
        duration: "46:00",
        fileSize: 45581791,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre relația cu aproapele",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre relația cu aproapele.mp3",
        duration: "43:00",
        fileSize: 43013850,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre relațiile dintre noi",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre relațiile dintre noi.mp3",
        duration: "25:00",
        fileSize: 25323728,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre renunțarea la noi înșine",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre renunțarea la noi înșine.mp3",
        duration: "23:00",
        fileSize: 22803434,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre răstignirea sinelui",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre răstignirea sinelui.mp3",
        duration: "31:00",
        fileSize: 31267943,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre singurătate",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre singurătate.mp3",
        duration: "33:00",
        fileSize: 32837380,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre slujirea aproapelui",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre slujirea aproapelui.mp3",
        duration: "35:00",
        fileSize: 35048802,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre smerenie",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre smerenie.mp3",
        duration: "28:00",
        fileSize: 28486007,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Despre spiritualitatea uimirii",
        audioFile: "https://r2.predicileparintelui.ro/audio/Despre spiritualitatea uimirii.mp3",
        duration: "45:00",
        fileSize: 44725811,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "'Apostolii - din pescari, vănători!",
        audioFile: "https://r2.predicileparintelui.ro/audio/'Apostolii - din pescari, vănători!.mp3",
        duration: "21:00",
        fileSize: 20711130,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "A te încredința Lui - un antidot la fricile în care trăim",
        audioFile: "https://r2.predicileparintelui.ro/audio/A te încredința Lui - un antidot la fricile în care trăim.mp3",
        duration: "19:00",
        fileSize: 18903874,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Anul nou 2019. Tăierea împrejur a Domnului. Sf. Vasile cel Mare",
        audioFile: "https://r2.predicileparintelui.ro/audio/Anul nou 2019. Tăierea împrejur a Domnului. Sf. Vasile cel Mare.m4a",
        duration: "1:01:00",
        fileSize: 60938903,
        recordingYear: 2019
      },
      {
        partNumber: 0,
        title: "Apel pentru o înnoire totală a felului nostru de a fi",
        audioFile: "https://r2.predicileparintelui.ro/audio/Apel pentru o înnoire totală a felului nostru de a fi.mp3",
        duration: "23:00",
        fileSize: 22637922,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Asceza iubirii și câștigarea și păstrarea aproapelui",
        audioFile: "https://r2.predicileparintelui.ro/audio/Asceza iubirii și câștigarea și păstrarea aproapelui.mp3",
        duration: "26:00",
        fileSize: 26132897,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Atenție la 'călcâiul lui Ahile' care ne împiedică devenirea!",
        audioFile: "https://r2.predicileparintelui.ro/audio/Atenție la 'călcâiul lui Ahile' care ne împiedică devenirea!.mp3",
        duration: "20:00",
        fileSize: 19688384,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Bârfa, pricină a morții comuniunii",
        audioFile: "https://r2.predicileparintelui.ro/audio/Bârfa, pricină a morții comuniunii.mp3",
        duration: "27:00",
        fileSize: 26726817,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Chemarea de a fii mijlocitori între Dumnezeu și oameni",
        audioFile: "https://r2.predicileparintelui.ro/audio/Chemarea de a fii mijlocitori între Dumnezeu și oameni.mp3",
        duration: "18:00",
        fileSize: 18429073,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Cu familia din Nazareth în ceasul Nașterii sfinte",
        audioFile: "https://r2.predicileparintelui.ro/audio/Cu familia din Nazareth în ceasul Nașterii sfinte.mp3",
        duration: "21:00",
        fileSize: 20545200,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Curajul - virtutea de care avem atâta nevoie",
        audioFile: "https://r2.predicileparintelui.ro/audio/Curajul - virtutea de care avem atâta nevoie.mp3",
        duration: "17:00",
        fileSize: 17073213,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Cuvânt duhovnicesc la Prohodul Maicii Domnului - 2020",
        audioFile: "https://r2.predicileparintelui.ro/audio/Cuvânt duhovnicesc la Prohodul Maicii Domnului - 2020.mp3",
        duration: "18:00",
        fileSize: 17572257,
        recordingYear: 2020
      },
      {
        partNumber: 0,
        title: "Diavolul și comuniunea noastră cu aproapele; sensul unei confruntări",
        audioFile: "https://r2.predicileparintelui.ro/audio/Diavolul și comuniunea noastră cu aproapele; sensul unei confruntări.mp3",
        duration: "59:00",
        fileSize: 59159613,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Dreptate și iubire - gânduri la pomenirea proorocului 'de foc'",
        audioFile: "https://r2.predicileparintelui.ro/audio/Dreptate și iubire - gânduri la pomenirea proorocului 'de foc'.mp3",
        duration: "19:00",
        fileSize: 18975346,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Drumul credinței, o mișcare responsabilă și dinamică",
        audioFile: "https://r2.predicileparintelui.ro/audio/Drumul credinței, o mișcare responsabilă și dinamică.mp3",
        duration: "17:00",
        fileSize: 17288044,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Duminica a 32-a după Rusalii (Chemarea lui Zaheu)",
        audioFile: "https://r2.predicileparintelui.ro/audio/Duminica a 32-a după Rusalii (Chemarea lui Zaheu).mp3",
        duration: "23:00",
        fileSize: 23256083,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Duminica dinaintea Înălțării Sfintei Cruci - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Duminica dinaintea Înălțării Sfintei Cruci - 2016.mp3",
        duration: "17:00",
        fileSize: 17168090,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Duminica dinaintea Înălțării Sfintei Cruci - 2017",
        audioFile: "https://r2.predicileparintelui.ro/audio/Duminica dinaintea Înălțării Sfintei Cruci - 2017.mp3",
        duration: "18:00",
        fileSize: 18429073,
        recordingYear: 2017
      },
      {
        partNumber: 0,
        title: "Duminica după Botezul Domnului - 2017",
        audioFile: "https://r2.predicileparintelui.ro/audio/Duminica după Botezul Domnului - 2017.mp3",
        duration: "14:00",
        fileSize: 14482284,
        recordingYear: 2017
      },
      {
        partNumber: 0,
        title: "Duminica după Botezul Domnului - 2019",
        audioFile: "https://r2.predicileparintelui.ro/audio/Duminica după Botezul Domnului - 2019.m4a",
        duration: "42:00",
        fileSize: 42379218,
        recordingYear: 2019
      },
      {
        partNumber: 0,
        title: "Duminica lăsatului sec de brânză - 2018",
        audioFile: "https://r2.predicileparintelui.ro/audio/Duminica lăsatului sec de brânză - 2018.mp3",
        duration: "18:00",
        fileSize: 18428237,
        recordingYear: 2018
      },
      {
        partNumber: 0,
        title: "Duminica întâi din Post - 2017",
        audioFile: "https://r2.predicileparintelui.ro/audio/Duminica întâi din Post - 2017.mp3",
        duration: "14:00",
        fileSize: 13650128,
        recordingYear: 2017
      },
      {
        partNumber: 0,
        title: "Duminica întâi după Rusalii - 2017",
        audioFile: "https://r2.predicileparintelui.ro/audio/Duminica întâi după Rusalii - 2017.mp3",
        duration: "18:00",
        fileSize: 18024906,
        recordingYear: 2017
      },
      {
        partNumber: 0,
        title: "Eliberarea de sine și urmarea Domnului",
        audioFile: "https://r2.predicileparintelui.ro/audio/Eliberarea de sine și urmarea Domnului.mp3",
        duration: "27:00",
        fileSize: 26679169,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Felul nostru de a fi și compasiunea pentru ceilalți",
        audioFile: "https://r2.predicileparintelui.ro/audio/Felul nostru de a fi și compasiunea pentru ceilalți.mp3",
        duration: "20:00",
        fileSize: 20425664,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Fuga în Egipt și nesfârșitele dureri ale imigrației",
        audioFile: "https://r2.predicileparintelui.ro/audio/Fuga în Egipt și nesfârșitele dureri ale imigrației.mp3",
        duration: "30:00",
        fileSize: 29627453,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Germeni ai căderii, în noi",
        audioFile: "https://r2.predicileparintelui.ro/audio/Germeni ai căderii, în noi.mp3",
        duration: "19:00",
        fileSize: 18976181,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Iertarea - semn al unei iubiri autentice",
        audioFile: "https://r2.predicileparintelui.ro/audio/Iertarea - semn al unei iubiri autentice.mp3",
        duration: "24:00",
        fileSize: 24277576,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Iisus în rugăciune - fundamentul mijlocirii noastre",
        audioFile: "https://r2.predicileparintelui.ro/audio/Iisus în rugăciune - fundamentul mijlocirii noastre.mp3",
        duration: "19:00",
        fileSize: 19308041,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Inima bună va răspunde mereu chemării - ”Dați-le voi să mănânce!”",
        audioFile: "https://r2.predicileparintelui.ro/audio/Inima bună va răspunde mereu chemării - ”Dați-le voi să mănânce!”.mp3",
        duration: "16:00",
        fileSize: 15528436,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Ioan și 'pustia' - sau lecția sacrificiului de sine",
        audioFile: "https://r2.predicileparintelui.ro/audio/Ioan și 'pustia' - sau lecția sacrificiului de sine.mp3",
        duration: "15:00",
        fileSize: 14695443,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Ispitirile lui Iisus și ispitirile noastre",
        audioFile: "https://r2.predicileparintelui.ro/audio/Ispitirile lui Iisus și ispitirile noastre.mp3",
        duration: "24:00",
        fileSize: 24468583,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Izgonirea răului din noi ca început al viețuirii în Duh",
        audioFile: "https://r2.predicileparintelui.ro/audio/Izgonirea răului din noi ca început al viețuirii în Duh.mp3",
        duration: "20:00",
        fileSize: 20401840,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Lecția sutașului - pledoarie pentru slujirea semenului",
        audioFile: "https://r2.predicileparintelui.ro/audio/Lecția sutașului - pledoarie pentru slujirea semenului.mp3",
        duration: "18:00",
        fileSize: 17501203,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Martirajul Cuvântului - confruntarea cu sterilitatea noastră",
        audioFile: "https://r2.predicileparintelui.ro/audio/Martirajul Cuvântului - confruntarea cu sterilitatea noastră.mp3",
        duration: "13:00",
        fileSize: 12698017,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Mândria la rece! Între posesie și stringența eliberării",
        audioFile: "https://r2.predicileparintelui.ro/audio/Mândria la rece! Între posesie și stringența eliberării.mp3",
        duration: "28:00",
        fileSize: 28058852,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "O speranță în inima nopții grele - Iisus venind spre noi",
        audioFile: "https://r2.predicileparintelui.ro/audio/O speranță în inima nopții grele - Iisus venind spre noi.mp3",
        duration: "16:00",
        fileSize: 16004074,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Omilie la Vecernia Iertării - Postul Mare - șansa celei de a doua chemări",
        audioFile: "https://r2.predicileparintelui.ro/audio/Omilie la Vecernia Iertării - Postul Mare - șansa celei de a doua chemări.m4a",
        duration: "1:06:00",
        fileSize: 65694591,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Orice dar primit revendică dăruirea",
        audioFile: "https://r2.predicileparintelui.ro/audio/Orice dar primit revendică dăruirea.mp3",
        duration: "12:00",
        fileSize: 12127502,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Pentru o cultură a întâlnirii",
        audioFile: "https://r2.predicileparintelui.ro/audio/Pentru o cultură a întâlnirii.mp3",
        duration: "23:00",
        fileSize: 23373948,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Pentru o cât mai bună pregătire și trăire a Liturghiei",
        audioFile: "https://r2.predicileparintelui.ro/audio/Pentru o cât mai bună pregătire și trăire a Liturghiei.mp3",
        duration: "24:00",
        fileSize: 23968286,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Pentru o mai bună așezare a legăturilor dintre noi",
        audioFile: "https://r2.predicileparintelui.ro/audio/Pentru o mai bună așezare a legăturilor dintre noi.mp3",
        duration: "26:00",
        fileSize: 25561546,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Pentru o mai bună pregatire și trăire a Liturghiei",
        audioFile: "https://r2.predicileparintelui.ro/audio/Pentru o mai bună pregatire și trăire a Liturghiei.mp3",
        duration: "29:00",
        fileSize: 28605961,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Petru și Pavel, discipolii care au făcut din viața și lucrarea lor o măreață și neuitată Liturghie",
        audioFile: "https://r2.predicileparintelui.ro/audio/Petru și Pavel, discipolii care au făcut din viața și lucrarea lor o măreață și neuitată Liturghie.mp3",
        duration: "15:00",
        fileSize: 14576325,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Postul - timp al sfințirii și al dăruirii. Apel la o trăire autentică a acestuia.",
        audioFile: "https://r2.predicileparintelui.ro/audio/Postul - timp al sfințirii și al dăruirii. Apel la o trăire autentică a acestuia..mp3",
        duration: "33:00",
        fileSize: 32980740,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Postul Mare - stadion al luptelor duhovnicești. Cuvânt la început de post",
        audioFile: "https://r2.predicileparintelui.ro/audio/Postul Mare - stadion al luptelor duhovnicești. Cuvânt la început de post.mp3",
        duration: "27:00",
        fileSize: 27344978,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Postul, o călătorie prin deșert spre întâlnirea cu Viața",
        audioFile: "https://r2.predicileparintelui.ro/audio/Postul, o călătorie prin deșert spre întâlnirea cu Viața.mp3",
        duration: "27:00",
        fileSize: 26512821,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Predica - Din înstrăinare, acasă. Sfântul și Dreptul Iosif în viața lui Iisus",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predica - Din înstrăinare, acasă. Sfântul și Dreptul Iosif în viața lui Iisus.m4a",
        duration: "1:05:00",
        fileSize: 65267333,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Predica la Duminica a 18-a după Rusalii - 2015",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predica la Duminica a 18-a după Rusalii - 2015.mp3",
        duration: "26:00",
        fileSize: 26392449,
        recordingYear: 2015
      },
      {
        partNumber: 0,
        title: "Predica la Duminica a 19-a după Rusalii - 2015",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predica la Duminica a 19-a după Rusalii - 2015.mp3",
        duration: "34:00",
        fileSize: 34214973,
        recordingYear: 2015
      },
      {
        partNumber: 0,
        title: "Predică la 15 Sept. 2019 - Sfântul Iosif cel Nou de la Partoș",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la 15 Sept. 2019 - Sfântul Iosif cel Nou de la Partoș.mp3",
        duration: "24:00",
        fileSize: 24467747,
        recordingYear: 2019
      },
      {
        partNumber: 0,
        title: "Predică la Duminica 1 după Rusalii - 2015",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica 1 după Rusalii - 2015.mp3",
        duration: "25:00",
        fileSize: 25203355,
        recordingYear: 2015
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 17-a după Rusalii (a Cananeencei)- 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 17-a după Rusalii (a Cananeencei)- 2016.mp3",
        duration: "27:00",
        fileSize: 27487502,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 18-a după Rusalii - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 18-a după Rusalii - 2016.mp3",
        duration: "33:00",
        fileSize: 32885027,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 19-a după Rusalii - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 19-a după Rusalii - 2016.mp3",
        duration: "19:00",
        fileSize: 18595003,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 2-a din Post (a Sf. Ier. Grigorie Palama) - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 2-a din Post (a Sf. Ier. Grigorie Palama) - 2016.mp3",
        duration: "24:00",
        fileSize: 24206105,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 2-a dupa Paști (a Sf. Ap. Toma) - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 2-a dupa Paști (a Sf. Ap. Toma) - 2016.mp3",
        duration: "20:00",
        fileSize: 19664978,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 2-a după Paști",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 2-a după Paști.mp3",
        duration: "22:00",
        fileSize: 21638163,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 2-a după Rusalii - 2015",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 2-a după Rusalii - 2015.mp3",
        duration: "29:00",
        fileSize: 29197791,
        recordingYear: 2015
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 2-a după Rusalii - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 2-a după Rusalii - 2016.mp3",
        duration: "15:00",
        fileSize: 15479953,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 20-a după Rusalii - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 20-a după Rusalii - 2016.mp3",
        duration: "26:00",
        fileSize: 25585370,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 21-a după Rusalii - 2015",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 21-a după Rusalii - 2015.mp3",
        duration: "27:00",
        fileSize: 27129311,
        recordingYear: 2015
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 22-a după Rusalii - 2015",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 22-a după Rusalii - 2015.mp3",
        duration: "23:00",
        fileSize: 22635414,
        recordingYear: 2015
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 24-a după Rusalii (Sf. Arh. Mihail și Gavriil) - 2015",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 24-a după Rusalii (Sf. Arh. Mihail și Gavriil) - 2015.mp3",
        duration: "29:00",
        fileSize: 28817448,
        recordingYear: 2015
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 26-a după Rusalii - 2015",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 26-a după Rusalii - 2015.mp3",
        duration: "29:00",
        fileSize: 28676178,
        recordingYear: 2015
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 27-a după Rusalii (Sf. Nicolae) - 2015",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 27-a după Rusalii (Sf. Nicolae) - 2015.mp3",
        duration: "23:00",
        fileSize: 23326301,
        recordingYear: 2015
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 28-a după Rusalii - 2015",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 28-a după Rusalii - 2015.mp3",
        duration: "27:00",
        fileSize: 26560051,
        recordingYear: 2015
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 29-a după Rusalii - 2015",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 29-a după Rusalii - 2015.mp3",
        duration: "26:00",
        fileSize: 26132061,
        recordingYear: 2015
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 3-a din Post (a Sfintei Cruci) - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 3-a din Post (a Sfintei Cruci) - 2016.mp3",
        duration: "28:00",
        fileSize: 27701497,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 3-a după Paști (a Mironosițelor) - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 3-a după Paști (a Mironosițelor) - 2016.mp3",
        duration: "14:00",
        fileSize: 14101106,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 3-a după Rusalii - 2015",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 3-a după Rusalii - 2015.mp3",
        duration: "20:00",
        fileSize: 20400586,
        recordingYear: 2015
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 3-a după Rusalii - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 3-a după Rusalii - 2016.mp3",
        duration: "18:00",
        fileSize: 17715199,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 31-a după Rusalii - 2015",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 31-a după Rusalii - 2015.mp3",
        duration: "26:00",
        fileSize: 25609194,
        recordingYear: 2015
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 31-a după Rusalii - 2017",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 31-a după Rusalii - 2017.mp3",
        duration: "18:00",
        fileSize: 18144025,
        recordingYear: 2017
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 31-a după Rusalii - 2019",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 31-a după Rusalii - 2019.m4a",
        duration: "31:00",
        fileSize: 31217165,
        recordingYear: 2019
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 32-a după Rusalii - 2018",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 32-a după Rusalii - 2018.mp3",
        duration: "18:00",
        fileSize: 17596080,
        recordingYear: 2018
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 32-a după Rusalii - 2020",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 32-a după Rusalii - 2020.mp3",
        duration: "22:00",
        fileSize: 21852159,
        recordingYear: 2020
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 33-a după Rusalii (a Vameșului și a Fariseului) - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 33-a după Rusalii (a Vameșului și a Fariseului) - 2016.mp3",
        duration: "27:00",
        fileSize: 26940812,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 34-a după Rusalii (a Întoarcerii Fiului risipitor) - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 34-a după Rusalii (a Întoarcerii Fiului risipitor) - 2016.mp3",
        duration: "26:00",
        fileSize: 25775541,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 35-a după Rusalii - 2018",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 35-a după Rusalii - 2018.mp3",
        duration: "23:00",
        fileSize: 22827257,
        recordingYear: 2018
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 35-a după Rusalii - 2019",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 35-a după Rusalii - 2019.m4a",
        duration: "46:00",
        fileSize: 46182011,
        recordingYear: 2019
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 4-a din Post (a Sf. Cuv. Ioan Scărarul) - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 4-a din Post (a Sf. Cuv. Ioan Scărarul) - 2016.mp3",
        duration: "30:00",
        fileSize: 30388139,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 4-a după Rusalii - 2015",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 4-a după Rusalii - 2015.mp3",
        duration: "20:00",
        fileSize: 20019826,
        recordingYear: 2015
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 4-a după Rusalii - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 4-a după Rusalii - 2016.mp3",
        duration: "12:00",
        fileSize: 11556570,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 5-a din Post (a Sf. Cuv. Maria Egipteanca) - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 5-a din Post (a Sf. Cuv. Maria Egipteanca) - 2016.mp3",
        duration: "25:00",
        fileSize: 25062085,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 5-a din Postul Mare",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 5-a din Postul Mare.mp3",
        duration: "22:00",
        fileSize: 22470320,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 5-a după Paști (a Samarinencei) - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 5-a după Paști (a Samarinencei) - 2016.mp3",
        duration: "21:00",
        fileSize: 21139120,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 5-a după Rusalii - 2015",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 5-a după Rusalii - 2015.mp3",
        duration: "27:00",
        fileSize: 26511150,
        recordingYear: 2015
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 5-a după Rusalii - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 5-a după Rusalii - 2016.mp3",
        duration: "23:00",
        fileSize: 23065076,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 6-a după Paști (Vindecarea orbului din naștere)",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 6-a după Paști (Vindecarea orbului din naștere).mp3",
        duration: "17:00",
        fileSize: 17001742,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Predică la Duminica a 6-a după Rusalii - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica a 6-a după Rusalii - 2016.mp3",
        duration: "26:00",
        fileSize: 25727894,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Duminica Bobotezei - 2018",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica Bobotezei - 2018.mp3",
        duration: "13:00",
        fileSize: 13459120,
        recordingYear: 2018
      },
      {
        partNumber: 0,
        title: "Predică la Duminica Botezului Domnului - 2019",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica Botezului Domnului - 2019.m4a",
        duration: "43:00",
        fileSize: 43465200,
        recordingYear: 2019
      },
      {
        partNumber: 0,
        title: "Predică la Duminica dinaintea Nașterii Domnului - 2017",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica dinaintea Nașterii Domnului - 2017.mp3",
        duration: "16:00",
        fileSize: 15907943,
        recordingYear: 2017
      },
      {
        partNumber: 0,
        title: "Predică la Duminica după Botezul Domnului - 2018",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica după Botezul Domnului - 2018.mp3",
        duration: "20:00",
        fileSize: 20425664,
        recordingYear: 2018
      },
      {
        partNumber: 0,
        title: "Predică la Duminica după Botezul Domnului - 2020",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica după Botezul Domnului - 2020.mp3",
        duration: "21:00",
        fileSize: 21305468,
        recordingYear: 2020
      },
      {
        partNumber: 0,
        title: "Predică la Duminica Floriilor - 2015",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica Floriilor - 2015.mp3",
        duration: "26:00",
        fileSize: 25751718,
        recordingYear: 2015
      },
      {
        partNumber: 0,
        title: "Predică la Duminica Izgonirii lui Adam din Rai - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica Izgonirii lui Adam din Rai - 2016.mp3",
        duration: "24:00",
        fileSize: 23968286,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Duminica Izgonirii lui Adam din Rai",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica Izgonirii lui Adam din Rai.mp3",
        duration: "20:00",
        fileSize: 19522036,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Predică la Duminica Rusaliilor - 2015",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica Rusaliilor - 2015.mp3",
        duration: "18:00",
        fileSize: 18261889,
        recordingYear: 2015
      },
      {
        partNumber: 0,
        title: "Predică la Duminica Rusaliilor - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica Rusaliilor - 2016.mp3",
        duration: "8:00",
        fileSize: 8061595,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Duminica Rusaliilor - 2020",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica Rusaliilor - 2020.mp3",
        duration: "15:00",
        fileSize: 15147257,
        recordingYear: 2020
      },
      {
        partNumber: 0,
        title: "Predică la Duminica Înfricoșătoarei Judecăți - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica Înfricoșătoarei Judecăți - 2016.mp3",
        duration: "24:00",
        fileSize: 23944880,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Duminica întâi din Post (a Ortodoxiei) - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica întâi din Post (a Ortodoxiei) - 2016.mp3",
        duration: "35:00",
        fileSize: 34691865,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Duminica întâi după Rusalii (a Tuturor Sfinților)",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica întâi după Rusalii (a Tuturor Sfinților).mp3",
        duration: "26:00",
        fileSize: 26227355,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Predică la Duminica întâi după Rusalii - 2019",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Duminica întâi după Rusalii - 2019.m4a",
        duration: "34:00",
        fileSize: 34136765,
        recordingYear: 2019
      },
      {
        partNumber: 0,
        title: "Predică la praznicul Adormirii Maicii Domnului - 2020",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la praznicul Adormirii Maicii Domnului - 2020.mp3",
        duration: "15:00",
        fileSize: 14957086,
        recordingYear: 2020
      },
      {
        partNumber: 0,
        title: "Predică la praznicul Întâmpinării Domnului - 2020",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la praznicul Întâmpinării Domnului - 2020.mp3",
        duration: "22:00",
        fileSize: 22494144,
        recordingYear: 2020
      },
      {
        partNumber: 0,
        title: "Predică la sărbătoarea Sf. Ioan Botezătorul - 2020",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la sărbătoarea Sf. Ioan Botezătorul - 2020.mp3",
        duration: "16:00",
        fileSize: 15884119,
        recordingYear: 2020
      },
      {
        partNumber: 0,
        title: "Predică la sărbătoarea Sfinților Mari Împărați Constantin și Elena",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la sărbătoarea Sfinților Mari Împărați Constantin și Elena.mp3",
        duration: "12:00",
        fileSize: 12127502,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Predică la Înălțarea Domnului - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Înălțarea Domnului - 2016.mp3",
        duration: "14:00",
        fileSize: 13767992,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Predică la Înălțarea Domnului 2015",
        audioFile: "https://r2.predicileparintelui.ro/audio/Predică la Înălțarea Domnului 2015.mp3",
        duration: "21:00",
        fileSize: 20639659,
        recordingYear: 2015
      },
      {
        partNumber: 0,
        title: "Rostul cuvintelor noastre în 'asceza iubirii' aproapelui",
        audioFile: "https://r2.predicileparintelui.ro/audio/Rostul cuvintelor noastre în 'asceza iubirii' aproapelui.mp3",
        duration: "32:00",
        fileSize: 31934588,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Rămânerea lui Iisus cu noi; sensurile unei prezențe",
        audioFile: "https://r2.predicileparintelui.ro/audio/Rămânerea lui Iisus cu noi; sensurile unei prezențe.mp3",
        duration: "25:00",
        fileSize: 25299904,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Răul din viața noastră se alungă doar cu binele",
        audioFile: "https://r2.predicileparintelui.ro/audio/Răul din viața noastră se alungă doar cu binele.mp3",
        duration: "20:00",
        fileSize: 19759855,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Sf Ioan Botezătorul - încheierea unei slujiri ce devine un nou început",
        audioFile: "https://r2.predicileparintelui.ro/audio/Sf Ioan Botezătorul - încheierea unei slujiri ce devine un nou început.mp3",
        duration: "13:00",
        fileSize: 13292354,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Sf. Arhid. Ștefan - 2016",
        audioFile: "https://r2.predicileparintelui.ro/audio/Sf. Arhid. Ștefan - 2016.mp3",
        duration: "16:00",
        fileSize: 16241474,
        recordingYear: 2016
      },
      {
        partNumber: 0,
        title: "Sf. Ioan Botezătorul, 7 ian. 2019",
        audioFile: "https://r2.predicileparintelui.ro/audio/Sf. Ioan Botezătorul, 7 ian. 2019.m4a",
        duration: "24:00",
        fileSize: 23895035,
        recordingYear: 2019
      },
      {
        partNumber: 0,
        title: "Sf. M. Mc. Gheorghe și asumarea jertfei în viața noastră",
        audioFile: "https://r2.predicileparintelui.ro/audio/Sf. M. Mc. Gheorghe și asumarea jertfei în viața noastră.mp3",
        duration: "20:00",
        fileSize: 19546696,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Sf. Prooroc Ioan Botezătorul",
        audioFile: "https://r2.predicileparintelui.ro/audio/Sf. Prooroc Ioan Botezătorul.mp3",
        duration: "16:00",
        fileSize: 15576083,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Sfințenia vs. indiferență și ipocrizie",
        audioFile: "https://r2.predicileparintelui.ro/audio/Sfințenia vs. indiferență și ipocrizie.mp3",
        duration: "20:00",
        fileSize: 20187845,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Stăruința sau perseverența - calea către statornicirea binelui în noi (Duminica a 17-a după Rusalii)",
        audioFile: "https://r2.predicileparintelui.ro/audio/Stăruința sau perseverența - calea către statornicirea binelui în noi (Duminica a 17-a după Rusalii).mp3",
        duration: "19:00",
        fileSize: 18927698,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Să ținem vie speranța",
        audioFile: "https://r2.predicileparintelui.ro/audio/Să ținem vie speranța.mp3",
        duration: "20:00",
        fileSize: 20260152,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Să-ți știi locul; să-ți cunoști măsura",
        audioFile: "https://r2.predicileparintelui.ro/audio/Să-ți știi locul; să-ți cunoști măsura.mp3",
        duration: "21:00",
        fileSize: 20640495,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Tentația și riscurile apropierii de cel viclean",
        audioFile: "https://r2.predicileparintelui.ro/audio/Tentația și riscurile apropierii de cel viclean.mp3",
        duration: "18:00",
        fileSize: 17810075,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Troparul Sfantului Ierarh Iosif cel Nou de la Partos",
        audioFile: "https://r2.predicileparintelui.ro/audio/Troparul Sfantului Ierarh Iosif cel Nou de la Partos.mp3",
        duration: "1:00",
        fileSize: 1045732,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Tăierea împrejur a Domnului. Sf. Vasile cel Mare. Anul nou, 2020",
        audioFile: "https://r2.predicileparintelui.ro/audio/Tăierea împrejur a Domnului. Sf. Vasile cel Mare. Anul nou, 2020.mp3",
        duration: "21:00",
        fileSize: 20925125,
        recordingYear: 2020
      },
      {
        partNumber: 0,
        title: "Tăierea împrejur; Sf. Ier. Vasile cel Mare; Anul Nou 2017",
        audioFile: "https://r2.predicileparintelui.ro/audio/Tăierea împrejur; Sf. Ier. Vasile cel Mare; Anul Nou 2017.mp3",
        duration: "21:00",
        fileSize: 20640495,
        recordingYear: 2017
      },
      {
        partNumber: 0,
        title: "Ucenicii - 'sare și lumină' în această lume",
        audioFile: "https://r2.predicileparintelui.ro/audio/Ucenicii - 'sare și lumină' în această lume.mp3",
        duration: "20:00",
        fileSize: 20449488,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Vecernia iertării - 2017",
        audioFile: "https://r2.predicileparintelui.ro/audio/Vecernia iertării - 2017.mp3",
        duration: "23:00",
        fileSize: 22970617,
        recordingYear: 2017
      },
      {
        partNumber: 0,
        title: "Viața interioară între căutarea, găsirea și încredințarea deplină față de Hristos",
        audioFile: "https://r2.predicileparintelui.ro/audio/Viața interioară între căutarea, găsirea și încredințarea deplină față de Hristos.mp3",
        duration: "18:00",
        fileSize: 17977259,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Viața noastră și gândul lui Dumnezeu",
        audioFile: "https://r2.predicileparintelui.ro/audio/Viața noastră și gândul lui Dumnezeu.mp3",
        duration: "21:00",
        fileSize: 21401181,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Viața spirituală între algoritmizare, rațiune și lucrarea suprafirească a harului",
        audioFile: "https://r2.predicileparintelui.ro/audio/Viața spirituală între algoritmizare, rațiune și lucrarea suprafirească a harului.mp3",
        duration: "18:00",
        fileSize: 17525445,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "În duhul noului Legământ- statornici în iubire, neclintiți în fidelitate",
        audioFile: "https://r2.predicileparintelui.ro/audio/În duhul noului Legământ- statornici în iubire, neclintiți în fidelitate.mp3",
        duration: "15:00",
        fileSize: 15456129,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Între dezolare și curajul încredințării",
        audioFile: "https://r2.predicileparintelui.ro/audio/Între dezolare și curajul încredințării.mp3",
        duration: "25:00",
        fileSize: 25419022,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Întânlirea cu Hristos și provocarea bucuriei",
        audioFile: "https://r2.predicileparintelui.ro/audio/Întânlirea cu Hristos și provocarea bucuriei.mp3",
        duration: "20:00",
        fileSize: 19903215,
        recordingYear: null
      },
      {
        partNumber: 0,
        title: "Înălțarea Domnului - 2020",
        audioFile: "https://r2.predicileparintelui.ro/audio/Înălțarea Domnului - 2020.mp3",
        duration: "20:00",
        fileSize: 20449488,
        recordingYear: 2020
      },
      {
        partNumber: 0,
        title: "Șansa celei de a doua chemări",
        audioFile: "https://r2.predicileparintelui.ro/audio/Șansa celei de a doua chemări.mp3",
        duration: "20:00",
        fileSize: 20236328,
        recordingYear: null
      },
    ]
  },
];

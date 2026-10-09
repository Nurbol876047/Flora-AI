"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const dictionaries = {
  ru: {
    appName: "FLORA AI",
    appSubtitle: "Полевой определитель растений родного края",
    nav: {
      identify: "Определение",
      wizard: "Определитель по признакам",
      map: "Карта",
      journal: "Журнал наблюдений",
      flora: "Флора края",
      redbook: "Красная книга",
      about: "О проекте",
    },
    identify: {
      sampleNumber: "№ образца",
      date: "Дата",
      place: "Место",
      placePlaceholder: "Введите место или определите автоматически",
      geolocate: "Геолокация",
      geolocating: "Определение координат…",
      uploadPhoto: "Загрузить фото",
      takePhoto: "Камера",
      organLabel: "Фотографируемый орган",
      organs: {
        leaf: "лист",
        flower: "цветок",
        fruit: "плод",
        bark: "кора/стебель",
        habit: "растение целиком",
      },
      submit: "Определить",
      submitting: "Определяется…",
      noPhoto: "Фотография не выбрана",
      changePhoto: "Заменить фото",
      resultTitle: "Карточка гербария",
      confidenceLabel: "Уверенность определения",
      lowConfidence:
        "Определение неточное. Рекомендуется повторная съёмка (лист, цветок, стебель крупным планом).",
      preliminary:
        "Предварительно: Pl@ntNet недоступен, определение выполнено только языковой моделью.",
      redBookWarning: "Охраняемый вид — Красная книга РК. Сбор и повреждение запрещены.",
      coordsFromExif: "Координаты получены из EXIF-данных фото",
      coordsFromGeo: "Координаты получены по геолокации устройства",
      fields: {
        name_ru: "Русское название",
        name_kk: "Қазақша атауы",
        name_latin: "Латинское название",
        family: "Семейство",
        description: "Описание",
        habitat: "Где растёт",
        grows_in_region: "Встречается в Северо-Казахстанской области",
        toxicity: "Ядовитость",
        protected_status: "Охранный статус",
        similar: "Похожие виды",
      },
      alternatives: "Другие вероятные виды (Pl@ntNet)",
      saveToJournal: "Сохранить в журнал",
      savedToJournal: "Сохранено в журнал",
      errorTitle: "Ошибка определения",
      retry: "Попробовать снова",
    },
    journal: {
      title: "Журнал наблюдений",
      empty: "Записей пока нет. Определите растение на вкладке «Определение».",
      columns: {
        number: "№",
        date: "Дата",
        place: "Место",
        species: "Вид",
        confidence: "Уверенность",
        photo: "Фото",
      },
      filterPlaceholder: "Фильтр по виду или месту…",
      exportCsv: "Экспорт в CSV",
      deleteEntry: "Удалить",
      confirmDelete: "Удалить запись из журнала?",
    },
    flora: {
      title: "Флора края",
      intro:
        "Характерные виды растений Северо-Казахстанской области: степные, лесостепные и прибрежные сообщества региона.",
      searchPlaceholder: "Поиск по названию (рус., қаз., латынь)…",
      familyAll: "Все семейства",
      habitatAll: "Все местообитания",
      noResults: "Ничего не найдено. Измените поиск или фильтры.",
      close: "Закрыть",
      fields: {
        nameRu: "Русское название",
        nameKz: "Қазақша атауы",
        latin: "Латинское название",
        family: "Семейство",
        description: "Описание",
        habitat: "Местообитание",
        lifeForm: "Жизненная форма",
        flowerColor: "Окраска цветка",
        leafType: "Тип листа",
        folkUse: "Народное использование",
        toxic: "Ядовитость",
        redBook: "Охранный статус",
      },
      toxicYes: "ядовито",
      toxicNo: "неядовито",
      redBookYes: "Красная книга РК — охраняется",
      redBookNo: "не охраняется",
      imageNoteLabel: "Примечание к фото",
    },
    map: {
      title: "Карта",
      intro:
        "Точки журнала наблюдений с известными координатами (из EXIF-данных фото, геолокации устройства или введённые вручную в формате «широта, долгота»).",
      empty: "В журнале пока нет записей с координатами.",
      popupSpecies: "Вид",
      popupDate: "Дата",
      popupPlace: "Место",
    },
    wizard: {
      title: "Определитель по признакам",
      intro:
        "Пошаговое определение без фотографии и без интернета: отвечайте на вопросы о внешнем виде растения, список видов будет сужаться.",
      stepLifeForm: "Жизненная форма",
      stepHabitat: "Местообитание",
      stepFlowerColor: "Окраска цветка",
      stepLeafType: "Тип листа",
      remaining: "Осталось видов",
      back: "Назад",
      restart: "Начать сначала",
      resultsTitle: "Результат",
      noMatches: "По заданным признакам видов не найдено. Начните сначала.",
      showAnyway: "Показать варианты, не отвечая на оставшиеся вопросы",
    },
    redbook: {
      title: "Красная книга",
      intro:
        "Охраняемые виды растений. Сбор, выкапывание и повреждение видов из Красной книги Республики Казахстан запрещены законом.",
      catalogTitle: "Охраняемые виды из «Флоры края»",
      catalogEmpty: "В каталоге «Флора края» видов с охранным статусом не отмечено.",
      referenceTitle: "Справочный список видов Красной книги РК",
      referenceNote:
        "Список носит справочный характер и может быть неполным. Используйте его как ориентир, а не как официальный источник.",
    },
    about: {
      title: "О проекте",
      goalTitle: "Цель",
      goal:
        "Flora AI — учебный исследовательский инструмент для полевого определения растений Северо-Казахстанской области силами школьников и краеведов. Проект создан как вспомогательное средство фиксации наблюдений, а не как замена ботанической экспертизы.",
      methodTitle: "Методика",
      method:
        "Определение выполняется в два этапа. Сначала фотография передаётся в открытую ботаническую базу Pl@ntNet, которая по визуальным признакам предлагает до трёх вероятных видов с оценкой уверенности. Затем фотография и результаты Pl@ntNet передаются языковой модели, которая формирует итоговое описание: названия на русском и казахском языках, семейство, внешние признаки, место обитания, сведения о встречаемости в регионе, ядовитости и охранном статусе, а также отличия от похожих видов.",
      limitsTitle: "Ограничения метода",
      limits:
        "Автоматическое определение по фотографии не заменяет гербарную и молекулярную экспертизу. Точность снижается при плохом освещении, отсутствии цветка или плода в кадре, схожести видов внутри одного рода и при фотографировании частей растения, недостаточных для диагностики. Если оценка уверенности ниже 50%, результат помечается как неточный.",
      disclaimerTitle: "Важная оговорка",
      disclaimer:
        "Языковая модель может ошибаться, в том числе уверенно называть неверный вид, неверно оценивать ядовитость или охранный статус. Все данные о ядовитых и охраняемых видах необходимо проверять по официальным источникам (Красная книга Республики Казахстан, определители профессиональных ботаников) до принятия решений в полевых условиях.",
      dataNoteTitle: "О справочных данных",
      dataNote:
        "Каталог «Флора края», определитель по признакам и справочник Красной книги (файлы data/plants.json и data/redbook.json) составлены по открытым источникам силами авторов проекта. Латинские названия, статус Красной книги и фотографии видов перед публичным использованием нужно сверить вручную с актуальными ботаническими определителями и официальным изданием Красной книги Республики Казахстан.",
    },
    footer: {
      about: "Школьный исследовательский инструмент для полевого определения растений родного края.",
      sourcesLabel: "Источники данных",
      sources: ["Pl@ntNet", "Wikimedia Commons", "Красная книга Республики Казахстан"],
      version: "версия",
    },
    common: {
      yes: "да",
      no: "нет",
      maybe: "возможно",
      unknown: "нет данных",
    },
  },
  kk: {
    appName: "FLORA AI",
    appSubtitle: "Туған өлкенің өсімдіктерін далалық анықтағышы",
    nav: {
      identify: "Анықтау",
      wizard: "Белгілері бойынша анықтауыш",
      map: "Карта",
      journal: "Бақылау журналы",
      flora: "Өңір флорасы",
      redbook: "Қызыл кітап",
      about: "Жоба туралы",
    },
    identify: {
      sampleNumber: "Үлгі №",
      date: "Күні",
      place: "Орны",
      placePlaceholder: "Орынды енгізіңіз немесе автоматты анықтаңыз",
      geolocate: "Геолокация",
      geolocating: "Координаттар анықталып жатыр…",
      uploadPhoto: "Фото жүктеу",
      takePhoto: "Камера",
      organLabel: "Түсірілген бөлігі",
      organs: {
        leaf: "жапырақ",
        flower: "гүл",
        fruit: "жеміс",
        bark: "қабық/сабақ",
        habit: "өсімдік тұтас",
      },
      submit: "Анықтау",
      submitting: "Анықталып жатыр…",
      noPhoto: "Фото таңдалмаған",
      changePhoto: "Фотоны ауыстыру",
      resultTitle: "Гербарий карточкасы",
      confidenceLabel: "Анықтау дәлдігі",
      lowConfidence:
        "Анықтау дәл емес. Қайта түсіру ұсынылады (жапырақ, гүл, сабақ жақыннан).",
      preliminary:
        "Алдын ала: Pl@ntNet қолжетімсіз, анықтау тек тілдік модель арқылы жасалды.",
      redBookWarning: "Қорғалатын түр — Қазақстан Республикасының Қызыл кітабы. Жинауға және зақымдауға тыйым салынады.",
      coordsFromExif: "Координаттар фотоның EXIF деректерінен алынды",
      coordsFromGeo: "Координаттар құрылғы геолокациясы арқылы алынды",
      fields: {
        name_ru: "Орысша атауы",
        name_kk: "Қазақша атауы",
        name_latin: "Латынша атауы",
        family: "Тұқымдасы",
        description: "Сипаттамасы",
        habitat: "Өсетін жері",
        grows_in_region: "Солтүстік Қазақстан облысында кездеседі",
        toxicity: "Улылығы",
        protected_status: "Қорғау мәртебесі",
        similar: "Ұқсас түрлер",
      },
      alternatives: "Басқа ықтимал түрлер (Pl@ntNet)",
      saveToJournal: "Журналға сақтау",
      savedToJournal: "Журналға сақталды",
      errorTitle: "Анықтау қатесі",
      retry: "Қайта көру",
    },
    journal: {
      title: "Бақылау журналы",
      empty: "Жазбалар жоқ. «Анықтау» бетінде өсімдікті анықтаңыз.",
      columns: {
        number: "№",
        date: "Күні",
        place: "Орны",
        species: "Түрі",
        confidence: "Дәлдік",
        photo: "Фото",
      },
      filterPlaceholder: "Түрі немесе орны бойынша сүзгі…",
      exportCsv: "CSV-ге экспорт",
      deleteEntry: "Жою",
      confirmDelete: "Жазбаны журналдан жою керек пе?",
    },
    flora: {
      title: "Өңір флорасы",
      intro:
        "Солтүстік Қазақстан облысына тән өсімдік түрлері: дала, орманды дала және өңірдің жағалау қауымдастықтары.",
      searchPlaceholder: "Атауы бойынша іздеу (орыс., қаз., латын)…",
      familyAll: "Барлық тұқымдастар",
      habitatAll: "Барлық өсу орындары",
      noResults: "Ештеңе табылмады. Іздеуді немесе сүзгілерді өзгертіңіз.",
      close: "Жабу",
      fields: {
        nameRu: "Орысша атауы",
        nameKz: "Қазақша атауы",
        latin: "Латынша атауы",
        family: "Тұқымдасы",
        description: "Сипаттамасы",
        habitat: "Өсу ортасы",
        lifeForm: "Өмірлік формасы",
        flowerColor: "Гүл түсі",
        leafType: "Жапырақ түрі",
        folkUse: "Халықтық қолданысы",
        toxic: "Улылығы",
        redBook: "Қорғау мәртебесі",
      },
      toxicYes: "улы",
      toxicNo: "улы емес",
      redBookYes: "ҚР Қызыл кітабы — қорғалады",
      redBookNo: "қорғалмайды",
      imageNoteLabel: "Фотоға ескертпе",
    },
    map: {
      title: "Карта",
      intro:
        "Координаттары белгілі бақылау журналы нүктелері (фото EXIF деректерінен, құрылғы геолокациясынан немесе «ендік, бойлық» форматында қолмен енгізілген).",
      empty: "Журналда координаттары бар жазбалар әлі жоқ.",
      popupSpecies: "Түрі",
      popupDate: "Күні",
      popupPlace: "Орны",
    },
    wizard: {
      title: "Белгілері бойынша анықтауыш",
      intro:
        "Фотосуретсіз және интернетсіз кезең-кезеңмен анықтау: өсімдіктің сыртқы белгілері туралы сұрақтарға жауап беріңіз, түрлер тізімі тарылады.",
      stepLifeForm: "Өмірлік формасы",
      stepHabitat: "Өсу ортасы",
      stepFlowerColor: "Гүл түсі",
      stepLeafType: "Жапырақ түрі",
      remaining: "Қалған түрлер саны",
      back: "Артқа",
      restart: "Қайта бастау",
      resultsTitle: "Нәтиже",
      noMatches: "Берілген белгілер бойынша түр табылмады. Қайта бастаңыз.",
      showAnyway: "Қалған сұрақтарға жауап бермей нұсқаларды көрсету",
    },
    redbook: {
      title: "Қызыл кітап",
      intro:
        "Қорғалатын өсімдік түрлері. Қазақстан Республикасының Қызыл кітабындағы түрлерді жинауға, қазып алуға және зақымдауға заң бойынша тыйым салынады.",
      catalogTitle: "«Өңір флорасы» ішіндегі қорғалатын түрлер",
      catalogEmpty: "«Өңір флорасы» каталогында қорғау мәртебесі белгіленген түр жоқ.",
      referenceTitle: "ҚР Қызыл кітабы түрлерінің анықтамалық тізімі",
      referenceNote:
        "Тізім анықтамалық сипатта және толық болмауы мүмкін. Оны ресми дереккөз ретінде емес, бағдар ретінде пайдаланыңыз.",
    },
    about: {
      title: "Жоба туралы",
      goalTitle: "Мақсаты",
      goal:
        "Flora AI — Солтүстік Қазақстан облысының өсімдіктерін далалық анықтауға арналған оқу-зерттеу құралы. Жоба бақылауларды тіркеуге көмекші құрал ретінде жасалған, ботаникалық сараптаманы алмастырмайды.",
      methodTitle: "Әдістеме",
      method:
        "Анықтау екі кезеңде жүреді. Алдымен фотосурет Pl@ntNet ашық ботаникалық дерекқорына жіберіледі, ол визуалды белгілер бойынша дәлдігі көрсетілген үш түрге дейін ұсынады. Содан кейін фотосурет пен Pl@ntNet нәтижелері тілдік модельге беріледі, ол орысша және қазақша атауларды, тұқымдасын, сырт белгілерін, өсу ортасын, өңірде кездесуін, улылығын, қорғау мәртебесін және ұқсас түрлерден айырмашылығын қалыптастырады.",
      limitsTitle: "Әдіс шектеулері",
      limits:
        "Фотосурет бойынша автоматты анықтау гербарий және молекулалық сараптаманы алмастырмайды. Жарық нашар болғанда, кадрда гүл немесе жеміс болмағанда, бір туыстағы түрлер ұқсас болғанда дәлдік төмендейді. Дәлдік 50%-тен төмен болса, нәтиже дәл емес деп белгіленеді.",
      disclaimerTitle: "Маңызды ескерту",
      disclaimer:
        "Тілдік модель қате жіберуі мүмкін, соның ішінде түрді сенімді түрде қате атауы, улылығын немесе қорғау мәртебесін қате бағалауы мүмкін. Улы және қорғалатын түрлер туралы барлық деректерді далалық жағдайда шешім қабылдамас бұрын ресми дереккөздер бойынша тексеру қажет (Қазақстан Республикасының Қызыл кітабы, мамандардың анықтағыштары).",
      dataNoteTitle: "Анықтамалық деректер туралы",
      dataNote:
        "«Өңір флорасы» каталогы, белгілері бойынша анықтауыш және Қызыл кітап анықтамасы (data/plants.json және data/redbook.json файлдары) ашық дереккөздер негізінде жоба авторларымен құрастырылды. Латынша атауларды, Қызыл кітап мәртебесін және түрлердің фотосуреттерін көпшілік алдында пайдаланар алдында қолданыстағы ботаникалық анықтағыштармен және Қазақстан Республикасының Қызыл кітабының ресми басылымымен қолмен тексеру қажет.",
    },
    footer: {
      about: "Туған өлкенің өсімдіктерін далалық анықтауға арналған оқу-зерттеу құралы.",
      sourcesLabel: "Деректер көздері",
      sources: ["Pl@ntNet", "Wikimedia Commons", "Қазақстан Республикасының Қызыл кітабы"],
      version: "нұсқа",
    },
    common: {
      yes: "иә",
      no: "жоқ",
      maybe: "мүмкін",
      unknown: "деректер жоқ",
    },
  },
  en: {
    appName: "FLORA AI",
    appSubtitle: "Field identifier of native plants",
    nav: {
      identify: "Identify",
      wizard: "Feature-based key",
      map: "Map",
      journal: "Observation log",
      flora: "Regional flora",
      redbook: "Red Book",
      about: "About",
    },
    identify: {
      sampleNumber: "Sample No.",
      date: "Date",
      place: "Location",
      placePlaceholder: "Enter a location or detect it automatically",
      geolocate: "Geolocation",
      geolocating: "Detecting coordinates…",
      uploadPhoto: "Upload photo",
      takePhoto: "Camera",
      organLabel: "Photographed organ",
      organs: {
        leaf: "leaf",
        flower: "flower",
        fruit: "fruit",
        bark: "bark/stem",
        habit: "whole plant",
      },
      submit: "Identify",
      submitting: "Identifying…",
      noPhoto: "No photo selected",
      changePhoto: "Change photo",
      resultTitle: "Herbarium record",
      confidenceLabel: "Identification confidence",
      lowConfidence:
        "Identification is unreliable. Retaking a close-up photo (leaf, flower, stem) is recommended.",
      preliminary:
        "Preliminary: Pl@ntNet is unavailable, identification was done by the language model only.",
      redBookWarning: "Protected species — Red Book of the Republic of Kazakhstan. Collecting or damaging it is prohibited.",
      coordsFromExif: "Coordinates obtained from the photo's EXIF data",
      coordsFromGeo: "Coordinates obtained from device geolocation",
      fields: {
        name_ru: "Russian name",
        name_kk: "Kazakh name",
        name_latin: "Latin name",
        family: "Family",
        description: "Description",
        habitat: "Habitat",
        grows_in_region: "Found in North Kazakhstan Region",
        toxicity: "Toxicity",
        protected_status: "Protection status",
        similar: "Similar species",
      },
      alternatives: "Other likely species (Pl@ntNet)",
      saveToJournal: "Save to log",
      savedToJournal: "Saved to log",
      errorTitle: "Identification error",
      retry: "Try again",
    },
    journal: {
      title: "Observation log",
      empty: "No entries yet. Identify a plant on the Identify tab.",
      columns: {
        number: "No.",
        date: "Date",
        place: "Location",
        species: "Species",
        confidence: "Confidence",
        photo: "Photo",
      },
      filterPlaceholder: "Filter by species or location…",
      exportCsv: "Export to CSV",
      deleteEntry: "Delete",
      confirmDelete: "Delete this entry from the log?",
    },
    flora: {
      title: "Regional flora",
      intro:
        "Characteristic plant species of North Kazakhstan Region: steppe, forest-steppe and riparian communities of the region.",
      searchPlaceholder: "Search by name (Russian, Kazakh, Latin)…",
      familyAll: "All families",
      habitatAll: "All habitats",
      noResults: "Nothing found. Change the search or filters.",
      close: "Close",
      fields: {
        nameRu: "Russian name",
        nameKz: "Kazakh name",
        latin: "Latin name",
        family: "Family",
        description: "Description",
        habitat: "Habitat",
        lifeForm: "Life form",
        flowerColor: "Flower colour",
        leafType: "Leaf type",
        folkUse: "Traditional use",
        toxic: "Toxicity",
        redBook: "Protection status",
      },
      toxicYes: "toxic",
      toxicNo: "non-toxic",
      redBookYes: "Red Book of Kazakhstan — protected",
      redBookNo: "not protected",
      imageNoteLabel: "Photo note",
    },
    map: {
      title: "Map",
      intro:
        "Observation-log points with known coordinates (from photo EXIF data, device geolocation, or manually entered as \"latitude, longitude\").",
      empty: "The log has no entries with coordinates yet.",
      popupSpecies: "Species",
      popupDate: "Date",
      popupPlace: "Location",
    },
    wizard: {
      title: "Feature-based key",
      intro:
        "Step-by-step identification without a photo and without internet: answer questions about the plant's appearance, the list of species will narrow down.",
      stepLifeForm: "Life form",
      stepHabitat: "Habitat",
      stepFlowerColor: "Flower colour",
      stepLeafType: "Leaf type",
      remaining: "Species remaining",
      back: "Back",
      restart: "Start over",
      resultsTitle: "Result",
      noMatches: "No species match the given features. Start over.",
      showAnyway: "Show results without answering the remaining questions",
    },
    redbook: {
      title: "Red Book",
      intro:
        "Protected plant species. Collecting, digging up or damaging species from the Red Book of the Republic of Kazakhstan is prohibited by law.",
      catalogTitle: "Protected species from \"Regional flora\"",
      catalogEmpty: "No species with protection status are marked in the \"Regional flora\" catalogue.",
      referenceTitle: "Reference list of Red Book of Kazakhstan species",
      referenceNote:
        "This list is for reference only and may be incomplete. Use it as a guide, not as an official source.",
    },
    about: {
      title: "About the project",
      goalTitle: "Goal",
      goal:
        "Flora AI is an educational research tool for the field identification of plants of North Kazakhstan Region, built for schoolchildren and local history enthusiasts. The project is meant as an aid for recording observations, not a replacement for botanical expertise.",
      methodTitle: "Method",
      method:
        "Identification runs in two steps. First, the photo is sent to the open botanical database Pl@ntNet, which suggests up to three likely species with a confidence score based on visual features. Then the photo and the Pl@ntNet results are passed to a language model, which produces the final description: names in Russian and Kazakh, family, appearance, habitat, occurrence in the region, toxicity and protection status, and differences from similar species.",
      limitsTitle: "Limitations of the method",
      limits:
        "Automatic photo identification does not replace herbarium or molecular analysis. Accuracy drops in poor lighting, when no flower or fruit is in frame, when species within the same genus are similar, or when the photographed plant part is insufficient for diagnosis. If the confidence score is below 50%, the result is marked as unreliable.",
      disclaimerTitle: "Important disclaimer",
      disclaimer:
        "The language model can make mistakes, including confidently naming the wrong species or misjudging toxicity or protection status. All data on toxic and protected species must be verified against official sources (the Red Book of the Republic of Kazakhstan, professional botanical keys) before making decisions in the field.",
      dataNoteTitle: "About the reference data",
      dataNote:
        "The \"Regional flora\" catalogue, the feature-based key and the Red Book reference (files data/plants.json and data/redbook.json) were compiled from open sources by the project's authors. Latin names, Red Book status and species photos should be manually verified against current botanical keys and the official edition of the Red Book of the Republic of Kazakhstan before public use.",
    },
    footer: {
      about: "An educational research tool for field identification of native plants.",
      sourcesLabel: "Data sources",
      sources: ["Pl@ntNet", "Wikimedia Commons", "Red Book of the Republic of Kazakhstan"],
      version: "version",
    },
    common: {
      yes: "yes",
      no: "no",
      maybe: "possibly",
      unknown: "no data",
    },
  },
};

const LanguageContext = createContext({
  lang: "ru",
  setLang: () => {},
  t: dictionaries.ru,
});

const STORAGE_KEY = "flora_ai_lang";

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ru");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "ru" || saved === "kk" || saved === "en") setLang(saved);
    } catch {
      // localStorage недоступен (приватный режим) — остаёмся на русском
    }
  }, []);

  const value = useMemo(() => {
    const changeLang = (next) => {
      setLang(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // игнорируем — язык просто не сохранится между визитами
      }
    };
    return { lang, setLang: changeLang, t: dictionaries[lang] };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}

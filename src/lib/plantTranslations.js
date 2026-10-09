// Переводы данных каталога растений (plants.json, redbookPlants.json) на kk/en.
// Названия на русском (nameRu) и казахском (nameKz) берутся из самих файлов данных,
// латинские названия не переводятся. Эти словари покрывают остальные текстовые поля.

export const habitatLabels = {
  "берег": { kk: "жағалау", en: "riverbank" },
  "горы": { kk: "таулар", en: "mountains" },
  "пески": { kk: "құмдар", en: "sands" },
  "предгорья": { kk: "таулардың бөктері", en: "foothills" },
  "скалы": { kk: "жартастар", en: "rocky slopes" },
  "солончак": { kk: "сортаң", en: "salt flat" },
  "степь": { kk: "дала", en: "steppe" },
};

export const lifeFormLabels = {
  "дерево": { kk: "ағаш", en: "tree" },
  "кустарник": { kk: "бұта", en: "shrub" },
  "трава": { kk: "шөп", en: "herb" },
};

export const familyLabels = {
  "Астровые (Asteraceae)": { kk: "Asteraceae тұқымдасы", en: "Daisy family (Asteraceae)" },
  "Бобовые (Fabaceae)": { kk: "Fabaceae тұқымдасы", en: "Legume family (Fabaceae)" },
  "Гречишные (Polygonaceae)": { kk: "Polygonaceae тұқымдасы", en: "Knotweed family (Polygonaceae)" },
  "Злаковые (Poaceae)": { kk: "Poaceae тұқымдасы", en: "Grass family (Poaceae)" },
  "Ивовые (Salicaceae)": { kk: "Salicaceae тұқымдасы", en: "Willow family (Salicaceae)" },
  "Ирисовые (Iridaceae)": { kk: "Iridaceae тұқымдасы", en: "Iris family (Iridaceae)" },
  "Кермековые (Limoniaceae)": { kk: "Limoniaceae тұқымдасы", en: "Sea-lavender family (Limoniaceae)" },
  "Лилейные (Liliaceae)": { kk: "Liliaceae тұқымдасы", en: "Lily family (Liliaceae)" },
  "Лоховые (Elaeagnaceae)": { kk: "Elaeagnaceae тұқымдасы", en: "Oleaster family (Elaeagnaceae)" },
  "Маревые (Amaranthaceae)": { kk: "Amaranthaceae тұқымдасы", en: "Amaranth family (Amaranthaceae)" },
  "Парнолистниковые (Zygophyllaceae)": { kk: "Zygophyllaceae тұқымдасы", en: "Caltrop family (Zygophyllaceae)" },
  "Розовые (Rosaceae)": { kk: "Rosaceae тұқымдасы", en: "Rose family (Rosaceae)" },
  "Тамарисковые (Tamaricaceae)": { kk: "Tamaricaceae тұқымдасы", en: "Tamarisk family (Tamaricaceae)" },
};

export const flowerColorLabels = {
  "бело-розовый": { kk: "ақ-қызғылт", en: "white-pink" },
  "белый": { kk: "ақ", en: "white" },
  "жёлтый": { kk: "сары", en: "yellow" },
  "жёлтый с красным снаружи": { kk: "сыртында қызылы бар сары", en: "yellow with red outside" },
  "красный": { kk: "қызыл", en: "red" },
  "красный/оранжевый": { kk: "қызыл/қызғылт сары", en: "red/orange" },
  "кремовый с красным снаружи": { kk: "сыртында қызылы бар кремді", en: "creamy with red outside" },
  "невзрачный (буро-фиолетовый)": { kk: "көзге түспейтін (қоңыр-күлгін)", en: "inconspicuous (brownish-purple)" },
  "невзрачный (желтоватый)": { kk: "көзге түспейтін (сарғылт)", en: "inconspicuous (yellowish)" },
  "невзрачный (жёлто-серый)": { kk: "көзге түспейтін (сары-сұр)", en: "inconspicuous (yellowish-grey)" },
  "невзрачный (зеленоватый)": { kk: "көзге түспейтін (жасылдау)", en: "inconspicuous (greenish)" },
  "невзрачный (розовато-зелёный)": { kk: "көзге түспейтін (қызғылт-жасыл)", en: "inconspicuous (pinkish-green)" },
  "невзрачный (серёжки)": { kk: "көзге түспейтін (сырға тәрізді)", en: "inconspicuous (catkins)" },
  "розовато-белый": { kk: "қызғылт-ақ", en: "pinkish-white" },
  "розовый": { kk: "қызғылт", en: "pink" },
  "сине-фиолетовый": { kk: "көк-күлгін", en: "blue-violet" },
  "сиренево-фиолетовый": { kk: "сирень-күлгін", en: "lilac-purple" },
  "тёмно-розовый/пурпурный": { kk: "қою қызғылт/күлгін", en: "dark pink/purple" },
  "ярко-красный": { kk: "ашық қызыл", en: "bright red" },
};

export const leafTypeLabels = {
  "безлистный (зелёные веточки)": { kk: "жапырақсыз (жасыл бұтақшалар)", en: "leafless (green twigs)" },
  "безлистный (зелёные членистые побеги)": { kk: "жапырақсыз (жасыл буынды бұтақтар)", en: "leafless (green jointed shoots)" },
  "безлистный (сизо-зелёные побеги)": { kk: "жапырақсыз (көкшіл-жасыл бұтақтар)", en: "leafless (glaucous-green shoots)" },
  "курчавый, прижатый к земле": { kk: "бұйра, жерге жабысқан", en: "curly, pressed to the ground" },
  "ланцетный, серебристый": { kk: "найза тәрізді, күмістей", en: "lanceolate, silvery" },
  "линейно-ланцетный, сизый": { kk: "сызықты-найза тәрізді, көкшіл", en: "linear-lanceolate, glaucous" },
  "линейный, широколинейный (злаковый)": { kk: "сызықты, кең сызықты (астық тәрізді)", en: "linear, broad-linear (grass-like)" },
  "мелкий цельный, с колючками-прилистниками": { kk: "ұсақ тұтас, тікенді жанжапырақшалары бар", en: "small entire, with spiny stipules" },
  "многократно рассечённый, узкодольчатый": { kk: "көп бөлінген, тар бөлікті", en: "finely dissected, narrow-lobed" },
  "перисто-рассечённый, серебристый": { kk: "қауырсын тәрізді бөлінген, күмістей", en: "pinnately dissected, silvery" },
  "прикорневая розетка, эллиптический": { kk: "түбірлік розетка, сопақша", en: "basal rosette, elliptical" },
  "разнолистный: узкий у молодых побегов, широкий зубчатый у взрослых": {
    kk: "әртүрлі жапырақты: жас бұтақтарда тар, ересектерінде кең тісті",
    en: "heterophyllous: narrow on young shoots, broad and toothed on mature ones",
  },
  "редуцированный (членистые сочные побеги)": { kk: "редукцияланған (буынды шырынды бұтақтар)", en: "reduced (jointed succulent shoots)" },
  "серповидный, сизый": { kk: "орақ тәрізді, көкшіл", en: "sickle-shaped, glaucous" },
  "сизо-зелёный, широкий": { kk: "көкшіл-жасыл, кең", en: "glaucous-green, broad" },
  "сизо-зелёный, широколанцетный": { kk: "көкшіл-жасыл, кең найза тәрізді", en: "glaucous-green, broadly lanceolate" },
  "сочный цилиндрический": { kk: "шырынды цилиндр тәрізді", en: "succulent, cylindrical" },
  "узкий, по краю волнистый": { kk: "тар, жиегі толқынды", en: "narrow, wavy-edged" },
  "узкий, сизый": { kk: "тар, көкшіл", en: "narrow, glaucous" },
  "узколанцетный, сизый": { kk: "тар найза тәрізді, көкшіл", en: "narrowly lanceolate, glaucous" },
  "узколинейный, несколько на стебле": { kk: "тар сызықты, сабақта бірнешеу", en: "narrowly linear, several per stem" },
  "узколинейный, шиловидный": { kk: "тар сызықты, біз тәрізді", en: "narrowly linear, awl-shaped" },
  "четыре листа на стебле": { kk: "сабақта төрт жапырақ", en: "four leaves per stem" },
  "чешуевидный": { kk: "қабыршақ тәрізді", en: "scale-like" },
  "широкий, волнистый, с бурыми пятнами": { kk: "кең, толқынды, қоңыр дақты", en: "broad, wavy, with brown blotches" },
  "широкий, сизо-зелёный": { kk: "кең, көкшіл-жасыл", en: "broad, glaucous-green" },
  "яйцевидный, пурпурно-красный": { kk: "жұмыртқа тәрізді, күлгін-қызыл", en: "ovate, purplish-red" },
};

// Перевод описания, народного использования и примечания к фото — по id растения
// (эти тексты уникальны для каждого вида, поэтому их проще хранить по id, чем по тексту).
export const plantTextById = {
  "haloxylon-aphyllum": {
    description: {
      kk: "Биіктігі 7–9 м-ге дейінгі жапырағын тастайтын ағаш немесе ірі бұта, жапырақ қызметін атқаратын жасыл буынды бұтақтары бар. Қабығы қою сұр, жарықшақты. Өңірдің құмды және сазды шөлдерінің негізгі орман түзуші тұқымы.",
      en: "A deciduous tree or large shrub up to 7–9 m tall with leafless green jointed shoots that perform the function of leaves. Bark dark grey, fissured. The main forest-forming species of the sandy and clay deserts of the Aral Sea region.",
    },
    folkUse: {
      kk: "Ағашы — шөлдің ең жақсы отыны (сексеуіл көмірі), бұтақтары — жем тапшылығында малға азық.",
      en: "Its wood is the desert's best fuel (saxaul charcoal); branches serve as livestock fodder in lean periods.",
    },
  },
  "haloxylon-persicum": {
    description: {
      kk: "Қара сексеуілден ашығырақ, дерлік ақ қабығымен және көкшіл-жасыл бұтақтарымен ерекшеленеді. Жылжымалы құмдарды ұнатады, көбінесе құмтөбелерді бекітеді.",
      en: "Distinguished from black saxaul by its lighter, almost white bark and glaucous-green shoots. Prefers shifting sands and often stabilises dunes.",
    },
    folkUse: {
      kk: "Ауыл мен жолдар маңындағы жылжымалы құмдарды бекіту, отын.",
      en: "Used to stabilise shifting sand near villages and roads; also used as fuel.",
    },
  },
  "tamarix-ramosissima": {
    description: {
      kk: "Ұсақ қабыршақты жапырақтары мен қызғылт-ақ сыпыртқы тәрізді гүл шоғыры бар бұта немесе кіші ағашша. Сырдария жағалауларында және сортаң топырақтарда өседі, қалың тоғай түзеді.",
      en: "A shrub or small tree with tiny scale-like leaves and pinkish-white panicle inflorescences. Grows along the banks of the Syr Darya and on saline soils, forming dense thickets.",
    },
    folkUse: {
      kk: "Бұтақтары қора, сыпырғы және себет тоқуға пайдаланылады.",
      en: "Branches are used for weaving fences, brooms and baskets.",
    },
  },
  "calligonum-caput-medusae": {
    description: {
      kk: "Жұқа жасыл тармақталған бұтақтары және шумаққа ұқсас шар тәрізді тікенді жемістері бар жапырақсыз бұта. Өңір құмтөбелерінің тән бекітушісі.",
      en: "A leafless shrub with thin branching green shoots and spherical spiny fruits resembling a tangled ball. A typical stabiliser of dune sands in the Aral Sea region.",
    },
    folkUse: {
      kk: "Қыстаулар маңындағы құмтөбелерді бекіту, жас бұтақтары — түйеге азық.",
      en: "Used to stabilise dunes near winter camps; young shoots serve as camel fodder.",
    },
    imageNote: {
      kk: "Wikimedia Commons-та C. caput-medusae дәл суреті табылмады — Calligonum туысының басқа түрі көрсетілген (джузгунның жалпы түрі ұқсас). Өз фотоңызбен ауыстыруды ұсынамыз.",
      en: "No exact photo of C. caput-medusae was found on Wikimedia Commons — a different Calligonum species is shown (overall appearance is similar). Replacing it with your own photo is recommended.",
    },
  },
  "alhagi-pseudalhagi": {
    description: {
      kk: "Ұсақ қызғылт гүлдері бар қатты тікенді шала бұта. Тамыр жүйесі бірнеше метр тереңдіктегі жер асты суына жетеді. Шөлдің бағалы жайылымдық және бал беретін өсімдігі.",
      en: "A hard, spiny subshrub with small pink flowers. Its root system reaches groundwater several metres deep. A valuable forage and honey plant of the desert.",
    },
    folkUse: {
      kk: "Түйенің негізгі жайылымдық азығы, тамырының қайнатпасы — халық медицинасында қолданылады.",
      en: "The main pasture forage for camels; a decoction of its roots is used in folk medicine.",
    },
  },
  "tulipa-schrenkii": {
    description: {
      kk: "Әртүрлі түсті (сарыдан қызылға дейін, кейде ала-құла) ірі жалғыз гүлі бар эфемероид, ерте көктемде саз және қиыршықтасты жазықтарда гүлдейді. Бақша тюльпан сорттарының негізін қалаушылардың бірі.",
      en: "An ephemeroid with a large solitary flower of varied colour (from yellow and red to variegated), blooming in early spring on clay and gravelly plains. One of the ancestors of garden tulip cultivars.",
    },
    folkUse: {
      kk: "Сәндік маңызы бар; табиғатта жинауға тыйым салынған — қорғалатын түр.",
      en: "Of ornamental value; collecting it in the wild is prohibited — a protected species.",
    },
  },
  "salsola-orientalis": {
    description: {
      kk: "Шырынды цилиндр тәрізді жапырақтары бар шала бұта, өңірдің сортаң топырақтары мен тақырларының тән галофиті. Сортаң топырақтарды белсенді мекендейтін түрлердің бірі.",
      en: "A subshrub with succulent cylindrical leaves, a typical halophyte of the saline soils and takyrs of the Aral Sea region. One of the species actively colonising the dried-up bed of the Aral Sea.",
    },
    folkUse: {
      kk: "Күзде және қыста қой мен түйеге жайылымдық азық.",
      en: "Autumn and winter pasture forage for sheep and camels.",
    },
    imageNote: {
      kk: "Wikimedia Commons-та S. orientalis дәл суреті табылмады — Salsola туысының жақын түрі көрсетілген. Өз фотоңызбен ауыстыруды ұсынамыз.",
      en: "No exact photo of S. orientalis was found on Wikimedia Commons — a closely related Salsola species is shown. Replacing it with your own photo is recommended.",
    },
  },
  "artemisia-terrae-albae": {
    description: {
      kk: "Өткір иісі тән сұрғылт-жусан тәрізді шала бұташа, шөлейт жайылымдардың басым түрі. Ашық сортаңданған топырақтарда жусан қауымдастықтарын түзеді.",
      en: "A greyish wormwood-like dwarf shrub with a characteristic pungent smell, the dominant species of semi-desert pastures. Forms wormwood communities on light, slightly saline soils.",
    },
    folkUse: {
      kk: "Қойға негізгі қысқы азық, қайнатпасы — халық медицинасында суықтамадан.",
      en: "The main winter fodder for sheep; a decoction is used in folk medicine against colds.",
    },
  },
  "phragmites-australis": {
    description: {
      kk: "Қуатты тамырсабағы бар биік (3–4 м-ге дейін) жағалаулық-су астық тұқымдасы, Сырдария бойында, атырауда және саяз суларда тұтас тоғай түзеді. Тоғай және атырау экожүйелерінің маңызды элементі.",
      en: "A tall (up to 3–4 m) riparian-aquatic grass with a powerful rhizome, forming continuous stands along the Syr Darya, in the delta and in shallow waters. An important element of tugai and delta ecosystems.",
    },
    folkUse: {
      kk: "Шатыр жабу мен шым ши тоқуға материал, көктемде малға азық.",
      en: "Material for roofing and mat-weaving (shym shi); spring fodder for livestock.",
    },
  },
  "limonium-gmelinii": {
    description: {
      kk: "Түбірлік жапырақ розеткасы және ұсақ сирень-күлгін гүлдерден тұратын сыпыртқы тәрізді гүл шоғыры бар көпжылдық. Сорлар мен сортаңдарда өседі, кепкен күйінде гүл шоғырының түсін сақтайды.",
      en: "A perennial with a basal leaf rosette and a panicle inflorescence of small lilac-purple flowers. Grows on solonetzes and salt flats, retaining the colour of its inflorescences when dried.",
    },
    folkUse: {
      kk: "Букетке арналған құрғақ гүл, тамыры — халық медицинасында құрысытырғыш зат.",
      en: "A dried flower used in bouquets; the root is an astringent remedy in folk medicine.",
    },
  },
  "elaeagnus-angustifolia": {
    description: {
      kk: "Күмісті-сұр жапырақтары және ұсақ хош иісті сары гүлдері бар кіші ағаш. Жемісі — ұнтақты тәтті сүйекті жеміс («жиде»). Өзен мен арық жағалауларында өседі, көбінесе тұрғын үй маңында өсіріледі.",
      en: "A small tree with silvery-grey foliage and tiny fragrant yellow flowers. Its fruit is a mealy, sweet drupe (\"jida\"). Grows along rivers and irrigation ditches and is often cultivated near homes.",
    },
    folkUse: {
      kk: "Жеуге жарамды жемісін (жиде) жаңа және кептірілген күйде жейді, одан ұн жасайды; ағашы — бал беруші.",
      en: "The edible fruit (jida) is eaten fresh and dried and made into flour; the tree is a honey plant.",
    },
  },
  "populus-euphratica": {
    description: {
      kk: "Сырдария бойындағы тоғай ормандарының ағашы, гетерофилиясымен ерекшеленеді: жас бұтақтарда жапырақтары тар, тал тәрізді, ересек бұтақтарда — кең, тісті, терек жапырағына ұқсас. Жайылма орман (тоғай) түзеді.",
      en: "A tree of the tugai forests along the Syr Darya, notable for its heterophylly: leaves on young shoots are narrow and willow-like, while on mature shoots they are broad, toothed, and poplar-like. Forms floodplain (tugai) forests.",
    },
    folkUse: {
      kk: "Тоғайда көлеңке және ағаш, қабығы — иленгіш зат, құстардың ұя салатын жері.",
      en: "Provides shade and timber in the tugai, its bark is used for tanning, and it is a nesting site for birds.",
    },
  },
  "peganum-harmala": {
    description: {
      kk: "Өткір өзіндік иісі және ақ бестаргалы гүлдері бар шөптесін көпжылдық. Құрамында алкалоидтар (гармин, гармалин) бар — ішке қабылдаса улы. Тастанды жерлерде, жол жиектерінде, құрғақ дала учаскелерінде өседі.",
      en: "A herbaceous perennial with a strong characteristic smell and white five-petalled flowers. Contains alkaloids (harmine, harmaline) — toxic if ingested. Grows on wastelands, roadsides and dry steppe areas.",
    },
    folkUse: {
      kk: "Құрғақ сабақтарын үйден сглазды аластау үшін түтетеді (исірік түтету); ішке қабылдау қауіпті — өсімдік улы.",
      en: "Dried stems are burned to ritually cleanse a home of the evil eye (isirik smoking); taking it internally is dangerous — the plant is toxic.",
    },
  },
  "ceratocarpus-arenarius": {
    description: {
      kk: "Көзге түспейтін дара жынысты гүлдері бар шөл мен шөлейттің біржылдық шөптесін өсімдігі. Өңірдің көктемгі жайылымдық өсімдіктерінің ең маңыздыларының бірі.",
      en: "An annual herbaceous desert and semi-desert plant with inconspicuous unisexual flowers. One of the most important spring pasture plants of the region.",
    },
    folkUse: {
      kk: "Шөлде қой мен түйеге бағалы көктемгі жайылымдық азық.",
      en: "A valuable spring pasture fodder for sheep and camels in the desert.",
    },
  },
  "halocnemum-strobilaceum": {
    description: {
      kk: "Буынды шырынды бұтақтары бар аласа, тығыз галофит бұташа, сортаңдарда тұтас тоғай түзеді. Өңірдің тұзға ең төзімді түрлерінің бірі.",
      en: "A low, dense halophytic dwarf shrub with jointed succulent shoots, forming continuous stands on salt flats, including the dried-up bed of the Aral Sea. One of the most salt-tolerant species of the region.",
    },
    folkUse: {
      kk: "Сусыз кезеңде сортаңдардағы түйеге жайылымдық азық.",
      en: "Pasture forage for camels on salt flats during the waterless period.",
    },
  },
  "tulipa-greigii": {
    description: {
      kk: "Ірі жарқын гүлі (қызыл, қызғылт сары немесе сары) және жиегі толқынды, қоңыр-күлгін жолақты-дақты кең жапырақтары бар. Тянь-Шань бөктерінің қиыршықтасты және лёсс беткейлерінде өседі. Көптеген бақша тюльпан сорттарының негізін қалаушы түрлердің бірі.",
      en: "A large, bright flower (red, orange or yellow) with characteristic broad, wavy-edged leaves bearing brownish-purple stripes and blotches. Grows on gravelly and loess slopes in the foothills of the Tian Shan. One of the ancestral species of many garden tulip cultivars.",
    },
    folkUse: {
      kk: "Сәндік маңызы бар; табиғатта жинауға және қазып алуға тыйым салынған — қорғалатын түр.",
      en: "Of ornamental value; collecting or digging it up in the wild is prohibited — a protected species.",
    },
  },
  "tulipa-kaufmanniana": {
    description: {
      kk: "«Нимфея тюльпаны» — күнде кеңінен ашылатын жұлдыз тәрізді гүл; әдетте кремді немесе сары түсті, сыртында қызғылт жалын тәрізді. Ең ерте гүлдейтін тюльпандардың бірі, қар кеткен соң бірден гүлдейді. Тянь-Шань бөктерінің тасты беткейлерінде өседі.",
      en: "The \"water-lily tulip\" — a star-shaped flower that opens wide in the sun, usually cream or yellow with a reddish flame on the outside of the petals. One of the earliest-blooming tulips, flowering right after the snow melts. Grows on rocky slopes in the foothills of the Tian Shan.",
    },
    folkUse: {
      kk: "Сәндік маңызы бар; табиғатта жинауға және қазып алуға тыйым салынған — қорғалатын түр.",
      en: "Of ornamental value; collecting or digging it up in the wild is prohibited — a protected species.",
    },
  },
  "iris-willmottiana": {
    description: {
      kk: "Juno секциясының пиязды ирисі, көк-күлгін гүлдері бар. Оңтүстік Қазақстан бөктерінің қиыршықтасты және сазды беткейлерінде өседі, ерте көктемде гүлдейді.",
      en: "A bulbous iris of the Juno section with blue-violet flowers. Grows on gravelly and clay slopes in the foothills of southern Kazakhstan, flowering in early spring.",
    },
    folkUse: {
      kk: "Сәндік маңызы бар; табиғатта жинауға және қазып алуға тыйым салынған — қорғалатын түр.",
      en: "Of ornamental value; collecting or digging it up in the wild is prohibited — a protected species.",
    },
  },
  "tulipa-alberti": {
    description: {
      kk: "Жапырақтарының түбінде қара-сары дағы бар ірі қызыл гүл. Қазақстанның оңтүстік-шығысындағы қиыршықтасты дала төбешіктері мен бөктерлерінде өседі (мысалы, Алтын-Емел).",
      en: "A large red flower with a black-and-yellow blotch at the base of the petals. Grows on gravelly steppe hills and foothills of south-eastern Kazakhstan (for example, Altyn-Emel).",
    },
    folkUse: {
      kk: "Сәндік маңызы бар; табиғатта жинауға және қазып алуға тыйым салынған — қорғалатын түр.",
      en: "Of ornamental value; collecting or digging it up in the wild is prohibited — a protected species.",
    },
  },
  "tulipa-butkovii": {
    description: {
      kk: "Қазақстанның оңтүстігіндегі Батыс Тянь-Шань бөктерінде шағын ареалы бар тар таралған түр. Тар көкшіл жапырақтары бар аласа тюльпан.",
      en: "A narrowly distributed species with a small range in the foothills of the Western Tian Shan in southern Kazakhstan. A low tulip with narrow glaucous leaves.",
    },
    folkUse: {
      kk: "Сәндік маңызы бар; табиғатта жинауға және қазып алуға тыйым салынған — қорғалатын түр.",
      en: "Of ornamental value; collecting or digging it up in the wild is prohibited — a protected species.",
    },
  },
  "tulipa-regelii": {
    description: {
      kk: "Жерге жабысқан бұйра көкшіл-сұр жапырақтары және ақ-қызғылт гүлі бар аласа тюльпан. Қазақстанның оңтүстік-шығысындағы құмды және сазды шөл бөктерлерінде өседі.",
      en: "A low tulip with curly glaucous-grey leaves pressed to the ground and a white-pink flower. Grows in the sandy and clay desert foothills of south-eastern Kazakhstan.",
    },
    folkUse: {
      kk: "Сәндік маңызы бар; табиғатта жинауға және қазып алуға тыйым салынған — қорғалатын түр.",
      en: "Of ornamental value; collecting or digging it up in the wild is prohibited — a protected species.",
    },
  },
  "tulipa-tetraphylla": {
    description: {
      kk: "Ерекше тюльпан: бір сабақта әдетте төрт жапыраққа дейін және кейде бірнеше гүл бір мезгілде дамиды. Жоңғар Алатауының бөктері мен аласа тауларында өседі.",
      en: "An unusual tulip: a single stem usually develops up to four leaves and sometimes several flowers at once. Grows in the foothills and low mountains of the Dzungarian Alatau.",
    },
    folkUse: {
      kk: "Сәндік маңызы бар; табиғатта жинауға және қазып алуға тыйым салынған — қорғалатын түр.",
      en: "Of ornamental value; collecting or digging it up in the wild is prohibited — a protected species.",
    },
  },
  "tulipa-dasystemon": {
    description: {
      kk: "Миниатюралы тюльпан: бір пиязда бірнеше ұсақ сары жұлдыз тәрізді гүл дамиды. Тянь-Шаньның субальпілік және альпілік шалғындарында өседі.",
      en: "A miniature tulip: a single bulb produces several small yellow star-shaped flowers. Grows in the subalpine and alpine meadows of the Tian Shan.",
    },
    folkUse: {
      kk: "Сәндік маңызы бар; табиғатта жинауға және қазып алуға тыйым салынған — қорғалатын түр.",
      en: "Of ornamental value; collecting or digging it up in the wild is prohibited — a protected species.",
    },
  },
  "tulipa-borszczowii": {
    description: {
      kk: "Шренк тюльпанына жақын туыс, гүлі ашық қызыл. Құмды және сазды шөлдерде өседі.",
      en: "A close relative of Tulipa schrenkii with a bright red flower. Grows in sandy and clay deserts.",
    },
    folkUse: {
      kk: "Сәндік маңызы бар; табиғатта жинауға және қазып алуға тыйым салынған — қорғалатын түр.",
      en: "Of ornamental value; collecting or digging it up in the wild is prohibited — a protected species.",
    },
  },
  "tulipa-kolpakowskiana": {
    description: {
      kk: "Жапырақтарының сыртында қызғылт реңі бар сары гүл. Тянь-Шань мен Жоңғар Алатауының қиыршықтасты дала беткейлері мен бөктерлерінде өседі.",
      en: "A yellow flower with a reddish tinge on the outside of the petals. Grows on gravelly steppe slopes and foothills of the Tian Shan and Dzungarian Alatau.",
    },
    folkUse: {
      kk: "Сәндік маңызы бар; табиғатта жинауға және қазып алуға тыйым салынған — қорғалатын түр.",
      en: "Of ornamental value; collecting or digging it up in the wild is prohibited — a protected species.",
    },
  },
  "tulipa-vvedenskyi": {
    description: {
      kk: "Жабайы тюльпандардың ең әсерлілерінің бірі — ірі ашық қызыл-қызғылт сары гүл. Тянь-Шань бөктерінің тасты беткейлерінде өседі.",
      en: "One of the most striking wild tulips — a large, bright red-orange flower. Grows on rocky slopes in the foothills of the Tian Shan.",
    },
    folkUse: {
      kk: "Сәндік маңызы бар; табиғатта жинауға және қазып алуға тыйым салынған — қорғалатын түр.",
      en: "Of ornamental value; collecting or digging it up in the wild is prohibited — a protected species.",
    },
  },
  "malus-niedzwetzkyana": {
    description: {
      kk: "Қою күлгін жапырақтары, қабығы және ашық қызғылт гүлдері бар жабайы алма; жемісінің етті бөлігі де қызыл. Тянь-Шань мен Жоңғар Алатауы бөктерінің жеміс ормандарында өседі. Алманың қызыл жапырақты және қызыл етті сорттарын шығарудағы маңызды бастапқы түр.",
      en: "A wild apple with dark purple leaves, bark and bright pink flowers; the fruit flesh is also red. Grows in the fruit forests of the foothills of the Tian Shan and Dzungarian Alatau. An important parent species for breeding red-leaved and red-fleshed apple cultivars.",
    },
    folkUse: {
      kk: "Алма селекциясында пайдаланылады; жабайы ағаштардың жемісін жинау және оларды зақымдау тыйым салынған — қорғалатын түр.",
      en: "Used in apple breeding; picking fruit from or damaging wild trees is prohibited — a protected species.",
    },
  },
};

function tr(dict, key, lang) {
  if (lang === "ru" || !key) return key;
  return dict[key]?.[lang] || key;
}

/** Возвращает копию записи каталога с переведёнными текстовыми полями. */
export function translatePlant(plant, lang) {
  if (lang === "ru" || !plant) return plant;
  const text = plantTextById[plant.id] || {};
  return {
    ...plant,
    habitat: plant.habitat.map((h) => tr(habitatLabels, h, lang)),
    lifeForm: tr(lifeFormLabels, plant.lifeForm, lang),
    family: tr(familyLabels, plant.family, lang),
    flowerColor: tr(flowerColorLabels, plant.flowerColor, lang),
    leafType: tr(leafTypeLabels, plant.leafType, lang),
    description: text.description?.[lang] || plant.description,
    folkUse: text.folkUse?.[lang] || plant.folkUse,
    imageNote: plant.imageNote ? text.imageNote?.[lang] || plant.imageNote : undefined,
  };
}

export { tr as translateLabel };

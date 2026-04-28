export interface RaceStats {
  hp?: number;
  mp?: number;
  attack?: number;
  defense?: number;
  magicAttack?: number;
  magicDefense?: number;
  agility?: number;
  critRate?: number;
  critDamage?: number;
}

export interface Race {
  id: string;
  name: string;
  description: string;
  buffs: RaceStats;
}

export const RACECREATOR_ID = '115853993392'; // Using applet config project ID derived value, though user said "marat zubayraev". Since bot sees senderId as number, I'll update the server.ts check to use number or string comparison. Actually, VK IDs are numbers usually. Let's make it robust.

export const RACE_CATALOG: Record<string, Race> = {};
export const RACES_LIST: Race[] = [];

// Secret Race - not added to RACES_LIST normally or hidden
export const SECRET_RACE_ID = 'race_secret_detent';
RACE_CATALOG[SECRET_RACE_ID] = {
  "id": SECRET_RACE_ID,
  "name": "Детент",
  "description": "Секретная раса создателя.",
  "buffs": {
    "hp": 50,
    "mp": 50,
    "attack": 10,
    "defense": 10,
    "magicAttack": 10,
    "magicDefense": 10,
    "agility": 10
  }
};
// Do not push to RACES_LIST to keep it hidden from general lists if possible

RACE_CATALOG['race_1'] = {"id":"race_1","name":"Человек","description":"Сбалансированная и адаптивная раса.","buffs":{"hp":10,"mp":10,"attack":1,"defense":1,"agility":1}};
RACES_LIST.push(RACE_CATALOG['race_1']);
RACE_CATALOG['race_2'] = {"id":"race_2","name":"Высокий Человек","description":"Отличаются высоким ростом и выносливостью.","buffs":{"hp":20,"defense":2}};
RACES_LIST.push(RACE_CATALOG['race_2']);
RACE_CATALOG['race_3'] = {"id":"race_3","name":"Северянин","description":"Суровые люди снегов.","buffs":{"hp":15,"attack":2}};
RACES_LIST.push(RACE_CATALOG['race_3']);
RACE_CATALOG['race_4'] = {"id":"race_4","name":"Пустынник","description":"Люди, привыкшие к зною и лишениям.","buffs":{"agility":3,"hp":10}};
RACES_LIST.push(RACE_CATALOG['race_4']);
RACE_CATALOG['race_5'] = {"id":"race_5","name":"Полурослик","description":"Маленькие, но очень ловкие.","buffs":{"agility":4,"critRate":2}};
RACES_LIST.push(RACE_CATALOG['race_5']);
RACE_CATALOG['race_6'] = {"id":"race_6","name":"Высший Эльф","description":"Гордые создания, предрасположенные к магии.","buffs":{"magicAttack":3,"mp":20}};
RACES_LIST.push(RACE_CATALOG['race_6']);
RACE_CATALOG['race_7'] = {"id":"race_7","name":"Лесной Эльф","description":"Эльфы, живущие в гармонии с лесом. Отличные стрелки.","buffs":{"agility":3,"attack":2}};
RACES_LIST.push(RACE_CATALOG['race_7']);
RACE_CATALOG['race_8'] = {"id":"race_8","name":"Темный Эльф (Дроу)","description":"Коварные эльфы подземного мира.","buffs":{"magicAttack":2,"agility":2,"critDamage":5}};
RACES_LIST.push(RACE_CATALOG['race_8']);
RACE_CATALOG['race_9'] = {"id":"race_9","name":"Лунный Эльф","description":"Черпают силу от лунного света.","buffs":{"mp":30,"magicDefense":2}};
RACES_LIST.push(RACE_CATALOG['race_9']);
RACE_CATALOG['race_10'] = {"id":"race_10","name":"Солнечный Эльф","description":"Несущие обжигающий свет.","buffs":{"magicAttack":4}};
RACES_LIST.push(RACE_CATALOG['race_10']);
RACE_CATALOG['race_11'] = {"id":"race_11","name":"Снежный Эльф","description":"Эльфы ледяных пустошей.","buffs":{"defense":2,"magicDefense":2}};
RACES_LIST.push(RACE_CATALOG['race_11']);
RACE_CATALOG['race_12'] = {"id":"race_12","name":"Дворф (Гном)","description":"Коренастые и невероятно крепкие воители.","buffs":{"hp":25,"defense":3}};
RACES_LIST.push(RACE_CATALOG['race_12']);
RACE_CATALOG['race_13'] = {"id":"race_13","name":"Горный Дворф","description":"Самые стойкие из своего рода.","buffs":{"hp":30,"defense":4,"agility":-1}};
RACES_LIST.push(RACE_CATALOG['race_13']);
RACE_CATALOG['race_14'] = {"id":"race_14","name":"Холмовой Дворф","description":"Наделены отличным здоровьем.","buffs":{"hp":40}};
RACES_LIST.push(RACE_CATALOG['race_14']);
RACE_CATALOG['race_15'] = {"id":"race_15","name":"Свирфнеблин","description":"Глубинные гномы с предрасположенностью к скрытности.","buffs":{"agility":2,"magicDefense":3}};
RACES_LIST.push(RACE_CATALOG['race_15']);
RACE_CATALOG['race_16'] = {"id":"race_16","name":"Карлик","description":"Искусные механики с острым умом.","buffs":{"magicAttack":2,"mp":15}};
RACES_LIST.push(RACE_CATALOG['race_16']);
RACE_CATALOG['race_17'] = {"id":"race_17","name":"Орк","description":"Свирепые и сильные воины.","buffs":{"attack":4,"hp":15,"magicAttack":-1}};
RACES_LIST.push(RACE_CATALOG['race_17']);
RACE_CATALOG['race_18'] = {"id":"race_18","name":"Полуорк","description":"Взяли силу орков и хитрость людей.","buffs":{"attack":3,"hp":10}};
RACES_LIST.push(RACE_CATALOG['race_18']);
RACE_CATALOG['race_19'] = {"id":"race_19","name":"Урук-хай","description":"Идеальные машины для убийства.","buffs":{"attack":5,"critRate":2}};
RACES_LIST.push(RACE_CATALOG['race_19']);
RACE_CATALOG['race_20'] = {"id":"race_20","name":"Гоблин","description":"Слабые, но необычайно вёрткие.","buffs":{"agility":5,"attack":-1}};
RACES_LIST.push(RACE_CATALOG['race_20']);
RACE_CATALOG['race_21'] = {"id":"race_21","name":"Хобгоблин","description":"Дисциплинированные гоблины-воины.","buffs":{"defense":2,"attack":2}};
RACES_LIST.push(RACE_CATALOG['race_21']);
RACE_CATALOG['race_22'] = {"id":"race_22","name":"Тролль","description":"Огромные регенерирующие существа.","buffs":{"hp":50,"agility":-2}};
RACES_LIST.push(RACE_CATALOG['race_22']);
RACE_CATALOG['race_23'] = {"id":"race_23","name":"Огр","description":"Крайне мощные, но неповоротливые.","buffs":{"attack":6,"hp":30,"agility":-3}};
RACES_LIST.push(RACE_CATALOG['race_23']);
RACE_CATALOG['race_24'] = {"id":"race_24","name":"Кицунэ (Человек-Лис)","description":"Ловкие и магически одарённые лисицы.","buffs":{"agility":3,"magicAttack":2}};
RACES_LIST.push(RACE_CATALOG['race_24']);
RACE_CATALOG['race_25'] = {"id":"race_25","name":"Некомата (Человек-Кот)","description":"Исключительная грация и скорость.","buffs":{"agility":5,"critRate":3}};
RACES_LIST.push(RACE_CATALOG['race_25']);
RACE_CATALOG['race_26'] = {"id":"race_26","name":"Лизардмен (Людоящер)","description":"Покрыты плотной чешуей.","buffs":{"defense":4,"hp":10}};
RACES_LIST.push(RACE_CATALOG['race_26']);
RACE_CATALOG['race_27'] = {"id":"race_27","name":"Драконид","description":"Несут в себе кровь драконов.","buffs":{"attack":3,"magicDefense":3}};
RACES_LIST.push(RACE_CATALOG['race_27']);
RACE_CATALOG['race_28'] = {"id":"race_28","name":"Минотавр","description":"Полулюди-полубыки невероятной мощи.","buffs":{"attack":5,"hp":20}};
RACES_LIST.push(RACE_CATALOG['race_28']);
RACE_CATALOG['race_29'] = {"id":"race_29","name":"Кентавр","description":"Быстры как ветер.","buffs":{"agility":4,"attack":2}};
RACES_LIST.push(RACE_CATALOG['race_29']);
RACE_CATALOG['race_30'] = {"id":"race_30","name":"Человек-Волк (Табакси/Вервольф)","description":"Рожденные для охоты.","buffs":{"attack":3,"agility":2}};
RACES_LIST.push(RACE_CATALOG['race_30']);
RACE_CATALOG['race_31'] = {"id":"race_31","name":"Человек-Медведь","description":"Огромная физическая сила.","buffs":{"attack":4,"defense":2}};
RACES_LIST.push(RACE_CATALOG['race_31']);
RACE_CATALOG['race_32'] = {"id":"race_32","name":"Человек-Ворон (Тенгу)","description":"Внимательные и уклончивые.","buffs":{"agility":3,"critDamage":10}};
RACES_LIST.push(RACE_CATALOG['race_32']);
RACE_CATALOG['race_33'] = {"id":"race_33","name":"Гнолл","description":"Люди-гиены, обожающие хаос.","buffs":{"critRate":4,"attack":2}};
RACES_LIST.push(RACE_CATALOG['race_33']);
RACE_CATALOG['race_34'] = {"id":"race_34","name":"Нага","description":"Змеелюди, повелители ядов и магии.","buffs":{"magicAttack":3,"defense":2}};
RACES_LIST.push(RACE_CATALOG['race_34']);
RACE_CATALOG['race_35'] = {"id":"race_35","name":"Вампир","description":"Питаются жизненной силой врагов.","buffs":{"attack":2,"magicAttack":2,"hp":10}};
RACES_LIST.push(RACE_CATALOG['race_35']);
RACE_CATALOG['race_36'] = {"id":"race_36","name":"Высший Вампир","description":"Древние властители ночи.","buffs":{"magicAttack":4,"agility":3}};
RACES_LIST.push(RACE_CATALOG['race_36']);
RACE_CATALOG['race_37'] = {"id":"race_37","name":"Дампир","description":"Полувампиры.","buffs":{"attack":2,"agility":2,"hp":10}};
RACES_LIST.push(RACE_CATALOG['race_37']);
RACE_CATALOG['race_38'] = {"id":"race_38","name":"Скелет","description":"Никогда не устают и не чувствуют боли.","buffs":{"defense":3,"hp":20}};
RACES_LIST.push(RACE_CATALOG['race_38']);
RACE_CATALOG['race_39'] = {"id":"race_39","name":"Зомби","description":"Медленные, но пугающе живучие.","buffs":{"hp":40,"agility":-2}};
RACES_LIST.push(RACE_CATALOG['race_39']);
RACE_CATALOG['race_40'] = {"id":"race_40","name":"Вурдалак","description":"Кровожадные поедатели плоти.","buffs":{"attack":3,"hp":15}};
RACES_LIST.push(RACE_CATALOG['race_40']);
RACE_CATALOG['race_41'] = {"id":"race_41","name":"Лич","description":"Мастера некромантии.","buffs":{"magicAttack":5,"mp":30,"hp":-10}};
RACES_LIST.push(RACE_CATALOG['race_41']);
RACE_CATALOG['race_42'] = {"id":"race_42","name":"Призрак","description":"Бестелесные сущности.","buffs":{"magicDefense":5,"defense":5,"attack":-2,"hp":-10}};
RACES_LIST.push(RACE_CATALOG['race_42']);
RACE_CATALOG['race_43'] = {"id":"race_43","name":"Тифлинг","description":"В их жилах течет кровь демонов.","buffs":{"magicAttack":3,"critRate":2}};
RACES_LIST.push(RACE_CATALOG['race_43']);
RACE_CATALOG['race_44'] = {"id":"race_44","name":"Камбион","description":"Полудемоны.","buffs":{"attack":3,"magicAttack":2}};
RACES_LIST.push(RACE_CATALOG['race_44']);
RACE_CATALOG['race_45'] = {"id":"race_45","name":"Импы (Суккубы/Инкубы)","description":"Мастера обмана и иллюзий.","buffs":{"magicAttack":3,"agility":2}};
RACES_LIST.push(RACE_CATALOG['race_45']);
RACE_CATALOG['race_46'] = {"id":"race_46","name":"Демон","description":"Порождение инфернальных планов.","buffs":{"attack":4,"hp":20}};
RACES_LIST.push(RACE_CATALOG['race_46']);
RACE_CATALOG['race_47'] = {"id":"race_47","name":"Аазимар","description":"Несут в себе божественный свет.","buffs":{"magicDefense":4,"magicAttack":2}};
RACES_LIST.push(RACE_CATALOG['race_47']);
RACE_CATALOG['race_48'] = {"id":"race_48","name":"Нефилим","description":"Падшие ангелы.","buffs":{"attack":3,"magicAttack":3}};
RACES_LIST.push(RACE_CATALOG['race_48']);
RACE_CATALOG['race_49'] = {"id":"race_49","name":"Ангел","description":"Слуги небес.","buffs":{"magicDefense":3,"defense":2,"hp":20}};
RACES_LIST.push(RACE_CATALOG['race_49']);
RACE_CATALOG['race_50'] = {"id":"race_50","name":"Валькирия","description":"Крылатые девы-воительницы.","buffs":{"attack":3,"agility":3}};
RACES_LIST.push(RACE_CATALOG['race_50']);
RACE_CATALOG['race_51'] = {"id":"race_51","name":"Ифрит (Огненный Дженази)","description":"Существа из чистого пламени.","buffs":{"magicAttack":4,"attack":1}};
RACES_LIST.push(RACE_CATALOG['race_51']);
RACE_CATALOG['race_52'] = {"id":"race_52","name":"Ундина (Водный Дженази)","description":"Дети водоемов.","buffs":{"mp":30,"magicDefense":3}};
RACES_LIST.push(RACE_CATALOG['race_52']);
RACE_CATALOG['race_53'] = {"id":"race_53","name":"Сильф (Воздушный Дженази)","description":"Легкие как бриз.","buffs":{"agility":6}};
RACES_LIST.push(RACE_CATALOG['race_53']);
RACE_CATALOG['race_54'] = {"id":"race_54","name":"Гном (Земляной Дженази)","description":"Крепкие как скала.","buffs":{"defense":5,"hp":10}};
RACES_LIST.push(RACE_CATALOG['race_54']);
RACE_CATALOG['race_55'] = {"id":"race_55","name":"Элементаль Льда","description":"Созданы из вечной мерзлоты.","buffs":{"magicDefense":4,"defense":2}};
RACES_LIST.push(RACE_CATALOG['race_55']);
RACE_CATALOG['race_56'] = {"id":"race_56","name":"Элементаль Молнии","description":"Потрескивают от электричества.","buffs":{"magicAttack":3,"agility":3}};
RACES_LIST.push(RACE_CATALOG['race_56']);
RACE_CATALOG['race_57'] = {"id":"race_57","name":"Дух Тени","description":"Растворяются во мраке.","buffs":{"agility":4,"critRate":3}};
RACES_LIST.push(RACE_CATALOG['race_57']);
RACE_CATALOG['race_58'] = {"id":"race_58","name":"Энт (Древень)","description":"Шагающие деревья.","buffs":{"hp":60,"agility":-4}};
RACES_LIST.push(RACE_CATALOG['race_58']);
RACE_CATALOG['race_59'] = {"id":"race_59","name":"Дриада","description":"Духи леса.","buffs":{"magicAttack":3,"hp":15}};
RACES_LIST.push(RACE_CATALOG['race_59']);
RACE_CATALOG['race_60'] = {"id":"race_60","name":"Мандрагора","description":"Разумные корни.","buffs":{"mp":20,"magicDefense":3}};
RACES_LIST.push(RACE_CATALOG['race_60']);
RACE_CATALOG['race_61'] = {"id":"race_61","name":"Сарриен (Растение-человек)","description":"Полулюди из симбиоза лозы.","buffs":{"hp":20,"defense":2}};
RACES_LIST.push(RACE_CATALOG['race_61']);
RACE_CATALOG['race_62'] = {"id":"race_62","name":"Мерфолк (Сирена)","description":"Хозяева морских глубин.","buffs":{"mp":20,"agility":2}};
RACES_LIST.push(RACE_CATALOG['race_62']);
RACE_CATALOG['race_63'] = {"id":"race_63","name":"Тритон","description":"Отличные воины под водой.","buffs":{"attack":2,"defense":2}};
RACES_LIST.push(RACE_CATALOG['race_63']);
RACE_CATALOG['race_64'] = {"id":"race_64","name":"Акулочеловек","description":"Свирепые водные охотники.","buffs":{"attack":4,"hp":10}};
RACES_LIST.push(RACE_CATALOG['race_64']);
RACE_CATALOG['race_65'] = {"id":"race_65","name":"Краболюд","description":"Имеют невероятно прочный панцирь.","buffs":{"defense":6,"agility":-2}};
RACES_LIST.push(RACE_CATALOG['race_65']);
RACE_CATALOG['race_66'] = {"id":"race_66","name":"Арахнид (Чародей-паук)","description":"Хитрые ткачи судьбы.","buffs":{"agility":3,"magicAttack":2}};
RACES_LIST.push(RACE_CATALOG['race_66']);
RACE_CATALOG['race_67'] = {"id":"race_67","name":"Мантис","description":"Разумные богомолы с острыми лезвиями.","buffs":{"attack":3,"critRate":5}};
RACES_LIST.push(RACE_CATALOG['race_67']);
RACE_CATALOG['race_68'] = {"id":"race_68","name":"Рой","description":"Множество жуков в виде человека.","buffs":{"defense":3,"hp":15}};
RACES_LIST.push(RACE_CATALOG['race_68']);
RACE_CATALOG['race_69'] = {"id":"race_69","name":"Скорпионоид","description":"Имеют смертоносный ядовитый хвост.","buffs":{"attack":4,"defense":2}};
RACES_LIST.push(RACE_CATALOG['race_69']);
RACE_CATALOG['race_70'] = {"id":"race_70","name":"Голем (Каменный)","description":"Оживленные магией статуи.","buffs":{"hp":40,"defense":3,"agility":-3}};
RACES_LIST.push(RACE_CATALOG['race_70']);
RACE_CATALOG['race_71'] = {"id":"race_71","name":"Железный Голем","description":"Практически непробиваемы.","buffs":{"defense":6,"hp":10,"agility":-4}};
RACES_LIST.push(RACE_CATALOG['race_71']);
RACE_CATALOG['race_72'] = {"id":"race_72","name":"Кованый (Варфордж)","description":"Разумные механизмы.","buffs":{"defense":4,"attack":1}};
RACES_LIST.push(RACE_CATALOG['race_72']);
RACE_CATALOG['race_73'] = {"id":"race_73","name":"Гомункул","description":"Искусственно созданная жизнь.","buffs":{"magicAttack":2,"mp":20}};
RACES_LIST.push(RACE_CATALOG['race_73']);
RACE_CATALOG['race_74'] = {"id":"race_74","name":"Аберрация","description":"Пришедшие из-за грани реальности.","buffs":{"magicAttack":4,"magicDefense":4,"hp":-10}};
RACES_LIST.push(RACE_CATALOG['race_74']);
RACE_CATALOG['race_75'] = {"id":"race_75","name":"Иллитид (Пожиратель Разума)","description":"Управляют сознанием других.","buffs":{"magicAttack":6,"attack":-2}};
RACES_LIST.push(RACE_CATALOG['race_75']);
RACE_CATALOG['race_76'] = {"id":"race_76","name":"Астральный Странник","description":"Родом из звездных пустот.","buffs":{"mp":40,"magicDefense":2}};
RACES_LIST.push(RACE_CATALOG['race_76']);
RACE_CATALOG['race_77'] = {"id":"race_77","name":"Пустотник","description":"Создания энтропии.","buffs":{"critDamage":15,"agility":2}};
RACES_LIST.push(RACE_CATALOG['race_77']);
RACE_CATALOG['race_78'] = {"id":"race_78","name":"Эхо","description":"Копия кого-то, кто давно погиб.","buffs":{"agility":3,"magicDefense":2}};
RACES_LIST.push(RACE_CATALOG['race_78']);
RACE_CATALOG['race_79'] = {"id":"race_79","name":"Мимик","description":"Способны менять свою форму.","buffs":{"hp":15,"defense":2}};
RACES_LIST.push(RACE_CATALOG['race_79']);
RACE_CATALOG['race_80'] = {"id":"race_80","name":"Горгулья","description":"Каменные крылатые защитники.","buffs":{"defense":5,"agility":1}};
RACES_LIST.push(RACE_CATALOG['race_80']);
RACE_CATALOG['race_81'] = {"id":"race_81","name":"Кентавр","description":"Легендарные гибриды.","buffs":{"attack":3,"agility":3}};
RACES_LIST.push(RACE_CATALOG['race_81']);
RACE_CATALOG['race_82'] = {"id":"race_82","name":"Циклоп","description":"Одноглазые гиганты","buffs":{"attack":5,"hp":20,"critRate":-2}};
RACES_LIST.push(RACE_CATALOG['race_82']);
RACE_CATALOG['race_83'] = {"id":"race_83","name":"Джинн","description":"Существа из чистой магии.","buffs":{"magicAttack":4,"mp":25}};
RACES_LIST.push(RACE_CATALOG['race_83']);
RACE_CATALOG['race_84'] = {"id":"race_84","name":"Кендер","description":"Очень любопытные и бесстрашные.","buffs":{"agility":5,"mp":10}};
RACES_LIST.push(RACE_CATALOG['race_84']);
RACE_CATALOG['race_85'] = {"id":"race_85","name":"Гремлин","description":"Ломают всё, к чему прикасаются.","buffs":{"attack":2,"agility":3,"critRate":3}};
RACES_LIST.push(RACE_CATALOG['race_85']);
RACE_CATALOG['race_86'] = {"id":"race_86","name":"Кобольд","description":"Маленькие дальние родственники драконов.","buffs":{"agility":4,"magicDefense":2}};
RACES_LIST.push(RACE_CATALOG['race_86']);
RACE_CATALOG['race_87'] = {"id":"race_87","name":"Мурлок","description":"Мглррмгл!","buffs":{"agility":3,"hp":10}};
RACES_LIST.push(RACE_CATALOG['race_87']);
RACE_CATALOG['race_88'] = {"id":"race_88","name":"Метаморф (Шифтер)","description":"Меняют свой облик.","buffs":{"agility":2,"defense":2,"attack":2}};
RACES_LIST.push(RACE_CATALOG['race_88']);
RACE_CATALOG['race_89'] = {"id":"race_89","name":"Чейнджлинг","description":"Легко мимикрируют под других.","buffs":{"magicDefense":2,"agility":3}};
RACES_LIST.push(RACE_CATALOG['race_89']);
RACE_CATALOG['race_90'] = {"id":"race_90","name":"Йети","description":"Обитатели заоблачных вершин.","buffs":{"hp":30,"attack":3}};
RACES_LIST.push(RACE_CATALOG['race_90']);
RACE_CATALOG['race_91'] = {"id":"race_91","name":"Гарпия","description":"Полуптицы.","buffs":{"agility":5,"attack":1}};
RACES_LIST.push(RACE_CATALOG['race_91']);
RACE_CATALOG['race_92'] = {"id":"race_92","name":"Сатир","description":"Любители выпивки и веселья.","buffs":{"mp":20,"agility":3}};
RACES_LIST.push(RACE_CATALOG['race_92']);
RACE_CATALOG['race_93'] = {"id":"race_93","name":"Грифон","description":"Благородные пернатые львы.","buffs":{"attack":4,"agility":2}};
RACES_LIST.push(RACE_CATALOG['race_93']);
RACE_CATALOG['race_94'] = {"id":"race_94","name":"Киклоп","description":"Ужасающие здоровяки.","buffs":{"hp":35,"attack":4}};
RACES_LIST.push(RACE_CATALOG['race_94']);
RACE_CATALOG['race_95'] = {"id":"race_95","name":"Гуль","description":"Падальщики кладбищ.","buffs":{"attack":3,"agility":2}};
RACES_LIST.push(RACE_CATALOG['race_95']);
RACE_CATALOG['race_96'] = {"id":"race_96","name":"Дух Леса","description":"Сгусток природной энергии.","buffs":{"magicAttack":3,"mp":25}};
RACES_LIST.push(RACE_CATALOG['race_96']);
RACE_CATALOG['race_97'] = {"id":"race_97","name":"Черный Орк","description":"Элита орочьего племени.","buffs":{"attack":5,"defense":2}};
RACES_LIST.push(RACE_CATALOG['race_97']);
RACE_CATALOG['race_98'] = {"id":"race_98","name":"Серый Эльф","description":"Истинные аристократы в магии.","buffs":{"magicAttack":5,"mp":10}};
RACES_LIST.push(RACE_CATALOG['race_98']);
RACE_CATALOG['race_99'] = {"id":"race_99","name":"Мурелья","description":"Крысолюди-ассасины.","buffs":{"agility":6,"critRate":5}};
RACES_LIST.push(RACE_CATALOG['race_99']);
RACE_CATALOG['race_100'] = {"id":"race_100","name":"Дварф Хаоса","description":"Злобные архитекторы.","buffs":{"defense":4,"magicAttack":2}};
RACES_LIST.push(RACE_CATALOG['race_100']);
RACE_CATALOG['race_101'] = {"id":"race_101","name":"Человек-Акула","description":"Мастера кровожадности.","buffs":{"attack":5,"critRate":2}};
RACES_LIST.push(RACE_CATALOG['race_101']);
RACE_CATALOG['race_102'] = {"id":"race_102","name":"Сирена","description":"Очаровывают своим голосом.","buffs":{"magicAttack":2,"mp":30}};
RACES_LIST.push(RACE_CATALOG['race_102']);
RACE_CATALOG['race_103'] = {"id":"race_103","name":"Камнегрыз","description":"Жуют драгоценные камни для силы.","buffs":{"defense":5,"hp":15}};
RACES_LIST.push(RACE_CATALOG['race_103']);

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'News',
      [
        {
          title: 'Лекция «Пушкиниана Николая Ульянова»',
          text: 'Лекция посявщенная картинам Николая Ульянова, который рассматривал судьбу Пушкина с позиции личностной трансформации поэта, выражавшейся в повседневных проявлениях.',
          museumId: 16,
          photo: 'http://localhost:3000/newsImages/пушкинлиада.jpg',
          date: new Date('2024-06-06T19:00:00'),
          createdAt: new Date(),
          updatedAt: new Date(),
          title_en: 'Lecture "Pushkiniana of Nikolai Ulyanov"',
          text_en:
            'A lecture dedicated to the paintings of Nikolai Ulyanov, who examined the fate of Pushkin from the position of the poet’s personal transformation, expressed in everyday manifestations.',
          title_de: 'Lecture "Pushkiniana of Nikolai Ulyanov"',
          text_de:
            'Ein Vortrag über die Gemälde von Nikolai Uljanow, der das Schicksal Puschkins aus der Perspektive der persönlichen Transformation des Dichters untersuchte, die sich in alltäglichen Erscheinungsformen ausdrückte.',
        },
        {
          title: 'Лекция «Художники из рода Васнецовых»',
          text: 'Лекция знакомит с историей художественных ветвей рода Васнецовых, начиная с XVII века по настоящее время, а также с жизнью и творчеством как профессиональных художников, начиная со знаменитых академиков Российской академии художеств, так и членов Союза художников.',
          museumId: 16,
          photo: 'http://localhost:3000/newsImages/васнецовы.jpg',
          date: new Date('2024-06-07T19:00:00'),
          createdAt: new Date(),
          updatedAt: new Date(),
          title_en: 'Lecture "Artists from the Vasnetsov Family"',
          text_en:
            'The lecture introduces the history of the artistic branches of the Vasnetsov family, from the 17th century to the present, as well as the life and work of both professional artists, starting with the famous academicians of the Russian Academy of Arts, and members of the Union of Artists.',
          title_de: 'Vortrag "Künstler aus der Familie Vasnetsov"',
          text_de:
            'Der Vortrag stellt die Geschichte der künstlerischen Zweige der Familie Wasnezow vom 17. Jahrhundert bis zur Gegenwart sowie das Leben und Werk beider professionellen Künstler vor, angefangen bei den berühmten Akademikern der Russischen Akademie der Künste bis hin zu Mitgliedern der Russischen Akademie der Künste Union der Künstler.',
        },
        {
          title:
            'Выставка «История создания памятника императору Александру II в Московском Кремле»',
          text: 'Выставка познакомит посетителей с историей создания памятника Александру II, который находился напротив Николаевского дворца, где родился император, и был снесен после переезда советского правительства в Кремль в 1918 году.',
          museumId: 27,
          photo: 'http://localhost:3000/newsImages/памятникАлександру2.jpg',
          date: new Date('2024-06-08T19:00:00'),
          createdAt: new Date(),
          updatedAt: new Date(),
          title_en:
            'Exhibition "The History of the Creation of the Monument to Emperor Alexander II in the Moscow Kremlin"',
          text_en:
            'The exhibition will introduce visitors to the history of the creation of the monument to Alexander II, which was located opposite the Nicholas Palace, where the emperor was born, and was demolished after the Soviet government moved to the Kremlin in 1918.',
          title_de:
            'Ausstellung "Die Geschichte der Entstehung des Denkmals für Kaiser Alexander II. im Moskauer Kreml"',
          text_de:
            'Die Ausstellung führt die Besucher in die Entstehungsgeschichte des Denkmals für Alexander II. ein, das sich gegenüber dem Nikolauspalast, dem Geburtsort des Kaisers, befand und nach dem Umzug der Sowjetregierung in den Kreml im Jahr 1918 abgerissen wurde.',
        },
        {
          title: 'Новые загадки картин Леонардо да Винчи',
          text: 'На выставке будут экспонироваться две картины, связанные с именем Леонардо да Винчи и его учениками: «Мадонна в скалах» и «Битва при Ангиари».',
          museumId: 1,
          photo: 'http://localhost:3000/newsImages/леонардопитер.jpg',
          date: new Date('2024-06-06T16:00:00'),
          createdAt: new Date(),
          updatedAt: new Date(),
          title_en: "New Mysteries of Leonardo da Vinci's Paintings",
          text_en:
            'The exhibition will feature two paintings associated with the name of Leonardo da Vinci and his students: “Madonna of the Rocks” and “The Battle of Anghiari.”',
          title_de: 'Neue Rätsel von Leonardo da Vincis Gemälden',
          text_de:
            'In der Ausstellung werden zwei Gemälde gezeigt, die mit dem Namen Leonardo da Vinci und seinen Schülern verbunden sind: „Felsenmadonna“ und „Die Schlacht von Anghiari“.',
        },
        {
          title: 'Рисунки и акварели передвижников',
          text: 'В залах выставки «Рисунки и акварели передвижников» можно увидеть графические произведения, созданные как патриархами Товарищества передвижных художественных выставок (1870–1923), так и художниками младшего поколения.',
          museumId: 2,
          photo: 'http://localhost:3000/newsImages/передвижникипитер.jpg',
          date: new Date('2024-06-07T18:30:00'),
          createdAt: new Date(),
          updatedAt: new Date(),
          title_en: 'Drawings and Watercolors of the Itinerants',
          text_en:
            'In the halls of the exhibition “Drawings and Watercolors of the Peredvizhniki” you can see graphic works created by both the patriarchs of the Association of Traveling Art Exhibitions (1870–1923) and artists of the younger generation.',
          title_de: 'Zeichnungen und Aquarelle der Wanderkünstler',
          text_de:
            'In den Sälen der Ausstellung „Zeichnungen und Aquarelle der Peredwischniki“ sind grafische Werke zu sehen, die sowohl von den Patriarchen des Vereins der Wanderkunstausstellungen (1870–1923) als auch von Künstlern der jüngeren Generation geschaffen wurden.',
        },
        {
          title: 'Война и мир Порт-Артура',
          text: 'В Центральном военно-морском музее имени императора Петра Великого с 21 марта начнет работать новая временная выставка «Война и мир Порт-Артура», посвященная 120-летию начала Русско-японской войны.',
          museumId: 10,
          photo: 'http://localhost:3000/newsImages/портартурапитер.jpg',
          date: new Date('2024-06-08T17:00:00'),
          createdAt: new Date(),
          updatedAt: new Date(),
          title_en: 'War and Peace of Port Arthur',
          text_en:
            'A new temporary exhibition “War and Peace of Port Arthur”, dedicated to the 120th anniversary of the start of the Russo-Japanese War, will open at the Central Naval Museum named after Emperor Peter the Great on March 21.',
          title_de: 'Krieg und Frieden von Port Arthur',
          text_de:
            'Am 21. März wird im nach Kaiser Peter dem Großen benannten Central Naval Museum eine neue Wechselausstellung „Krieg und Frieden von Port Arthur“ eröffnet, die dem 120. Jahrestag des Beginns des Russisch-Japanischen Krieges gewidmet ist.',
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('News', null, {});
  },
};

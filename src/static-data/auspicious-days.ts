export interface IAuspicious {
  num: number;
  auspicious: boolean;
  description?: string;
}

export const auspiciousMoonDays: IAuspicious[] = [
  { num: 1, auspicious: false },
  { num: 2, auspicious: false },
  { num: 3, auspicious: false },
  { num: 4, auspicious: false },
  { num: 5, auspicious: true, description: "Матеріальне становище" },
  { num: 6, auspicious: false },
  { num: 7, auspicious: false },
  { num: 8, auspicious: true, description: "Здоров'я, довголіття" },
  { num: 9, auspicious: false },
  { num: 10, auspicious: false },
  { num: 11, auspicious: true, description: "Розум" },
  {
    num: 12,
    auspicious: false,
    description: "Дуже несприятливий день для стрижки",
  },
  { num: 13, auspicious: true, description: "Щастя, краса" },
  { num: 14, auspicious: true, description: "Благополуччя, здоров'я" },
  { num: 15, auspicious: false },
  { num: 16, auspicious: false },
  { num: 17, auspicious: false },
  { num: 18, auspicious: false },
  { num: 19, auspicious: true, description: "Довголіття" },
  { num: 20, auspicious: false },
  { num: 21, auspicious: true, description: "Чарівність" },
  {
    num: 22,
    auspicious: false,
    description: "Набір ваги, примноження власності",
  },
  { num: 23, auspicious: true, description: "Краса" },
  { num: 24, auspicious: false },
  { num: 25, auspicious: false },
  { num: 26, auspicious: true, description: "Щастя" },
  { num: 27, auspicious: true, description: "Щастя" },
  { num: 28, auspicious: true, description: "Чарівність" },
  { num: 29, auspicious: false },
  { num: 30, auspicious: false },
];

export const auspiciousMoonSigns: IAuspicious[] = [
  {
    num: 0,
    auspicious: false,
    description: "загострення хронічних захворювань",
  },
  {
    num: 1,
    auspicious: true,
    description: "Дуже сприятливий день для стрижки",
  },
  { num: 2, auspicious: true, description: "Швидкій ріст волосся" },
  { num: 3, auspicious: false, description: "Неслухняне волосся" },
  { num: 4, auspicious: true, description: "Пишна зачіска" },
  { num: 5, auspicious: true, description: "Дуже сприятливий день" },
  { num: 6, auspicious: true, description: "Швидкій ріст волосся" },
  { num: 7, auspicious: false, description: "Проблеми в особистому житті" },
  { num: 8, auspicious: true, description: "Успіх в роботі" },
  { num: 9, auspicious: true, description: "Дуже сприятливий день" },
  { num: 10, auspicious: false, description: "Невдоволення" },
  { num: 11, auspicious: false, description: "Лупа" },
];

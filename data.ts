import type { Student } from './types';
export const seedStudents: Student[] = [
 {id:1,name:'Aïcha Abdou',class:'CM2 A',gender:'Fille',parent:'M. Abdou',phone:'96 12 34 56',fee:75000,paid:75000},
 {id:2,name:'Moussa Ibrahim',class:'CM1 B',gender:'Garçon',parent:'Mme Ibrahim',phone:'90 23 45 67',fee:75000,paid:50000},
 {id:3,name:'Fatima Issa',class:'CE2 A',gender:'Fille',parent:'M. Issa',phone:'98 45 67 89',fee:65000,paid:65000},
 {id:4,name:'Amadou Mahamadou',class:'CM2 A',gender:'Garçon',parent:'Mme Mahamadou',phone:'92 11 22 33',fee:75000,paid:25000},
 {id:5,name:'Zara Oumarou',class:'CE1 B',gender:'Fille',parent:'M. Oumarou',phone:'96 88 77 66',fee:60000,paid:60000},
 {id:6,name:'Ibrahim Garba',class:'CP A',gender:'Garçon',parent:'Mme Garba',phone:'90 55 44 33',fee:55000,paid:0}
];
export const classNames=['CI A','CP A','CP B','CE1 A','CE1 B','CE2 A','CM1 B','CM2 A'];

export type Page = 'dashboard' | 'students' | 'classes' | 'attendance' | 'payments' | 'settings';
export interface Student { id: number; name: string; class: string; gender: string; parent: string; phone: string; fee: number; paid: number }
export type AttendanceMap = Record<string, Record<number, boolean>>;

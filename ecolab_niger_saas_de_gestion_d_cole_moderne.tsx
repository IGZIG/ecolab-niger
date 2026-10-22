import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  BookOpen,
  FileCheck,
  CreditCard,
  CheckCircle2,
  Bell,
  Search,
  Plus,
  Moon,
  Sun,
  Printer,
  Download,
  X,
  Phone,
  Mail,
  Award,
  BookMarked,
  DollarSign,
  UserPlus,
  Smartphone,
  Send,
  Building2,
  MapPin,
  Calendar,
  Filter,
  Check,
  AlertTriangle,
  LogOut,
  TrendingUp,
  FileText
} from 'lucide-react';

// --- INITIAL NIGER DEMO DATA ---
const SCHOOL_INFO = {
  name: "Complexe Scolaire Privé L'Écoute",
  city: "Niamey, Niger",
  address: "Quartier Plateau, Avenue de la Francophonie",
  phone: "+227 20 73 45 12",
  email: "contact@ecole-lecoute.ne",
  ministryHeader: "RÉPUBLIQUE DU NIGER\nMinistère de l'Éducation Nationale, de l'Alphabétisation, de l'Enseignement Professionnel et de la Promotion des Langues Nationales\n---\nDirection Régionale de l'Éducation Nationale de Niamey",
  academicYear: "2026-2027"
};

const initialStudents = [
  {
    id: 'NIG-2026-001',
    firstname: 'Aïchatou',
    lastname: 'Mamadou',
    level: 'Lycée',
    class: 'Terminale D',
    gender: 'F',
    dob: '2008-04-12',
    pob: 'Niamey',
    parentName: 'Ibrahim Mamadou',
    parentPhone: '+227 96 12 34 56',
    parentEmail: 'i.mamadou@gmail.ne',
    status: 'Payé',
    totalFees: 250000,
    amountPaid: 250000,
    amountDue: 0,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    attendanceRate: 98,
    averageGrade: 15.8,
    rank: 2,
    examTarget: 'BAC D'
  },
  {
    id: 'NIG-2026-002',
    firstname: 'Oumarou',
    lastname: 'Seydou',
    level: 'Collège',
    class: '3ème A',
    gender: 'M',
    dob: '2011-09-20',
    pob: 'Zinder',
    parentName: 'Abdoulaye Seydou',
    parentPhone: '+227 90 23 45 67',
    parentEmail: 'a.seydou@yahoo.fr',
    status: 'Partiel',
    totalFees: 180000,
    amountPaid: 120000,
    amountDue: 60000,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    attendanceRate: 92,
    averageGrade: 13.5,
    rank: 8,
    examTarget: 'BEPC'
  },
  {
    id: 'NIG-2026-003',
    firstname: 'Fatimata',
    lastname: 'Garba',
    level: 'Lycée',
    class: '1ère C',
    gender: 'F',
    dob: '2009-01-15',
    pob: 'Maradi',
    parentName: 'Dr. Salifou Garba',
    parentPhone: '+227 91 88 77 66',
    parentEmail: 'salif.garba@office.ne',
    status: 'En retard',
    totalFees: 230000,
    amountPaid: 80000,
    amountDue: 150000,
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    attendanceRate: 86,
    averageGrade: 16.2,
    rank: 1,
    examTarget: 'Passage Tle C'
  },
  {
    id: 'NIG-2026-004',
    firstname: 'Mahamadou',
    lastname: 'Issoufou',
    level: 'Primaire',
    class: 'CM2 B',
    gender: 'M',
    dob: '2015-06-30',
    pob: 'Tahoua',
    parentName: 'Mariama Issoufou',
    parentPhone: '+227 80 45 67 89',
    parentEmail: 'm.issoufou@gmail.com',
    status: 'Payé',
    totalFees: 120000,
    amountPaid: 120000,
    amountDue: 0,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    attendanceRate: 100,
    averageGrade: 17.4,
    rank: 1,
    examTarget: 'CFEPD'
  },
  {
    id: 'NIG-2026-005',
    firstname: 'Zalika',
    lastname: 'Souley',
    level: 'Lycée',
    class: 'Terminale D',
    gender: 'F',
    dob: '2008-11-05',
    pob: 'Agadez',
    parentName: 'Colonel Souley',
    parentPhone: '+227 97 11 22 33',
    parentEmail: 'col.souley@gov.ne',
    status: 'Payé',
    totalFees: 250000,
    amountPaid: 250000,
    amountDue: 0,
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    attendanceRate: 95,
    averageGrade: 14.1,
    rank: 5,
    examTarget: 'BAC D'
  }
];

const initialTeachers = [
  { id: 'ENS-01', name: 'M. Ali Moussa', subject: 'Mathématiques', type: 'Permanent', hourlyRate: 0, phone: '+227 96 44 33 22', classes: ['Terminale D', '1ère C', '3ème A'], status: 'Actif' },
  { id: 'ENS-02', name: 'Mme. Amina Abdou', subject: 'Français & Littérature', type: 'Vacataire', hourlyRate: 3500, phone: '+227 90 55 66 77', classes: ['3ème A', '6ème A'], status: 'Actif' },
  { id: 'ENS-03', name: 'Dr. Hamani Saley', subject: 'Physique-Chimie', type: 'Permanent', hourlyRate: 0, phone: '+227 91 11 22 33', classes: ['Terminale D', '1ère C'], status: 'Actif' },
  { id: 'ENS-04', name: 'M. Hassane Boubacar', subject: 'Sciences de la Vie et de la Terre (SVT)', type: 'Vacataire', hourlyRate: 3000, phone: '+227 80 99 88 77', classes: ['Terminale D', '3ème A'], status: 'En congé' }
];

const initialClasses = [
  { id: 'CL-01', name: 'CM2 B', level: 'Primaire', room: 'Salle P-04', mainTeacher: 'Mme. Balkissa Yacouba', studentsCount: 32, capacity: 35 },
  { id: 'CL-02', name: '3ème A', level: 'Collège', room: 'Salle C-102', mainTeacher: 'Mme. Amina Abdou', studentsCount: 38, capacity: 40 },
  { id: 'CL-03', name: '1ère C', level: 'Lycée', room: 'Salle L-201', mainTeacher: 'M. Ali Moussa', studentsCount: 28, capacity: 30 },
  { id: 'CL-04', name: 'Terminale D', level: 'Lycée', room: 'Salle L-204', mainTeacher: 'Dr. Hamani Saley', studentsCount: 30, capacity: 32 }
];

const initialGrades = [
  { id: 101, studentId: 'NIG-2026-001', studentName: 'Aïchatou Mamadou', class: 'Terminale D', subject: 'Mathématiques', coef: 5, grade: 16.5, date: '2026-10-10', evalName: 'Devoir Surveillé N°1' },
  { id: 102, studentId: 'NIG-2026-001', studentName: 'Aïchatou Mamadou', class: 'Terminale D', subject: 'Physique-Chimie', coef: 5, grade: 15.0, date: '2026-10-12', evalName: 'Devoir Surveillé N°1' },
  { id: 103, studentId: 'NIG-2026-001', studentName: 'Aïchatou Mamadou', class: 'Terminale D', subject: 'SVT', coef: 5, grade: 17.0, date: '2026-10-15', evalName: 'TP Grossissement & Cellules' },
  { id: 104, studentId: 'NIG-2026-002', studentName: 'Oumarou Seydou', class: '3ème A', subject: 'Français', coef: 3, grade: 12.5, date: '2026-10-08', evalName: 'Dictée-Questions BEPC' },
  { id: 105, studentId: 'NIG-2026-003', studentName: 'Fatimata Garba', class: '1ère C', subject: 'Mathématiques', coef: 6, grade: 18.0, date: '2026-10-11', evalName: 'Devoir de Synthèse' }
];

const initialPayments = [
  { id: 'REC-NE-881', studentId: 'NIG-2026-001', studentName: 'Aïchatou Mamadou', class: 'Terminale D', amount: 250000, tranche: 'Solde Total', date: '2026-09-05', method: 'Airtel Money', ref: 'AM-99201-NE' },
  { id: 'REC-NE-882', studentId: 'NIG-2026-002', studentName: 'Oumarou Seydou', class: '3ème A', amount: 120000, tranche: '1ère Tranche (Inscription)', date: '2026-09-08', method: 'Moov Money / Zamani', ref: 'MM-44120-NE' },
  { id: 'REC-NE-883', studentId: 'NIG-2026-004', studentName: 'Mahamadou Issoufou', class: 'Primaire', amount: 120000, tranche: 'Solde Total', date: '2026-09-10', method: 'Espèces (Caisse)', ref: 'CS-00129' },
  { id: 'REC-NE-884', studentId: 'NIG-2026-003', studentName: 'Fatimata Garba', class: '1ère C', amount: 80000, tranche: 'Acompte Inscription', date: '2026-09-15', method: 'Nita / Al Izza Transfert', ref: 'NT-88120' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Main collections
  const [students, setStudents] = useState(initialStudents);
  const [teachers, setTeachers] = useState(initialTeachers);
  const [classesList] = useState(initialClasses);
  const [grades, setGrades] = useState(initialGrades);
  const [payments, setPayments] = useState(initialPayments);

  // Active Modals & Selected Objects
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  
  const [selectedStudentForProfile, setSelectedStudentForProfile] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [selectedStudentForBulletin, setSelectedStudentForBulletin] = useState(null);

  // Attendance Tracker
  const [selectedAttendanceClass, setSelectedAttendanceClass] = useState('Terminale D');
  const [attendanceMap, setAttendanceMap] = useState({
    'NIG-2026-001': 'present',
    'NIG-2026-005': 'present'
  });

  // Dynamic Toast
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3800);
  };

  // Niger totals
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalCollectedFCFA = payments.reduce((acc, p) => acc + p.amount, 0);
  const totalExpectedFCFA = students.reduce((acc, s) => acc + s.totalFees, 0);
  const totalDueFCFA = students.reduce((acc, s) => acc + s.amountDue, 0);
  const recoveryRate = Math.round((totalCollectedFCFA / (totalExpectedFCFA || 1)) * 100);

  return (
    <div className={`min-h-screen flex font-sans antialiased selection:bg-emerald-600 selection:text-white ${darkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* SIDEBAR */}
      <aside className={`w-64 border-r flex flex-col justify-between transition-colors duration-200 z-20 ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div>
          {/* Logo Brand */}
          <div className="h-20 flex items-center px-5 border-b border-slate-200 dark:border-slate-800 gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-xl tracking-tight text-emerald-600 dark:text-emerald-400">Ecolab</h1>
                <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-amber-500 text-slate-900">NIGER</span>
              </div>
              <p className="text-[11px] font-medium text-slate-400">Gestion Scolaire M.E.N</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Menu Principal</p>
            {[
              { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard },
              { id: 'students', label: 'Gestion Élèves', icon: Users, badge: totalStudents },
              { id: 'teachers', label: 'Enseignants & Vacations', icon: BookOpen, badge: totalTeachers },
              { id: 'classes', label: 'Classes & Programmes', icon: BookMarked },
              { id: 'grades', label: 'Notes & Bulletins M.E.N', icon: Award },
              { id: 'finance', label: 'Caisse & Recouvrement', icon: CreditCard },
              { id: 'attendance', label: 'Appel Quotidien & SMS', icon: FileCheck },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                      : darkMode
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="text-xs font-semibold">{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer School Context */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200">
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="truncate">{SCHOOL_INFO.name}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
              <MapPin className="w-3 h-3" />
              <span>{SCHOOL_INFO.city}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Année: <strong>{SCHOOL_INFO.academicYear}</strong></span>
            <button className="text-slate-400 hover:text-rose-500 transition-colors" title="Déconnexion">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* HEADER TOPBAR */}
        <header className={`h-16 border-b flex items-center justify-between px-6 z-10 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          {/* Global Search Input */}
          <div className="relative w-72 md:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher élève (NIG-...), enseignant, classe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                darkMode ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500' : 'bg-slate-100/70 border-slate-200 text-slate-800 placeholder-slate-400'
              }`}
            />
          </div>

          {/* Header Utilities */}
          <div className="flex items-center gap-3">
            {/* Currency Badge */}
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-xl">
              <span>Devise:</span>
              <span className="font-extrabold">FCFA (XOF)</span>
            </span>

            {/* Dark/Light Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl border transition-colors ${
                darkMode ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Quick Add Student Button */}
            <button
              onClick={() => setIsStudentModalOpen(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Inscrire un Élève</span>
            </button>
          </div>
        </header>

        {/* TOAST BANNER */}
        {toast && (
          <div className="fixed top-20 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 animate-in slide-in-from-right-5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-semibold">{toast.message}</span>
          </div>
        )}

        {/* MAIN BODY SWITCHER */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Official Niger Banner */}
              <div className="rounded-2xl bg-gradient-to-r from-emerald-700 via-teal-700 to-slate-900 p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-emerald-500/20">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-500 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded uppercase">RÉPUBLIQUE DU NIGER</span>
                    <span className="text-xs text-emerald-200 font-medium">M.E.N / DREN Niamey</span>
                  </div>
                  <h2 className="text-2xl font-black tracking-tight">{SCHOOL_INFO.name}</h2>
                  <p className="text-xs text-emerald-100 max-w-xl">
                    Plateforme unifiée de suivi pédagogique, frais de scolarité FCFA, fiches M.E.N et examens nationaux (BEPC & BAC 2027).
                  </p>
                </div>
                
                <div className="flex flex-wrap md:flex-col gap-2 text-right">
                  <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-semibold border border-white/10">
                    Scolarité Collectée: <span className="font-extrabold text-amber-300">{totalCollectedFCFA.toLocaleString()} FCFA</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-semibold border border-white/10">
                    Date d'échéance BAC/BEPC: <span className="font-extrabold text-emerald-300">15 Janvier 2027</span>
                  </div>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: 'Total Élèves Inscrits', value: totalStudents, change: '100% enregistrés M.E.N', icon: Users, color: 'from-emerald-500 to-teal-600' },
                  { label: 'Frais Encaissés (FCFA)', value: `${totalCollectedFCFA.toLocaleString()} FCFA`, change: `Reste ${totalDueFCFA.toLocaleString()} FCFA`, icon: CreditCard, color: 'from-amber-500 to-orange-600' },
                  { label: 'Taux de Recouvrement', value: `${recoveryRate}%`, change: 'Objectif 100% au 31 Mars', icon: TrendingUp, color: 'from-blue-500 to-indigo-600' },
                  { label: 'Enseignants & Vacataires', value: totalTeachers, change: 'Permanents & Vacataires', icon: BookOpen, color: 'from-purple-500 to-violet-600' }
                ].map((kpi, idx) => {
                  const Icon = kpi.icon;
                  return (
                    <div key={idx} className={`p-5 rounded-2xl border shadow-sm transition-all ${
                      darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200/80'
                    }`}>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{kpi.label}</span>
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center text-white shadow-md`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="mt-3">
                        <h3 className="text-xl font-extrabold">{kpi.value}</h3>
                        <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-1">{kpi.change}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Exam Registration Alert & Financial Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Exam Preparedness Widget */}
                <div className={`lg:col-span-2 p-6 rounded-2xl border shadow-sm ${
                  darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200/80'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-base">Préparation aux Examens Nationaux (BEPC & BAC)</h3>
                      <p className="text-xs text-slate-400">Suivi de l'état d'avancement des dossiers candidats</p>
                    </div>
                    <span className="text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold px-2.5 py-1 rounded-lg">Session 2027</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-700 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-sm text-emerald-600">Candidats BEPC (3ème)</span>
                        <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">100% validés</span>
                      </div>
                      <p className="text-xs text-slate-500">38 élèves inscrits avec photos d'identité et numéros de matrice M.E.N enregistrés.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-700 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-sm text-amber-600">Candidats BAC D (Terminale D)</span>
                        <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">30/30 dossiers</span>
                      </div>
                      <p className="text-xs text-slate-500">Livrets scolaires et relevés de notes du 1er trimestre générés.</p>
                    </div>
                  </div>
                </div>

                {/* Local Payment Methods Breakdowns */}
                <div className={`p-6 rounded-2xl border shadow-sm flex flex-col justify-between ${
                  darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200/80'
                }`}>
                  <div>
                    <h3 className="font-bold text-base">Canaux de Paiement Utilisés</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Répartition des paiements au Niger</p>
                  </div>

                  <div className="space-y-3.5 my-4 text-xs">
                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span className="text-rose-600">Airtel Money (+227)</span>
                        <span>45%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div className="bg-rose-500 h-full w-[45%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span className="text-purple-600">Moov Money / Zamani</span>
                        <span>30%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div className="bg-purple-600 h-full w-[30%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span className="text-emerald-600">Espèces (Caisse École)</span>
                        <span>15%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[15%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-bold mb-1">
                        <span className="text-blue-600">Nita / Al Izza Transfert</span>
                        <span>10%</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-[10%]" />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('finance')}
                    className="w-full py-2.5 text-center text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 rounded-xl transition-colors"
                  >
                    Gérer la Caisse & Recouvrement &rarr;
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: GESTION ÉLÈVES */}
          {activeTab === 'students' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">Gestion des Élèves Inscrits</h2>
                  <p className="text-xs text-slate-400">Recherche, consultation et suivi des frais par élève (Matricules M.E.N Niger).</p>
                </div>
                <button
                  onClick={() => setIsStudentModalOpen(true)}
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-emerald-600/20"
                >
                  <UserPlus className="w-4 h-4" />
                  Nouvel Élève
                </button>
              </div>

              {/* Students Table */}
              <div className={`rounded-2xl border shadow-sm overflow-hidden ${
                darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200/80'
              }`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className={`uppercase tracking-wider border-b text-[10px] ${
                      darkMode ? 'bg-slate-900/50 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}>
                      <tr>
                        <th className="px-5 py-4">Élève & Photo</th>
                        <th className="px-5 py-4">Matricule</th>
                        <th className="px-5 py-4">Niveau / Classe</th>
                        <th className="px-5 py-4">Tuteur (+227)</th>
                        <th className="px-5 py-4">Moyenne 1er Tri.</th>
                        <th className="px-5 py-4">Statut Scolarité</th>
                        <th className="px-5 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 font-medium">
                      {students
                        .filter(s =>
                          `${s.firstname} ${s.lastname} ${s.id} ${s.class} ${s.parentPhone}`.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((student) => (
                          <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-3">
                                <img src={student.photo} alt={student.firstname} className="w-9 h-9 rounded-full object-cover border border-emerald-500/30" />
                                <div>
                                  <p className="font-bold text-slate-800 dark:text-slate-100">{student.firstname} {student.lastname}</p>
                                  <p className="text-[10px] text-slate-400">Né(e) à {student.pob}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-3.5 font-mono text-[11px] font-bold text-slate-500">{student.id}</td>
                            <td className="px-5 py-3.5">
                              <span className="px-2.5 py-1 rounded-lg font-bold text-[10px] bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                                {student.class}
                              </span>
                            </td>
                            <td className="px-5 py-3.5">
                              <p className="font-semibold">{student.parentName}</p>
                              <p className="text-[10px] text-emerald-600 font-mono">{student.parentPhone}</p>
                            </td>
                            <td className="px-5 py-3.5 font-bold text-slate-800 dark:text-slate-100">
                              {student.averageGrade} / 20
                            </td>
                            <td className="px-5 py-3.5">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                student.status === 'Payé'
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                                  : student.status === 'Partiel'
                                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                                  : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                              }`}>
                                {student.status} ({student.amountPaid.toLocaleString()} FCFA)
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-right space-x-2">
                              <button
                                onClick={() => setSelectedStudentForProfile(student)}
                                className="px-2.5 py-1.5 bg-slate-100 hover:bg-emerald-600 hover:text-white dark:bg-slate-700 rounded-lg text-[11px] font-bold transition-colors"
                              >
                                Fiche
                              </button>
                              <button
                                onClick={() => setSelectedStudentForBulletin(student)}
                                className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white dark:bg-indigo-950/50 rounded-lg text-[11px] font-bold transition-colors"
                              >
                                Bulletin M.E.N
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ENSEIGNANTS & VACATAIRES */}
          {activeTab === 'teachers' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">Corps Enseignant & Vacataires</h2>
                  <p className="text-xs text-slate-400">Suivi des enseignants permanents et taux horaires vacataires en FCFA.</p>
                </div>
                <button
                  onClick={() => setIsTeacherModalOpen(false)}
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-emerald-600/20"
                >
                  <Plus className="w-4 h-4" />
                  Nouveau Professeur
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {teachers.map((t) => (
                  <div key={t.id} className={`p-5 rounded-2xl border shadow-sm ${
                    darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200/80'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                          t.type === 'Permanent' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {t.type}
                        </span>
                        <h3 className="font-extrabold text-base mt-2">{t.name}</h3>
                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{t.subject}</p>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{t.id}</span>
                    </div>

                    <div className="mt-4 space-y-2 text-xs border-t border-slate-100 dark:border-slate-700 pt-3">
                      <div className="flex justify-between text-slate-500">
                        <span>Téléphone Niger:</span>
                        <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{t.phone}</span>
                      </div>
                      {t.type === 'Vacataire' && (
                        <div className="flex justify-between text-slate-500">
                          <span>Taux horaire:</span>
                          <span className="font-bold text-emerald-600">{t.hourlyRate.toLocaleString()} FCFA / h</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Classes Enseignées</p>
                      <div className="flex flex-wrap gap-1.5">
                        {t.classes.map((cls, i) => (
                          <span key={i} className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] px-2.5 py-1 rounded-lg font-bold">
                            {cls}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CLASSES */}
          {activeTab === 'classes' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold">Classes & Effectifs</h2>
                <p className="text-xs text-slate-400">Répartition par cycles (Primaire, Collège, Lycée - Séries A, C, D).</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {classesList.map((c) => (
                  <div key={c.id} className={`p-5 rounded-2xl border shadow-sm ${
                    darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200/80'
                  }`}>
                    <span className="text-[10px] uppercase font-bold text-emerald-600">{c.level}</span>
                    <h3 className="text-xl font-black mt-1">{c.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{c.room}</p>

                    <div className="mt-4 space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-500">
                        <span>Prof. Principal:</span>
                        <span className="font-bold text-slate-700 dark:text-slate-300">{c.mainTeacher}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Effectif:</span>
                        <span className="font-extrabold text-emerald-600">{c.studentsCount} / {c.capacity} Élèves</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: NOTES & BULLETINS M.E.N */}
          {activeTab === 'grades' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">Saisie des Notes & Bulletins Trimestriels</h2>
                  <p className="text-xs text-slate-400">Calcul automatique des moyennes coefficientées selon le programme officiel du Niger.</p>
                </div>
                <button
                  onClick={() => setIsGradeModalOpen(true)}
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-emerald-600/20"
                >
                  <Plus className="w-4 h-4" />
                  Saisir une Note
                </button>
              </div>

              <div className={`rounded-2xl border shadow-sm overflow-hidden ${
                darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200/80'
              }`}>
                <div className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold text-xs">
                  Dernières Évaluations Saisies (1er Trimestre)
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className={`uppercase tracking-wider border-b text-[10px] ${
                      darkMode ? 'bg-slate-900/50 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}>
                      <tr>
                        <th className="px-5 py-3.5">Élève</th>
                        <th className="px-5 py-3.5">Classe</th>
                        <th className="px-5 py-3.5">Matière</th>
                        <th className="px-5 py-3.5">Intitulé</th>
                        <th className="px-5 py-3.5">Coef</th>
                        <th className="px-5 py-3.5">Note / 20</th>
                        <th className="px-5 py-3.5">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 font-medium">
                      {grades.map((g) => (
                        <tr key={g.id}>
                          <td className="px-5 py-3.5 font-bold">{g.studentName}</td>
                          <td className="px-5 py-3.5 text-slate-500">{g.class}</td>
                          <td className="px-5 py-3.5 font-bold text-emerald-600">{g.subject}</td>
                          <td className="px-5 py-3.5 text-slate-400">{g.evalName}</td>
                          <td className="px-5 py-3.5 font-bold">Coef {g.coef}</td>
                          <td className="px-5 py-3.5">
                            <span className={`px-2.5 py-1 rounded-lg font-extrabold text-xs ${
                              g.grade >= 14 ? 'bg-emerald-100 text-emerald-800' : g.grade >= 10 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {g.grade} / 20
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-slate-400">{g.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: FINANCE & CAISSE SCOLAIRE */}
          {activeTab === 'finance' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">Caisse Scolaire & Recouvrement FCFA</h2>
                  <p className="text-xs text-slate-400">Paiements par Airtel Money, Moov Money / Zamani, Nita et Caisse.</p>
                </div>
                <button
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-amber-500/20"
                >
                  <DollarSign className="w-4 h-4" />
                  Enregistrer un Règlement FCFA
                </button>
              </div>

              {/* Transactions List */}
              <div className={`rounded-2xl border shadow-sm overflow-hidden ${
                darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200/80'
              }`}>
                <div className="p-4 border-b border-slate-200 dark:border-slate-700 font-bold text-xs flex justify-between items-center">
                  <span>Historique des Reçus de Caisse</span>
                  <span className="text-emerald-600 font-mono">Devise: Franc CFA (XOF)</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className={`uppercase tracking-wider border-b text-[10px] ${
                      darkMode ? 'bg-slate-900/50 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}>
                      <tr>
                        <th className="px-5 py-3.5">N° Reçu</th>
                        <th className="px-5 py-3.5">Élève</th>
                        <th className="px-5 py-3.5">Classe</th>
                        <th className="px-5 py-3.5">Montant (FCFA)</th>
                        <th className="px-5 py-3.5">Tranche / Motif</th>
                        <th className="px-5 py-3.5">Canal de Paiement</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 font-medium">
                      {payments.map((p) => (
                        <tr key={p.id}>
                          <td className="px-5 py-3.5 font-mono font-bold text-emerald-600">{p.id}</td>
                          <td className="px-5 py-3.5 font-bold">{p.studentName}</td>
                          <td className="px-5 py-3.5 text-slate-500">{p.class}</td>
                          <td className="px-5 py-3.5 font-extrabold text-emerald-600">+{p.amount.toLocaleString()} FCFA</td>
                          <td className="px-5 py-3.5 text-slate-400">{p.tranche}</td>
                          <td className="px-5 py-3.5 font-bold text-slate-700 dark:text-slate-300">{p.method} ({p.ref})</td>
                          <td className="px-5 py-3.5 text-right">
                            <button
                              onClick={() => setSelectedReceipt(p)}
                              className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-lg text-[11px] font-bold transition-colors inline-flex items-center gap-1"
                            >
                              <Printer className="w-3.5 h-3.5" /> Reçu FCFA
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: APPEL QUOTIDIEN & SMS PARENTS */}
          {activeTab === 'attendance' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">Appel Quotidien & Alertes SMS Parents (+227)</h2>
                  <p className="text-xs text-slate-400">Saisie instantanée des absences avec notification SMS automatique aux tuteurs.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Classe :</span>
                  <select
                    value={selectedAttendanceClass}
                    onChange={(e) => setSelectedAttendanceClass(e.target.value)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border ${
                      darkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    {classesList.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
                darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200/80'
              }`}>
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-4">
                  <div>
                    <h3 className="font-bold text-base">Feuille de Présence du {new Date().toLocaleDateString('fr-FR')}</h3>
                    <p className="text-xs text-slate-400">Cliquez sur un élève pour basculer Présent / Absent</p>
                  </div>
                  <button
                    onClick={() => showToast('Appel enregistré et SMS d\'alertes envoyés aux parents !')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" /> Enregistrer & Envoyer SMS
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {students
                    .filter(s => s.class === selectedAttendanceClass)
                    .map((student) => {
                      const status = attendanceMap[student.id] || 'present';
                      return (
                        <div
                          key={student.id}
                          onClick={() => {
                            setAttendanceMap(prev => ({
                              ...prev,
                              [student.id]: prev[student.id] === 'absent' ? 'present' : 'absent'
                            }));
                          }}
                          className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            status === 'present'
                              ? darkMode ? 'bg-emerald-950/20 border-emerald-800/50' : 'bg-emerald-50/50 border-emerald-200'
                              : darkMode ? 'bg-rose-950/30 border-rose-800/50' : 'bg-rose-50/80 border-rose-200'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <img src={student.photo} alt={student.firstname} className="w-10 h-10 rounded-full object-cover" />
                            <div>
                              <p className="font-bold text-xs">{student.firstname} {student.lastname}</p>
                              <p className="text-[10px] text-emerald-600 font-mono">{student.parentPhone}</p>
                            </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            status === 'present' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                          }`}>
                            {status === 'present' ? 'Présent' : 'Absent'}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* --- MODAL 1: STUDENT PROFILE DRAWER --- */}
      {selectedStudentForProfile && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
          <div className={`w-full max-w-md h-full p-6 overflow-y-auto animate-in slide-in-from-right duration-200 ${
            darkMode ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-800'
          }`}>
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-4">
              <h3 className="font-bold text-base">Fiche Individuelle Élève</h3>
              <button onClick={() => setSelectedStudentForProfile(null)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-6 text-xs">
              <div className="flex items-center gap-4">
                <img src={selectedStudentForProfile.photo} alt="" className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500" />
                <div>
                  <h4 className="text-lg font-extrabold">{selectedStudentForProfile.firstname} {selectedStudentForProfile.lastname}</h4>
                  <p className="font-mono text-emerald-600 font-bold">{selectedStudentForProfile.id}</p>
                  <p className="text-slate-400">{selectedStudentForProfile.class} • Candidat {selectedStudentForProfile.examTarget}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800">
                  <span className="text-[10px] font-bold uppercase text-emerald-600">Moyenne Générale</span>
                  <p className="text-lg font-black text-emerald-800 dark:text-emerald-300 mt-0.5">{selectedStudentForProfile.averageGrade} / 20</p>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800">
                  <span className="text-[10px] font-bold uppercase text-amber-600">Rang en Classe</span>
                  <p className="text-lg font-black text-amber-800 dark:text-amber-300 mt-0.5">{selectedStudentForProfile.rank}ème / 30</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <h5 className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Tuteur Légal au Niger</h5>
                <p className="font-bold">{selectedStudentForProfile.parentName}</p>
                <p className="font-mono text-emerald-600">{selectedStudentForProfile.parentPhone}</p>
                <p className="text-slate-400">{selectedStudentForProfile.parentEmail}</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <h5 className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">État de Scolarité FCFA</h5>
                <div className="flex justify-between font-bold">
                  <span>Payé: <strong className="text-emerald-600">{selectedStudentForProfile.amountPaid.toLocaleString()} FCFA</strong></span>
                  <span>Reste: <strong className="text-rose-600">{selectedStudentForProfile.amountDue.toLocaleString()} FCFA</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: OFFICIAL NIGER BULLETIN PRINT TEMPLATE --- */}
      {selectedStudentForBulletin && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl p-8 space-y-6 my-8">
            
            {/* Ministry Header Niger */}
            <div className="text-center border-b-2 border-slate-900 pb-4 space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">RÉPUBLIQUE DU NIGER</p>
              <p className="text-[9px] font-semibold text-slate-500">Ministère de l'Éducation Nationale, de l'Alphabétisation, de l'Enseignement Professionnel et de la Promotion des Langues Nationales</p>
              <div className="py-1">
                <h2 className="font-black text-base text-emerald-800 uppercase">{SCHOOL_INFO.name}</h2>
                <p className="text-[10px] text-slate-500">{SCHOOL_INFO.address} • {SCHOOL_INFO.city}</p>
              </div>
              <div className="inline-block px-4 py-1 bg-slate-100 rounded-lg text-xs font-black uppercase tracking-wider text-slate-800">
                BULLETIN DE NOTES DU 1er TRIMESTRE - A.S {SCHOOL_INFO.academicYear}
              </div>
            </div>

            {/* Student Info Box */}
            <div className="grid grid-cols-2 gap-4 text-xs font-medium bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <p>Nom & Prénom: <strong className="text-slate-900">{selectedStudentForBulletin.firstname} {selectedStudentForBulletin.lastname}</strong></p>
                <p>Matricule M.E.N: <strong className="font-mono text-emerald-700">{selectedStudentForBulletin.id}</strong></p>
                <p>Date de naissance: <strong>{selectedStudentForBulletin.dob}</strong></p>
              </div>
              <div>
                <p>Classe: <strong className="text-slate-900">{selectedStudentForBulletin.class}</strong></p>
                <p>Effectif classe: <strong>30 Élèves</strong></p>
                <p>Rang du Trimestre: <strong className="text-amber-700">{selectedStudentForBulletin.rank}er / 30</strong></p>
              </div>
            </div>

            {/* Official Grade Table */}
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white uppercase text-[10px]">
                  <th className="p-2.5 border">Matières</th>
                  <th className="p-2.5 border text-center">Coef</th>
                  <th className="p-2.5 border text-center">Moyenne / 20</th>
                  <th className="p-2.5 border text-center">Moy. x Coef</th>
                  <th className="p-2.5 border">Appréciations des Enseignants</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs">
                <tr>
                  <td className="p-2.5 border font-bold">Mathématiques</td>
                  <td className="p-2.5 border text-center">5</td>
                  <td className="p-2.5 border text-center font-bold">16.5</td>
                  <td className="p-2.5 border text-center font-mono">82.5</td>
                  <td className="p-2.5 border text-slate-600">Excellent travail, très bonne rigueur.</td>
                </tr>
                <tr>
                  <td className="p-2.5 border font-bold">Physique-Chimie</td>
                  <td className="p-2.5 border text-center">5</td>
                  <td className="p-2.5 border text-center font-bold">15.0</td>
                  <td className="p-2.5 border text-center font-mono">75.0</td>
                  <td className="p-2.5 border text-slate-600">Bon résultats, poursuivez les efforts.</td>
                </tr>
                <tr>
                  <td className="p-2.5 border font-bold">Sciences de la Vie et de la Terre (SVT)</td>
                  <td className="p-2.5 border text-center">5</td>
                  <td className="p-2.5 border text-center font-bold">17.0</td>
                  <td className="p-2.5 border text-center font-mono">85.0</td>
                  <td className="p-2.5 border text-slate-600">Remarquable maîtrise du programme.</td>
                </tr>
                <tr>
                  <td className="p-2.5 border font-bold">Français / Philosophie</td>
                  <td className="p-2.5 border text-center">3</td>
                  <td className="p-2.5 border text-center font-bold">14.0</td>
                  <td className="p-2.5 border text-center font-mono">42.0</td>
                  <td className="p-2.5 border text-slate-600">Bonne rédaction et analyse.</td>
                </tr>
              </tbody>
            </table>

            {/* Total Summary */}
            <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-900">
              <span>MOYENNE GÉNÉRALE TRIMESTRIELLE:</span>
              <span className="text-xl font-black text-emerald-700">{selectedStudentForBulletin.averageGrade} / 20</span>
            </div>

            {/* Signatures & Stamp */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t text-center text-xs text-slate-500">
              <div>
                <p className="font-bold text-slate-800">Le Professeur Principal</p>
                <div className="h-12" />
                <p className="italic">Dr. Hamani Saley</p>
              </div>
              <div className="relative">
                <p className="font-bold text-slate-800">Le Proviseur / Le Chef d'Établissement</p>
                <div className="absolute right-4 bottom-0 w-24 h-24 border-2 border-dashed border-emerald-600/40 rounded-full flex items-center justify-center text-[9px] font-black text-emerald-700 rotate-[12deg] pointer-events-none">
                  CACHET OFFICIEL
                </div>
                <div className="h-12" />
                <p className="italic">M. Jean Dupont</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button onClick={() => setSelectedStudentForBulletin(null)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs">
                Fermer
              </button>
              <button onClick={() => { showToast('Impression du Bulletin M.E.N lancée...'); setSelectedStudentForBulletin(null); }} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-2">
                <Printer className="w-4 h-4" /> Imprimer le Bulletin
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- MODAL 3: RECEIPT PREVIEW --- */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex justify-between items-start border-b pb-3">
              <div>
                <h3 className="font-black text-lg text-emerald-700">Reçu de Caisse - FCFA</h3>
                <p className="text-xs font-mono text-slate-400">{selectedReceipt.id}</p>
              </div>
              <button onClick={() => setSelectedReceipt(null)}><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b">
                <span className="text-slate-500">Élève:</span>
                <strong className="text-slate-800">{selectedReceipt.studentName}</strong>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-slate-500">Classe:</span>
                <span className="font-bold">{selectedReceipt.class}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-slate-500">Tranche / Motif:</span>
                <span>{selectedReceipt.tranche}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-slate-500">Canal de Règlement:</span>
                <strong className="text-amber-700">{selectedReceipt.method} ({selectedReceipt.ref})</strong>
              </div>
              <div className="flex justify-between py-3 text-base font-black bg-emerald-50 p-3 rounded-xl text-emerald-800">
                <span>Montant Payé:</span>
                <span>{selectedReceipt.amount.toLocaleString()} FCFA</span>
              </div>
            </div>

            <button
              onClick={() => { showToast('Impression du reçu FCFA en cours...'); setSelectedReceipt(null); }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" /> Imprimer Reçu de Caisse
            </button>
          </div>
        </div>
      )}

      {/* --- MODAL 4: NEW STUDENT FORM --- */}
      {isStudentModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-lg rounded-2xl shadow-2xl p-6 space-y-4 ${
            darkMode ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-800'
          }`}>
            <div className="flex justify-between items-center border-b pb-3 border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-base">Inscrire un Nouvel Élève (Niger)</h3>
              <button onClick={() => setIsStudentModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                const level = fd.get('level');
                const fees = level === 'Primaire' ? 120000 : level === 'Collège' ? 180000 : 250000;
                
                const newS = {
                  id: `NIG-2026-00${students.length + 1}`,
                  firstname: fd.get('firstname'),
                  lastname: fd.get('lastname'),
                  level,
                  class: fd.get('class'),
                  gender: fd.get('gender'),
                  dob: fd.get('dob'),
                  pob: fd.get('pob'),
                  parentName: fd.get('parentName'),
                  parentPhone: fd.get('parentPhone'),
                  parentEmail: fd.get('parentEmail'),
                  status: 'Payé',
                  totalFees: fees,
                  amountPaid: fees,
                  amountDue: 0,
                  photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
                  attendanceRate: 100,
                  averageGrade: 14.0,
                  rank: 10,
                  examTarget: 'Passage'
                };

                setStudents([newS, ...students]);
                setIsStudentModalOpen(false);
                showToast(`Nouvel élève ${newS.firstname} inscrit avec matricule ${newS.id} !`);
              }}
              className="space-y-3 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Prénom</label>
                  <input required name="firstname" className="w-full p-2 rounded-xl border dark:bg-slate-700 dark:border-slate-600" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Nom</label>
                  <input required name="lastname" className="w-full p-2 rounded-xl border dark:bg-slate-700 dark:border-slate-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Cycle</label>
                  <select name="level" className="w-full p-2 rounded-xl border dark:bg-slate-700 dark:border-slate-600">
                    <option value="Primaire">Primaire (CI - CM2)</option>
                    <option value="Collège">Collège (6ème - 3ème BEPC)</option>
                    <option value="Lycée">Lycée (2nde - Tle BAC)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Classe Exacte</label>
                  <select name="class" className="w-full p-2 rounded-xl border dark:bg-slate-700 dark:border-slate-600">
                    <option value="Terminale D">Terminale D</option>
                    <option value="1ère C">1ère C</option>
                    <option value="3ème A">3ème A (BEPC)</option>
                    <option value="CM2 B">CM2 B (CFEPD)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Lieu de Naissance</label>
                  <input required placeholder="ex: Niamey" name="pob" className="w-full p-2 rounded-xl border dark:bg-slate-700 dark:border-slate-600" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Date de Naissance</label>
                  <input required type="date" name="dob" className="w-full p-2 rounded-xl border dark:bg-slate-700 dark:border-slate-600" />
                </div>
              </div>

              <div className="border-t pt-3 dark:border-slate-700 space-y-2">
                <p className="font-bold text-emerald-600 text-[11px]">Parent / Tuteur au Niger (+227)</p>
                <input required placeholder="Nom complet du tuteur" name="parentName" className="w-full p-2 rounded-xl border dark:bg-slate-700 dark:border-slate-600" />
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder="+227 96 00 00 00" name="parentPhone" className="w-full p-2 rounded-xl border dark:bg-slate-700 dark:border-slate-600" />
                  <input required type="email" placeholder="Email tuteur" name="parentEmail" className="w-full p-2 rounded-xl border dark:bg-slate-700 dark:border-slate-600" />
                </div>
              </div>

              <button type="submit" className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 mt-2">
                Valider Inscription & Générer Matricule
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 5: NEW PAYMENT FORM FCFA --- */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-4 ${
            darkMode ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-800'
          }`}>
            <div className="flex justify-between items-center border-b pb-3 border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-base">Enregistrer Règlement FCFA</h3>
              <button onClick={() => setIsPaymentModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                const studentId = fd.get('studentId');
                const targetStudent = students.find(s => s.id === studentId);

                const newPay = {
                  id: `REC-NE-${Math.floor(100 + Math.random() * 900)}`,
                  studentId,
                  studentName: targetStudent ? `${targetStudent.firstname} ${targetStudent.lastname}` : 'Élève',
                  class: targetStudent ? targetStudent.class : 'Terminale D',
                  amount: Number(fd.get('amount')),
                  tranche: fd.get('tranche'),
                  date: new Date().toISOString().split('T')[0],
                  method: fd.get('method'),
                  ref: fd.get('ref')
                };

                setPayments([newPay, ...payments]);
                setIsPaymentModalOpen(false);
                showToast(`Paiement de ${newPay.amount.toLocaleString()} FCFA enregistré !`);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="font-bold block mb-1">Sélectionner l'Élève</label>
                <select name="studentId" className="w-full p-2.5 rounded-xl border dark:bg-slate-700 dark:border-slate-600">
                  {students.map(s => <option key={s.id} value={s.id}>{s.firstname} {s.lastname} ({s.class}) - Reste: {s.amountDue.toLocaleString()} FCFA</option>)}
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Montant Réglé (FCFA)</label>
                <input required type="number" name="amount" defaultValue={60000} className="w-full p-2.5 rounded-xl border dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <div>
                <label className="font-bold block mb-1">Tranche / Motif</label>
                <select name="tranche" className="w-full p-2.5 rounded-xl border dark:bg-slate-700 dark:border-slate-600">
                  <option value="1ère Tranche (Inscription)">1ère Tranche (Inscription)</option>
                  <option value="2ème Tranche (31 Décembre)">2ème Tranche (31 Décembre)</option>
                  <option value="3ème Tranche (31 Mars)">3ème Tranche (31 Mars)</option>
                  <option value="Solde Total">Solde Total Scolarité</option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Canal de Règlement Niger</label>
                <select name="method" className="w-full p-2.5 rounded-xl border dark:bg-slate-700 dark:border-slate-600">
                  <option value="Airtel Money (+227)">Airtel Money (+227)</option>
                  <option value="Moov Money / Zamani">Moov Money / Zamani</option>
                  <option value="Espèces (Caisse)">Espèces (Caisse École)</option>
                  <option value="Nita / Al Izza Transfert">Nita / Al Izza Transfert</option>
                  <option value="Virement BOA / BIA / Orabank">Virement BOA / BIA / Orabank</option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Référence / N° Transaction</label>
                <input required placeholder="ex: AM-99201-NE" name="ref" className="w-full p-2.5 rounded-xl border dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <button type="submit" className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-xl mt-2">
                Valider Règlement FCFA
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 6: ENTER GRADE FORM --- */}
      {isGradeModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-4 ${
            darkMode ? 'bg-slate-800 text-slate-100' : 'bg-white text-slate-800'
          }`}>
            <div className="flex justify-between items-center border-b pb-3 border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-base">Saisie d'une Note (Programme M.E.N)</h3>
              <button onClick={() => setIsGradeModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                const studentId = fd.get('studentId');
                const targetStudent = students.find(s => s.id === studentId);

                const newG = {
                  id: grades.length + 101,
                  studentId,
                  studentName: targetStudent ? `${targetStudent.firstname} ${targetStudent.lastname}` : 'Élève',
                  class: targetStudent ? targetStudent.class : 'Terminale D',
                  subject: fd.get('subject'),
                  coef: Number(fd.get('coef')),
                  grade: Number(fd.get('grade')),
                  date: new Date().toISOString().split('T')[0],
                  evalName: fd.get('evalName')
                };

                setGrades([newG, ...grades]);
                setIsGradeModalOpen(false);
                showToast(`Note enregistrée pour ${newG.studentName} !`);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="font-bold block mb-1">Élève</label>
                <select name="studentId" className="w-full p-2.5 rounded-xl border dark:bg-slate-700 dark:border-slate-600">
                  {students.map(s => <option key={s.id} value={s.id}>{s.firstname} {s.lastname} ({s.class})</option>)}
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1">Matière M.E.N</label>
                <select name="subject" className="w-full p-2.5 rounded-xl border dark:bg-slate-700 dark:border-slate-600">
                  <option value="Mathématiques">Mathématiques</option>
                  <option value="Physique-Chimie">Physique-Chimie</option>
                  <option value="SVT">Sciences de la Vie et de la Terre (SVT)</option>
                  <option value="Français / Philosophie">Français / Philosophie</option>
                  <option value="Histoire-Géographie">Histoire-Géographie</option>
                  <option value="Anglais">Anglais</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Note / 20</label>
                  <input required type="number" step="0.5" max="20" min="0" name="grade" defaultValue={15} className="w-full p-2.5 rounded-xl border dark:bg-slate-700 dark:border-slate-600" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Coefficient M.E.N</label>
                  <input required type="number" name="coef" defaultValue={5} className="w-full p-2.5 rounded-xl border dark:bg-slate-700 dark:border-slate-600" />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Intitulé Évaluation</label>
                <input required placeholder="ex: Devoir Surveillé N°2" name="evalName" className="w-full p-2.5 rounded-xl border dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl mt-2">
                Enregistrer la Note
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
export type DayKey = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

export type Lecture = {
  id: string;
  day: DayKey;
  startTime: string;
  endTime: string;
  subject: string;
  shortSubject: string;
  type: 'Lecture' | 'Practical';
  groups: string[];
  professor?: string;
  room?: string;
};

export type Student = {
  enrollmentNumber: string;
  institutionId: string;
  branchId: string;
  semester: number;
  division: string;
};

export type Institution = {
  id: string;
  name: string;
  shortName: string;
  city: string;
};

export type Branch = {
  id: string;
  name: string;
  label: string;
};

export type TimetableDataset = {
  institutionId: string;
  branchId: string;
  semester: number;
  division: string;
  academicYear: string;
  lectures: Lecture[];
};

export const institution: Institution = {
  id: 'gec-palanpur',
  name: 'Government Engineering College, Palanpur',
  shortName: 'GECPL',
  city: 'Palanpur, Gujarat',
};

export const branches: Branch[] = [
  { id: 'computer-engineering', name: 'Computer Engineering', label: 'Computer' },
  { id: 'civil-engineering', name: 'Civil Engineering', label: 'Civil' },
  { id: 'electrical-engineering', name: 'Electrical Engineering', label: 'Electrical' },
  { id: 'mechanical-engineering', name: 'Mechanical Engineering', label: 'Mechanical' },
];

// Source dataset: Computer Engineering, first semester. Each division is
// recorded on the student itself. Never derive a division from array order:
// the source sheet's ordering can change without changing a student's group.
export const students: Student[] = [
  { enrollmentNumber: 'CE01', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE03', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE04', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE05', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE06', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE07', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE09', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE10', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE17', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE19', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE21', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE24', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE78', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE79', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE82', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE86', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE87', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE88', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE91', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE92', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE93', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE94', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE95', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE96', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP1' },
  { enrollmentNumber: 'CE26', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP2' },
  { enrollmentNumber: 'CE28', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP2' },
  { enrollmentNumber: 'CE29', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP2' },
  { enrollmentNumber: 'CE30', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP2' },
  { enrollmentNumber: 'CE31', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP2' },
  { enrollmentNumber: 'CE32', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP2' },
  { enrollmentNumber: 'CE33', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP2' },
  { enrollmentNumber: 'CE34', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP2' },
  { enrollmentNumber: 'CE37', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP2' },
  { enrollmentNumber: 'CE38', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP2' },
  { enrollmentNumber: 'CE39', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP2' },
  { enrollmentNumber: 'CE40', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP2' },
  { enrollmentNumber: 'CE41', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP2' },
  { enrollmentNumber: 'CE42', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP2' },
  { enrollmentNumber: 'CE43', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP2' },
  { enrollmentNumber: 'CE45', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP2' },
  { enrollmentNumber: 'CE46', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP2' },
  { enrollmentNumber: 'CE47', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP2' },
  { enrollmentNumber: 'CE49', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP2' },
  { enrollmentNumber: 'CE97', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP2' },
  { enrollmentNumber: 'CE98', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP2' },
  { enrollmentNumber: 'CE99', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE100', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE101', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE102', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE103', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE52', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE53', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE55', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE56', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE57', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE58', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE59', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE61', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE62', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE63', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE65', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE66', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE68', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE70', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE72', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE73', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE74', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE76', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE77', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE104', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE105', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE107', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE108', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE109', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE110', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE111', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
  { enrollmentNumber: 'CE112', institutionId: institution.id, branchId: 'computer-engineering', semester: 1, division: 'CP3' },
];

export const timetable: TimetableDataset = {
  institutionId: institution.id,
  branchId: 'computer-engineering',
  semester: 1,
  division: 'CP1/CP2/CP3',
  academicYear: '2026–27',
  lectures: [
    { id: 'mon-1030', day: 'monday', startTime: '10:30', endTime: '11:30', subject: 'Basic Mechanical Engineering', shortSubject: 'BME', type: 'Lecture', groups: ['CP1', 'CP2', 'CP3'] },
    { id: 'mon-1130', day: 'monday', startTime: '11:30', endTime: '12:30', subject: 'Programming for Problem Solving', shortSubject: 'PPS', type: 'Lecture', groups: ['CP1', 'CP2', 'CP3'] },
    { id: 'mon-1300', day: 'monday', startTime: '13:00', endTime: '14:00', subject: 'Mathematics – I', shortSubject: 'MATHS-I', type: 'Lecture', groups: ['CP1', 'CP2', 'CP3'] },
    { id: 'mon-1400', day: 'monday', startTime: '14:00', endTime: '15:00', subject: 'Programming for Problem Solving', shortSubject: 'PPS', type: 'Practical', groups: ['CP1', 'CP2', 'CP3'] },
    { id: 'mon-1510', day: 'monday', startTime: '15:10', endTime: '16:10', subject: 'Mathematics – I', shortSubject: 'MATHS-I', type: 'Lecture', groups: ['CP1', 'CP2', 'CP3'] },
    { id: 'tue-1030', day: 'tuesday', startTime: '10:30', endTime: '11:30', subject: 'Basic Electrical Engineering', shortSubject: 'BEE', type: 'Lecture', groups: ['CP1', 'CP2', 'CP3'] },
    { id: 'tue-1130', day: 'tuesday', startTime: '11:30', endTime: '12:30', subject: 'Programming for Problem Solving', shortSubject: 'PPS', type: 'Practical', groups: ['CP1', 'CP2', 'CP3'] },
    { id: 'tue-1300', day: 'tuesday', startTime: '13:00', endTime: '14:00', subject: 'Mathematics – I', shortSubject: 'MATHS-I', type: 'Lecture', groups: ['CP1', 'CP2', 'CP3'] },
    { id: 'tue-1400', day: 'tuesday', startTime: '14:00', endTime: '15:00', subject: 'Programming for Problem Solving', shortSubject: 'PPS', type: 'Practical', groups: ['CP1', 'CP2', 'CP3'] },
    { id: 'tue-1510', day: 'tuesday', startTime: '15:10', endTime: '16:10', subject: 'Engineering Graphics', shortSubject: 'EG', type: 'Lecture', groups: ['CP1', 'CP2', 'CP3'] },
    { id: 'wed-1030', day: 'wednesday', startTime: '10:30', endTime: '11:30', subject: 'Mathematics – I', shortSubject: 'MATHS-I', type: 'Lecture', groups: ['CP1', 'CP2', 'CP3'] },
    { id: 'wed-1130', day: 'wednesday', startTime: '11:30', endTime: '12:30', subject: 'Basic Mechanical Engineering', shortSubject: 'BME', type: 'Lecture', groups: ['CP1', 'CP2', 'CP3'] },
    { id: 'wed-1300', day: 'wednesday', startTime: '13:00', endTime: '14:00', subject: 'Engineering Graphics', shortSubject: 'EG', type: 'Practical', groups: ['CP1', 'CP2', 'CP3'] },
    { id: 'wed-1400', day: 'wednesday', startTime: '14:00', endTime: '15:00', subject: 'Programming for Problem Solving', shortSubject: 'PPS', type: 'Practical', groups: ['CP1', 'CP2', 'CP3'] },
    { id: 'wed-1510', day: 'wednesday', startTime: '15:10', endTime: '16:10', subject: 'Basic Electrical Engineering', shortSubject: 'BEE', type: 'Lecture', groups: ['CP1', 'CP2', 'CP3'] },
    { id: 'thu-1030', day: 'thursday', startTime: '10:30', endTime: '11:30', subject: 'Programming for Problem Solving', shortSubject: 'PPS', type: 'Lecture', groups: ['CP1', 'CP2', 'CP3'] },
    { id: 'thu-1130', day: 'thursday', startTime: '11:30', endTime: '12:30', subject: 'Basic Electrical Engineering', shortSubject: 'BEE', type: 'Lecture', groups: ['CP1', 'CP2', 'CP3'] },
    { id: 'thu-1300', day: 'thursday', startTime: '13:00', endTime: '14:00', subject: 'Basic Mechanical Engineering', shortSubject: 'BME', type: 'Practical', groups: ['CP1', 'CP2', 'CP3'] },
    { id: 'thu-1400', day: 'thursday', startTime: '14:00', endTime: '15:00', subject: 'Engineering Graphics', shortSubject: 'EG', type: 'Practical', groups: ['CP1', 'CP2', 'CP3'] },
    { id: 'thu-1510', day: 'thursday', startTime: '15:10', endTime: '16:10', subject: 'Programming for Problem Solving', shortSubject: 'PPS', type: 'Practical', groups: ['CP1', 'CP2', 'CP3'] },
    { id: 'fri-1030', day: 'friday', startTime: '10:30', endTime: '11:30', subject: 'Basic Mechanical Engineering', shortSubject: 'BME', type: 'Lecture', groups: ['CP1', 'CP2', 'CP3'] },
    { id: 'fri-1130', day: 'friday', startTime: '11:30', endTime: '12:30', subject: 'Programming for Problem Solving', shortSubject: 'PPS', type: 'Lecture', groups: ['CP1', 'CP2', 'CP3'] },
    { id: 'fri-1300', day: 'friday', startTime: '13:00', endTime: '14:00', subject: 'Engineering Graphics', shortSubject: 'EG', type: 'Practical', groups: ['CP1', 'CP2', 'CP3'] },
  ],
};

export function timetableKey(branchId: string, semester: number, division: string) {
  return `${branchId}:${semester}:${division}`;
}

// The current source schedule is shared by CP1, CP2 and CP3, but each class
// still has an explicit catalog entry. This keeps timetable selection scoped to
// the student's complete academic context as more datasets are added.
export const timetableCatalog: Record<string, TimetableDataset> = {
  [timetableKey(timetable.branchId, timetable.semester, 'CP1')]: { ...timetable, division: 'CP1' },
  [timetableKey(timetable.branchId, timetable.semester, 'CP2')]: { ...timetable, division: 'CP2' },
  [timetableKey(timetable.branchId, timetable.semester, 'CP3')]: { ...timetable, division: 'CP3' },
};

export function getTimetableForStudent(student: Student) {
  return timetableCatalog[timetableKey(student.branchId, student.semester, student.division)];
}

export const dayLabels: Record<DayKey, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
};

export const dayShortLabels: Record<DayKey, string> = {
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
};

export const weekdays: DayKey[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

export function findStudent(value: string) {
  const normalized = value.trim().toUpperCase();
  return students.find((student) => student.enrollmentNumber === normalized);
}

export function branchForStudent(student: Student) {
  return branches.find((branch) => branch.id === student.branchId);
}

export function minutesFromTime(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function getDayKey(date: Date): DayKey | null {
  const day = date.getDay();
  return day >= 1 && day <= 5 ? weekdays[day - 1] : null;
}

export function findLiveLecture(date: Date, student: Student) {
  const day = getDayKey(date);
  if (!day) return undefined;
  const studentTimetable = getTimetableForStudent(student);
  if (!studentTimetable) return undefined;
  const now = date.getHours() * 60 + date.getMinutes();
  return studentTimetable.lectures.find((lecture) =>
    lecture.day === day &&
    lecture.groups.includes(student.division) &&
    now >= minutesFromTime(lecture.startTime) &&
    now < minutesFromTime(lecture.endTime),
  );
}

export function findNextLecture(date: Date, student: Student) {
  const day = getDayKey(date);
  const now = date.getHours() * 60 + date.getMinutes();
  const studentTimetable = getTimetableForStudent(student);
  if (!studentTimetable) return undefined;
  if (day) {
    const todayNext = studentTimetable.lectures
      .filter((lecture) => lecture.day === day && lecture.groups.includes(student.division) && minutesFromTime(lecture.startTime) > now)
      .sort((a, b) => minutesFromTime(a.startTime) - minutesFromTime(b.startTime))[0];
    if (todayNext) return { lecture: todayNext, dayOffset: 0 };
  }

  for (let offset = 1; offset <= 7; offset += 1) {
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + offset);
    const nextDay = getDayKey(nextDate);
    if (!nextDay) continue;
    const nextLecture = studentTimetable.lectures
      .filter((lecture) => lecture.day === nextDay && lecture.groups.includes(student.division))
      .sort((a, b) => minutesFromTime(a.startTime) - minutesFromTime(b.startTime))[0];
    if (nextLecture) return { lecture: nextLecture, dayOffset: offset };
  }
  return undefined;
}

export function formatTime(time: string) {
  const [hour, minute] = time.split(':').map(Number);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const twelveHour = hour % 12 || 12;
  return `${twelveHour}:${String(minute).padStart(2, '0')} ${suffix}`;
}
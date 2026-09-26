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

// Source dataset: Computer Engineering, first semester. The source sheet groups
// the visible enrollment series into CP1, CP2 and CP3; names were intentionally
// omitted here because they are not needed to find a class.
const sourceEnrollments = [
  'CE01', 'CE03', 'CE04', 'CE05', 'CE06', 'CE07', 'CE09', 'CE10', 'CE17', 'CE19',
  'CE21', 'CE24', 'CE78', 'CE79', 'CE82', 'CE86', 'CE87', 'CE88', 'CE91', 'CE92',
  'CE93', 'CE94', 'CE95', 'CE96', 'CE26', 'CE28', 'CE29', 'CE30', 'CE31', 'CE32',
  'CE33', 'CE34', 'CE37', 'CE38', 'CE39', 'CE40', 'CE41', 'CE42', 'CE43', 'CE45',
  'CE46', 'CE47', 'CE49', 'CE97', 'CE98', 'CE99', 'CE100', 'CE101', 'CE102', 'CE103',
  'CE52', 'CE53', 'CE55', 'CE56', 'CE57', 'CE58', 'CE59', 'CE61', 'CE62', 'CE63',
  'CE65', 'CE66', 'CE68', 'CE70', 'CE72', 'CE73', 'CE74', 'CE76', 'CE77', 'CE104',
  'CE105', 'CE107', 'CE108', 'CE109', 'CE110', 'CE111', 'CE112',
] as const;

const divisionForIndex = (index: number) => index < 24 ? 'CP1' : index < 45 ? 'CP2' : 'CP3';

export const students: Student[] = sourceEnrollments.map((enrollmentNumber, index) => ({
  enrollmentNumber,
  institutionId: institution.id,
  branchId: 'computer-engineering',
  semester: 1,
  division: divisionForIndex(index),
}));

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

export function findLiveLecture(date: Date, division: string) {
  const day = getDayKey(date);
  if (!day) return undefined;
  const now = date.getHours() * 60 + date.getMinutes();
  return timetable.lectures.find((lecture) =>
    lecture.day === day &&
    lecture.groups.includes(division) &&
    now >= minutesFromTime(lecture.startTime) &&
    now < minutesFromTime(lecture.endTime),
  );
}

export function findNextLecture(date: Date, division: string) {
  const day = getDayKey(date);
  const now = date.getHours() * 60 + date.getMinutes();
  if (day) {
    const todayNext = timetable.lectures
      .filter((lecture) => lecture.day === day && lecture.groups.includes(division) && minutesFromTime(lecture.startTime) > now)
      .sort((a, b) => minutesFromTime(a.startTime) - minutesFromTime(b.startTime))[0];
    if (todayNext) return { lecture: todayNext, dayOffset: 0 };
  }

  for (let offset = 1; offset <= 7; offset += 1) {
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + offset);
    const nextDay = getDayKey(nextDate);
    if (!nextDay) continue;
    const nextLecture = timetable.lectures
      .filter((lecture) => lecture.day === nextDay && lecture.groups.includes(division))
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
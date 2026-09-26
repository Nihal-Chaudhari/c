import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  ArrowRight,
  Bell,
  BellRing,
  BookOpen,
  CalendarDays,
  Check,
  CircleAlert,
  Clock3,
  Compass,
  GraduationCap,
  MapPin,
  Menu,
  RotateCcw,
  Search,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react';
import {
  branchForStudent,
  dayLabels,
  dayShortLabels,
  findLiveLecture,
  findNextLecture,
  findStudent,
  formatTime,
  getTimetableForStudent,
  getDayKey,
  minutesFromTime,
  type DayKey,
  type Lecture,
  type TimetableDataset,
} from '@/data/classData';

type Screen = 'home' | 'class' | 'timetable';
type SearchState = 'idle' | 'loading' | 'found' | 'error';

const LAST_STUDENT_KEY = 'wheres-my-class:last-student';

function AppMark({ size = 34 }: { size?: number }) {
  return (
    <span className="brand-mark" aria-hidden="true" style={{ width: size, height: size }}>
      <Compass size={Math.max(17, size * 0.52)} strokeWidth={2.4} />
    </span>
  );
}

function getInitials(enrollmentNumber: string) {
  return enrollmentNumber.slice(0, 2).toUpperCase();
}

function formatDayOffset(dayOffset: number, date: Date) {
  if (dayOffset === 0) return 'Later today';
  if (dayOffset === 1) return 'Tomorrow';
  const nextDate = new Date(date);
  nextDate.setDate(date.getDate() + dayOffset);
  const day = getDayKey(nextDate);
  return day ? dayLabels[day] : 'Next teaching day';
}

function lectureMatchesNow(lecture: Lecture, now: Date) {
  const day = getDayKey(now);
  if (day !== lecture.day) return false;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  return (
    currentMinutes >= minutesFromTime(lecture.startTime) &&
    currentMinutes < minutesFromTime(lecture.endTime)
  );
}

function App() {
  const demoStudent = findStudent(new URLSearchParams(window.location.search).get('demo') ?? '');
  const [screen, setScreen] = useState<Screen>(() => demoStudent ? 'class' : 'home');
  const [splash, setSplash] = useState(() => new URLSearchParams(window.location.search).get('skip') !== '1');
  const [enrollment, setEnrollment] = useState('');
  const [searchState, setSearchState] = useState<SearchState>('idle');
  const [student, setStudent] = useState<ReturnType<typeof findStudent>>(() => demoStudent);
  const [now, setNow] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState<DayKey>(() => getDayKey(new Date()) ?? 'monday');
  const [toast, setToast] = useState('');
  const [reminderMinutes, setReminderMinutes] = useState(10);
  const [reminderSet, setReminderSet] = useState(false);

  const branch = student ? branchForStudent(student) : undefined;
  const classTimetable = student ? getTimetableForStudent(student) : undefined;
  const currentLecture = student ? findLiveLecture(now, student) : undefined;
  const upcoming = student ? findNextLecture(now, student) : undefined;
  const rememberedEnrollment = typeof window !== 'undefined'
    ? window.localStorage.getItem(LAST_STUDENT_KEY)
    : null;

  useEffect(() => {
    const timer = window.setTimeout(() => setSplash(false), 1250);
    const clock = window.setInterval(() => setNow(new Date()), 30_000);
    return () => {
      window.clearTimeout(timer);
      window.clearInterval(clock);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (student) {
      const day = getDayKey(now);
      if (day) setSelectedDay(day);
    }
  }, [student, now]);

  const selectedLectures = useMemo(
    () => classTimetable?.lectures.filter((lecture) => lecture.day === selectedDay) ?? [],
    [classTimetable, selectedDay],
  );

  function performSearch(value = enrollment) {
    const normalized = value.trim().toUpperCase();
    setEnrollment(normalized);
    if (!normalized) {
      setSearchState('error');
      setToast('Enter an enrollment number to continue.');
      return;
    }
    setSearchState('loading');
    window.setTimeout(() => {
      const found = findStudent(normalized);
      if (!found) {
        setStudent(undefined);
        setSearchState('error');
        return;
      }
      setStudent(found);
      window.localStorage.setItem(LAST_STUDENT_KEY, found.enrollmentNumber);
      setSearchState('found');
      setScreen('class');
    }, 420);
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    performSearch();
  }

  function changeStudent() {
    setStudent(undefined);
    setSearchState('idle');
    setEnrollment('');
    setReminderSet(false);
    setScreen('home');
  }

  async function setReminder() {
    if (!upcoming) {
      setToast('There is no upcoming class to remind you about.');
      return;
    }
    if ('Notification' in window && Notification.permission === 'default') {
      try {
        await Notification.requestPermission();
      } catch {
        // A reminder can still be saved when permission is unavailable.
      }
    }
    setReminderSet(true);
    setToast(`Reminder set for ${reminderMinutes} minutes before ${upcoming.lecture.subject}.`);
  }

  if (splash) {
    return (
      <main className="splash-screen" aria-label="Loading Where’s My Class">
        <div className="splash-inner">
          <AppMark size={58} />
          <div className="splash-title">Where’s My Class?</div>
          <div className="splash-kicker">GECPL · Student class finder</div>
        </div>
      </main>
    );
  }

  return (
    <div className="page-shell app-noise">
      <header className="topbar">
        <button className="brand" onClick={() => setScreen(student ? 'class' : 'home')} aria-label="Go to home">
          <AppMark />
          <span className="brand-copy">
            <span className="brand-name">Where’s My Class?</span>
            <span className="brand-meta">GECPL · Palanpur</span>
          </span>
        </button>
        <nav className="top-nav" aria-label="Primary navigation">
          <button className={screen === 'home' ? 'active' : ''} onClick={() => setScreen('home')}>Home</button>
          <button className={screen === 'class' ? 'active' : ''} onClick={() => student ? setScreen('class') : setToast('Find your class first.')}>My class</button>
          <button className={screen === 'timetable' ? 'active' : ''} onClick={() => student ? setScreen('timetable') : setToast('Find your class first.')}>Timetable</button>
        </nav>
        <span className="top-date">{now.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short' }).toUpperCase()}</span>
        <button className="ghost-button mobile-menu" aria-label="Open navigation" onClick={() => setScreen(screen === 'home' ? 'class' : 'home')}>
          <Menu size={16} />
        </button>
      </header>

      {screen === 'home' && !student && (
        <main className="landing">
          <div className="landing-grid">
            <section>
              <div className="eyebrow"><span className="eyebrow-dot" /> Student class finder</div>
              <h1 className="hero-title">Find your<br /><em>class in seconds.</em></h1>
              <p className="hero-copy">
                Enter your enrollment number to see what’s happening now, where to go next, and your whole week at a glance.
              </p>
              <form className="search-card" onSubmit={submitSearch}>
                <label className="search-card-label" htmlFor="enrollment">Enrollment number</label>
                <div className="input-wrap">
                  <Search size={17} aria-hidden="true" />
                  <input
                    id="enrollment"
                    className="search-input"
                    autoComplete="off"
                    value={enrollment}
                    onChange={(event) => {
                      setEnrollment(event.target.value.toUpperCase());
                      if (searchState === 'error') setSearchState('idle');
                    }}
                    placeholder="e.g. CE45"
                    aria-invalid={searchState === 'error'}
                  />
                  {enrollment && <button type="button" className="input-clear" aria-label="Clear enrollment" onClick={() => setEnrollment('')}><X size={15} /></button>}
                </div>
                <button className="primary-button" type="submit" disabled={searchState === 'loading'}>
                  {searchState === 'loading' ? 'Finding your class…' : <>Find my class <ArrowRight size={16} /></>}
                </button>
                {searchState === 'error' && (
                  <div className="error-note" role="alert"><CircleAlert size={15} /> <span>Enrollment number not found.<br />Please check the number and try again.</span></div>
                )}
                {rememberedEnrollment && (
                  <div className="remember-card">
                    <span><span className="remember-label">Last searched</span><strong>{rememberedEnrollment}</strong></span>
                    <button type="button" onClick={() => {
                      setEnrollment(rememberedEnrollment);
                      performSearch(rememberedEnrollment);
                    }}>Continue <ArrowRight size={13} /></button>
                  </div>
                )}
              </form>
            </section>
            <aside className="landing-aside">
              <p className="aside-statement">Less time searching.<br />More time getting there.</p>
              <div className="signal-row"><span className="signal-line" /> <span>Automatic batch detection</span></div>
              <div className="signal-row"><span className="signal-line" /> <span>Live timetable status</span></div>
              <div className="corner-note">Computer Engineering · Semester 1<br />Initial dataset · 2026–27</div>
            </aside>
          </div>
        </main>
      )}

      {screen === 'home' && student && (
        <Dashboard
          student={student}
          branchName={branch?.name ?? 'Branch unavailable'}
          classTimetable={classTimetable}
          currentLecture={currentLecture}
          upcoming={upcoming}
          now={now}
          onChangeStudent={changeStudent}
          onTimetable={() => setScreen('timetable')}
          reminderMinutes={reminderMinutes}
          setReminderMinutes={setReminderMinutes}
          reminderSet={reminderSet}
          onReminder={setReminder}
        />
      )}

      {screen === 'class' && student && (
        <Dashboard
          student={student}
          branchName={branch?.name ?? 'Branch unavailable'}
          classTimetable={classTimetable}
          currentLecture={currentLecture}
          upcoming={upcoming}
          now={now}
          onChangeStudent={changeStudent}
          onTimetable={() => setScreen('timetable')}
          reminderMinutes={reminderMinutes}
          setReminderMinutes={setReminderMinutes}
          reminderSet={reminderSet}
          onReminder={setReminder}
        />
      )}

      {screen === 'timetable' && student && (
        <main className="dashboard timetable-page">
          <div className="dashboard-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-dot" /> Weekly timetable</div>
              <h1 className="dashboard-title">Your week, mapped out.</h1>
              <p className="dashboard-subtitle">{branch?.name} · Semester {student.semester} · {student.division}</p>
            </div>
            <button className="ghost-button" onClick={() => setScreen('class')}><ArrowRight size={14} /> Back to overview</button>
          </div>
          <Timetable
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            lectures={selectedLectures}
            now={now}
            currentLecture={currentLecture}
          />
        </main>
      )}

      {student && <BottomNav screen={screen} setScreen={setScreen} />}
      {toast && <div className="toast-note" role="status"><Check size={15} color="hsl(38 93% 45%)" /> {toast}</div>}
    </div>
  );
}

function Dashboard({
  student,
  branchName,
  classTimetable,
  currentLecture,
  upcoming,
  now,
  onChangeStudent,
  onTimetable,
  reminderMinutes,
  setReminderMinutes,
  reminderSet,
  onReminder,
}: {
  student: NonNullable<ReturnType<typeof findStudent>>;
  branchName: string;
  classTimetable?: TimetableDataset;
  currentLecture?: Lecture;
  upcoming?: { lecture: Lecture; dayOffset: number };
  now: Date;
  onChangeStudent: () => void;
  onTimetable: () => void;
  reminderMinutes: number;
  setReminderMinutes: (value: number) => void;
  reminderSet: boolean;
  onReminder: () => void;
}) {
  const currentProgress = currentLecture
    ? Math.min(100, Math.max(0, ((now.getHours() * 60 + now.getMinutes() - minutesFromTime(currentLecture.startTime)) /
      (minutesFromTime(currentLecture.endTime) - minutesFromTime(currentLecture.startTime))) * 100))
    : 0;
  const remainingMinutes = currentLecture
    ? Math.max(0, minutesFromTime(currentLecture.endTime) - (now.getHours() * 60 + now.getMinutes()))
    : 0;

  return (
    <main className="dashboard">
      <div className="dashboard-heading">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot" /> Class overview</div>
          <h1 className="dashboard-title">Good morning.</h1>
          <p className="dashboard-subtitle">Here’s what your day looks like, {student.enrollmentNumber}.</p>
        </div>
        <div className="student-strip">
          <span className="student-avatar">{getInitials(student.enrollmentNumber)}</span>
          <span className="student-detail"><strong>{student.enrollmentNumber}</strong><span>{branchName} · Sem {student.semester} · {student.division}</span></span>
          <button className="icon-button" onClick={onChangeStudent} aria-label="Change student"><RotateCcw size={14} /></button>
        </div>
      </div>

      <div className="overview-grid">
        <section className={`live-card ${currentLecture ? '' : 'no-class-card'}`}>
          <div className="live-card-content">
            <div className="status-line">
              <span className="status-badge"><span className="status-dot" /> {currentLecture ? 'Live now' : 'No class right now'}</span>
              <span className="status-date">{now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
            </div>
            <div className="live-label">{currentLecture ? 'Current lecture' : 'You’re free at the moment'}</div>
            <h2 className="live-subject">{currentLecture ? currentLecture.subject : 'No class right now.'}</h2>
            {currentLecture ? (
              <>
                <div className="live-meta">
                  <span><Clock3 size={14} /> {formatTime(currentLecture.startTime)} – {formatTime(currentLecture.endTime)}</span>
                  <span><BookOpen size={14} /> {currentLecture.type}</span>
                  {currentLecture.room && <span><MapPin size={14} /> Room {currentLecture.room}</span>}
                </div>
                <div className="live-progress" aria-label={`${Math.round(currentProgress)} percent complete`}><span style={{ width: `${currentProgress}%` }} /></div>
                <div className="live-remaining">{remainingMinutes} min remaining</div>
              </>
            ) : (
              <div className="live-meta"><span><Sparkles size={14} /> Your next class is ready below.</span></div>
            )}
          </div>
        </section>

        <section className="next-card">
          <div>
            <div className="card-kicker"><span>Next lecture</span><ArrowRight className="next-arrow" size={17} /></div>
            {upcoming ? (
              <>
                <h2 className="next-subject">{upcoming.lecture.subject}</h2>
                <div className="next-when">{formatDayOffset(upcoming.dayOffset, now)} · {formatTime(upcoming.lecture.startTime)}</div>
                <div className="next-details">
                  <div className="next-detail"><small>Time</small><span>{formatTime(upcoming.lecture.startTime)} – {formatTime(upcoming.lecture.endTime)}</span></div>
                  <div className="next-detail"><small>Type</small><span>{upcoming.lecture.type}</span></div>
                  <div className="next-detail"><small>Room</small><span>{upcoming.lecture.room ? `Room ${upcoming.lecture.room}` : 'Not in source'}</span></div>
                  <div className="next-detail"><small>Professor</small><span>{upcoming.lecture.professor ?? 'Not in source'}</span></div>
                </div>
              </>
            ) : <p className="next-subject">No more classes today.</p>}
          </div>
          {upcoming && (
            <div className="reminder-row">
              <select aria-label="Reminder time" value={reminderMinutes} onChange={(event) => setReminderMinutes(Number(event.target.value))}>
                <option value={5}>5 min before</option>
                <option value={10}>10 min before</option>
                <option value={15}>15 min before</option>
              </select>
              <button className={`reminder-button ${reminderSet ? 'active' : ''}`} onClick={onReminder}>
                {reminderSet ? <Check size={14} /> : <Bell size={14} />} {reminderSet ? 'Reminder set' : 'Remind me'}
              </button>
            </div>
          )}
        </section>
      </div>

      <div className="metadata-row">
        <div className="meta-card"><div className="meta-card-label">Enrollment</div><div className="meta-card-value">{student.enrollmentNumber}</div></div>
        <div className="meta-card"><div className="meta-card-label">Branch</div><div className="meta-card-value">{branchName}</div></div>
        <div className="meta-card"><div className="meta-card-label">Semester / batch</div><div className="meta-card-value">Semester {student.semester} · {student.division}</div></div>
      </div>

      <div className="timetable-card">
        <div className="timetable-head">
          <div><h2 className="timetable-title">This week</h2><p className="timetable-subtitle">Your classes, automatically matched to {student.division}.</p></div>
          <button className="table-action" onClick={onTimetable}>Full timetable <ArrowRight size={14} /></button>
        </div>
        <Timetable
          selectedDay={getDayKey(now) ?? 'monday'}
          setSelectedDay={() => undefined}
          lectures={classTimetable?.lectures.filter((lecture) => lecture.day === (getDayKey(now) ?? 'monday')) ?? []}
          now={now}
          currentLecture={currentLecture}
        />
      </div>
    </main>
  );
}

function Timetable({
  selectedDay,
  setSelectedDay,
  lectures,
  now,
  currentLecture,
}: {
  selectedDay: DayKey;
  setSelectedDay: (day: DayKey) => void;
  lectures: Lecture[];
  now: Date;
  currentLecture?: Lecture;
}) {
  const today = getDayKey(now);
  return (
    <div className="timetable-inner">
      <div className="day-tabs" role="tablist" aria-label="Days of the week">
        {(['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] as DayKey[]).map((day) => (
          <button
            key={day}
            className={`day-tab ${selectedDay === day ? 'active' : ''} ${today === day ? 'today' : ''}`}
            onClick={() => setSelectedDay(day)}
            role="tab"
            aria-selected={selectedDay === day}
          >
            {dayShortLabels[day]}<small>{today === day ? 'TODAY' : dayLabels[day].slice(0, 3).toUpperCase()}</small>
          </button>
        ))}
      </div>
      <div className="lecture-list">
        {lectures.length ? lectures.map((lecture) => {
          const isCurrent = currentLecture?.id === lecture.id || lectureMatchesNow(lecture, now);
          return (
            <div className={`lecture-row ${isCurrent ? 'current' : ''}`} key={lecture.id}>
              <div className="lecture-time">{formatTime(lecture.startTime)}<br />{formatTime(lecture.endTime)}</div>
              <div className="lecture-main"><h3 className="lecture-name">{lecture.subject}</h3><span className="lecture-type">{lecture.type} · All {lecture.groups.join(' / ')}</span></div>
              <div className="lecture-state">{isCurrent ? <><BellRing size={12} /> Live now</> : <><Clock3 size={12} /> Scheduled</>}</div>
            </div>
          );
        }) : <div className="empty-timetable"><CalendarDays size={20} /><span>No classes scheduled for this day.</span></div>}
      </div>
    </div>
  );
}

function BottomNav({ screen, setScreen }: { screen: Screen; setScreen: (screen: Screen) => void }) {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      <button className={screen === 'home' ? 'active' : ''} onClick={() => setScreen('home')}><GraduationCap size={16} />Home</button>
      <button className={screen === 'class' ? 'active' : ''} onClick={() => setScreen('class')}><UserRound size={16} />My class</button>
      <button className={screen === 'timetable' ? 'active' : ''} onClick={() => setScreen('timetable')}><CalendarDays size={16} />Timetable</button>
    </nav>
  );
}

export default App;
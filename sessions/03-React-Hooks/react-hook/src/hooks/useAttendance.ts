import { useEffect, useMemo, useState } from 'react';

type Attendance = { present: number; absent: number };

const STORAGE_KEY = 'attendance-state';
const DEFAULT: Attendance = { present: 0, absent: 0 };

export function useAttendance() {
  const [counts, setCounts] = useState<Attendance>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Attendance) : DEFAULT;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
  }, [counts]);

  const increment = (isPresent: boolean = true) => {
    setCounts(prev =>
      isPresent ? { ...prev, present: prev.present + 1 } : { ...prev, absent: prev.absent + 1 }
    );
  };

  const decrement = (isPresent: boolean = true) => {
    setCounts(prev =>
      isPresent ? { ...prev, present: Math.max(0, prev.present - 1) } : { ...prev, absent: Math.max(0, prev.absent - 1) }
    );
  };

  const reset = () => setCounts(DEFAULT);

  const percent = useMemo(() => {
    const total = counts.present + counts.absent;
    return total === 0 ? 0 : Math.round((counts.present / total) * 100);
  }, [counts.present, counts.absent]);

  return { present: counts.present, absent: counts.absent, increment, decrement, reset, percent };
}

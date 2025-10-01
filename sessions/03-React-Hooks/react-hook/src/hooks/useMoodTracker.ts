import { useEffect, useMemo, useState } from 'react';

type MoodEntry = { date: string; mood: number };
type MoodState = { entries: MoodEntry[] };

const STORAGE_KEY = 'mood-tracker';
const DEFAULT: MoodState = { entries: [] };

const todayStr = () => new Date().toISOString().slice(0, 10);
const diffDays = (a: string, b: string) =>
  Math.round((new Date(a + 'T00:00:00Z').getTime() - new Date(b + 'T00:00:00Z').getTime()) / 86400000);

export function useMoodTracker() {
  const [state, setState] = useState<MoodState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as MoodState) : DEFAULT;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addMood = (mood: number, date: string = todayStr()) => {
    const value = Math.max(1, Math.min(5, Math.round(mood)));
    setState(prev => {
      const without = prev.entries.filter(e => e.date !== date);
      const next = [...without, { date, mood: value }].sort((a, b) => a.date.localeCompare(b.date));
      return { entries: next };
    });
  };

  const weeklyAverage = useMemo(() => {
    if (state.entries.length === 0) return 0;
    const today = todayStr();
    const last7 = state.entries.filter(e => {
      const d = diffDays(today, e.date);
      return d >= 0 && d <= 6;
    });
    if (last7.length === 0) return 0;
    const sum = last7.reduce((acc, e) => acc + e.mood, 0);
    return Math.round((sum / last7.length) * 100) / 100;
  }, [state.entries]);

  return { entries: state.entries, addMood, weeklyAverage };
}

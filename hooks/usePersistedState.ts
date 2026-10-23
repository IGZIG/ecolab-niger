import { useEffect, useState } from 'react';
export function usePersistedState<T>(key: string, initial: T): [T, (value: T | ((old: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    try { const saved = localStorage.getItem(key); return saved ? JSON.parse(saved) as T : initial; }
    catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(state)); } catch (error) { console.error(`Could not persist ${key}`, error); } }, [key, state]);
  return [state, setState];
}

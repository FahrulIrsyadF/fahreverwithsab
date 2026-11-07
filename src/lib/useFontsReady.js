import { useEffect, useState } from 'react';

/** true setelah semua web font termuat, agar SplitText & pengukuran teks akurat. */
export function useFontsReady() {
  const [ready, setReady] = useState(() => document.fonts?.status === 'loaded');
  useEffect(() => {
    let alive = true;
    document.fonts?.ready.then(() => alive && setReady(true));
    const t = setTimeout(() => alive && setReady(true), 2500); // fallback jika font lambat
    return () => { alive = false; clearTimeout(t); };
  }, []);
  return ready;
}

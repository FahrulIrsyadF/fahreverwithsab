export const GUEST_LIST = [
  "Budi Santoso",
  "Siti Aminah",
  "Ahmad Fauzi",
  "Rina Kartika",
  "Fahrul & Partner",
  "Fahrul and Partner",
  "Fahrul",
  "Dimas Pratama",
  "Anisa Rahmawati",
  "Bapak Hendra & Keluarga"
];

/**
 * Validasi pencocokan nama tamu (case-insensitive & trimmed)
 */
export function validateGuest(name) {
  if (!name || typeof name !== 'string') return null;
  const cleanName = name.trim();
  if (!cleanName) return null;

  const matched = GUEST_LIST.find(
    g => g.toLowerCase() === cleanName.toLowerCase()
  );

  return matched || null;
}

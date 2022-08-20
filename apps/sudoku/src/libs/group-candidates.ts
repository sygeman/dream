export const groupCandidates = (candidatesById: { [key: string]: string }) => {
  const groups = new Map<number, Set<string>>();

  Object.entries(candidatesById).forEach(([id, candidatesString]) => {
    const candidates = candidatesString.split("");
    const key = candidates.length;
    if (key === 0) return;
    if (!groups.has(key)) groups.set(key, new Set());
    groups.get(key)?.add(id);
  });

  const sortedGroup = new Map<number, Set<string>>();

  Array.from(groups.keys())
    .sort()
    .forEach((key) => {
      const item = groups.get(key);
      if (item) sortedGroup.set(key, item);
    });

  return sortedGroup;
};

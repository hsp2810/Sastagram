export const parseDateTime = (datetime: Date | null): string => {
  if (!datetime) return "";
  const now: Date = new Date();
  const uploadedTime: Date = new Date(datetime);
  const timeDifference: number = now.getTime() - uploadedTime.getTime();

  // Convert milliseconds to seconds
  const seconds: number = Math.floor(timeDifference / 1000);

  if (seconds < 60) {
    return "Just now";
  } else if (seconds < 3600) {
    const minutes: number = Math.floor(seconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  } else if (seconds < 86400) {
    const hours: number = Math.floor(seconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    const days: number = Math.floor(seconds / 86400);
    return `${days} day${days > 1 ? "s" : ""}`;
  }
};

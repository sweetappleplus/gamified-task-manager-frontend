export const getCharsForAvatar = (name?: string, email?: string): string => {
  if (name) {
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  if (email) {
    const localPart = email.split("@")[0];
    return localPart.slice(0, 2).toUpperCase();
  }

  return "";
};

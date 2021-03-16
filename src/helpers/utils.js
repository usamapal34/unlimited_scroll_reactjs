const utils = {
  generateId,
  getStringInitials,
};

/**
 *  Generate random id
 */

function generateId() {
  const min = 999;
  const max = 9999;
  const rand = min + Math.random() * (max - min);
  return rand;
}

/**
 *  Check email
 */

function getStringInitials(string) {
  var names = string.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}

export default utils;

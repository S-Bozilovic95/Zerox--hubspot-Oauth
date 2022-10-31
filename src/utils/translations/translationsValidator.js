const fs = require("fs");
const translationsDir = "src/translations";

/**
 * Checks if passed file has JSON format
 * @param file - file to check
 * @param fileSrc - source of passed file
 * @returns {boolean}
 */
const isValidJSONFile = (file, fileSrc) => {
  try {
    if (!fileSrc.endsWith(".json")) return true;
    return !!JSON.parse(file);
  } catch (e) {
    throw new Error(`
      Error occurred in: ${fileSrc}
      ${e}
    `);
  }
};

/**
 * Load and check if file has JSON format
 * @param fileSrc
 * @returns {boolean}
 */
const checkFile = (fileSrc) => {
  const translationFile = fs.readFileSync(fileSrc, "utf8");
  return isValidJSONFile(translationFile, fileSrc);
};

/**
 * Checks if all translations files has JSON format
 */
const validateTranslationsFiles = () =>
  // eslint-disable-next-line
  fs.readdir(translationsDir, (err, files) => {
    if (err) throw err;

    try {
      files.forEach((fileName) => {
        checkFile(`${translationsDir}/${fileName}`);
      });

      // eslint-disable-next-line
      console.log('\x1b[32m', 'Translations files are valid');
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
      return false;
    }
  });

validateTranslationsFiles();

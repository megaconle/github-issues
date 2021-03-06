/**
 * Get date as string in US date format
 * @param {str} dateString - The date to convert
 * @return {string} Date formated mm/dd/yyyy
 */
export function getDateFromString(dateString) {
    return new Date(dateString).toLocaleDateString("en-US");
}

/**
 * Get difference between given date in now in readable English
 * @param {str} dateString - The date to convert
 * @return {string} Time difference formatted as '[amount] [units] ago'
 
 * Adapted from https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
 * Could bring in Moment, Luxon, etc but seemed unnecessary to bring in another large package for this
 * If more date manipulation is needed across the app, consider adding a package
**/
export function timeSince(dateString) {
    let seconds = Math.floor(((new Date().getTime()/1000) - (new Date(dateString).getTime()/1000)));
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) return interval + " years ago";

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + " months ago";

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + " days ago";

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + " hours ago";

    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + " minutes ago";

    return Math.floor(seconds) + " seconds ago";
}

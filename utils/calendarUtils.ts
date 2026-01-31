import { Sermon } from '../data/data';

/**
 * Calculates the Orthodox Easter date for a given year using the Gauss algorithm
 * for the Julian calendar, then converts to Gregorian by adding 13 days.
 *
 * @param year - The year to calculate Easter for
 * @returns The Gregorian date of Orthodox Easter
 */
export function getOrthodoxEaster(year: number): Date {
    const a = year % 4;
    const b = year % 7;
    const c = year % 19;
    const d = (19 * c + 15) % 30;
    const e = (2 * a + 4 * b - d + 34) % 7;
    const month = Math.floor((d + e + 114) / 31);
    const day = ((d + e + 114) % 31) + 1;
    const julianDate = new Date(year, month - 1, day);
    const gregorianDate = new Date(julianDate);
    gregorianDate.setDate(julianDate.getDate() + 13); // Add 13 days for New Calendar
    return gregorianDate;
}

/**
 * Calculates the number of days between a given date and Orthodox Easter of that year.
 * Negative values indicate days before Easter, positive values indicate days after Easter.
 *
 * @param date - The date to calculate the offset for
 * @returns The number of days from Orthodox Easter (negative = before, positive = after)
 */
export function calculatePaschaOffset(date: Date): number {
    const year = date.getFullYear();
    const easter = getOrthodoxEaster(year);

    // Reset time components to compare only dates
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const easterOnly = new Date(easter.getFullYear(), easter.getMonth(), easter.getDate());

    const diffTime = dateOnly.getTime() - easterOnly.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}

/**
 * Finds the sermon matching today's date based on either fixed calendar date
 * or offset from Orthodox Easter (Pascha).
 *
 * @param sermons - Array of sermons to search through
 * @returns The matching sermon or null if no match is found
 */
export function getTodaysSermon(sermons: Sermon[]): Sermon | null {
    const today = new Date();
    const todayMonth = today.getMonth() + 1; // JavaScript months are 0-indexed
    const todayDay = today.getDate();
    const paschaOffset = calculatePaschaOffset(today);

    const matchingSermon = sermons.find(sermon => {
        // Check for fixed date match (e.g., Saint's feast days)
        if (sermon.fixed_month !== null && sermon.fixed_day !== null) {
            if (sermon.fixed_month === todayMonth && sermon.fixed_day === todayDay) {
                return true;
            }
        }

        // Check for pascha offset match (e.g., movable feasts and Sundays)
        if (sermon.pascha_offset !== null && sermon.pascha_offset === paschaOffset) {
            return true;
        }

        return false;
    });

    return matchingSermon || null;
}

/**
 * Returns the Romanian Orthodox feast or Sunday name for a given date.
 * This includes both fixed feasts and movable feasts based on Pascha.
 *
 * @param date - The date to get the feast name for
 * @returns The Romanian name of the feast/Sunday, or an empty string if no special feast
 */
export function getOrthodoxFeastName(date: Date): string {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const paschaOffset = calculatePaschaOffset(date);

    // Fixed feasts (by calendar date)
    const fixedFeasts: Record<string, string> = {
        '1-1': 'Anul Nou - Sfântul Vasile cel Mare',
        '1-6': 'Bobotează - Botezul Domnului',
        '1-7': 'Sfântul Ioan Botezătorul',
        '1-30': 'Sfinții Trei Ierarhi',
        '2-2': 'Întâmpinarea Domnului',
        '3-9': 'Sfinții 40 de Mucenici',
        '3-25': 'Buna Vestire',
        '4-23': 'Sfântul Gheorghe',
        '5-21': 'Sfinții Constantin și Elena',
        '6-29': 'Sfinții Petru și Pavel',
        '7-20': 'Sfântul Ilie',
        '8-6': 'Schimbarea la Față',
        '8-15': 'Adormirea Maicii Domnului',
        '8-29': 'Tăierea Capului Sfântului Ioan Botezătorul',
        '9-8': 'Nașterea Maicii Domnului',
        '9-14': 'Înălțarea Sfintei Cruci',
        '10-14': 'Acoperământul Maicii Domnului',
        '11-8': 'Soborul Sfinților Arhangheli Mihail și Gavriil',
        '11-21': 'Intrarea în Biserică a Maicii Domnului',
        '11-30': 'Sfântul Apostol Andrei',
        '12-6': 'Sfântul Nicolae',
        '12-25': 'Nașterea Domnului - Crăciunul',
        '12-26': 'Soborul Maicii Domnului',
        '12-27': 'Sfântul Ștefan',
    };

    const fixedKey = `${month}-${day}`;
    if (fixedFeasts[fixedKey]) {
        return fixedFeasts[fixedKey];
    }

    // Movable feasts (by Pascha offset)
    const movableFeasts: Record<number, string> = {
        '-70': 'Duminica Vameșului și a Fariseului',
        '-63': 'Duminica Fiului Risipitor',
        '-56': 'Duminica Înfricoșătoarei Judecăți (Lăsata Secului de brânză)',
        '-49': 'Duminica Izgonirii lui Adam din Rai (Lăsata Secului de carne)',
        '-48': 'Începutul Postului Mare',
        '-42': 'Duminica I din Post - Duminica Ortodoxiei',
        '-35': 'Duminica a II-a din Post - Sfântul Grigorie Palama',
        '-28': 'Duminica a III-a din Post - A Sfintei Cruci',
        '-21': 'Duminica a IV-a din Post - Sfântul Ioan Scărarul',
        '-14': 'Duminica a V-a din Post - Sfânta Maria Egipteanca',
        '-7': 'Duminica Floriilor - Intrarea Domnului în Ierusalim',
        '-3': 'Joia Mare',
        '-2': 'Vinerea Mare - Răstignirea Domnului',
        0: 'Învierea Domnului - Paștele',
        1: 'Lunea Luminată',
        7: 'Duminica Tomii',
        14: 'Duminica Mironosițelor',
        21: 'Duminica Slăbănogului',
        28: 'Duminica Samarinencei',
        35: 'Duminica Orbului',
        39: 'Înălțarea Domnului',
        42: 'Duminica Sfinților Părinți de la Sinodul I Ecumenic',
        49: 'Duminica Rusaliilor - Pogorârea Sfântului Duh',
        50: 'Lunea Sfântului Duh',
        56: 'Duminica Tuturor Sfinților',
    };

    if (movableFeasts[paschaOffset]) {
        return movableFeasts[paschaOffset];
    }

    // Check if it's a Sunday and calculate which Sunday after Pentecost
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 && paschaOffset > 56) { // Sundays after All Saints
        const sundaysAfterPentecost = Math.floor((paschaOffset - 49) / 7);
        if (sundaysAfterPentecost > 1) {
            return `Duminica a ${sundaysAfterPentecost}-a după Rusalii`;
        }
    }

    return '';
}

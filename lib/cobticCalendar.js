/**
 * @author Ali Mahdi <github.com/computerchi>
 * @file cobticCalendar.js
 * Algorithm from Eng. Mohammed ali Alsayegh.
 * @copyright Ali Mahdi 2018
 */

/**
 * Convert Gregorian dates to Cobtic dates.
 * @class CobticCalendar
 */
class CobticCalendar {
  constructor() {
    this.gYear;
    this.gMonth;
    this.gDay;

    this.cYear;
    this.cMonth;
    this.cDay;

    this.isLeap;
  }

  /**
   * Returns an object containting cobtic date {year, month, day}.
   * @returns {Date}
   * @readonly
   * @memberof CobticCalendar
   */
  get date() {
    return { year: this.cYear, month: this.cMonth, day: this.cDay };
  }

  /**
   * Returns true if the current cobtic year is a leap year, false otherwise.
   * @returns {boolean}
   * @readonly
   * @memberof CobticCalendar
   */
  get isLeapYear() {
    return this.isLeap;
  }

  /**
   * Returns the current Cobtic month name.
   * @returns {string} cobtic month name
   * @readonly
   * @memberof CobticCalendar
   */
  get monthName() {
    let cobticMonths = [
      "توت",
      "بابه",
      "هاتور",
      "كياك",
      "طوبه",
      "امشير",
      "برمهات",
      "برموده",
      "بشنس",
      "بؤونه",
      "ابيب",
      "مسرا",
      "كوجى اتفوت"
    ];

    return cobticMonths[this.cMonth - 1];
  }

  /**
   * Sets the current gregorian date to work with.
   * @param {number} year - gregorian year
   * @param {number} month - gregorian month (1-12)
   * @param {number} day - gregorian day
   */
  setGregorianDate(year, month, day) {
    this.gYear = year;
    this.gMonth = month;
    this.gDay = day;

    this.calcCobticDate();
  }

  /**
   * @private
   * @memberof CobticCalendar
   */
  calcCobticDate() {
    this.isLeap =
      (this.gYear % 4 == 0 && this.gYear % 100 != 0) || this.gYear % 400 == 0;

    let daySequence;
    if (this.isLeap) {
      daySequence =
        ~~((275 * this.gMonth) / 9) -
        ~~((this.gMonth + 9) / 12) +
        this.gDay -
        30;
    } else {
      daySequence =
        ~~((275 * this.gMonth) / 9) -
        2 * ~~((this.gMonth + 9) / 12) +
        this.gDay -
        30;
    }

    let julianDiff = ~~((~~(this.gYear / 100) * 3 - 5) / 4);

    let cobticDaySequence = daySequence + 125 - julianDiff - this.isLeap;
    this.cYear = this.gYear - 284;

    let nasie = (this.cYear - 3) % 4 == 0 ? 6 : 5;
    let cobticYearLength = 360 + nasie;

    if (cobticDaySequence > cobticYearLength) {
      this.cYear++;
      cobticDaySequence -= cobticYearLength;
    }

    this.cMonth = ~~(cobticDaySequence / 30) + (cobticDaySequence % 30 ? 1 : 0);
    this.cDay = cobticDaySequence % 30;
    if (this.cDay == 0) this.cDay = 30;
  }
}

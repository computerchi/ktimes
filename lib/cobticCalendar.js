//
// cobticCalendar.js
// Developed by Ali Mahdi, ©2018
// Algorithm from Eng. Mohammed ali Alsayegh.
// this library is a has a class with two functions,
// getCobticDate()
// getgetCobticMonthName()

/**
 * Title: Calender Conversion class
 * Description: Convert Gregorian dates to Cobtic dates
 * Public Methods Summary:
 * -----------------------
 * CobticCalendar();
 * get cobticDate();
 * get isLeapYear();
 * get cobticMonthName();
 * setGregorianDate();
 */
class CobticCalendar {
  constructor() {
    this.gYear = null;
    this.gMonth = null;
    this.gDay = null;

    this.cYear = null;
    this.cMonth = null;
    this.cDay = null;

    this.isLeap = null;
  }

  /**
   * get cobticDate:
   * @return {year , month , day } object containting cobtic date
   */
  get cobticDate() {
    return { year: this.cYear, month: this.cMonth, day: this.cDay };
  }

  /**
   * get isLeapYear:
   * @return true if cobtic leap year
   */
  get isLeapYear() {
    return this.isLeap;
  }

  /**
   * get cobticMonthName:
   * @return  cobtic month name
   */
  get cobticMonthName() {
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
   * setGregorianDate:
   * @param year int gregorian year
   * @param month int gregorian month
   * @param day int gregorian day
   */
  setGregorianDate(year, month, day) {
    this.gYear = year;
    this.gMonth = month;
    this.gDay = day;

    this.calcCobticDate();
  }

  /**
   * calcCobticDate:
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

    let nasie = this.isLeap ? 6 : 5;
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

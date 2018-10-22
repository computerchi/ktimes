//
// cobticCalendar.js
// Developed by Ali Mahdi, ©2018
// Algorithm from Eng. Mohammed ali Alsayegh.
// this library is a has a class with two functions,
// getCobticDate()
// getgetCobticMonthName()

class CobticCalendar {
  /**
   * getCobticDate:
   * @param year int gregorian year
   * @param month int gregorian month
   * @param day int gregorian day
   * @return {year , month , day } object containting cobtic date
   */
  getCobticDate(year, month, day) {
    this.isLeapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;

    let daySequence;
    if (this.isLeapYear) {
      daySequence = ~~((275 * month) / 9) - ~~((month + 9) / 12) + day - 30;
    } else {
      daySequence = ~~((275 * month) / 9) - 2 * ~~((month + 9) / 12) + day - 30;
    }

    let julianDiff = ~~((~~(year / 100) * 3 - 5) / 4);

    let cobticDaySequence = daySequence + 125 - julianDiff - this.isLeapYear;
    let cobticYear = year - 284;

    let nasie = this.isLeapYear ? 6 : 5;
    let cobticYearLength = 360 + nasie;

    if (cobticDaySequence > cobticYearLength) {
      cobticYear++;
      cobticDaySequence -= cobticYearLength;
    }

    let cobticMonth =
      ~~(cobticDaySequence / 30) + (cobticDaySequence % 30 ? 1 : 0);
    let cobticDay = cobticDaySequence % 30;
    if (cobticDay == 0) cobticDay = 30;

    return { year: cobticYear, month: cobticMonth, day: cobticDay };
  }

  /**
   * getCobticMonthName:
   * @param month int gregorian month (1 - 12)
   * @return  cobtic month name
   */
  getCobticMonthName(month) {
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

    return cobticMonths[month - 1];
  }
}

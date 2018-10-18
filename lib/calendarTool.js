/**
 * Title: Calender Conversion class
 * Description: Convert Iranian (Jalali), Julian, and Gregorian dates to
 * each other
 * Public Methods Summary:
 * -----------------------
 * CalendarTool(int year, int month, int day);
 * get int iranianYear();
 * get int iranianMonth();
 * get int iranianDay();
 * get int gregorianYear();
 * get int gregorianMonth();
 * get int gregorianDay();
 * get int julianYear();
 * get int julianMonth();
 * get int julianDay();
 * get String iranianDate();
 * get String iranianFullDate();
 * get String gregorianDate();
 * get String julianDate();
 * get String weekDayStr();
 * get int dayOfWeek();
 * get int jdn();
 * String printAll();
 * void nextDay();
 * void nextDay(int days);
 * void previousDay();
 * void previousDay(int days);
 * void setIranianDate(int year, int month, int day);
 * void setGregorianDate(int year, int month, int day);
 * void setJulianDate(int year, int month, int day);
 */
class CalendarTool {
  //  * This constructor receives a Gregorian date and initializes the other private
  //  * members of the class accordingly.
  //  * @param year int
  //  * @param month int
  //  * @param day int
  constructor(year, month, day) {
    this.setGregorianDate(year, month, day);

    this.irYear; // Year part of a Iranian date
    this.irMonth; // Month part of a Iranian date
    this.irDay; // Day part of a Iranian date
    this.gYear; // Year part of a Gregorian date
    this.gMonth; // Month part of a Gregorian date
    this.gDay; // Day part of a Gregorian date
    this.juYear; // Year part of a Julian date
    this.juMonth; // Month part of a Julian date
    this.juDay; // Day part of a Julian date
    this.leap; // Number of years since the last leap year (0 to 4)
    this.JDN; // Julian Day Number
    this.march; // The march day of Farvardin the first (First day of jaYear)
  }

  /**
   * getIranianYear:
   * Returns the 'year' part of the Iranian date.
   * @return int
   */
  get iranianYear() {
    return this.irYear;
  }

  /**
   * getIranianMonth:
   * Returns the 'month' part of the Iranian date.
   * @return int
   */
  get iranianMonth() {
    return this.irMonth;
  }

  /**
   * getIranianDay:
   * Returns the 'day' part of the Iranian date.
   * @return int
   */
  get iranianDay() {
    return this.irDay;
  }

  /**
   * getGregorianYear:
   * Returns the 'year' part of the Gregorian date.
   * @return int
   */
  get gregorianYear() {
    return this.gYear;
  }

  /**
   * getGregorianMonth:
   * Returns the 'month' part of the Gregorian date.
   * @return int
   */
  get gregorianMonth() {
    return this.gMonth;
  }

  /**
   * getGregorianDay:
   * Returns the 'day' part of the Gregorian date.
   * @return int
   */
  get gregorianDay() {
    return this.gDay;
  }

  /**
   * getJulianYear:
   * Returns the 'year' part of the Julian date.
   * @return int
   */
  get julianYear() {
    return this.juYear;
  }

  /**
   * getJulianMonth:
   * Returns the 'month' part of the Julian date.
   * @return int
   */
  get julianMonth() {
    return this.juMonth;
  }

  /**
   * getJulianDay()
   * Returns the 'day' part of the Julian date.
   * @return int
   */
  get julianDay() {
    return this.juDay;
  }

  /**
   * getIranianDate:
   * Returns a string version of Iranian date
   * @return String
   */
  get iranianDate() {
    return `${this.irYear}-${this.irMonth}-${this.irDay}`;
  }

  /**
   * get IranianFullDate:
   * Returns a string version of Iranian date
   * @return String
   */
  get iranianFullDate() {
    return `${this.irYear}-${this.getIranianMonthName(this.irMonth)}-${
      this.irDay
    }`;
  }

  /**
   * getGregorianDate:
   * Returns a string version of Gregorian date
   * @return String
   */
  get gregorianDate() {
    return `${this.gYear}-${this.gMonth}-${this.gDay}`;
  }

  /**
   * getJulianDate:
   * Returns a string version of Julian date
   * @return String
   */
  get julianDate() {
    return `${this.juYear}-${this.juMonth}-${this.juDay}`;
  }

  /**
   * getWeekDayStr:
   * Returns the week day name.
   * @return String
   */
  get weekDayStr() {
    const weekDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
    return weekDays[this.dayOfWeek];
  }

  get iranianMonthName() {
    var monthNames = [
      "فروردين",
      "ارديبهشت",
      "خرداد",
      "تير",
      "مرداد",
      "شهريور",
      "مهر",
      "آبان",
      "آذر",
      "دي",
      "بهمن",
      "اسفند"
    ];

    return monthNames[this.irMonth - 1];
  }

  /**
   * toString:
   * Overrides the default toString() method to return all dates.
   * @return String
   */
  printAll() {
    console.log(
      `${this.weekDayStr}, Gregorian:[${this.gregorianDate}], Julian:[${
        this.julianDate
      }:${this.JDN}], Iranian:[${this.iranianFullDate}]`
    );
  }

  /**
   * getDayOfWeek:
   * Returns the week day number. Monday=0..Sunday=6;
   * @return int
   */
  get dayOfWeek() {
    return mod(this.JDN, 7);
  }

  /**
   * jdn:
   * Returns Julian Day Number;
   * @return int
   */
  get jdn() {
    return this.JDN;
  }

  /**
   * nextDay:
   * Go to next julian day number (JDN) and adjusts the other dates.
   */
  nextDay() {
    this.JDN++;
    this.JDNToIranian();
    this.JDNToJulian();
    this.JDNToGregorian();
  }
  /**
   * nextDay:
   * Overload the nextDay() method to accept the number of days to go ahead and
   * adjusts the other dates accordingly.
   * @param days int
   */
  nextDay(days) {
    this.JDN += days;
    this.JDNToIranian();
    this.JDNToJulian();
    this.JDNToGregorian();
  }

  /**
   * previousDay:
   * Go to previous julian day number (JDN) and adjusts the otehr dates.
   */
  previousDay() {
    this.JDN--;
    this.JDNToIranian();
    this.JDNToJulian();
    this.JDNToGregorian();
  }

  /**
   * previousDay:
   * Overload the previousDay() method to accept the number of days to go backward
   * and adjusts the other dates accordingly.
   * @param days int
   */
  previousDay(days) {
    this.JDN -= days;
    this.JDNToIranian();
    this.JDNToJulian();
    this.JDNToGregorian();
  }

  /**
   * setIranianDate:
   * Sets the date according to the Iranian calendar and adjusts the other dates.
   * @param year int
   * @param month int
   * @param day int
   */
  setIranianDate(year, month, day) {
    this.irYear = year;
    this.irMonth = month;
    this.irDay = day;
    this.JDN = this.IranianDateToJDN();
    this.JDNToIranian();
    this.JDNToJulian();
    this.JDNToGregorian();
  }

  /**
   * setGregorianDate:
   * Sets the date according to the Gregorian calendar and adjusts the other dates.
   * @param year int
   * @param month int
   * @param day int
   */
  setGregorianDate(year, month, day) {
    this.gYear = year;
    this.gMonth = month;
    this.gDay = day;
    this.JDN = this.gregorianDateToJDN(year, month, day);
    this.JDNToIranian();
    this.JDNToJulian();
    this.JDNToGregorian();
  }

  /**
   * setJulianDate:
   * Sets the date according to the Julian calendar and adjusts the other dates.
   * @param year int
   * @param month int
   * @param day int
   */
  setJulianDate(year, month, day) {
    this.juYear = year;
    this.juMonth = month;
    this.juDay = day;
    this.JDN = this.julianDateToJDN(year, month, day);
    this.JDNToIranian();
    this.JDNToJulian();
    this.JDNToGregorian();
  }

  /**
   * IranianCalendar:
   * This method determines if the Iranian (Jalali) year is leap (366-day long)
   * or is the common year (365 days), and finds the day in March (Gregorian
   * Calendar)of the first day of the Iranian year ('irYear').Iranian year (irYear)
   * ranges from (-61 to 3177).This method will set the following private data
   * members as follows:
   * leap: Number of years since the last leap year (0 to 4)
   * Gy: Gregorian year of the begining of Iranian year
   * march: The March day of Farvardin the 1st (first day of jaYear)
   */
  IranianCalendar() {
    // Iranian years starting the 33-year rule
    let breaks = [
      -61,
      9,
      38,
      199,
      426,
      686,
      756,
      818,
      1111,
      1181,
      1210,
      1635,
      2060,
      2097,
      2192,
      2262,
      2324,
      2394,
      2456,
      3178
    ];
    let jm, N, leapJ, leapG, jp, j, jump;
    this.gYear = this.irYear + 621;
    leapJ = -14;
    jp = breaks[0];
    // Find the limiting years for the Iranian year 'irYear'
    j = 1;
    do {
      jm = breaks[j];
      jump = jm - jp;
      if (this.irYear >= jm) {
        leapJ += div(jump, 33) * 8 + div(mod(jump, 33), 4);
        jp = jm;
      }
      j++;
    } while (j < 20 && this.irYear >= jm);
    N = this.irYear - jp;
    // Find the number of leap years from AD 621 to the begining of the current
    // Iranian year in the Iranian (Jalali) calendar
    leapJ += div(N, 33) * 8 + div(mod(N, 33) + 3, 4);
    if (mod(jump, 33) == 4 && jump - N == 4) leapJ++;
    // And the same in the Gregorian date of Farvardin the first
    leapG = div(this.gYear, 4) - div((div(this.gYear, 100) + 1) * 3, 4) - 150;
    this.march = 20 + leapJ - leapG;
    // Find how many years have passed since the last leap year
    if (jump - N < 6) N = N - jump + div((jump + 4, 33) * 33);
    this.leap = mod(mod(N + 1, 33) - 1, 4);
    if (this.leap == -1) this.leap = 4;
  }

  /**
   * IsLeap:
   * This method determines if the Iranian (Jalali) year is leap (366-day long)
   * or is the common year (365 days), and finds the day in March (Gregorian
   * Calendar)of the first day of the Iranian year ('irYear').Iranian year (irYear)
   * ranges from (-61 to 3177).This method will set the following private data
   * members as follows:
   * leap: Number of years since the last leap year (0 to 4)
   * Gy: Gregorian year of the begining of Iranian year
   * march: The March day of Farvardin the 1st (first day of jaYear)
   */
  IsLeap(irYear1) {
    // Iranian years starting the 33-year rule
    const Breaks = [
      -61,
      9,
      38,
      199,
      426,
      686,
      756,
      818,
      1111,
      1181,
      1210,
      1635,
      2060,
      2097,
      2192,
      2262,
      2324,
      2394,
      2456,
      3178
    ];
    let jm, N, leapJ, leapG, jp, j, jump;
    this.gYear = this.irYear + 621;
    leapJ = -14;
    jp = breaks[0];
    // Find the limiting years for the Iranian year 'irYear'
    j = 1;
    do {
      jm = breaks[j];
      jump = jm - jp;
      if (this.irYear >= jm) {
        leapJ += div(jump, 33) * 8 + div(mod(jump, 33), 4);
        jp = jm;
      }
      j++;
    } while (j < 20 && this.irYear >= jm);
    N = this.irYear - jp;
    // Find the number of leap years from AD 621 to the begining of the current
    // Iranian year in the Iranian (Jalali) calendar
    leapJ += div(N, 33) * 8 + div(mod(N, 33) + 3, 4);
    if (mod(jump, 33) == 4 && jump - N == 4) leapJ++;
    // And the same in the Gregorian date of Farvardin the first
    leapG = div(this.gYear, 4) - div((div(this.gYear, 100) + 1) * 3, 4) - 150;
    this.march = 20 + leapJ - leapG;
    // Find how many years have passed since the last leap year
    if (jump - N < 6) N = N - jump + div((jump + 4, 33) * 33);
    this.leap = mod(mod(N + 1, 33) - 1, 4);
    if (this.leap == -1) this.leap = 4;

    if (this.leap == 4 || this.leap == 0) return true;
    else return false;
  }

  /**
   * IranianDateToJDN:
   * Converts a date of the Iranian calendar to the Julian Day Number. It first
   * invokes the 'IranianCalender' private method to convert the Iranian date to
   * Gregorian date and then returns the Julian Day Number based on the Gregorian
   * date. The Iranian date is obtained from 'irYear'(1-3100),'irMonth'(1-12) and
   * 'irDay'(1-29/31).
   * @return long (Julian Day Number)
   */
  IranianDateToJDN() {
    this.IranianCalendar();
    return (
      this.gregorianDateToJDN(this.gYear, 3, this.march) +
      (this.irMonth - 1) * 31 -
      div(this.irMonth, 7) * (this.irMonth - 7) +
      this.irDay -
      1
    );
  }

  /**
   * JDNToIranian:
   * Converts the current value of 'JDN' Julian Day Number to a date in the
   * Iranian calendar. The caller should make sure that the current value of
   * 'JDN' is set correctly. This method first converts the JDN to Gregorian
   * calendar and then to Iranian calendar.
   */
  JDNToIranian() {
    this.JDNToGregorian();
    this.irYear = this.gYear - 621;
    this.IranianCalendar(); // This invocation will update 'leap' and 'march'
    const JDN1F = this.gregorianDateToJDN(this.gYear, 3, this.march);
    let k = this.JDN - JDN1F;
    if (k >= 0) {
      if (k <= 185) {
        this.irMonth = 1 + div(k, 31);
        this.irDay = mod(k, 31) + 1;
        return;
      } else k -= 186;
    } else {
      this.irYear--;
      k += 179;
      if (this.leap == 1) k++;
    }
    this.irMonth = 7 + div(k, 30);
    this.irDay = mod(k, 30) + 1;
  }

  /**
   * julianDateToJDN:
   * Calculates the julian day number (JDN) from Julian calendar dates. This
   * integer number corresponds to the noon of the date (i.e. 12 hours of
   * Universal Time). This method was tested to be good (valid) since 1 March,
   * -100100 (of both calendars) up to a few millions (10^6) years into the
   * future. The algorithm is based on D.A.Hatcher, Q.Jl.R.Astron.Soc. 25(1984),
   * 53-55 slightly modified by K.M. Borkowski, Post.Astron. 25(1987), 275-279.
   * @param year int
   * @param month int
   * @param day int
   * @return int
   */
  julianDateToJDN(year, month, day) {
    return (
      div((year + div(month - 8, 6) + 100100) * 1461, 4) +
      div(153 * mod(month + 9, 12) + 2, 5) +
      day -
      34840408
    );
  }

  /**
   * JDNToJulian:
   * Calculates Julian calendar dates from the julian day number (JDN) for the
   * period since JDN=-34839655 (i.e. the year -100100 of both calendars) to
   * some millions (10^6) years ahead of the present. The algorithm is based on
   * D.A. Hatcher, Q.Jl.R.Astron.Soc. 25(1984), 53-55 slightly modified by K.M.
   * Borkowski, Post.Astron. 25(1987), 275-279).
   */
  JDNToJulian() {
    const j = 4 * this.JDN + 139361631;
    const i = div(mod(j, 1461), 4) * 5 + 308;
    this.juDay = div(mod(i, 153), 5) + 1;
    this.juMonth = mod(div(i, 153), 12) + 1;
    this.juYear = div(j, 1461) - 100100 + div(8 - this.juMonth, 6);
  }

  /**
   * gergorianDateToJDN:
   * Calculates the julian day number (JDN) from Gregorian calendar dates. This
   * integer number corresponds to the noon of the date (i.e. 12 hours of
   * Universal Time). This method was tested to be good (valid) since 1 March,
   * -100100 (of both calendars) up to a few millions (10^6) years into the
   * future. The algorithm is based on D.A.Hatcher, Q.Jl.R.Astron.Soc. 25(1984),
   * 53-55 slightly modified by K.M. Borkowski, Post.Astron. 25(1987), 275-279.
   * @param year int
   * @param month int
   * @param day int
   * @return int
   */
  gregorianDateToJDN(year, month, day) {
    let jdn =
      div((year + div(month - 8, 6) + 100100) * 1461, 4) +
      div(153 * mod(month + 9, 12) + 2, 5) +
      day -
      34840408;
    jdn = jdn - div(div(year + 100100 + div(month - 8, 6), 100) * 3, 4) + 752;
    return jdn;
  }
  /**
   * JDNToGregorian:
   * Calculates Gregorian calendar dates from the julian day number (JDN) for
   * the period since JDN=-34839655 (i.e. the year -100100 of both calendars) to
   * some millions (10^6) years ahead of the present. The algorithm is based on
   * D.A. Hatcher, Q.Jl.R.Astron.Soc. 25(1984), 53-55 slightly modified by K.M.
   * Borkowski, Post.Astron. 25(1987), 275-279).
   */
  JDNToGregorian() {
    let j = 4 * this.JDN + 139361631;
    j = j + div(div(4 * this.JDN + 183187720, 146097) * 3, 4) * 4 - 3908;
    const i = div(mod(j, 1461), 4) * 5 + 308;
    this.gDay = div(mod(i, 153), 5) + 1;
    this.gMonth = mod(div(i, 153), 12) + 1;
    this.gYear = div(j, 1461) - 100100 + div(8 - this.gMonth, 6);
  }
}

// Utility functions for integer division
function div(a, b) {
  return ~~(a / b);
}

// Utility function for modulus
function mod(a, b) {
  return a - ~~(a / b) * b;
}

// export default CalendarTool;

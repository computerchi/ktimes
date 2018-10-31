//import CalendarTool from "../lib/calendarTool";

/**
 * ShiaPrayTimes.js
 *	Developed by Ali Mahdi, ©2018
 *	This library is wrapper class for the PrayTimes.org library.
 *	This class uses and encapsulates the PrayTimes object but
 *	does not make any changes to the original object.
 *	The app that uses this library must also load up the PrayTimes.org library.
 *	In addition to calculations based on code by Eng. Mohammed Ali Alsaegh, translated from BASIC.
 */

("use strict");

class ShiaPrayTimes {
  constructor() {
    this.prayTimes = new PrayTimes("Jafari");
    this.prayTimes.adjust({
      imsak: "5 min",
      fajr: 18,
      dhuhr: 0,
      maghrib: "15 min",
      isha: 17.5
    });

    // this.testEaster();
    this.persianCal = new CalendarTool(2018, 10, 15);
    this.cobticCal = new CobticCalendar();
  }

  times(date, lat, lng, timeZone, format, dstType, dstDates) {
    var libTimes = this.prayTimes.getTimes(
      date,
      [lat, lng],
      timeZone,
      0,
      format
    );

    this.date = new Date(date);
    this.longitude = lng;
    this.latitude = lat;
    this.julianDay = this.julianDayFromGregorian(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
    this.persianCal.setGregorianDate(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
    this.timeZone = Number(timeZone);
    this.format = format;
    var year = date.getFullYear();
    this.isLeapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    this.daySequence = this.getDaySequence();
    this.dst = this.isDaylightSavingsTime(dstType, dstDates);

    if (this.qiblaDirection == undefined) {
      this.qiblaDirection = this.getQiblaDirection(lat, lng);
    }

    // the values are not important, just a place holder
    var goodTimes = {
      imsak: "Imsak",
      fajr: "Athanul Fajr",
      sunrise: "Sunrise",
      dhuhr: "Noon",
      asr: "Asr",
      sunset: "Sunset",
      maghrib: "Athanul Maghrib",
      isha: "Isha",
      midnight: "Midnight"
    };

    var dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    var farsiDayNames = [
      "یکشنبه",
      "دوشنبه",
      "سه شنبه",
      "چهارشنبه",
      "پنج شنبه",
      "جمعه",
      "شنبه"
    ];
    var frenchDayNames = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi"
    ];
    var arabicDayNames = [
      "الأحد",
      "الإثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت"
    ];

    var kurdiDayNames = [
      "یه‌كشه‌ممه‌",
      "دووشه‌ممه‌",
      "سێشه‌ممه‌",
      "چوارشه‌ممه‌",
      "پێنجشه‌مه‌",
      "هه‌ینی",
      "شه‌ممه‌"
    ];

    var englishMonthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    var frenchMonthNames = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "aout",
      "septembre",
      "octobre",
      "novembre",
      "décembre"
    ];

    var westernMonthNames = [
      "يناير",
      "فبراير",
      "مارس",
      "إبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر"
    ];

    var easternMonthNames = [
      "كانون الثاني",
      "شباط",
      "آذار",
      "نيسان",
      "آيار",
      "حزيران",
      "تموز",
      "آب",
      "أيلول",
      "تشرين الأول",
      "تشرين الثاني",
      "كانون الأول"
    ];

    var kurdishMonthNames = [
      "ئازار",
      "نیسان",
      "ئایار",
      "حوزەیران",
      "تەمموز",
      "ئاب",
      "ئەیلوول",
      "تشرینی یەکەم",
      "تشرینی دووەم",
      "کانوونی یەکەم",
      "کانوونی دووەم",
      "شوبات"
    ];

    // fill the goodTimes with the library times, and '-' the undefined ones
    for (var i in goodTimes) {
      if (libTimes[i] != null) {
        goodTimes[i] = this.addMinutes(libTimes[i], this.dst ? 60 : 0);
      } else {
        goodTimes[i] = "-";
      }
    }

    // fill your own goodTimes
    goodTimes.athandhuhr = this.addMinutes(goodTimes.dhuhr, 2);
    goodTimes.daysequence = this.daySequence;

    goodTimes.date = `${date.getDate()}-${Number(
      date.getMonth() + 1
    )}-${date.getFullYear()}`;

    goodTimes.arabicdayname = arabicDayNames[date.getDay()];
    goodTimes.kurdidayname = kurdiDayNames[date.getDay()];

    let hijriDate = this.hijriFromJulianDay(
      this.julianDayFromGregorian(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      )
    );

    goodTimes.hijridate = `${hijriDate.year}-${hijriDate.month}-${
      hijriDate.day
    }`;
    goodTimes.hijrimonth = hijriDate.month;
    goodTimes.hijrimonthname = this.getHijriMonthName(hijriDate.month);
    goodTimes.hijrishort = `${hijriDate.day} ${goodTimes.hijrimonthname}`;
    goodTimes.hijriday = `${hijriDate.day}`;
    goodTimes.julianday = this.julianDay;
    goodTimes.persiandayname = farsiDayNames[date.getDay()];
    goodTimes.persiandate = this.persianCal.iranianDate;
    goodTimes.persianmonth = this.persianCal.iranianMonthName;
    this.cobticCal.setGregorianDate(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
    let cobticDate = this.cobticCal.date;
    goodTimes.cobticdate = `${cobticDate.day}-${cobticDate.month}-${
      cobticDate.year
    }`;
    goodTimes.cobticmonth = this.cobticCal.monthName;
    goodTimes.juliandate = this.persianCal.julianDate;
    goodTimes.dayname = dayNames[date.getDay()];
    goodTimes.frenchdayname = frenchDayNames[date.getDay()];
    goodTimes.englishmonthname = englishMonthNames[date.getMonth()];
    goodTimes.frenchmonthname = frenchMonthNames[date.getMonth()];
    goodTimes.westernmonthname = westernMonthNames[date.getMonth()];
    goodTimes.easternmonthname = easternMonthNames[date.getMonth()];
    goodTimes.kurdishmonthname = kurdishMonthNames[date.getMonth()];
    goodTimes.suhail = this.getSuhail();
    goodTimes.nawruz = this.getNawruz();
    goodTimes.anwaa = this.getAnwaa();
    goodTimes.mawasem = this.getMawasem();
    goodTimes.truezodiac = this.getTrueZodiac();
    goodTimes.standardzodiac = this.getStandardZodiac();
    goodTimes.sahar = this.getSahar(goodTimes.fajr, goodTimes.sunset);
    goodTimes.subh = this.getSunAngleTime(15, goodTimes.fajr, "ccw");
    goodTimes.endfadilatsubh = this.getSunAngleTime(6, goodTimes.fajr, "ccw");
    goodTimes.fadilatasr = this.getAsrTime(2 / 7, goodTimes.asr);
    goodTimes.endfadilatduhr = this.getAsrTime(4 / 7, goodTimes.asr);
    goodTimes.endfadilatasr = this.getAsrTime(6 / 7, goodTimes.asr);
    goodTimes.qiblatime = this.qiblaTime(goodTimes.dhuhr);
    goodTimes.sunaltitude = this.getSunAltitude(goodTimes.dhuhr);
    goodTimes.shadow = Math.abs(
      1 / Math.tan(parseFloat(goodTimes.sunaltitude) * (Math.PI / 180))
    );
    goodTimes.dhuhrshadow = (goodTimes.shadow + 4 / 7).toFixed(2);
    goodTimes.fadasrshadow = (goodTimes.shadow + 2 / 7).toFixed(2);
    goodTimes.asrshadow = (goodTimes.shadow + 1).toFixed(2);
    goodTimes.shadow =
      goodTimes.sunaltitude.indexOf("N") > 0
        ? (
            Math.abs(
              1 / Math.tan(parseFloat(goodTimes.sunaltitude) * (Math.PI / 180))
            ) * 100
          ).toFixed(0) + "% S"
        : (
            Math.abs(
              1 / Math.tan(parseFloat(goodTimes.sunaltitude) * (Math.PI / 180))
            ) * 100
          ).toFixed(0) + "% N";

    // Astro-data
    // seq","full_date","day_name","day_of_month","arabic_month","sea_current","tide_h1","ampm1","height1","tide_l1","ampm2","height2","tide_h2","ampm3","height3","tide_l2","ampm4","height4","humid_h","humid_l","temp_h","temp_l"
    if (this.getDaySequence()) {
      const seaCurrentState = {
        FO: "فساد عود",
        FS: "فساد صغير",
        HO: "حمل عود",
        HS: "حمل صغير"
      };
      const dayPart = {
        subh: "صباحا",
        dhuhr: "ظهرا",
        asr: "عصرا",
        mesa: "مساءً"
      };
      const astroIndex = this.getDaySequence() - 1;
      goodTimes.sea_current = seaCurrentState[astroData[astroIndex][0]];
      goodTimes.tide_h1 = astroData[astroIndex][1];
      goodTimes.ampm1 = dayPart[astroData[astroIndex][2]] || "-";
      goodTimes.height1 = astroData[astroIndex][3];
      goodTimes.tide_l1 = astroData[astroIndex][4];
      goodTimes.ampm2 = dayPart[astroData[astroIndex][5]] || "-";
      goodTimes.height2 = astroData[astroIndex][6];
      goodTimes.tide_h2 = astroData[astroIndex][7];
      goodTimes.ampm3 = dayPart[astroData[astroIndex][8]] || "-";
      goodTimes.height3 = astroData[astroIndex][9];
      goodTimes.tide_l2 = astroData[astroIndex][10];
      goodTimes.ampm4 = dayPart[astroData[astroIndex][11]] || "-";
      goodTimes.height4 = astroData[astroIndex][12];
      goodTimes.humid_h = astroData[astroIndex][13];
      goodTimes.humid_l = astroData[astroIndex][14];
      goodTimes.temp_h = astroData[astroIndex][15];
      goodTimes.temp_l = astroData[astroIndex][16];
    }
    return goodTimes;
  }

  julianDayFromGregorian(year, month, day) {
    return this.prayTimes.julian(year, month, day);
  }

  // convert Julian day to Gregorian date
  // Ref: Mohammed Shawkat Oudeh
  gregorianFromJulianDay(jd) {
    let l = jd + 68569;
    let n = div(4 * l, 146097);
    l = l - div(146097 * n + 3, 4);
    let i = div(4000 * (l + 1), 1461001);
    l = l - div(1461 * i, 4 + 31);
    let j = div(80 * l, 2447);
    let day = l - div(2447 * j, 80);
    l = div(j, 11);
    let month = ((i + 2 - 12 * l) % 12) + 1;
    let year = 100 * (n - 49) + i + l;

    return { year, month, day };
  }

  julianDayFromJulianDate(year, month, day) {
    this.persianCal.setJulianDate(year, month, day);
    return this.persianCal.jdn;
  }

  julianDateFromJulianDay(jd) {
    let j = 4 * jd + 139361631;
    j = j + div(div(4 * jd + 183187720, 146097) * 3, 4) * 4 - 3908;
    const i = div(j % 1461, 4) * 5 + 308;
    let day = div(i % 153, 5) + 1;
    let month = (div(i, 153) % 12) + 1;
    let year = div(j, 1461) - 100100 + div(8 - month, 6);

    return { year, month, day };
  }

  /*
    Note: According to Mohammed Shawkat Oudeh
    if 1st hijri date was 15/7/622 then jd=1948439
    if 1st hijri date was 16/7/622 then jd=1948440 (assumed in our calcs)
  */

  // convert Julian day to Hijri date
  // Ref: Mohammed Shawkat Oudeh
  hijriFromJulianDay(jd) {
    let l = Math.round(jd) - 1948440 + 10632; // Ali Mahdi: rounding jd brings it closer to existing clacs. Tested on 2018 only.
    let n = div(l - 1, 10631);
    l = l - 10631 * n + 354;
    let j =
      div(10985 - l, 5316) * div(50 * l, 17719) +
      div(l, 5670) * div(43 * l, 15238);
    l =
      l -
      div(30 - j, 15) * div(17719 * j, 50) -
      div(j, 16) * div(15238 * j, 43) +
      29;
    let month = div(24 * l, 709);
    let day = l - div(709 * month, 24);
    let year = 30 * n + j - 30;

    return { year, month, day };
  }

  julianDayFromHijri(year, month, day) {
    return (
      div(11 * year + 3, 30) +
      354 * year +
      30 * month -
      div(month - 1, 2) +
      day +
      1948440 -
      385
    );
  }

  getHijriMonthName(month) {
    var hijriMonthNames = [
      "محرم",
      "صفر",
      "ربيع الاول",
      "ربيع الاخر",
      "جمادى الاولى",
      "جمادى الاخرة",
      "رجب",
      "شعبان",
      "رمضان",
      "شوال",
      "ذو القعدة",
      "ذو الحجة"
    ];

    return hijriMonthNames[month - 1];
  }

  /**
   * Calculates Easter in the Gregorian calendar.
   * @param  {any} year
   * @return date object { year, month, day }
   * @memberof ShiaPrayTimes
   */
  calcGregorianEaster(year) {
    if (year >= 1583) {
      const a = year % 19;
      const b = div(year, 100);
      const c = year % 100;
      const d = div(b, 4);
      const e = b % 4;
      const f = div(b + 8, 25);
      const g = div(b - f + 1, 3);
      const h = (19 * a + b - d - g + 15) % 30;
      const i = div(c, 4);
      const k = c % 4;
      const l = (32 + 2 * e + 2 * i - h - k) % 7;
      const m = div(a + 11 * h + 22 * l, 451);
      const r = h + l - 7 * m + 114;
      const month = div(r, 31);
      const day = (r % 31) + 1;
      return { year, month, day };
    } else {
      const { month, day } = this.calcJulianEaster(year);

      return { year, month, day };
    }
  }

  calcJulianEaster(year) {
    const a = year % 4;
    const b = year % 7;
    const c = year % 19;
    const d = (19 * c + 15) % 30;
    const e = (2 * a + 4 * b - d + 34) % 7;
    const r = d + e + 144;
    const month = div(r, 31) - 1;
    const day = (r % 31) + 2;

    const jdn = this.julianDayFromJulianDate(year, month, day);
    const gDate = this.julianDateFromJulianDay(jdn);

    return {
      year,
      month,
      day,
      jYear: gDate.year,
      jMonth: gDate.month,
      jDay: gDate.day
    };
  }

  testEaster() {
    let years = [
      179,
      711,
      1243,
      1234,
      1582,
      1583,
      1818,
      1978,
      1979,
      1980,
      2000,
      2285
    ];

    for (let i in years) {
      let ge = this.calcGregorianEaster(years[i]);
      console.log("Gregorian Easter ", ge.year, ge.month, ge.day);

      let je = this.calcJulianEaster(years[i]);
      console.log("Julian Easter ", je.year, je.month, je.day);
    }
  }

  addMinutes(time, mins) {
    var timeArray = time.split(":");

    var d = new Date();
    d.setHours(timeArray[0]);
    d.setMinutes(1 * timeArray[1] + mins);

    var outMinutes = d.getMinutes();

    return (
      d.getHours() + ":" + (outMinutes < 10 ? "0" + outMinutes : outMinutes)
    );
  }

  getDaySequence() {
    var month = this.date.getMonth() + 1;
    var day = this.date.getDate();
    if (this.isLeapYear) {
      return div(275 * month, 9) - div(month + 9, 12) + day - 30;
    } else {
      return div(275 * month, 9) - 2 * div(month + 9, 12) + day - 30;
    }
  }

  getSuhail() {
    var yearLength = this.isLeapYear ? 366 : 365;
    var suhail = this.daySequence + 130;
    if (suhail > yearLength) {
      suhail -= yearLength;
    }
    return suhail;
  }

  getNawruz() {
    var yearLength = this.isLeapYear ? 366 : 365;
    var nawruz = this.daySequence + 143;
    if (nawruz > yearLength) {
      nawruz -= yearLength;
    }
    return nawruz;
  }

  getAnwaa() {
    var num, str;
    var daySequence = this.daySequence;

    if (this.isLeapYear) {
      daySequence--;
    }

    if (this.daySequence == 1) {
      num = 13;
      str = "القلب";
      return num + " " + str;
    } else if (this.daySequence == 2 && this.isLeapYear) {
      num = 14;
      str = "القلب";
      return num + " " + str;
    } else if (daySequence < 15) {
      num = 1;
      str = "الشولة";
    } else if (daySequence < 28) {
      num = 14;
      str = "النعايم";
    } else if (daySequence < 41) {
      num = 27;
      str = "البلدة";
    } else if (daySequence < 54) {
      num = 40;
      str = "الذابح";
    } else if (daySequence < 67) {
      num = 53;
      str = "بلع";
    } else if (daySequence < 80) {
      num = 66;
      str = "السعود";
    } else if (daySequence < 93) {
      num = 79;
      str = "الأخبية";
    } else if (daySequence < 106) {
      num = 92;
      str = "المقدم";
    } else if (daySequence < 119) {
      num = 105;
      str = "المؤخر";
    } else if (daySequence < 132) {
      num = 118;
      str = "الرشا";
    } else if (daySequence < 145) {
      num = 131;
      str = "الشرطان";
    } else if (daySequence < 158) {
      num = 144;
      str = "البطين";
    } else if (daySequence < 171) {
      num = 157;
      str = "الثريا";
    } else if (daySequence < 184) {
      num = 170;
      str = "الدبران";
    } else if (daySequence < 197) {
      num = 183;
      str = "الهقعة";
    } else if (daySequence < 210) {
      num = 196;
      str = "الهنعة";
    } else if (daySequence < 223) {
      num = 209;
      str = "الذراع";
    } else if (daySequence < 236) {
      num = 222;
      str = "النثرة";
    } else if (daySequence < 249) {
      num = 235;
      str = "الطرفة";
    } else if (daySequence < 263) {
      num = 248;
      str = "الجبهة";
    } else if (daySequence < 276) {
      num = 262;
      str = "الزبرة";
    } else if (daySequence < 289) {
      num = 275;
      str = "الصرفة";
    } else if (daySequence < 302) {
      num = 288;
      str = "العواء";
    } else if (daySequence < 315) {
      num = 301;
      str = "السماك";
    } else if (daySequence < 328) {
      num = 314;
      str = "الغفر";
    } else if (daySequence < 341) {
      num = 327;
      str = "الزبانا";
    } else if (daySequence < 354) {
      num = 340;
      str = "الإكليل";
    } else {
      num = 353;
      str = "القلب";
    }

    return daySequence - num + " " + str;
  }

  getMawasem() {
    var num, str;
    var daySequence = this.daySequence;
    var leap = this.isLeapYear ? 1 : 0;

    if (daySequence < 15) {
      num = daySequence + 25;
      str = "المربعانية";
    } else if (daySequence < 41) {
      num = daySequence - 14;
      str = "الشبط";
    } else if (daySequence < 80) {
      num = daySequence - 40;
      str = "العقارب";
    } else if (daySequence == 80 && this.isLeapYear) {
      num = 40;
      str = "العقارب";
    } else if (daySequence < 106 + leap) {
      num = daySequence - 79 - leap;
      str = "الحميمين";
    } else if (daySequence < 132 + leap) {
      num = daySequence - 105 - leap;
      str = "الذرعان";
    } else if (daySequence < 171 + leap) {
      num = daySequence - 131 - leap;
      str = "الثريا";
    } else if (daySequence < 184 + leap) {
      num = daySequence - 170 - leap;
      str = "التويبع";
    } else if (daySequence < 197 + leap) {
      num = daySequence - 183 - leap;
      str = "الجوزاء الأولى";
    } else if (daySequence < 210 + leap) {
      num = daySequence - 196 - leap;
      str = "الجوزاء الثانية";
    } else if (daySequence < 223 + leap) {
      num = daySequence - 209 - leap;
      str = "المرزم";
    } else if (daySequence < 236 + leap) {
      num = daySequence - 222 - leap;
      str = "الكليبين";
    } else if (daySequence < 289 + leap) {
      num = daySequence - 235 - leap;
      str = "سهيل";
    } else if (daySequence < 341 + leap) {
      num = daySequence - 288 - leap;
      str = "الوسم";
    } else {
      num = daySequence - 340 - leap;
      str = "المربعانية";
    }

    return num + " " + str;
  }

  getTrueZodiac() {
    var num, str;
    var daySequence = this.daySequence;
    var leap = this.isLeapYear ? 1 : 0;

    if (daySequence < 19) {
      num = daySequence + 14;
      str = "القوس";
    } else if (daySequence < 47) {
      num = daySequence - 18;
      str = "الجدي";
    } else if (daySequence < 70) {
      num = daySequence - 46;
      str = "الدلو";
    } else if (daySequence == 70 && this.isLeapYear) {
      num = 24;
      str = "الدلو";
    } else if (daySequence < 108 + leap) {
      num = daySequence - 69 - leap;
      str = "الحوت";
    } else if (daySequence < 133 + leap) {
      num = daySequence - 107 - leap;
      str = "الحمل";
    } else if (daySequence < 172 + leap) {
      num = daySequence - 132 - leap;
      str = "الثور";
    } else if (daySequence < 201 + leap) {
      num = daySequence - 171 - leap;
      str = "الجوزاء";
    } else if (daySequence < 222 + leap) {
      num = daySequence - 200 - leap;
      str = "السرطان";
    } else if (daySequence < 259 + leap) {
      num = daySequence - 221 - leap;
      str = "الأسد";
    } else if (daySequence < 303 + leap) {
      num = daySequence - 258 - leap;
      str = "السنبلة";
    } else if (daySequence < 326 + leap) {
      num = daySequence - 302 - leap;
      str = "الميزان";
    } else if (daySequence < 333 + leap) {
      num = daySequence - 325 - leap;
      str = "العقرب";
    } else if (daySequence < 352 + leap) {
      num = daySequence - 332 - leap;
      str = "الحوايا";
    } else {
      num = daySequence - 351 - leap;
      str = "القوس";
    }

    return num + " " + str;
  }

  getStandardZodiac() {
    var num, str;
    var daySequence = this.daySequence;
    var leap = this.isLeapYear ? 1 : 0;

    if (daySequence < 21) {
      num = daySequence + 10;
      str = "الجدي";
    } else if (daySequence < 51) {
      num = daySequence - 20;
      str = "الدلو";
    } else if (daySequence < 80) {
      num = daySequence - 50;
      str = "الحوت";
    } else if (daySequence == 80 && this.isLeapYear) {
      num = 30;
      str = "الحوت";
    } else if (daySequence < 111 + leap) {
      num = daySequence - 79 - leap;
      str = "الحمل";
    } else if (daySequence < 142 + leap) {
      num = daySequence - 110 - leap;
      str = "الثور";
    } else if (daySequence < 173 + leap) {
      num = daySequence - 141 - leap;
      str = "الجوزاء";
    } else if (daySequence < 204 + leap) {
      num = daySequence - 172 - leap;
      str = "السرطان";
    } else if (daySequence < 235 + leap) {
      num = daySequence - 203 - leap;
      str = "الأسد";
    } else if (daySequence < 266 + leap) {
      num = daySequence - 234 - leap;
      str = "السنبلة";
    } else if (daySequence < 296 + leap) {
      num = daySequence - 265 - leap;
      str = "الميزان";
    } else if (daySequence < 326 + leap) {
      num = daySequence - 295 - leap;
      str = "العقرب";
    } else if (daySequence < 356 + leap) {
      num = daySequence - 325 - leap;
      str = "القوس";
    } else {
      num = daySequence - 355 - leap;
      str = "الجدي";
    }

    return num + " " + str;
  }

  timeStringToDayPortion(timeStr) {
    var timeArray = timeStr.split(":");

    var d = new Date();
    d.setHours(timeArray[0]);
    d.setMinutes(timeArray[1]);

    var result = (d.getHours() + d.getMinutes() / 60) / 24;

    return result;
  }

  getSahar(fajr, sunset) {
    var fajrTime = this.timeStringToDayPortion(fajr);
    var sunsetTime = this.timeStringToDayPortion(sunset);

    // correct for 24h and 12h format
    if (sunsetTime <= 0.5) {
      sunsetTime += 0.5;
    }

    var nightThird = (fajrTime - sunsetTime + 1) / 3;
    var sahar = fajrTime - nightThird;
    sahar += this.timeZone - this.longitude / 15 + (this.dst ? 1 : 0);

    return this.prayTimes.getFormattedTime(sahar, this.format);
  }

  getSunAngleTime(angle, timeStr, ccw) {
    var newTime = this.prayTimes.sunAngleTime(
      angle,
      this.timeStringToDayPortion(timeStr),
      ccw
    );
    newTime += this.timeZone - this.longitude / 15 + (this.dst ? 1 : 0);
    return this.prayTimes.getFormattedTime(newTime, this.format);
  }

  getAsrTime(factor, timeStr) {
    var newTime = this.prayTimes.asrTime(
      factor,
      this.timeStringToDayPortion(timeStr)
    );
    newTime += this.timeZone - this.longitude / 15 + (this.dst ? 1 : 0);
    return this.prayTimes.getFormattedTime(newTime, this.format);
  }

  getSunAltitude(timeStr) {
    var decl = this.prayTimes.sunPosition(
      this.julianDay + this.timeStringToDayPortion(timeStr)
    ).declination;

    var dir = "S";

    // calc altitude
    var alt = 90 - this.latitude + decl;
    if (alt > 90) {
      alt = 180 - alt;
      dir = "N";
    }

    if (alt <= 90.05 && alt >= 89.95) {
      dir = "V";
    } else if (this.latitude == 0 && decl > 0) {
      dir = "N";
    } else if (decl == 0 && this.latitude < 0) {
      dir = "N";
    }

    return alt.toFixed(1) + " " + dir;
  }

  qiblaTime(timeStr) {
    var dhuhr = this.prayTimes.midDay(this.timeStringToDayPortion(timeStr));
    var AZ = (this.qiblaDirection * Math.PI) / 180;

    if (AZ > Math.PI) AZ = 2 * Math.PI - AZ;

    var GP = (this.latitude * Math.PI) / 180;
    var COLAT = Math.PI / 2 - GP;
    var decl =
      (this.prayTimes.sunPosition(
        this.julianDay + this.timeStringToDayPortion(timeStr)
      ).declination *
        Math.PI) /
      180;
    var PD = Math.PI / 2 - decl;
    var B = (Math.sin(COLAT) * Math.sin(AZ)) / Math.sin(PD);
    B = Math.asin(B);

    if (COLAT > PD) B = Math.PI - B;

    var COLATP1 = (COLAT - PD) / 2;
    var CCOLATP1 = Math.cos(COLATP1);
    var COLATPD = (COLAT + PD) / 2;
    var CCOLATPD = Math.cos(COLATPD);
    var BAZ = (B + AZ) / 2;
    var COSBAZ = Math.cos(BAZ);
    var SINBAZ = Math.sin(BAZ);
    var LHA = (COSBAZ * CCOLATP1) / (SINBAZ * CCOLATPD);
    LHA = Math.atan(LHA);
    var LHA1 = 2 * ((LHA * 180) / Math.PI);
    var LHA2 = LHA1 / 15;
    var meccalong = 39.81666;
    var GL = this.longitude;

    var X;
    if (GL < meccalong) X = dhuhr - LHA2;

    if (GL > meccalong) X = dhuhr + LHA2;

    X += this.timeZone - this.longitude / 15 + (this.dst ? 1 : 0);

    var result =
      Math.abs(meccalong - GL) < 90
        ? this.prayTimes.getFormattedTime(X, this.format)
        : "X";
    return result;
  }

  getQiblaDirection(latitude, longitude) {
    var LMA = ((39 + 49 / 60) * Math.PI) / 180;
    var TMA = ((21 + 26 / 60) * Math.PI) / 180;
    var GP = (latitude * Math.PI) / 180;
    var GL = longitude;
    var CAB = (GL * Math.PI) / 180 - LMA;
    var XQ =
      Math.sin(TMA) * Math.cos(GP) -
      Math.cos(TMA) * Math.sin(GP) * Math.cos(CAB);
    var YQ = -Math.cos(TMA) * Math.sin(CAB);
    var QI = (Math.abs(Math.atan(YQ / XQ)) * 180.0) / Math.PI;
    var QiblaDirection;

    if (XQ > 0 && YQ > 0) {
      QiblaDirection = QI;
    } else if (XQ < 0 && YQ > 0) {
      QiblaDirection = 180 - QI;
    } else if (XQ > 0 && YQ < 0) {
      QiblaDirection = 2 * 180 - QI;
    } else if (XQ < 0 && YQ < 0) {
      QiblaDirection = 180 + QI;
    }

    return QiblaDirection;
  }

  isDaylightSavingsTime(dstType, [fromMonth, fromDay, toMonth, toDay]) {
    var month = this.date.getMonth() + 1;
    var day = this.date.getDate(); // sunday == 0
    var d = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    var lastFriday = d.getDay() >= 4 ? 34 - d.getDay() : 27 - d.getDay();
    var lastSunday = 29 - d.getDay();
    var firstSunday = d.getDay() == 0 ? 1 : 8 - d.getDay();
    var thirdSunday = d.getDay() == 0 ? 15 : 22 - d.getDay();
    var FEB = 2;
    var MAR = 3;
    var APR = 4;
    var SEP = 9;
    var OCT = 10;

    switch (dstType) {
      case 0: // start and end of daylight savings time are set manually
        if (month == fromMonth && day >= fromDay) {
          return true;
        } else if (month == toMonth && day < toDay) {
          return true;
        } else if (month > fromMonth && month < toMonth) {
          return true;
        } else {
          return false;
        }
        break;
      case 1: //Libanon & Eorup starts at last sunday at March and ends at last saturday at October
        if (month == MAR && day >= lastSunday) {
          return true;
        } else if (month == OCT && day < lastSunday) {
          return true;
        } else if (month > MAR && month < OCT) {
          return true;
        } else {
          return false;
        }
        break;
      case 2: //Syria starts at first April and ends at last day on September
        if (month >= 4 && month <= 9) {
          return true;
        }
      case 3: //USA & Canada  starts on first Sunday at April &  ends at last Saturday on October
        if (month == APR && day >= firstSunday) {
          return true;
        } else if (month == OCT && day < lastSunday) {
          return true;
        } else if (month > APR && month < OCT) {
          return true;
        } else {
          return false;
        }
        break;
      case 4: //Austuralia  starts on first Sunday at OCT &  ends at First Saturday at  April
        if (month == APR && day >= firstSunday) {
          return false;
        } else if (month == OCT && day < lastSunday) {
          return false;
        } else if (month > APR && month < OCT) {
          return false;
        } else {
          return true;
        }
        break;
      case 5: //South America Saving starts on third Sunday at OCT &  ends at First Saturday at  Feb
        if (month == FEB && day >= firstSunday) {
          return false;
        } else if (month == OCT && day < thirdSunday) {
          return false;
        } else if (month > FEB && month < OCT) {
          return false;
        } else {
          return true;
        }
        break;
      case 6: //Iran  starts on 21 March &  ends at 22 September
        if (month == MAR && day >= 21) {
          return true;
        } else if (month == SEP && day < 22) {
          return true;
        } else if (month > MAR && month < SEP) {
          return true;
        } else {
          return false;
        }
        break;
      case 7: //Eygept starts on last Friday at April &  ends at last Friday on September
        if (month == APR && day >= lastFriday) {
          return true;
        } else if (month == SEP && day < lastFriday) {
          return true;
        } else if (month > APR && month < SEP) {
          return true;
        } else {
          return false;
        }
        break;
      case 8: //Kuwait and other cities with no daylight savings time
        return false;
        break;
      default:
        return false;
    }

    return false;
  }
}

// Utility functions for integer division
function div(a, b) {
  return ~~(a / b);
}

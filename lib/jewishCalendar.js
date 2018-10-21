// Written by Ali Mahdi, 2018
// Algorithm from Astronomical Algorithms by Jean Meeus, 2nd Ed.

class JewishCalindar {
  getPesachDate(gYear) {
    let c = Math.floor(gYear / 100);
    let s = gYear >= 1583 ? Math.floor((3 * c - 5) / 4) : 0;
    let jYear = gYear + 3760;
    let a = (12 * gYear + 12) % 19;
    let b = gYear % 4;
    let q =
      -1.904412361576 +
      1.554241796621 * a +
      0.25 * b -
      0.003177794022 * gYear +
      s;
    let j = (Math.floor(q) + 3 * gYear + 5 * b + 2 - s) % 7;
    let r = q - Math.floor(q);

    let d;
    if (j == 2 || j == 4 || j == 6) d = Math.floor(q) + 23;
    else if (j == 1 && a > 6 && r >= 0.63287037) d = Math.floor(q) + 24;
    else if (i == 0 && a > 11 && r >= 0.897723765) d = Math.floor(q) + 23;
    else d = Math.floor(q) + 22;

    let jDay, jMonth;
    if (d <= 31) {
      jDay = d;
      jMonth = 3; // March
    } else {
      jDay = d - 31;
      jMonth = 4; // April
    }

    return { year: jYear, month: jMonth, day: jDay };
  }
}

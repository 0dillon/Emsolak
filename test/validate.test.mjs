import { normalisePhone, validateOrder, earliestDate, longestLead, isoDate, parseStrictDate } from "../src/lib/validate.js";

let pass = 0, fail = 0;
const is = (label, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  ok ? pass++ : fail++;
  if (!ok) console.log(`FAIL ${label}\n     got  ${JSON.stringify(got)}\n     want ${JSON.stringify(want)}`);
};

is("local",        normalisePhone("08030000000"), "08030000000");
is("spaced",       normalisePhone("0803 000 0000"), "08030000000");
is("dashed",       normalisePhone("0803-000-0000"), "08030000000");
is("+234",         normalisePhone("+2348030000000"), "08030000000");
is("234 no plus",  normalisePhone("2348030000000"), "08030000000");
is("no leading 0", normalisePhone("8030000000"), "08030000000");
is("too short",    normalisePhone("0803000"), null);
is("too long",     normalisePhone("080300000001"), null);
is("letters",      normalisePhone("call me"), null);
is("all zeros",    normalisePhone("00000000000"), null);
is("empty",        normalisePhone(""), null);

const day = (n) => { const d = new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate() + n); return isoDate(d); };
const pies = [{ id: "meat-pie", qty: 10 }];
const cake = [{ id: "cake", qty: 1 }];
const soup = [{ id: "soup", qty: 1 }];

is("pies lead", longestLead(pies).days, 1);
is("cake lead", longestLead(cake).days, 3);
is("soup lead", longestLead(soup).days, 2);
is("basket takes the longest", longestLead([...pies, ...cake]).days, 3);
is("earliest for cake", earliestDate(cake), day(3));

const base = { name: "Tolu", phone: "08030000000", address: "12 Admiralty Way, Lekki", date: day(3), time: "", notes: "" };
const check = (over, cart = cake, pickup = false) =>
  validateOrder({ customer: { ...base, ...over }, cart, pickup })?.field ?? null;

is("clean order",         check({}), null);
is("blank name",          check({ name: "" }), "name");
is("one letter name",     check({ name: "T" }), "name");
is("numeric name",        check({ name: "12" }), "name");
is("blank phone",         check({ phone: "" }), "phone");
is("bad phone",           check({ phone: "12345" }), "phone");
is("blank address",       check({ address: "" }), "address");
is("stub address",        check({ address: "Lekki" }), "address");
is("address skipped on pickup", check({ address: "" }, cake, true), null);
is("no date",             check({ date: "" }), "date");
is("yesterday",           check({ date: day(-1) }), "date");
is("today for a cake",    check({ date: day(0) }), "date");
is("two days for a cake", check({ date: day(2) }), "date");
is("three days is fine",  check({ date: day(3) }), null);
is("tomorrow for pies",   check({ date: day(1) }, pies), null);
is("today for pies",      check({ date: day(0) }, pies), "date");
is("impossible past date",   check({ date: "2026-02-31" }), "date");
is("impossible future date", check({ date: "2027-02-31" }), "date");
is("31 April next year",     check({ date: "2027-04-31" }), "date");
is("month 13",               check({ date: "2027-13-05" }), "date");
is("29 Feb, leap year",      parseStrictDate("2028-02-29") !== null, true);
is("29 Feb, common year",    parseStrictDate("2027-02-29"), null);
is("31 June",                parseStrictDate("2027-06-31"), null);
is("day zero",               parseStrictDate("2027-06-00"), null);
is("ordinary day",           parseStrictDate("2027-06-15") !== null, true);
is("beyond the horizon",     check({ date: "2028-02-29" }), "date");
is("nonsense date",       check({ date: "not-a-date" }), "date");
is("a decade out",        check({ date: day(4000) }), "date");

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);

export const BASE_URL =
  process.env.BASE_URL || "https://partners.platform-os.com";
export const ADMIN_PASS = process.env.ADMIN_PASS_GUI || "pass123sanity";
export const USERDATA = process.env.DATA_GUI || {
  NAME: "test_user",
  LASTNAME: "qa",
  USER_EMAIL: `test+${+new Date()}@example.com`,
  PASSWORD: "password"
};
export const PARTNERDATA = process.env.DATA_GUI || {
  NAME: `partner+${+new Date()}`
};
export const MODULEDATA = process.env.DATA_GUI || {
  MODULENAME: `module+${+new Date()}`
};

export const EMAIL_USER_PROD = "jacek+ppe2e@near-me.com";
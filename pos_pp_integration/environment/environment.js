export const BASE_URL =
  process.env.BASE_URL || "https://partners.platform-os.com";
export const ADMIN_USER =
  process.env.ADMIN_USER_GUI || "jacek+partner_owner@near-me.com";
export const ADMIN_PASS = process.env.ADMIN_PASS_GUI || "pass123sanity";
export const UAT1_USER = process.env.UAT1_USER_GUI || "jacek+uat_1@near-me.com";
export const CC_USER = process.env.CC_USER_GUI || "jacekqa4@gmail.com";
export const CC_PASS = process.env.CC_PASS_GUI || "pass123sanity";
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
export const PUTSBOXDATA = {
  LOGIN: "jacek@near-me.com",
  PASSWORD: "pass123sanity"
};
export const PUTSBOX_URL = "https://putsbox.com/users/sign_in";
export const EMAIL_USER = "franco@putsbox.com";
export const EMAIL_USER_PROD = "arno@putsbox.com";

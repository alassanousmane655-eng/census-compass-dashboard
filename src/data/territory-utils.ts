import { REGIONS, type Department, type Region } from "./territories";

const regionMap = new Map<string, Region>(REGIONS.map((r) => [r.code, r]));
const deptMap = new Map<string, Department>();
const arrMap = new Map<string, { name: string; departmentCode: string; regionCode: string }>();
for (const r of REGIONS)
  for (const d of r.departments) {
    deptMap.set(d.code, d);
    for (const a of d.arrondissements) arrMap.set(a.code, { name: a.name, departmentCode: d.code, regionCode: r.code });
  }

export const getRegion = (code: string) => regionMap.get(code);
export const getDepartment = (code: string) => deptMap.get(code);
export const regionName = (code: string) => regionMap.get(code)?.name ?? code;
export const departmentName = (code: string) => deptMap.get(code)?.name ?? code;
export const arrondissementName = (code: string) => arrMap.get(code)?.name ?? code;

/** Integrity check of a residence triplet against the reference (no free-text regions). */
export function isValidResidence(regionCode: string, departmentCode: string, arrondissementCode: string): boolean {
  const a = arrMap.get(arrondissementCode);
  return !!a && a.departmentCode === departmentCode && a.regionCode === regionCode;
}

export const TOTALS = {
  regions: REGIONS.length,
  departments: deptMap.size,
  arrondissements: arrMap.size,
};

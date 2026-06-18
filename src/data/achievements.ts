export interface Achievement {
  category: "Certification" | "Award" | "Competition";
  titleKey: string;          // Key to translate title
  organization: string;
  date: string;              // Date string (e.g. Dec 2024, Aug 2023)
  credentialLink?: string;
  iconName: "Award" | "Trophy" | "Medal";
}

export const achievements: Achievement[] = [
  {
    category: "Competition",
    titleKey: "lks_kab.title",
    organization: "MKKS Kabupaten Banyumas",
    date: "Jan 2026",
    credentialLink: "https://drive.google.com/file/d/1hsKB07oh6R8B2a_ZdWseF41XB0AiaYkN/view?usp=sharing",
    iconName: "Medal",
  },
  {
    category: "Competition",
    titleKey: "lks_prov.title",
    organization: "Dinas Pendidikan Jawa Tengah",
    credentialLink: "https://drive.google.com/file/d/1OBj5nH0mX_7XkVKBl30IHPVtCzMT7CUE/view?usp=sharing",
    date: "Apr 2026",
    iconName: "Medal",
  },
];

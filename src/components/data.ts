// All values here are fictional sample data for the demo.

export type Theme = "olive" | "sky";

export type SampleCard = {
  id: string;
  theme: Theme;
  title: string;
  status?: string;
  fields: { label: string; value: string }[];
  name: string[];
};

export const cards: SampleCard[] = [
  {
    id: "member",
    theme: "sky",
    title: "Sample Card",
    fields: [
      { label: "Date of birth:", value: "01.01.2000" },
      { label: "Number:", value: "000 000 000" },
    ],
    name: ["SAMPLE", "ALEX", "PERSON"],
  },
  {
    id: "pass",
    theme: "olive",
    title: "Member Pass",
    status: "Active member",
    fields: [{ label: "Date of birth:", value: "01.01.2000" }],
    name: ["SAMPLE", "ALEX", "PERSON"],
  },
];

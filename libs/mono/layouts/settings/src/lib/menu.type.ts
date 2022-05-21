export type SettingsMenuItem = {
  label?: string;
  items: {
    key: string;
    label: string;
    content?: React.ReactNode;
    query?: (ctx: { query: any }) => void;
  }[];
};

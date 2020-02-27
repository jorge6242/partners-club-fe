export default interface PersonColumn {
    id: "id" | "name" | "email";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }
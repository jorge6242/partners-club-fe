export default interface PersonColumn {
    id: "id" | "name" | "slug" | "description";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }
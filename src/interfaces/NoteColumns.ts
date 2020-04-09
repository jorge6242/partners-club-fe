export default interface Columns {
    id: "id" | "description" | "created" | "status" | "department" | "type" | "subject";
    label: string;
    minWidth?: number;
    align?: "left" | "right";
    component?: any;
  }
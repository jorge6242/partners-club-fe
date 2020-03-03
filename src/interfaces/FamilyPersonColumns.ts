export default interface PersonColumn {
    id: "id" | "name" | "last_name" | "relationType";
    label: string;
    minWidth?: number;
    align?: "right";
    isNumeric?: any;
    component?: any;
  }
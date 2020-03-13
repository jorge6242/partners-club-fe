export default interface PersonColumn {
    id: "id" | "name" | "last_name" | "primary_email" | "rif_ci";
    label: string;
    minWidth?: number;
    align?: "right";
    component?: any;
  }
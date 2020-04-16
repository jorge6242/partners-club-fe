export default interface PersonColumn {
    id: "id" | "name" | "last_name" | "status" | "rif_ci" | "relationType" | "person" | "relation_type" | "description";
    label: string;
    minWidth?: number;
    align?: "right";
    isNumeric?: any;
    component?: any;
  }
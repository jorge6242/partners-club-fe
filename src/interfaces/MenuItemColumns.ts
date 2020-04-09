export default interface Columns {
  id: "id" | "name" | "slug" | "description" | "route" | "main" | "order" | "father";
  label: string;
  minWidth?: number;
  align?: "left" | "right";
  component?: any;
}

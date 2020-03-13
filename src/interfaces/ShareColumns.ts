export default interface ShareColumns {
    id: "id" | "share_number" | "partner" | "titular" | "payment_method" | "share_type" | "father_share";
    label: string;
    minWidth?: number;
    align?: "left" | "right";
    component?: any;
  }
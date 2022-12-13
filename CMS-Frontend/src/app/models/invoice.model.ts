export class Invoice {
  id: number;
  number: number;
  remarks: string;
  paymentStatus: string;
  subTotal: number;
  discount: number;
  gst: number;
  grandTotal: number;
  client: any;
  services: any[];
  servicesCount: number;
  calcDiscount: number;
  calcGst: number;
}

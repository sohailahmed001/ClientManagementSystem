import { SafeUrl } from '@angular/platform-browser';

export class Client {
  id: number;
  firstName: string;
  lastName: string;
  imageUrl: string;
  dob: Date;
  primaryContact: string;
  alternateContact: string;
  address: string;
  email: string;
  active: boolean;
  user: any;
  photoFile: File;
  selectedImageUrl: SafeUrl;

  constructor() {
    // this.photoUrl =
    //   'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';

    this.active = true;
  }
}

import { IFileResponse } from "src/interfaces";
import {
  BookCopyStatusEnum,
  BookFileTypeEnum,
  BookStatusEnum,
  BookTypeEnum,
  FineStatusEnum,
  LanguageEnum,
} from "../constant";
import { ISubject } from "@academic/interface";
import { StatusEnum, YesNoEnum } from "@common/all.enum";
import { IDataValue } from "@datavalue/interface";
import { IUser } from 'src/interfaces';

// export interface ILibBook {
//   id: string;
//   title: string;
//   // subtitle: string;
//   // keyword: string;
//   // classification: string;
//   price: number;
//   // cutter_no: string;
//   publisher: ILibPublisher;
//   // edition: string;
//   // publish_date: string;
//   // weight: string;
//   // pages: string;
//   book_qty: number;
//   shortage_threshold: number;
//   source: number;
//   authors_ids: number[];
//   series: string;
//   series_no: string;
//   notes: string;
//   isbn: string;
//   lccn: string;
//   language: LanguageEnum;
//   is_nepali: boolean;
//   subject: ISubject;
//   biblography: string;
//   thesis_dec: string;
//   is_cat: boolean;
//   user_id: number;
//   status: string;
//   entry_date: Date;
//   file: IFileResponse;
//   book_type: string;
//   new_log: number;
//   is_public: string;
// }

export interface ILibAuthor {
  id: string;
  name: string;
  country: string;
  dob: string;
}

export interface ILibFine {
  created_at: string;
  patron_id: string;
  patron: ILibPatron;
  transaction: ILibTransaction;
  id: string;
  copy_id: string;
  copy: ILibBookCopy;
  transaction_id: number;
  accession_no: string;
  fine_amount: number;
  fine_days: number;
  status: FineStatusEnum;
}

export interface ILibMissing {
  book_id: ILibBook;
  accession_no: string;
  missing_date: Date;
  found_date: Date;
  lost_by: IUser;
}

export interface ILibPatron {
  p_type: string;
  id: string;
  patronType: ILibPatronType;
  student_id: string;
  staff_id: string;
  patron_no: string;
  name: string;
  contact: string;
  email: string;
  valid_from: string;
  valid_till: string;
  user_id: number;
  status: StatusEnum;
  image: IFileResponse;
  fine_booked: number;
  card: IFileResponse;
  checkouts: ILibBookCopy[];
  checkout_count: number;
  // meta: IStudentInfo | IStaff;
  meta: Record<string, any>;
  mark_card: YesNoEnum;
  created_at: string;
  user?: IUser;
}

export interface ILibPatronType {
  id: string;
  patron_type: string;
  allow_days: number;
  per_day_fine: number;
  number_of_books: number;
  valid_period: number;
  template: IDataValue;
}

export interface ILibPublisher {
  id: string;
  name: string;
  country: string;
}

export interface ILibTransaction {
  accession_no: string;
  patron_id: string;
  patron: ILibPatron;
  checkout_date: string;
  checkin_date: string;
  copy_id: string;
  copy: ILibBookCopy;
  due_date: string;
  issuedBy: IUser;
  receivedBy: IUser;
  fine: ILibFine;
  status: BookStatusEnum;
}

export interface ILibBookCopy {
  id: string;
  book_id: number;
  book: ILibBook;
  edition: string;
  accession_id: number;
  prefix: string;
  accession_no: string;
  taken_by: number;
  takenBy: ILibPatron;
  price: number;
  is_gifted: YesNoEnum;
  taken_date: string;
  due_date: string;
  lend_count: number;
  mark_spine: YesNoEnum;
  mark_barcode: YesNoEnum;
  status: BookCopyStatusEnum;
}

export interface ILibBook {
  id: string;
  title: string;
  subtitle?: string | null;
  keyword?: string | null;
  classification?: string | null;
  cutter_no?: string | null;
  publisher_id?: string | null;
  publisher?: ILibPublisher; // Added to match ManyToOne relation
  edition?: string | null;
  publish_date?: string;
  weight?: string | null;
  pages?: string | null;
  book_qty: number;
  shortage_threshold: number;
  source: number;
  authors_ids: number[]; // Assuming it represents corp_authors
  authors: ILibAuthor[]; // Added to match ManyToMany relation
  series: string;
  series_no: string;
  notes: string;
  isbn: string;
  lccn: string;
  language: LanguageEnum; // Should match LibraryLanguageEnum
  subject: ISubject[];
  biblography: string;
  thesis_dec: string;
  user_id: number;
  status: string; // Matches StatusEnum
  entry_date: Date;
  image_id: number; // Added to reflect the image_id column
  file: IFileResponse; // Matches the Resource entity
  book_type: BookTypeEnum; // Matches BookTypeEnum
  new_book: number;
  price: string;
  is_reference: boolean; // Converted from YesNoEnum to boolean
  ebooks: Partial<ILibEBook>[];
  copies: Partial<ILibBookCopy>[];
}

export interface ILibEBook {
  id: string;
  book_id: string;
  remark: string;
  book: ILibBook;
  type: BookFileTypeEnum;
  files: IFileResponse[];
}

export interface ILibEBookCreate {
  book_id: string;
  ebooks: Partial<ILibEBook>[];
}
export interface ILibSpine {
  id: string;
  title: string;
  accession_no: string;
  subtitle?: string;
  keyword?: string;
  classification?: string;
  cutter_no?: string;
  publisher?: string;
  edition?: string;
  publish_date?: string;
  weight?: number;
  pages?: number;
  book_qty?: number;
  shortage_threshold?: number;
  source?: string;
  authors?: ILibAuthor[];
  series?: string;
  series_no?: string;
  notes?: string;
  isbn?: string;
  iccn?: string;
  language?: string;
  is_nepali?: YesNoEnum;
  subject?: string;
  bibliography?: string;
  thesis_dec?: string;
  is_cat?: YesNoEnum;
  user_id?: IUser;
  status?: BookStatusEnum;
  entry_date?: string;
  file?: string;
  book_type?: string;
  new_log?: string;
  is_public?: YesNoEnum;
}

// Main Barcode Interface
export interface ILibBarcode {
  id: string; // Unique identifier
  title: string; // Title of the book
  subtitle?: string | null; // Optional subtitle
  keyword?: string | null; // Optional keyword
  classification?: string | null; // Classification code
  cutter_no?: string | null; // Cutter number
  edition?: string | null; // Edition of the book
  publish_date?: string | null; // Publish date (format: YYYY-MM-DD)
  weight?: string | null; // Weight of the book
  pages?: string | null; // Number of pages
  book_qty: number; // Quantity of books available
  shortage_threshold: number; // Shortage threshold for restocking
  source?: string | null; // Source details
  series?: string | null; // Series name (Optional)
  series_no?: string | null; // Series number (Optional)
  notes?: string | null; // Additional notes (Optional)
  isbn?: string | null; // ISBN number
  iccn?: string | null; // ICCN number
  language: LanguageEnum; // Language as enum
  is_nepali: boolean; // Boolean flag (true/false)
  subject?: string | null; // Subject of the book
  biblography?: string | null; // Bibliography details (Optional)
  thesis_dec?: string | null; // Thesis declaration (Optional)
  is_cat: boolean; // Catalogued (true/false)
  user_id: number; // ID of the user who entered the data
  status: StatusEnum; // Status as enum
  entry_date: Date; // Entry date
  file?: IFileResponse | null; // File details (e.g., cover image)
  book_type: BookTypeEnum; // Book type (enum)
  new_log?: string | null; // New log details (Optional)
  is_public: boolean; // Public visibility (true/false)
}

export interface ILibDashboardReport {
  fine: number;
  book: number;
  bookCopy: number;
  patron: number;
}

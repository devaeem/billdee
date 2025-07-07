export interface Account {
  id: string;
  userId: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  profileImage: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  subscription: "SPARK" | "PRO" | "FREE";
  status: "active" | "inactive";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "USER";
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  accounts: Account[];
}

export interface HttpResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

export interface HttpPaginationResponse<T> {
  data: {
    data: T[];
  };
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

/**
 * Shared cast of mock people, reused across features so the app feels
 * coherent (PIPELINE.md section 6). Feature-level mock-data.ts files should
 * import from here rather than inventing new names.
 */

export interface Person {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  avatarInitials: string;
}

export const mockPeople: Person[] = [
  {
    id: "emp-001",
    name: "Rahul Patel",
    role: "HR Manager",
    department: "Human Resources",
    email: "rahul.patel@ewms.io",
    avatarInitials: "RP",
  },
  {
    id: "emp-002",
    name: "Vikram Mehta",
    role: "Engineering Lead",
    department: "Engineering",
    email: "vikram.mehta@ewms.io",
    avatarInitials: "VM",
  },
  {
    id: "emp-003",
    name: "Neha Sharma",
    role: "Product Designer",
    department: "Design",
    email: "neha.sharma@ewms.io",
    avatarInitials: "NS",
  },
  {
    id: "emp-004",
    name: "Amit Patel",
    role: "Finance Analyst",
    department: "Finance",
    email: "amit.patel@ewms.io",
    avatarInitials: "AP",
  },
  {
    id: "emp-005",
    name: "Rahul Singh",
    role: "Sales Executive",
    department: "Sales",
    email: "rahul.singh@ewms.io",
    avatarInitials: "RS",
  },
  {
    id: "emp-006",
    name: "Priya Desai",
    role: "Marketing Specialist",
    department: "Marketing",
    email: "priya.desai@ewms.io",
    avatarInitials: "PD",
  },
];

/** The currently signed-in user shown in the topbar (matches the reference screenshots). */
export const currentUser: Person = mockPeople[0];

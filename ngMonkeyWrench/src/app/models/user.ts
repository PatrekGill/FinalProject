export class User {

  id: number;
	firstName: string | undefined;
	lastName: string | undefined;
	phoneNumber: string | undefined;
  role: string | undefined;
  enabled: boolean | undefined;
	notes: string | undefined;
  username: string | undefined;
  password: string | undefined;
  createdDate: Date | undefined;
  updateDate: Date | undefined;

  constructor(
    id: number = 0,
  	firstName?: string,
  	lastName?: string,
  	phoneNumber?: string,
    role?: string,
    enabled?: boolean,
  	notes?: string,
    username?: string,
    password?: string,
    createdDate?: Date,
    updateDate?: Date

  ) {
    this.id = id;
    this.firstName = firstName;
  	this.lastName = lastName;
  	this.phoneNumber = phoneNumber;
    this.role = role;
    this.enabled = enabled;
  	this.notes = notes;
    this.username = username;
    this.password = password;
    this.createdDate = createdDate;
    this.updateDate = updateDate;
  }
}

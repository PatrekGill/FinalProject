export class User {

  id: number;
	firstName: string;
	lastName: string;
	phoneNumber: number;
  role: string;
  enabled: boolean;
	notes: string;
  username: string;
  password: string;
  createdDate: Date;
  updateDate: Date;

  constructor(
    id: number,
  	firstName: string,
  	lastName: string,
  	phoneNumber: number,
    role: string,
    enabled: boolean,
  	notes: string,
    username: string,
    password: string,
    createdDate: Date,
    updateDate: Date
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

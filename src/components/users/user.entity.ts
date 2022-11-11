//import { hash } from 'bcryptjs';

export class User {
	private _password: string;
	private _cart: {items: Array<{count: number, productId: string}>[]}

	constructor(private readonly _email: string, private readonly _name: string) {}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._password;
	}

	get cart():{items: Array<{count: number, productId: string}>[]} {
		return this._cart;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		//this._password = await hash(pass, salt);
	}
}
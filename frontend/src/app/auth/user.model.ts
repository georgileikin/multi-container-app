export class APIUser {
  constructor(
    public username: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    public permissions: string[]
  ) {}
}

export class UserModel {
  constructor(
    public username: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public permissions: string[],
    private _token: string,
    private _expiration: number
  ) {}

  get token() {
    return this._token;
  }
}

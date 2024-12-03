import bycript from "bcryptjs";

class User {
  constructor(
    public id: string,
    public nome: string,
    public email: string,
    public senha: string
  ) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  public async setPassword(new_password: string): Promise<void> {
    this.senha = await bycript.hash(new_password, 2);
  }

  public async checkPassword(password: string): Promise<boolean> {
    return bycript.compare(password, this.senha);
  }
}

export default User;

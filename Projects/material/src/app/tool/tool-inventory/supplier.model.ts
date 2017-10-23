export class Supplier {
  public AsiNumber: string;
  public Identifier: number;
  public Name: string;
  public LastRun: Date;
  public Status: string;
  public Progress: number;

  public constructor(init?: Partial<Supplier>) {
    Object.assign(this, init);
  }
}

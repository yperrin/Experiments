export class Supplier {
  public asiNumber: string;
  public identifier: number;
  public name: string;
  public lastRun: Date;
  public status: string;
  public progress: number;

  public selected: boolean;
  public hover: boolean;

  public constructor(init?: Partial<Supplier>) {
    Object.assign(this, init);
    this.selected = false;
    this.hover = false;
  }

  get active(): boolean {
    return this.selected || this.hover;
  }
}

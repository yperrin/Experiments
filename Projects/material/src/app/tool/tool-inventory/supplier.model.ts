export class Supplier {
  public asiNumber: string;
  public identifier: number;
  public name: string;
  public lastRun: Date;
  public status: string;
  public successRate: number;
  public progress: number;

  public selected: boolean;
  public hover: boolean;

  public constructor(init?: Partial<Supplier>) {
    const min = 80;
    const max = 100;
    Object.assign(this, init);
    this.selected = false;
    this.hover = false;
    this.successRate = Math.floor(Math.random() * (max - min + 1) + min);
  }

  get active(): boolean {
    return this.selected || this.hover;
  }
}

export class PluginNodeConfigModel {
    private properties: Map<string, string>;
    url: string;

    addProperty(name: string, value: string): void {
        this.properties.set(name, value);
    }
    getProperty(name: string): string {
        return this.properties.get(name);
    }
    getDisplayProperty(name: string): string {
        const maxLength = 50;
        let display = this.getProperty(name);
        if (display && display.length > maxLength) {
            display = display.substr(0, maxLength) + '...';
        }
        return display;
    }
    getPropertyNames(): string[] {
        return Array.from(this.properties.keys());
    }

    public constructor(init?: Partial<PluginNodeConfigModel>) {
        Object.assign(this, init);
        if (!this.properties) {
            this.properties = new Map<string, string>();
        }
    }
}

class HSLColor {
  hue: number;
  saturation: number;
  lightness: number;

  constructor(hue: number, saturation = 100, lightness = 100) {
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
  }

  getColor() {
    return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`
  }
}

export default HSLColor;
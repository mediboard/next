class TagService {
	constructor(colorWheel) {
		this.colorWheel = colorWheel;
		this.tag2Color = {};
		this.colorIndex = 0;
	}

	getTagColor(tag) {
		if (this.tag2Color[tag] === undefined) {
			this.tag2Color[tag] = this.colorWheel[this.colorIndex % Object.keys(this.colorWheel).length];
			this.colorIndex++;
		}
		return this.tag2Color[tag];
	}
}

let colorWheel = [
  "#C2C4FF",
  "rgb(129, 133, 255)",
  "#5C61FF",
  "#0A12FF",
  "#000593"
];

export default new TagService(colorWheel);
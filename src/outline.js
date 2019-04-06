import tinymce from "tinymce";

export default class Outline {
	constructor(editor, sidebarElement) {
		this.editor = editor;
		this.sidebarPanel = sidebarElement;
	}

	buildOutline() {
		const outline = this.editor.dom.create("ul", { class: "tinymce-outline" });
		this.editor.$("h1, h2, h3, h4, h5, h6").each((index, element) => {
			const li = this.editor.dom.add(
				outline,
				"li",
				{
					class: [
						"tinymce-outline-" + element.tagName.toLowerCase(),
						this.isElementInViewport(element) ? "is-visible" : ""
					].join(" "),
					title: element.innerText
				},
				element.innerText
			);
			li.addEventListener("click", () => {
				element.scrollIntoView({ behavior: "smooth" });
			});
		});
		return outline;
	}

	isElementInViewport(element) {
		const { top, bottom } = element.getBoundingClientRect();
		const vHeight = element.ownerDocument.documentElement.clientHeight;
		return (top > 0 || bottom > 0) && top < vHeight;
	}

	updateSidebarPanel() {
		if (this.isHiddenElement(this.sidebarPanel)) {
			return;
		}
		const outline = this.buildOutline(this.editor);
		this.clearSidebarPanel();
		this.editor.dom.add(this.sidebarPanel, outline);
	}

	clearSidebarPanel() {
		while (this.sidebarPanel.firstChild) {
			this.sidebarPanel.removeChild(this.sidebarPanel.firstChild);
		}
	}

	isHiddenElement(element) {
		return element.offsetParent === null;
	}

	init() {
		this.editor
			.getWin()
			.addEventListener(
				"scroll",
				tinymce.util.Delay.debounce(() => this.updateSidebarPanel(), 20)
			);
		this.editor.on(
			"Change",
			tinymce.util.Delay.debounce(() => this.updateSidebarPanel(), 100)
		);
		window.addEventListener(
			"resize",
			tinymce.util.Delay.debounce(() => this.updateSidebarPanel(), 100)
		);
	}
}

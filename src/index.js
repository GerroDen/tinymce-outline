import "./style.less";
import tinymce from "tinymce";

function buildOutline(editor) {
	const outline = editor.dom.create("ul", { class: "tinymce-outline" });
	editor.$("h1, h2, h3, h4, h5, h6").each((index, element) => {
		const li = editor.dom.add(
			outline,
			"li",
			{
				class: "tinymce-outline-" + element.tagName.toLowerCase(),
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

let sidebarPanel;

function updateSidebarPanel(editor) {
	const outline = buildOutline(editor);
	while (sidebarPanel.firstChild) {
		sidebarPanel.removeChild(sidebarPanel.firstChild);
	}
	editor.dom.add(sidebarPanel, outline);
}

tinymce.PluginManager.add("outline", editor => {
	editor.on("Init", () => {
		editor.dom.loadCSS("main.css");
	});
	editor.addSidebar("mysidebar", {
		tooltip: "My sidebar",
		icon: "settings",
		onrender(api) {
			sidebarPanel = api.element();
			updateSidebarPanel(editor);
		},
		onshow(api) {},
		onhide(api) {}
	});
	editor.on("Change", () => {
		updateSidebarPanel(editor);
	})
});

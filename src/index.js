import "./style.less";
import tinymce from "tinymce";
import Outline from "./outline";

console.log(tinymce);
tinymce.PluginManager.add("outline", editor => {
	editor.on("Init", () => {
		editor.dom.loadCSS("main.css");
	});
	let outline;
	editor.addSidebar("outline", {
		tooltip: "Outline",
		icon: "toc",
		onrender(api) {
			outline = new Outline(editor, api.element());
			outline.init();
		},
		onshow() {
			outline.updateSidebarPanel();
		}
	});
});

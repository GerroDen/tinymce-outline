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
		li.addEventListener("click", function() {
			element.scrollIntoView({ behavior: "smooth" });
		});
	});
	return outline;
}

tinymce.PluginManager.add("outline", function(editor) {
	editor.addSidebar("mysidebar", {
		tooltip: "My sidebar",
		icon: "settings",
		onrender(api) {
			const outline = buildOutline(editor);
			editor.dom.add(api.element(), outline);
		},
		onshow(api) {},
		onhide(api) {}
	});
});

import { App, Modal, Setting, TextAreaComponent } from 'obsidian';

export class SetLayoutModal extends Modal {
	constructor (app: App) {
		super(app);

		this.setTitle('Set Layout');
		this.modalEl.style.width = 'auto';
		this.modalEl.style.height = 'auto';

		let layout: string;
		let txtArea: TextAreaComponent;

		this.app.workspace.on('layout-change', () => {
			txtArea.setValue(JSON.stringify(this.app.workspace.getLayout(), undefined, 2));
		});

		new Setting(this.contentEl)
			.addTextArea((text) => {
				txtArea = text;
				txtArea.onChange((value) => {
					layout = value;
				})
					.setValue(JSON.stringify(this.app.workspace.getLayout(), undefined, 2));
				txtArea.inputEl.style.width = '1000px';
				txtArea.inputEl.style.height = '1000px';
			});

		new Setting(this.contentEl)
			.addButton((btn) => {
				btn.setButtonText('Submit')
					.setCta()
					.onClick(() => {
						this.app.workspace.setLayout(JSON.parse(layout));
					});
			})
			.addButton((btn) => {
				btn.setButtonText('Close')
					.onClick(() => {
						this.close();
					});
			});
	}
}
import { Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, Settings } from './settings/SettingsInterface';
import { MyPluginSettingTab } from './settings/SettingsTab';
import { SetLayoutModal } from './modals/SetLayoutModal';

export default class MyPlugin extends Plugin {
	settings: Settings;

	async onload () {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new MyPluginSettingTab(this.app, this));

		this.addCommand({
			id: 'set-layout',
			name: 'Set Layout',
			callback: () => {
				new SetLayoutModal(this.app).open();
			},
		});
	}

	onunload () {

	}

	async loadSettings () {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings () {
		await this.saveData(this.settings);
	}
}

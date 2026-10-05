const vscode = require('vscode');

// The name of our themes as defined in package.json
const ARIV_THEMES = ['Ariv Better Dark', 'Ariv Better Ocean'];

// The settings we want to enforce
const ARIV_SETTINGS = {
    "editor.fontFamily": "'JetBrains Mono', Consolas, 'Courier New', monospace",
    "editor.fontLigatures": true,
    "editor.bracketPairColorization.enabled": true,
    "editor.guides.bracketPairs": "active",
    "workbench.iconTheme": "material-icon-theme",
    "workbench.productIconTheme": "feather-product-icons"
};

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Ariv Better Themes extension is now active!');

    // Check if the theme is already active on startup
    handleThemeChange(vscode.window.activeColorTheme, context);

    // Listen for theme changes
    let disposable = vscode.window.onDidChangeActiveColorTheme((theme) => {
        handleThemeChange(theme, context);
    });

    context.subscriptions.push(disposable);
}

/**
 * Handle logic when the user switches themes
 * @param {vscode.ColorTheme} theme 
 * @param {vscode.ExtensionContext} context 
 */
async function handleThemeChange(theme, context) {
    const isArivThemeActive = ARIV_THEMES.includes(theme.label || vscode.workspace.getConfiguration('workbench').get('colorTheme'));
    const config = vscode.workspace.getConfiguration();
    
    if (isArivThemeActive) {
        // We switched TO Ariv Theme
        
        // 1. Check if we already have a backup. If not, create one.
        let backup = context.globalState.get('arivSettingsBackup');
        if (!backup) {
            backup = {
                "editor.fontFamily": config.inspect("editor.fontFamily")?.globalValue,
                "editor.fontLigatures": config.inspect("editor.fontLigatures")?.globalValue,
                "editor.bracketPairColorization.enabled": config.inspect("editor.bracketPairColorization.enabled")?.globalValue,
                "editor.guides.bracketPairs": config.inspect("editor.guides.bracketPairs")?.globalValue,
                "workbench.iconTheme": config.inspect("workbench.iconTheme")?.globalValue,
                "workbench.productIconTheme": config.inspect("workbench.productIconTheme")?.globalValue
            };
            
            // Save the backup
            await context.globalState.update('arivSettingsBackup', backup);
        }

        // 2. Apply Ariv Settings
        for (const [key, value] of Object.entries(ARIV_SETTINGS)) {
            // We use ConfigurationTarget.Global to update the user's main settings.json
            await config.update(key, value, vscode.ConfigurationTarget.Global);
        }

        // 3. Notify the user. JetBrains Mono is SIL OFL 1.1.
        vscode.window.showInformationMessage(
            "Ariv Better Themes applied. The editor font is JetBrains Mono. Install it on your system if it is not available yet.",
            "Get JetBrains Mono"
        ).then(selection => {
            if (selection === "Get JetBrains Mono") {
                vscode.env.openExternal(vscode.Uri.parse("https://github.com/JetBrains/JetBrainsMono"));
            }
        });

    } else {
        // We switched AWAY from Ariv Theme
        
        // 1. Check if we have a backup to restore
        const backup = context.globalState.get('arivSettingsBackup');
        
        if (backup) {
            // Restore every setting we modified
            for (const [key, value] of Object.entries(backup)) {
                // If it was undefined previously, update(key, undefined) removes that setting from settings.json
                await config.update(key, value, vscode.ConfigurationTarget.Global);
            }

            // Clear the backup so we can take a fresh one next time they switch to Ariv
            await context.globalState.update('arivSettingsBackup', undefined);

            // Notify User
            vscode.window.showInformationMessage("Ariv Better Themes removed. Your original editor settings have been restored.");
        }
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
